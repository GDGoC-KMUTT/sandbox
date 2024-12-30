package domainEndpoint

import (
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (r *Handler) HandleDeleteDomain(c *fiber.Ctx) error {
	// Login State
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Parse Body
	body := new(payload.DeleteDomainPayload)
	if err := c.BodyParser(body); err != nil {
		return gut.Err(false, "unable to parse body", err)
	}

	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}
	// Check if the logged-in user has access to the project
	projectAccess := new(table.UserProject)
	if err := r.database.First(projectAccess, "project_id = ? AND user_id = ?", projectId, l.UserId).Error; err != nil {
		return gut.Err(false, "User does not have access to this project", err)
	}

	// Fetch domain by domainId and projectId
	var domain table.Domain
	if tx := r.database.First(&domain, "id = ? AND project_id = ?", body.Id, projectId); tx.Error != nil {
		if tx.Error.Error() == "record not found" {
			return gut.Err(false, "Domain not found")
		}
		return tx.Error
	}

	// Delete the domain record from the Domain table
	if tx := r.database.Delete(&domain); tx.Error != nil {
		return gut.Err(false, "Failed to delete server record", tx.Error)
	}
	if err := r.HandleGenerateFile(c); err != nil {
		return gut.Err(false, "Failed to generate DNS file", err)
	}

	return c.Status(fiber.StatusCreated).JSON(response.Success("Domain removed from the project"))
}
