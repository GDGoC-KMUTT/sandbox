package payload

type CreateIncusInstancePayload struct {
	Hostname *string `json:"hostname"`
	Username *string `json:"username"`
	Password *string `json:"password"`
	Os       *string `json:"os"`
	Vcpu     *int    `json:"v_cpu"`
	Memory   *int    `json:"memory"`
}
type CreateInstanceResponse struct {
	Hostname string `json:"hostname"`
	Ip       string `json:"ip"`
	Username string `json:"username"`
	Password string `json:"password"`
	Os       string `json:"os"`
	Memory   int    `json:"memory"`
	Vcpu     int    `json:"cpu"`
}
