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

func (r *Handler) HandleCreateWebProxy(c *fiber.Ctx) error {
	// Parse web proxy details from the request body
	body := new(payload.CreateWebProxy)
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
		return gut.Err(false, "invalid projectid format", err)
	}

	// Login State
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Check if the user has access to the project
	projectAccess := new(table.UserProject)
	if err := r.database.First(projectAccess, "project_id = ? AND user_id = ?", projectIDUint64, l.UserId).Error; err != nil {
		return gut.Err(false, "User does not have access to this project", err)
	}

	var serverIdPtr *uint64
	if body.ServerId != nil {
		serverIdUint64 := uint64(*body.ServerId)
		serverIdPtr = &serverIdUint64
	}

	// Check if the server exists only if serverIdPtr is not nil
	if serverIdPtr != nil {
		server := new(table.Server)
		if err := r.database.First(server, "id = ?", serverIdPtr).Error; err != nil {
			return gut.Err(false, "Server does not exist", err)
		}
	}

	dnsService := "Web Proxy"

	domain := &table.Domain{
		Hostname:  body.Hostname,
		ServerId:  serverIdPtr,
		Service:   &dnsService,
		ProjectId: &projectIDUint64,
		Port:      body.Port,
	}

	// Save the record to the database
	if err := r.database.Create(domain).Error; err != nil {
		return gut.Err(false, "Failed to create domain", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success(domain))
}
