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

func (r *Handler) HandleCreateServer(c *fiber.Ctx) error {
	body := new(payload.CreateServer)
	if err := c.BodyParser(body); err != nil {
		return gut.Err(false, "unable to parse body", err)
	}

	// Login State
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Create new server
	server := &table.Server{
		Hostname: body.Hostname,
		Username: body.Username,
		Password: body.Password,
		IP:       body.Ip,
		OS:       body.Os,
		VCPU:     body.V_cpu,
		Memory:   body.Memory,
	}

	// Check User
	user := new(table.User)
	if err := r.database.First(user, "id = ?", l.UserId).Error; err != nil {
		return gut.Err(false, "User not found", err)
	}

	// add check if user is owner of project
	projectAccess := new(table.UserProject)
	if err := r.database.First(projectAccess, "project_id = ? AND user_id = ?", body.ProjectId, l.UserId).Error; err != nil {
		return gut.Err(false, "User does not have access to this project", err)
	}

	// Add ProjectId to server (convert from *int to *uint64)
	if body.ProjectId != nil {
		projectID := uint64(*body.ProjectId)
		server.ProjectId = &projectID
	}

	if err := r.database.Create(server).Error; err != nil {
		return gut.Err(false, "Failed to create server", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success(server))

}
