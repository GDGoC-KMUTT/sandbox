package projectEndpoint

import (
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"
	"strconv"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
)

func (r *Handler) HandleGetUsers(c *fiber.Ctx) error {
	// Get projectId from the URL parameter
	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}

	// Convert projectId to uint64
	projectIDUint64, err := strconv.ParseUint(projectId, 10, 64)
	if err != nil {
		return gut.Err(false, "invalid projectid format", err)
	}

	// get all users that is not in current poject
	var users []table.User
	if err := r.database.
		Where("id NOT IN (?)",
			r.database.Table("user_projects").Select("user_id").Where("project_id = ?", projectIDUint64),
		).
		Find(&users).Error; err != nil {
		return gut.Err(false, "No users found", err)
	}
	// create response
	var mappedUsers []payload.User
	for _, user := range users {
		mappedUsers = append(mappedUsers, payload.User{
			Email:    user.Email,
			PhotoUrl: user.PhotoUrl,
		})
	}

	return c.JSON(response.Success(mappedUsers))
}
