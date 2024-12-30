package payload

import "time"

type CreateProject struct {
	Name   *string `json:"name"`
	Domain *string `json:"domain"`
}
type EditProject struct {
	Name      *string `json:"name"`
	Domain    *string `json:"domain"`
	ProjectId *uint64 `json:"project_id"`
}

type User struct {
	Email    *string `json:"email"`
	PhotoUrl *string `json:"photo_url"`
}

type Project struct {
	ProjectId uint64    `json:"project_id"`
	Name      string    `json:"name"`
	Domain    string    `json:"domain"`
	Users     []User    `json:"users"`
	CreatedAt time.Time `json:"created_at"`
}
