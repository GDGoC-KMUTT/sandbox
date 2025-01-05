package serverEndpoint

import (
	// "fmt"
	//	"log"

	"fmt"
	"sandbox-skeleton/type/payload"
	"strconv"
	"strings"

	"github.com/bsthun/gut"
	"github.com/gofiber/fiber/v2"
)

func (r *Handler) HandleGetInstance(c *fiber.Ctx, hostname string) (*payload.GetInstanceResponse, error) {
	instanceDetails, _, err := r.incus.GetInstance(hostname)
	if err != nil {
		return nil, gut.Err(false, "instance not found", err)
	}
	vcpu, _ := strconv.Atoi(instanceDetails.InstancePut.Config["limits.cpu"])
	memory, _ := strconv.Atoi(instanceDetails.InstancePut.Config["limits.memory"])
	os := instanceDetails.InstancePut.Config["image.os"]
	storage := instanceDetails.InstancePut.Devices["root"]["size"]
	// Get instance states
	instanceState, _, err := r.incus.GetInstanceState(hostname)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch instance state: %w", err)
	}
	var ipAddress string
	for _, addresses := range instanceState.Network {
		for _, addr := range addresses.Addresses {
			if addr.Family == "inet" && addr.Address != "127.0.0.1" && strings.HasPrefix(addr.Address, "172.") {
				ipAddress = addr.Address
				break
			}
		}
		if ipAddress != "" {
			break
		}
	}

	// Create response
	instance := payload.GetInstanceResponse{
		Hostname: instanceDetails.Name,
		Ip:       ipAddress,
		Vcpu:     vcpu,
		Memory:   memory,
		Os:       os,
		Storage:  storage,
		Status:   instanceDetails.Status,
	}

	return &instance, nil
}
