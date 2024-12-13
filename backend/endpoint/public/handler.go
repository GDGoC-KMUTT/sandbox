package publicEndpoint

import (
	"context"
	"github.com/bsthun/gut"
	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
	"gorm.io/gorm"
	"net/url"
	"sandbox-skeleton/common/config"
)

type Handler struct {
	config       *config.Config
	database     *gorm.DB
	OidcProvider *oidc.Provider
	OidcVerifier *oidc.IDTokenVerifier
	Oauth2Config *oauth2.Config
}

func Handle(config *config.Config, database *gorm.DB) *Handler {
	handler := &Handler{
		config:   config,
		database: database,
	}

	redirectUrl, err := url.JoinPath(*config.FrontendUrl, "/callback")
	if err != nil {
		gut.Fatal("unable to join url path", err)
	}

	handler.OidcProvider, err = oidc.NewProvider(context.Background(), *config.OauthEndpoint)
	if err != nil {
		gut.Fatal("unable to create oidc provider", err)
	}

	handler.Oauth2Config = &oauth2.Config{
		ClientID:     *config.OauthClientId,
		ClientSecret: *config.OauthClientSecret,
		RedirectURL:  redirectUrl,
		Endpoint:     handler.OidcProvider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "profile", "email"},
	}

	return handler
}
