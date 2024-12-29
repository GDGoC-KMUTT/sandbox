package projectEndpoint

import (
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (r *Handler) HandleDeleteProject(c *fiber.Ctx) error {

	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}

	// Check if the logged-in user has access to the project
	projectAccess := new(table.UserProject)
	if err := r.database.First(projectAccess, "project_id = ? AND user_id = ?", projectId, l.UserId).Error; err != nil {
		return gut.Err(false, "User does not have access to this project", err)
	}

	var serverCount int64
	if err := r.database.Model(&table.Server{}).Where("project_id = ?", projectId).Count(&serverCount).Error; err != nil {
		return gut.Err(false, "Error checking associated servers", err)
	}
	if serverCount > 0 {
		return gut.Err(false, "Cannot delete project: servers are still associated with this project")
	}

	var domainCount int64
	if err := r.database.Model(&table.Domain{}).Where("project_id = ?", projectId).Count(&domainCount).Error; err != nil {
		return gut.Err(false, "Error checking associated domains", err)
	}
	if domainCount > 0 {
		return gut.Err(false, "Cannot delete project: domains are still associated with this project")
	}

	// Get all users associated with the project
	var userProjects []table.UserProject
	if err := r.database.Where("project_id = ?", projectId).Find(&userProjects).Error; err != nil {
		return gut.Err(false, "Error fetching associated users", err)
	}

	// Call HandleDeleteUser for each associated user
	for _, userProject := range userProjects {
		if err := r.database.Delete(userProject, "project_id = ? AND user_id = ?", projectId, userProject.UserId).Error; err != nil {
			return gut.Err(false, "Failed to remove user from the project", err)
		}
	}

	if err := r.database.Where("id = ?", projectId).Delete(&table.Project{}).Error; err != nil {
		return gut.Err(false, "Error deleting project", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success("Project is deleted"))
}
