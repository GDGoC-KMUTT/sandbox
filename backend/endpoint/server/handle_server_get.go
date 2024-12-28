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

func (r *Handler) HandleServerGet(c *fiber.Ctx) error {
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	projectId := c.Params("projectId")
	serverId := c.Params("serverId")

	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}
	if serverId == "" {
		return gut.Err(false, "ServerId is required")
	}

	// Check project ownership
	var userProject table.UserProject
	if tx := r.database.First(&userProject, "project_id = ? AND user_id = ?", projectId, l.UserId); tx.Error != nil {
		return gut.Err(false, "No permission")
	}

	// Fetch server by serverId and projectId
	var server table.Server
	if tx := r.database.First(&server, "id = ? AND project_id = ?", serverId, projectId); tx.Error != nil {
		if tx.Error.Error() == "record not found" {
			return gut.Err(false, "Server not found")
		}
		return tx.Error
	}

	instance, err := r.HandleGetInstance(c, *server.Hostname)
	if err != nil {
		return gut.Err(false, "Failed to fetch instance details", err)
	}

	mappedServer := payload.Server{
		Id:       server.Id,
		Hostname: &instance.Hostname,
		IP:       &instance.Ip,
		OS:       server.OS,
		VCPU:     server.VCPU,
		Memory:   server.Memory,
		Username: server.Username,
		Password: server.Password,
		Storage:  server.Storage,
		Status:   &instance.Status,
	}

	return c.JSON(response.Success(mappedServer))
}
