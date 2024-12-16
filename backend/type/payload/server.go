package payload

type CreateServer struct {
	Hostname *string
	Username *string
	Password *string
	Ip *string
	Os *string
	V_cpu *int
	Memory *int
	ProjectId *int
}