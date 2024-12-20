package serverEndpoint

import (
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (r *Handler) HandleServerListGet(c *fiber.Ctx) error {
	// Get user claims
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Get projectId from query
	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}

	// Check project ownership
	var userProject table.UserProject
	if tx := r.database.First(&userProject, "project_id = ? AND user_id = ?", projectId, l.UserId); tx.Error != nil {
		return gut.Err(false, "No permission")
	}
	// Fetch servers for the project
	var servers []table.Server
	if tx := r.database.Where("project_id = ?", projectId).Find(&servers); tx.Error != nil {
		return tx.Error
	}

	// Map to response format
	var mappedServers []payload.PublicServer
	for _, server := range servers {
		mappedServers = append(mappedServers, payload.PublicServer{
			Id:       server.Id,
			Hostname: server.Hostname,
			IP:       server.IP,
			OS:       server.OS,
			VCPU:     server.VCPU,
			Memory:   server.Memory,
		})
	}

	// Return servers list
	return c.JSON(response.Success(mappedServers))
}
