package payload

type CreateProject struct {
	Name   *string `json:"name"`
	Domain *string `json:"domain"`
}
