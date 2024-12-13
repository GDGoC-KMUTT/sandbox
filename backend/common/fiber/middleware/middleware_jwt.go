package middleware

import (
	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/jwt/v3"
	"sandbox-skeleton/type/common"
)

func (r *Middleware) Jwt() fiber.Handler {
	conf := jwtware.Config{
		SigningKey:  []byte(*r.config.Secret),
		TokenLookup: "cookie:login",
		ContextKey:  "l",
		Claims:      &common.UserClaims{},
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return gut.Err(false, "JWT validation failure", err)
		},
	}

	return jwtware.New(conf)
}
