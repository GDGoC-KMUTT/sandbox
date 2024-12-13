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
	)
	if err != nil {
		gut.Fatal("unable to migrate database", err)
	}
}
