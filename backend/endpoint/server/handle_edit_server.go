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

func (r *Handler) HandleEditServer(c *fiber.Ctx) error {
	// Parse server details from the request body
	body := new(payload.EditServer)
	if err := c.BodyParser(body); err != nil {
		return gut.Err(false, "Unable to parse body", err)
	}

	// Get projectId from the URL parameter
	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}
	projectIDUint64, err := strconv.ParseUint(projectId, 10, 64)
	if err != nil {
		return gut.Err(false, "Invalid projectId format", err)
	}

	serverId := c.Params("serverId")
	if serverId == "" {
		return gut.Err(false, "ServerId is required")
	}
	serverIDUint64, err := strconv.ParseUint(serverId, 10, 64)
	if err != nil {
		return gut.Err(false, "Invalid serverId format", err)
	}

	// Login State
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Check if the user has access to the project
	projectAccess := new(table.UserProject)
	if err := r.database.First(projectAccess, "project_id = ? AND user_id = ?", projectIDUint64, l.UserId).Error; err != nil {
		return gut.Err(false, "User does not have access to this project", err)
	}

	// Fetch the server by ID
	server := new(table.Server)
	if err := r.database.First(server, "id = ?", serverIDUint64).Error; err != nil {
		return gut.Err(false, "Server not found", err)
	}
	if body.Hostname != nil {
		server.Hostname = body.Hostname
	}

	// Save changes to the database
	if err := r.database.Save(server).Error; err != nil {
		return gut.Err(false, "Failed to update server", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success("Server is updated"))
}
