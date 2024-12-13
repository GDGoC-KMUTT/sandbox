package database

import (
	"github.com/bsthun/gut"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
	"os"
	"sandbox-skeleton/common/config"
	"time"
)

func Init(config *config.Config) *gorm.DB {
	// * construct gorm logger
	lg := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             100 * time.Millisecond,
			LogLevel:                  logger.Info,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	// * construct gorm dialector
	dialector := postgres.New(
		postgres.Config{
			DSN: *config.PostgresDsn,
		},
	)

	// * open database connection
	db, err := gorm.Open(dialector, &gorm.Config{
		Logger: lg,
	})
	if err != nil {
		gut.Fatal("unable to open database connection", err)
	}

	// * migrate database
	migrate(db)

	return db
}
