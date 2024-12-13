package config

import (
	"flag"
	"github.com/bsthun/gut"
	"gopkg.in/yaml.v3"
	"os"
)

type Config struct {
	Environment       *uint8    `yaml:"environment" validate:"gte=1,lte=2"`
	Listen            *string   `yaml:"listen" validate:"required"`
	Cors              []*string `yaml:"cors" validate:"required"`
	Secret            *string   `yaml:"secret" validate:"required"`
	PostgresDsn       *string   `yaml:"postgresDsn" validate:"required"`
	OauthClientId     *string   `yaml:"oauthClientId" validate:"required"`
	OauthClientSecret *string   `yaml:"oauthClientSecret" validate:"required"`
	OauthEndpoint     *string   `yaml:"oauthEndpoint" validate:"required"`
	FrontendUrl       *string   `yaml:"frontendUrl" validate:"required"`
}

func Init() *Config {
	// * parse arguments
	path := flag.String("config", ".local/config.yml", "Path to config file")
	flag.Parse()

	// * declare struct
	config := new(Config)

	// * read config
	yml, err := os.ReadFile(*path)
	if err != nil {
		gut.Fatal("unable to read configuration file", err)
	}

	// * parse config
	if err := yaml.Unmarshal(yml, config); err != nil {
		gut.Fatal("unable to parse configuration file", err)
	}

	// * validate config
	if err := gut.Validate(config); err != nil {
		gut.Fatal("invalid configuration", err)
	}

	return config
}
