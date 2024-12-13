package fiber

import (
	"context"
	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/fx"
	"sandbox-skeleton/common/config"
)

func Init(lc fx.Lifecycle, config *config.Config) *fiber.App {
	app := fiber.New(fiber.Config{
		ErrorHandler:                 ErrorHandler,
		Prefork:                      false,
		StrictRouting:                true,
		AppName:                      "IoT Hackathon Sandbox",
		StreamRequestBody:            true,
		DisablePreParseMultipartForm: true,
		Network:                      "tcp",
	})

	lc.Append(fx.Hook{
		OnStart: func(context.Context) error {
			go func() {
				err := app.Listen(*config.Listen)
				if err != nil {
					gut.Fatal("unable to listen", err)
				}
			}()
			return nil
		},
		OnStop: func(context.Context) error {
			// * shutdown
			_ = app.Shutdown()
			return nil
		},
	})

	return app
}
