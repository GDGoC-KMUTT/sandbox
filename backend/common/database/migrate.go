package database

import (
	"github.com/bsthun/gut"
	"gorm.io/gorm"
	"sandbox-skeleton/type/table"
)

func migrate(db *gorm.DB) {
	// * Migrate database
	err := db.AutoMigrate(
		new(table.User),
		new(table.Server),
		new(table.Project),
		new(table.Domain),
		new(table.UserProject),
	)
	if err != nil {
		gut.Fatal("unable to migrate database", err)
	}
}
