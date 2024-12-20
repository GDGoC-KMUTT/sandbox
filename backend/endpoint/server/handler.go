package serverEndpoint

import (
	"gorm.io/gorm"
	"sandbox-skeleton/common/config"
)

type Handler struct {
	config   *config.Config
	database *gorm.DB
}

func Handle(config *config.Config, database *gorm.DB) *Handler {
	return &Handler{
		config:   config,
		database: database,
	}
}