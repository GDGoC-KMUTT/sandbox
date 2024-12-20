package domainEndpoint

import (
	"sandbox-skeleton/common/config"

	"gorm.io/gorm"
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
