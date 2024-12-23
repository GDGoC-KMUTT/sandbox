package payload

type CreateServer struct {
	Hostname *string `json:"hostname"`
	Username *string `json:"username"`
	Password *string `json:"password"`
	Ip       *string `json:"ip"`
	Os       *string `json:"os"`
	V_cpu    *int    `json:"v_cpu"`
	Memory   *int    `json:"memory"`
}
type EditServer struct {
	Hostname *string `json:"hostname"`
}

type Server struct {
	Id       *uint64 `json:"id"`
	Hostname *string `json:"hostname"`
	Username *string `json:"username"`
	Password *string `json:"password"`
	IP       *string `json:"ip"`
	OS       *string `json:"os"`
	VCPU     *int    `json:"v_cpu"`
	Memory   *int    `json:"memory"`
}

type PublicServer struct {
	Id       *uint64 `json:"id"`
	Hostname *string `json:"hostname"`
	IP       *string `json:"ip"`
	OS       *string `json:"os"`
	VCPU     *int    `json:"v_cpu"`
	Memory   *int    `json:"memory"`
}
