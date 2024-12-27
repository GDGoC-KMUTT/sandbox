package endpoint

import (
	"sandbox-skeleton/common/fiber/middleware"
	domainEndpoint "sandbox-skeleton/endpoint/domain"
	profileEndpoint "sandbox-skeleton/endpoint/profile"
	projectEndpoint "sandbox-skeleton/endpoint/project"
	"sandbox-skeleton/endpoint/public"
	"sandbox-skeleton/endpoint/sample"
	serverEndpoint "sandbox-skeleton/endpoint/server"
	"sandbox-skeleton/type/response"

	"github.com/gofiber/fiber/v2"
)

func Bind(app *fiber.App, middleware *middleware.Middleware, sampleHandler *sampleEndpoint.Handler, publicHandler *publicEndpoint.Handler, profileHandler *profileEndpoint.Handler, projectHandler *projectEndpoint.Handler, serverHandler *serverEndpoint.Handler, domainHandler *domainEndpoint.Handler) {
	// * root
	app.Use("/", middleware.Cors())
	app.Get("/", HandleRoot)

	// * api
	api := app.Group("api")

	// * sample group
	sampleGroup := api.Group("sample")
	sampleGroup.Get("pingpong", sampleHandler.HandlePingPong)
	sampleGroup.Post("plus", sampleHandler.HandlePlus)

	// * public group
	publicGroup := api.Group("public")
	publicGroup.Get("login/redirect", publicHandler.HandleLoginRedirect)
	publicGroup.Post("login/callback", publicHandler.HandleLoginCallback)

	// * profile group
	profileGroup := api.Group("profile", middleware.Jwt())
	profileGroup.Get("info", profileHandler.HandleInfoGet)

	projectGroup := api.Group("project", middleware.Jwt())
	projectGroup.Get("list", projectHandler.HandleProjectListGet)
	projectGroup.Post("adduser", projectHandler.HandleAddUser)
	projectGroup.Post("create", projectHandler.HandleCreateProject)
	projectGroup.Get(":projectId", projectHandler.HandleProjectGet)
	projectGroup.Patch("edit", projectHandler.HandleEditProject)
	projectGroup.Delete("deleteuser", projectHandler.HandleDeleteUser)

	// * server group
	serverGroup := projectGroup.Group(":projectId/server")
	serverGroup.Post("create", serverHandler.HandleCreateServer)

	serverGroup.Get("list", serverHandler.HandleServerListGet)
	serverGroup.Get("instances", serverHandler.HandleGetInstances)

	serverGroup.Get(":serverId", serverHandler.HandleServerGet)
	serverGroup.Patch(":serverId/edit", serverHandler.HandleEditServer)
	serverGroup.Delete(":serverId/delete", serverHandler.HandleDeleteServer)

	// incus

	// * domain group
	domainGroup := projectGroup.Group(":projectId/domain")
	domainGroup.Get("list", domainHandler.HandleDomainListGet)
	domainGroup.Post("create/dns", domainHandler.HandleCreateDnsRecord)
	domainGroup.Post("create/webproxy", domainHandler.HandleCreateWebProxy)
	domainGroup.Patch("edit/dns", domainHandler.HandleEditDnsRecord)
	domainGroup.Patch("edit/webproxy", domainHandler.HandleEditWebProxy)

	// * not found
	app.Use(HandleNotFound)
}

func HandleRoot(c *fiber.Ctx) error {
	return c.JSON(response.Success("SANDBOX BACKEND"))
}

func HandleNotFound(c *fiber.Ctx) error {
	return fiber.ErrNotFound
}
