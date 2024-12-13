package main

import (
	"sandbox-skeleton/common/config"
	"sandbox-skeleton/common/database"
	"sandbox-skeleton/common/fiber"
	"sandbox-skeleton/common/fiber/middleware"
	"sandbox-skeleton/endpoint"
	profileEndpoint "sandbox-skeleton/endpoint/profile"
	"sandbox-skeleton/endpoint/public"
	"sandbox-skeleton/endpoint/sample"

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
		),
		fx.Invoke(
			endpoint.Bind,
		),
	).Run()
}
