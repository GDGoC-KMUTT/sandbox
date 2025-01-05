package serverEndpoint

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/lxc/incus/client"
	"github.com/lxc/incus/shared/api"
	"io"
	"sandbox-skeleton/type/payload"
	"strconv"
	"strings"
	"time"
)

func (r *Handler) HandleCreateInstance(c *fiber.Ctx, config *payload.CreateIncusInstancePayload) (*payload.CreateInstanceResponse, error) {
	instanceConfig := api.InstancesPost{
		Name: *config.Hostname,
		Source: api.InstanceSource{
			Type:        "image",
			Fingerprint: *r.config.ImageFingerPrint,
		},
		Type:  "container",
		Start: true,

		InstancePut: api.InstancePut{
			Architecture: "x86_64",
			Profiles:     []string{"default"},
			Config: map[string]string{
				"limits.cpu":    strconv.Itoa(2),
				"limits.memory": "2048MB",
			},
			Devices: map[string]map[string]string{
				"root": {
					"path": "/",
					"pool": "pool1",
					"size": "10GB",
					"type": "disk",
				},
			},
		},
	}

	op, err := r.incus.CreateInstance(instanceConfig)
	if err != nil {
		return nil, fmt.Errorf("failed to create instance: %w", err)
	}

	if err := op.Wait(); err != nil {
		return nil, fmt.Errorf("instance creation operation failed: %w", err)
	}
	time.Sleep(1 * time.Second)

	// commands to set username and password by exec into instance
	commands := []string{
		"apt update && apt install -y openssh-server",
		"sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config",
		fmt.Sprintf("echo 'root:%s' | chpasswd", *config.Password),
		"reboot",
	}

	for _, cmd := range commands {
		exec := api.InstanceExecPost{
			Command:     []string{"bash", "-c", cmd},
			WaitForWS:   true,
			Interactive: false,
		}

		args := &incus.InstanceExecArgs{
			Stdin:    nil,             // No input to provide
			Stdout:   io.Discard,      // Discard output
			Stderr:   io.Discard,      // Discard errors
			Control:  nil,             // No control handler
			DataDone: make(chan bool), // Channel to signal when done
		}

		op, err := r.incus.ExecInstance(*config.Hostname, exec, args)
		if err != nil {
			return nil, fmt.Errorf("failed to execute command in instance: %v", err)
		}

		err = op.Wait()
		if err != nil {
			return nil, fmt.Errorf("failed to wait for command execution: %v", err)
		}
	}
	time.Sleep(1 * time.Second)

	// Get Ip address
	instanceState, _, err := r.incus.GetInstanceState(*config.Hostname)
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

	// Get instanceDetails
	instanceDetails, _, err := r.incus.GetInstance(*config.Hostname)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch instance details: %w", err)
	}
	hostname := instanceDetails.Name
	os := instanceDetails.InstancePut.Config["image.os"]
	vcpu, _ := strconv.Atoi(instanceDetails.InstancePut.Config["limits.cpu"])
	memory := instanceDetails.InstancePut.Config["limits.memory"]
	storage := instanceConfig.InstancePut.Devices["root"]["size"]

	// Create the response struct
	response := &payload.CreateInstanceResponse{
		Hostname: hostname,
		Os:       os,
		Memory:   memory,
		Storage:  storage,
		Vcpu:     vcpu,
		Username: "root",
		Password: *config.Password,
	}

	return response, nil

}
