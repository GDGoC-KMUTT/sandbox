package profileEndpoint

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"sandbox-skeleton/type/common"
	"sandbox-skeleton/type/payload"
	"sandbox-skeleton/type/response"
	"sandbox-skeleton/type/table"
)

func (r *Handler) HandleInfoGet(c *fiber.Ctx) error {
	// * login state
	l := c.Locals("l").(*jwt.Token).Claims.(*common.UserClaims)

	// * query user
	user := new(table.User)
	if tx := r.database.First(user, "id = ?", l.UserId); tx.Error != nil {
		return tx.Error
	}

	// * map table to payload
	mappedUser := &payload.Profile{
		Id:        user.Id,
		Firstname: user.Firstname,
		Lastname:  user.Lastname,
		PhotoUrl:  user.PhotoUrl,
	}

	return c.JSON(response.Success(mappedUser))
}
