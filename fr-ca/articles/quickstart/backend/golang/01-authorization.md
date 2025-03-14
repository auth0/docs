---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Go API.
topics:
    - quickstart
    - backend
    - golang
github:
  path: 01-Authorization-RS256
contentType: tutorial
useCase: quickstart
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Download dependencies

Add a `go.mod` file to list all the dependencies to be used.

```text
// go.mod

module 01-Authorization-RS256

go 1.21

require (
	github.com/auth0/go-jwt-middleware/v2 v2.2.0
	github.com/joho/godotenv v1.5.1
)
```

Download dependencies by running the following shell command:

```shell
go mod download
```

### Configure your application

Create a `.env` file within the root of your project directory to store the app configuration, and fill in the
environment variables:

```sh
# The URL of our Auth0 Tenant Domain.
# If you're using a Custom Domain, be sure to set this to that value instead.
AUTH0_DOMAIN='${account.namespace}'

# Our Auth0 API's Identifier.
AUTH0_AUDIENCE='YOUR_API_IDENTIFIER'
```

### Create a middleware to validate Access Tokens

Access Token validation will be done in the `EnsureValidToken` middleware function which can be applied to any 
endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released,
otherwise a `401 Authorization` error will be returned.

Setup **go-jwt-middleware** middleware to verify Access Tokens from incoming requests.

```go
// middleware/jwt.go

package middleware

import (
	"context"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	jwtmiddleware "github.com/auth0/go-jwt-middleware/v2"
	"github.com/auth0/go-jwt-middleware/v2/jwks"
	"github.com/auth0/go-jwt-middleware/v2/validator"
)

// CustomClaims contains custom data we want from the token.
type CustomClaims struct {
	Scope string `json:"scope"`
}

// Validate does nothing for this example, but we need
// it to satisfy validator.CustomClaims interface.
func (c CustomClaims) Validate(ctx context.Context) error {
	return nil
}

// EnsureValidToken is a middleware that will check the validity of our JWT.
func EnsureValidToken() func(next http.Handler) http.Handler {
	issuerURL, err := url.Parse("https://" + os.Getenv("AUTH0_DOMAIN") + "/")
	if err != nil {
		log.Fatalf("Failed to parse the issuer url: %v", err)
	}

	provider := jwks.NewCachingProvider(issuerURL, 5*time.Minute)

	jwtValidator, err := validator.New(
		provider.KeyFunc,
		validator.RS256,
		issuerURL.String(),
		[]string{os.Getenv("AUTH0_AUDIENCE")},
		validator.WithCustomClaims(
			func() validator.CustomClaims {
				return &CustomClaims{}
			},
		),
		validator.WithAllowedClockSkew(time.Minute),
	)
	if err != nil {
		log.Fatalf("Failed to set up the jwt validator")
	}

	errorHandler := func(w http.ResponseWriter, r *http.Request, err error) {
		log.Printf("Encountered error while validating JWT: %v", err)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"message":"Failed to validate JWT."}`))
	}

	middleware := jwtmiddleware.New(
		jwtValidator.ValidateToken,
		jwtmiddleware.WithErrorHandler(errorHandler),
	)

	return func(next http.Handler) http.Handler {
		return middleware.CheckJWT(next)
	}
}
```

<%= include('../_includes/_api_jwks_description') %>


## Protect API Endpoints

To protect individual routes, pass `middleware` (defined above) to the http route.

```go
// main.go

package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"

	"01-Authorization-RS256/middleware"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading the .env file: %v", err)
	}

	router := http.NewServeMux()

	// This route is always accessible.
	router.Handle("/api/public", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message":"Hello from a public endpoint! You don't need to be authenticated to see this."}`))
	}))

	// This route is only accessible if the user has a valid access_token.
	router.Handle("/api/private", middleware.EnsureValidToken()(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// CORS Headers.
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Headers", "Authorization")

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`{"message":"Hello from a private endpoint! You need to be authenticated to see this."}`))
		}),
	))

	log.Print("Server listening on http://localhost:3010")
	if err := http.ListenAndServe("0.0.0.0:3010", router); err != nil {
		log.Fatalf("There was an error with the http server: %v", err)
	}
}
```

### Validate scopes

The `middleware` above verifies that the Access Token included in the request is valid; however, it doesn't yet include
any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Create a function to check and ensure the Access Token has the correct scope before returning a successful response.

```go
// 👆 We're continuing from the steps above. Append this to your middleware/jwt.go file.

// HasScope checks whether our claims have a specific scope.
func (c CustomClaims) HasScope(expectedScope string) bool {
    result := strings.Split(c.Scope, " ")
    for i := range result {
        if result[i] == expectedScope {
            return true
        }
    }

    return false
}
```

Use this function in the endpoint that requires the scope `read:messages`.

```go
// 👆 We're continuing from the steps above. Append this to your main.go file.

func main() {
    // ...
    
    // This route is only accessible if the user has a
    // valid access_token with the read:messages scope.
	router.Handle("/api/private-scoped", middleware.EnsureValidToken()(
		http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			// CORS Headers.
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Headers", "Authorization")

			w.Header().Set("Content-Type", "application/json")

			token := r.Context().Value(jwtmiddleware.ContextKey{}).(*validator.ValidatedClaims)

			claims := token.CustomClaims.(*middleware.CustomClaims)
			if !claims.HasScope("read:messages") {
				w.WriteHeader(http.StatusForbidden)
				w.Write([]byte(`{"message":"Insufficient scope."}`))
				return
			}

			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`{"message":"Hello from a private endpoint! You need to be authenticated to see this."}`))
		}),
	))
    
    // ...
}
```

In this example, only the `read:messages` scope is checked. You may want to extend the `HasScope` function or make it
a standalone middleware that accepts multiple scopes to fit your use case.
