package domainEndpoint

import (
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"
	"strconv"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (r *Handler) HandleEditWebProxy(c *fiber.Ctx) error {
	// Parse dns record details from the request body
	body := new(payload.EditWebProxy)
	if err := c.BodyParser(body); err != nil {
		return gut.Err(false, "Unable to parse body", err)
	}

	// Get projectId from the URL parameter
	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}

	// Convert projectId to uint64
	projectIDUint64, err := strconv.ParseUint(projectId, 10, 64)
	if err != nil {
		return gut.Err(false, "Invalid projectId format", err)
	}

	// Login State
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Check if the user has access to the project
	projectAccess := new(table.UserProject)
	if err := r.database.First(projectAccess, "project_id = ? AND user_id = ?", projectIDUint64, l.UserId).Error; err != nil {
		return gut.Err(false, "User does not have access to this project", err)
	}

	//fetch domain by ID
	domain := new(table.Domain)
	if err := r.database.First(domain, "id = ?", body.Id).Error; err != nil {
		return gut.Err(false, "Domain not found", err)
	}

	dnsService := "Web Proxy"
	domain.Service = &dnsService
	domain.DNSType = nil
	domain.Target = nil

	if body.Hostname != nil {
		domain.Hostname = body.Hostname
	}
	if body.ServerId != nil {
		domain.ServerId = body.ServerId
	}
	if body.Port != nil {
		domain.Port = body.Port
	}

	if err := r.database.Save(domain).Error; err != nil {
		return gut.Err(false, "Failed to update domain", err)
	}
	return c.Status(fiber.StatusCreated).JSON(response.Success(domain))
}
