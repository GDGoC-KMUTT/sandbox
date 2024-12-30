package projectEndpoint

import (
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (r *Handler) HandleProjectGet(c *fiber.Ctx) error {
	// Get user claims from the JWT
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}

	// Query the specific project for the user
	var project table.Project
	if err := r.database.Preload("Users").
		Joins("JOIN user_projects up ON up.project_id = projects.id").
		Where("up.user_id = ? AND projects.id = ?", l.UserId, projectId).
		First(&project).Error; err != nil {
		return gut.Err(false, "Project not found")
	}

	// Map table to payload
	var users []payload.User
	for _, user := range project.Users {
		users = append(users, payload.User{
			Email:    user.Email,
			PhotoUrl: user.PhotoUrl,
		})
	}

	payloadProject := payload.Project{
		ProjectId: *project.Id,
		Name:      *project.Name,
		Domain:    *project.Domain,
		Users:     users,
		CreatedAt: *project.CreatedAt,
	}

	// Return JSON response
	return c.JSON(response.Success(payloadProject))
}
