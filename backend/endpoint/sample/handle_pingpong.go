package sampleEndpoint

import (
	"github.com/gofiber/fiber/v2"
	"sandbox-skeleton/type/response"
)

func (r *Handler) HandlePingPong(c *fiber.Ctx) error {
	return c.JSON(response.Success("PONG"))
}
