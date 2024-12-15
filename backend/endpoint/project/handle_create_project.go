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

func (r *Handler) HandleCreateProject(c *fiber.Ctx) error {
	// Parse Body
	body := new(payload.CreateProject)
	if err := c.BodyParser(body); err != nil {
		return gut.Err(false, "unable to parse body", err)
	}

	// Login State
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Create new Project
	project := &table.Project{
		Name:   body.Name,
		Domain: body.Domain,
	}

	// Check User
	user := new(table.User)
	if err := r.database.First(user, "id = ?", l.UserId).Error; err != nil {
		return gut.Err(false, "User not found", err)
	}

	// Add user to UserProject
	project.Users = append(project.Users, *user)

	// Save to DB
	if err := r.database.Create(project).Error; err != nil {
		return gut.Err(false, "Failed to create project", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success(project))
}
