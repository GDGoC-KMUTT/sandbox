package payload

type CreateDnsRecord struct {
	Hostname *string `json:"hostname"`
	DNSType  *string `json:"dnstype"`
	Target   *string `json:"target"`
}

type CreateWebProxy struct {
	Hostname *string `json:"hostname"`
	ServerId *uint64 `json:"server_id"`
	Port     *int    `json:"port"`
}

type EditDnsRecord struct {
	Id       *uint64 `json:"id"`
	Hostname *string `json:"hostname"`
	DNSType  *string `json:"dnstype"`
	Target   *string `json:"target"`
}

type EditWebProxy struct {
	Id       *uint64 `json:"id"`
	Hostname *string `json:"hostname"`
	ServerId *uint64 `json:"server_id"`
	Port     *int    `json:"port"`
}

type DeleteDomainPayload struct {
	Id *int `json:"id"`
}

type Domain struct {
	Id       *uint64       `json:"id"`
	Hostname *string       `json:"hostname"`
	DNSType  *string       `json:"dnstype"`
	Target   *string       `json:"target"`
	Server   *PublicServer `json:"server"`
	Port     *int          `json:"port"`
	Service  *string       `json:"service"`
}
