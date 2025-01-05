package serverEndpoint

import (
	// "fmt"
	//	"log"

	"fmt"

	"github.com/bsthun/gut"
	"github.com/davecgh/go-spew/spew"
	"github.com/gofiber/fiber/v2"
	"github.com/lxc/incus/shared/api"
)

func (r *Handler) HandleGetInstances(c *fiber.Ctx) error {

	instances, err := r.incus.GetInstances(api.InstanceTypeAny)
	// log.Fatalf("Failed to fetch instances: %v", err)
	if err != nil {
		return gut.Err(false, "Server not found", err)
	}

	// vcpu, _ := strconv.Atoi(instanceDetails.InstancePut.Config["limits.cpu"])
	// memory, _ := strconv.Atoi(instanceDetails.InstancePut.Config["limits.memory"])

	// Get instance states

	for _, instance := range instances {
		spew.Dump(instance)
		instanceDetails, _, err := r.incus.GetInstance(instance.Name)
		if err != nil {
			// log.Fatalf("Failed to fetch instances: %v", err)
			return gut.Err(false, "Server not found", err)
		}
		// spew.Dump(instanceDetails)
		containerState, _, err := r.incus.GetInstanceState(instance.Name)
		if err != nil {
			fmt.Printf("Failed to get container state: %v\n", err)
			return gut.Err(false, "Server not found", err)
		}
		fmt.Printf("IP addresses for container '%s':\n", instance.Name)
		for device, addresses := range containerState.Network {
			for _, addr := range addresses.Addresses {
				if addr.Family == "inet" || addr.Family == "inet6" { // IPv4 and IPv6
					fmt.Printf("  %s: %s (%s)\n", device, addr.Address, addr.Family)
				}
			}
		}
		fmt.Println(instanceDetails.InstancePut.Devices["root"]["size"])

		fmt.Println("=================================")
	}
	// instanceState, _, err := r.incus.GetInstanceState(hostname)
	// if err != nil {
	// 	return nil, fmt.Errorf("failed to fetch instance state: %w", err)
	// }
	// var ipAddress string
	// for _, addresses := range instanceState.Network {
	// 	for _, addr := range addresses.Addresses {
	// 		if addr.Family == "inet" && addr.Address != "127.0.0.1" && !strings.HasPrefix(addr.Address, "172.") {
	// 			ipAddress = addr.Address
	// 			break
	// 		}
	// 	}
	// 	if ipAddress != "" {
	// 		break
	// 	}
	// }

	// Create response
	// instance := payload.GetInstanceResponse{
	// 	Hostname: instanceDetails.Name,
	// 	Ip:       ipAddress,
	// 	Vcpu:     vcpu,
	// 	Memory:   memory,
	// 	Status:   instanceDetails.Status,
	// }

	return nil
}
