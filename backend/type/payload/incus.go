package payload

type CreateIncusInstancePayload struct {
	Hostname *string `json:"hostname"`
	Username *string `json:"username"`
	Password *string `json:"password"`
	Os       *string `json:"os"`
	Vcpu     *int    `json:"v_cpu"`
	Memory   *string `json:"memory"`
	Storage  *string `json:"storage"`
}
type CreateInstanceResponse struct {
	Hostname string `json:"hostname"`
	Username string `json:"username"`
	Password string `json:"password"`
	Os       string `json:"os"`
	Memory   string `json:"memory"`
	Vcpu     int    `json:"cpu"`
	Storage  string `json:"storage"`
}

type GetInstancePayload struct {
	Hostname *string `json:"hostname"`
}

type GetInstanceResponse struct {
	Hostname string `json:"hostname"`
	Ip       string `json:"ip"`
	Vcpu     int    `json:"vcpu"`
	Memory   int    `json:"memory"`
	Os       string `json:"os"`
	Status   string `json:"status"`
	Storage  string `json:"storage"`
}

// come back to fix memory type to be string
