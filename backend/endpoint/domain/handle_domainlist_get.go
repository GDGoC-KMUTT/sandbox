package domainEndpoint

import (
	"fmt"
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
)

func (r *Handler) HandleDomainListGet(c *fiber.Ctx) error {
	// Get user claims
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// Get projectId from query
	projectId := c.Params("projectId")
	if projectId == "" {
		return gut.Err(false, "ProjectId is required")
	}

	// Check project ownership
	var userProject table.UserProject
	if tx := r.database.First(&userProject, "project_id = ? AND user_id = ?", projectId, l.UserId); tx.Error != nil {
		return gut.Err(false, "No permission")
	}
	// Fetch servers for the project
	var domains []table.Domain
	if tx := r.database.Where("project_id = ?", projectId).Find(&domains); tx.Error != nil {
		return tx.Error
	}

	// Map to response format
	var mappedDomains []payload.Domain
	for _, domain := range domains {

		var mappedServer *payload.PublicServer
		if domain.ServerId != nil {
			var server table.Server
			if tx := r.database.First(&server, "id = ?", domain.ServerId); tx.Error != nil {
				if tx.Error.Error() == "record not found" {
					fmt.Println(domain.ServerId)
					return gut.Err(false, "Server not found")
				}
				return tx.Error
			}

			mappedServer = &payload.PublicServer{
				Id:       server.Id,
				Hostname: server.Hostname,
				IP:       server.IP,
				OS:       server.OS,
				VCPU:     server.VCPU,
				Memory:   server.Memory,
			}
		}

		mappedDomains = append(mappedDomains, payload.Domain{
			Id:       domain.Id,
			Hostname: domain.Hostname,
			DNSType:  domain.DNSType,
			Target:   domain.Target,
			Server:   mappedServer,
			Port:     domain.Port,
			Service:  domain.Service,
		})
	}

	// Return servers list
	return c.JSON(response.Success(mappedDomains))
}
