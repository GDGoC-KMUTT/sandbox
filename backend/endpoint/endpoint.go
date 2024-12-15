package endpoint

import (
	"sandbox-skeleton/common/fiber/middleware"
	profileEndpoint "sandbox-skeleton/endpoint/profile"
	projectEndpoint "sandbox-skeleton/endpoint/project"
	"sandbox-skeleton/endpoint/public"
	"sandbox-skeleton/endpoint/sample"
	"sandbox-skeleton/type/response"

	"github.com/gofiber/fiber/v2"
)

func Bind(app *fiber.App, middleware *middleware.Middleware, sampleHandler *sampleEndpoint.Handler, publicHandler *publicEndpoint.Handler, profileHandler *profileEndpoint.Handler, projectHandler *projectEndpoint.Handler) {
	// * root
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
	projectGroup.Post("create", projectHandler.HandleCreateProject)
	// * not found
	app.Use(HandleNotFound)
}

func HandleRoot(c *fiber.Ctx) error {
	return c.JSON(response.Success("SANDBOX BACKEND"))
}

func HandleNotFound(c *fiber.Ctx) error {
	return fiber.ErrNotFound
}
