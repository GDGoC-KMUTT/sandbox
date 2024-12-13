package common

type OidcClaims struct {
	Id        *string `json:"sub"`
	FirstName *string `json:"name"`
	Lastname  *string `json:"family_name"`
	Picture   *string `json:"picture"`
	Email     *string `json:"email"`
}

type UserClaims struct {
	UserId *uint64 `json:"userId"`
}

func (r *UserClaims) Valid() error {
	return nil
}
