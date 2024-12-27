package serverEndpoint

import (
	// "fmt"
	//	"log"

	"github.com/bsthun/gut"
	"github.com/davecgh/go-spew/spew"
	"github.com/gofiber/fiber/v2"
	"github.com/lxc/incus/shared/api"
)

func (r *Handler) HandleGetInstances(c *fiber.Ctx) error {

	// Fetch a list of instances
	instances, err := r.incus.GetInstances(api.InstanceTypeAny)
	if err != nil {
		// log.Fatalf("Failed to fetch instances: %v", err)
		return gut.Err(false, "Server not found", err)
	}

	// Print instance details
	for _, instance := range instances {
		// spew.Dump(instance)
		instanceDetails, _, err := r.incus.GetInstance(instance.Name)
		if err != nil {
			// log.Fatalf("Failed to fetch instances: %v", err)
			return gut.Err(false, "Server not found", err)
		}
		spew.Dump(instanceDetails)
		// containerState, _, err := r.incus.GetInstanceState(instance.Name)
		// if err != nil {
		// 	fmt.Printf("Failed to get container state: %v\n", err)
		// 	return err
		// }
		// fmt.Printf("IP addresses for container '%s':\n", instance.Name)
		// for device, addresses := range containerState.Network {
		// 	for _, addr := range addresses.Addresses {
		// 		if addr.Family == "inet" || addr.Family == "inet6" { // IPv4 and IPv6
		// 			fmt.Printf("  %s: %s (%s)\n", device, addr.Address, addr.Family)
		// 		}
		// 	}
		// }

		// fmt.Printf("Instance Name: %s, Status: %s\n", instance.Name, instance.Status)
	}
	return nil
}
