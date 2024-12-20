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

func (r *Handler) HandleAddUser(c *fiber.Ctx) error {
	// Parse Body
	body := new(payload.UserAdd)
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

	// Get the User by Email
	user := new(table.User)
	if err := r.database.First(user, "email = ?", body.Email).Error; err != nil {
		return gut.Err(false, "User not found", err)
	}

	// Check if the user is already part of the project
	existingUserProject := new(table.UserProject)
	if err := r.database.First(existingUserProject, "project_id = ? AND user_id = ?", body.ProjectId, user.Id).Error; err == nil {
		// User already exists in the project
		return gut.Err(false, "User is already part of the project", nil)
	}

	// Add the user to the project
	newUserProject := table.UserProject{
		ProjectId: body.ProjectId,
		UserId:    user.Id,
	}

	if err := r.database.Create(&newUserProject).Error; err != nil {
		return gut.Err(false, "Failed to add user to the project", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success("User added to the project"))
}
