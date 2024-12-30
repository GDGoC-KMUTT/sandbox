package serverEndpoint

import "fmt"

func (r *Handler) HandleGetIp(hostname string) (string, error) {
	// Get Ip address
	instanceState, _, err := r.incus.GetInstanceState(hostname)
	if err != nil {
		return "", fmt.Errorf("failed to get ip address: %w", err)
	}
	var ipAddress string
	for _, addresses := range instanceState.Network {
		for _, addr := range addresses.Addresses {
			if addr.Family == "inet" && addr.Address != "127.0.0.1" {
				ipAddress = addr.Address
				break
			}
		}
		if ipAddress != "" {
			break
		}
	}
	return ipAddress, nil
}
