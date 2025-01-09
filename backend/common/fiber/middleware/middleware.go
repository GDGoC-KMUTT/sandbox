package middleware

import (
	incus "github.com/lxc/incus/client"
	"gorm.io/gorm"
	"sandbox-skeleton/common/config"
)

type Middleware struct {
	config *config.Config
	db     *gorm.DB
	incus  incus.InstanceServer
}

func Init(config *config.Config, db *gorm.DB, incus incus.InstanceServer) *Middleware {
	return &Middleware{
		config: config,
		db:     db,
		incus:  incus,
	}
}
