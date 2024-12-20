package serverEndpoint

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

func (r *Handler) HandleCreateServer(c *fiber.Ctx) error {
	// Parse server details from the request body
	body := new(payload.CreateServer)
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

	// Create a new server instance
	server := &table.Server{
		Hostname:  body.Hostname,
		Username:  body.Username,
		Password:  body.Password,
		IP:        body.Ip,
		OS:        body.Os,
		VCPU:      body.V_cpu,
		Memory:    body.Memory,
		ProjectId: &projectIDUint64,
	}

	// Save the server to the database
	if err := r.database.Create(server).Error; err != nil {
		return gut.Err(false, "Failed to create server", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success(server))
}
