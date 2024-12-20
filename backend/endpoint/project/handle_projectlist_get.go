package projectEndpoint

import (
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (r *Handler) HandleProjectListGet(c *fiber.Ctx) error {
	// Get user claims from the JWT
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Query projects for the user
	var projects []table.Project
	if err := r.database.Preload("Users").Joins("JOIN user_projects up ON up.project_id = projects.id").
		Where("up.user_id = ?", l.UserId).Find(&projects).Error; err != nil {
		return err
	}

	// Handle empty results
	if len(projects) == 0 {
		return c.JSON(response.Success([]payload.Project{}))
	}

	// Map table to payload
	var payloadProjects []payload.Project
	for _, project := range projects {
		var users []payload.User
		for _, user := range project.Users {
			users = append(users, payload.User{
				Email:    user.Email,
				PhotoUrl: user.PhotoUrl,
			})
		}

		if project.Id != nil && project.Name != nil && project.Domain != nil && project.CreatedAt != nil {
			payloadProjects = append(payloadProjects, payload.Project{
				ProjectId: *project.Id,
				Name:      *project.Name,
				Domain:    *project.Domain,
				Users:     users,
				CreatedAt: *project.CreatedAt,
			})
		}
	}

	// Return JSON response
	return c.JSON(response.Success(payloadProjects))
}
