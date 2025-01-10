package middleware

import (
	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/valyala/fasthttp"
	"io"
	"mime/multipart"
	"net"
	"sandbox-skeleton/type/table"
	"strconv"
	"strings"
)

func (r *Middleware) Proxy() fiber.Handler {
	return func(c *fiber.Ctx) error {
		if !strings.HasSuffix(c.Get("Host"), ".scnd.space") {
			return c.Next()
		}

		// * get domain by domain start
		subdomain := strings.TrimSuffix(c.Get("Host"), ".scnd.space")
		split := strings.Split(subdomain, "-")
		projectName := split[0]
		hostname := strings.Join(split[1:], "-")

		// * get project by project name
		var project *table.Project
		if tx := r.db.First(&project, "domain = ?", projectName); tx.Error != nil {
			return c.SendStatus(500)
		}

		// * get target hostname by project name
		var domain *table.Domain
		if tx := r.db.Preload("Server").First(&domain, "project_id = ? AND hostname = ?", project.Id, hostname); tx.Error != nil {
			return c.SendStatus(500)
		}

		// * get target url
		if *domain.Service != "Web Proxy" {
			return c.SendStatus(500)
		}

		// * get target url
		instanceState, _, err := r.incus.GetInstanceState(*domain.Server.Hostname)
		if err != nil {
			return gut.Err(false, "failed to fetch instance state", err)
		}
		var ipAddress string
		for _, addresses := range instanceState.Network {
			for _, addr := range addresses.Addresses {
				if addr.Family == "inet" && addr.Address != "127.0.0.1" && !strings.HasPrefix(addr.Address, "172.") {
					ipAddress = addr.Address
					break
				}
			}
			if ipAddress != "" {
				break
			}
		}

		// * add log record
		proxyLog := &table.ProxyLog{
			Id:        nil,
			DomainId:  domain.Id,
			Path:      gut.Ptr(c.Path()),
			CreatedAt: nil,
			UpdatedAt: nil,
		}
		if tx := r.db.Create(proxyLog); tx.Error != nil {
			return c.SendStatus(500)
		}

		targetURL := "http://" + c.Hostname() + c.OriginalURL()

		conn, err := net.Dial("tcp", ipAddress+":"+strconv.FormatUint(uint64(*domain.Port), 10))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("failed to forward request dial")
		}

		client := &fasthttp.Client{
			Dial: func(addr string) (net.Conn, error) {
				return conn, err
			},
		}

		req := fasthttp.AcquireRequest()
		defer fasthttp.ReleaseRequest(req)

		req.SetRequestURI(targetURL)
		req.Header.SetMethod(c.Method())
		req.Header.Set("Host", c.Hostname())
		req.Header.Set("X-Forwarded-Host", c.Hostname())

		if c.Is("multipart/form-data") {
			// Copy form fields and files for multipart data
			form, err := c.MultipartForm()
			if err != nil {
				return c.Status(fiber.StatusInternalServerError).SendString("Failed to parse multipart form")
			}
			writer := multipart.NewWriter(req.BodyWriter())
			for key, values := range form.Value {
				for _, value := range values {
					if err := writer.WriteField(key, value); err != nil {
						return c.Status(fiber.StatusInternalServerError).SendString("Failed to write form field")
					}
				}
			}
			for key, files := range form.File {
				for _, file := range files {
					part, err := writer.CreateFormFile(key, file.Filename)
					if err != nil {
						return c.Status(fiber.StatusInternalServerError).SendString("Failed to write file part")
					}
					src, err := file.Open()
					if err != nil {
						return c.Status(fiber.StatusInternalServerError).SendString("Failed to open file")
					}
					defer src.Close()
					if _, err := io.Copy(part, src); err != nil {
						return c.Status(fiber.StatusInternalServerError).SendString("Failed to copy file data")
					}
				}
			}
			writer.Close()
			req.Header.Set("Content-Type", writer.FormDataContentType())
		} else {
			// Copy raw body for other content types
			req.SetBody(c.Body())
			req.Header.SetContentTypeBytes(c.Request().Header.ContentType())
		}

		resp := fasthttp.AcquireResponse()
		defer fasthttp.ReleaseResponse(resp)

		if err := client.Do(req, resp); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Failed to forward request")
		}

		// Forward the response back to the client
		c.Response().SetStatusCode(resp.StatusCode())
		resp.Header.CopyTo(&c.Response().Header)
		c.Response().SetBodyRaw(resp.Body())

		return nil
	}
}
