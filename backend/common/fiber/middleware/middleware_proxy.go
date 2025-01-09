package middleware

import (
	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/proxy"
	"sandbox-skeleton/type/table"
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

		targetURL := "http://" + ipAddress + c.OriginalURL()

		return proxy.Forward(targetURL)(c)
	}
}
