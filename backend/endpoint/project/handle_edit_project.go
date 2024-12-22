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

func (r *Handler) HandleEditProject(c *fiber.Ctx) error {
	// Parse Body
	body := new(payload.EditProject)
	if err := c.BodyParser(body); err != nil {
		return gut.Err(false, "unable to parse body", err)
	}

	// Login State
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Check if the logged-in user has access to the project
	projectAccess := new(table.UserProject)
	if err := r.database.First(projectAccess, "project_id = ? AND user_id = ?", body.ProjectId, l.UserId).Error; err != nil {
		return gut.Err(false, "User does not have access to this project", err)
	}

	// Fetch the project by ID
	project := new(table.Project)
	if err := r.database.First(project, "id = ?", body.ProjectId).Error; err != nil {
		return gut.Err(false, "Project not found", err)
	}
	// Update project fields
	if body.Name != nil {
		project.Name = body.Name
	}
	if body.Domain != nil {
		project.Domain = body.Domain
	}

	// Save changes to the database
	if err := r.database.Save(project).Error; err != nil {
		return gut.Err(false, "Failed to update project", err)
	}

	// Return success response
	return c.Status(fiber.StatusCreated).JSON(response.Success("Project is updated"))

}
