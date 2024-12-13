package sampleEndpoint

import (
	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
)

func (r *Handler) HandlePlus(c *fiber.Ctx) error {
	body := new(payload.PlusBody)
	if err := c.BodyParser(body); err != nil {
		return gut.Err(false, "unable to parse body", err)
	}

	result := *body.No1 + *body.No2

	return c.JSON(response.Success(&payload.CalculateResult{
		Result: &result,
	}))
}
