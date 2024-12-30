package serverEndpoint

import (
	"sandbox-skeleton/common/config"

	incus "github.com/lxc/incus/client"
	"gorm.io/gorm"
)

type Handler struct {
	config   *config.Config
	database *gorm.DB
	incus    incus.InstanceServer
}

func Handle(config *config.Config, database *gorm.DB, incus incus.InstanceServer) *Handler {
	return &Handler{
		config:   config,
		database: database,
		incus:    incus,
	}
}

