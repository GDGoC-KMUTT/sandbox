package incus

import (
	"os"
	"sandbox-skeleton/common/config"

	"github.com/bsthun/gut"
	"github.com/lxc/incus/client"
)

func Init(config *config.Config) incus.InstanceServer {
	serverURL := *config.ServerUrl
	clientCert, err := os.ReadFile(*config.ClientCert)
	if err != nil {
		gut.Fatal("Failed to read client certificate", err)
	}
	clientKey, err := os.ReadFile(*config.ClientKey)
	if err != nil {
		gut.Fatal("Failed to read client key", err)
	}

	// Load the client certificate and key
	args := &incus.ConnectionArgs{
		TLSClientCert:      string(clientCert),
		TLSClientKey:       string(clientKey),
		InsecureSkipVerify: true,
	}

	// Connect to the Incus server
	c, err := incus.ConnectIncus(serverURL, args)
	if err != nil {
		gut.Fatal("Failed to connect to Incus server: %v", err)
	}
	return c
}
