package payload

type CreateServer struct {
	Hostname *string `json:"hostname"`
	Username *string `json:"username"`
	Password *string `json:"password"`
	OS       *string `json:"os"`
	VCPU     *int    `json:"v_cpu"`
	Memory   *string `json:"memory"`
	Storage  *string `json:"storage"`
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
	Memory   *string `json:"memory"`
	Storage  *string `json:"storage"`
	Status   *string `json:"status"`
}

type PublicServer struct {
	Id       *uint64 `json:"id"`
	Hostname *string `json:"hostname"`
	IP       *string `json:"ip"`
	OS       *string `json:"os"`
	VCPU     *int    `json:"v_cpu"`
	Memory   *string `json:"memory"`
	Status   *string `json:"status"`
	Storage  *string `json:"storage"`
}
