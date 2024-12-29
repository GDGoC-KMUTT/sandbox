package payload

type Profile struct {
	Id        *uint64 `json:"id"`
	Firstname *string `json:"firstname"`
	Lastname  *string `json:"lastname"`
	PhotoUrl  *string `json:"photoUrl"`
}

type UserAdd struct {
	Email     *string `json:"email"`
	ProjectId *uint64 `json:"project_id"`
}

type UsersGet struct {
	ProjectId *uint64 `json:"project_id"`
}
type UserDelete struct {
	Email     *string `json:"email"`
	ProjectId *uint64 `json:"project_id"`
}
