package main

import (
	"sandbox-skeleton/common/config"
	"sandbox-skeleton/common/database"
	"sandbox-skeleton/common/fiber"
	"sandbox-skeleton/common/fiber/middleware"
	"sandbox-skeleton/endpoint"
	domainEndpoint "sandbox-skeleton/endpoint/domain"
	profileEndpoint "sandbox-skeleton/endpoint/profile"
	projectEndpoint "sandbox-skeleton/endpoint/project"
	"sandbox-skeleton/endpoint/public"
	"sandbox-skeleton/endpoint/sample"
	serverEndpoint "sandbox-skeleton/endpoint/server"

	"go.uber.org/fx"
)

func main() {
	fx.New(
		fx.Provide(
			config.Init,
			database.Init,
			fiber.Init,
			middleware.Init,
			sampleEndpoint.Handle,
			publicEndpoint.Handle,
			profileEndpoint.Handle,
			projectEndpoint.Handle,
			serverEndpoint.Handle,
			domainEndpoint.Handle,
		),
		fx.Invoke(
			endpoint.Bind,
		),
	).Run()
}
