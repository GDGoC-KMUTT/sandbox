package publicEndpoint

import "github.com/gofiber/fiber/v2"

func (r *Handler) HandleLoginRedirect(c *fiber.Ctx) error {
	return c.Redirect(r.Oauth2Config.AuthCodeURL("state"))
}
