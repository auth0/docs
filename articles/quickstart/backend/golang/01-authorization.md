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

::: panel New Beta Release Available!
<span class="badge badge-warning">Beta</span> &nbsp; **[Our next-generation Auth0-Go-JWT-Middleware SDK is now available in beta.](https://github.com/auth0/go-jwt-middleware)** 
Updated to offer an exciting new API — we think the new SDK elevates the developer experience. We'd love for you to [give the new beta release a try](https://github.com/auth0/go-jwt-middleware).
Be sure to visit our [new backend api quickstart](/quickstart/backend/golang-beta), and drop by the [the Auth0 Community](https://community.auth0.com/) to let us know your thoughts!
:::

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Validate Access Tokens

### Download dependencies

Add a `go.mod` file to list all the dependencies to be used.

```text
// go.mod

module 01-Authorization-RS256

go 1.16

require (
	github.com/auth0/go-jwt-middleware v1.0.1-0.20210719135851-6401fcf7191b
	github.com/gin-contrib/cors v1.3.1
	github.com/gin-gonic/gin v1.7.4
	github.com/golang-jwt/jwt v3.2.1+incompatible
	github.com/joho/godotenv v1.4.0
)
```

Download dependencies by running the following shell command:

```shell
go mod download
```

::: note
This example uses `gin` for routing, but you can use whichever router you want.
:::

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
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/auth0/go-jwt-middleware"
	"github.com/auth0/go-jwt-middleware/validate/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

const signatureAlgorithm = "RS256"

// Ensure our CustomClaims implement the jwtgo.CustomClaims interface.
var _ jwtgo.CustomClaims = &CustomClaims{}

// CustomClaims holds our custom claims for the *jwt.Token.
type CustomClaims struct {
	Scope string `json:"scope"`
	jwt.StandardClaims
}

// Validate our *CustomClaims.
func (c CustomClaims) Validate(_ context.Context) error {
	expectedAudience := os.Getenv("AUTH0_AUDIENCE")
	if c.Audience != expectedAudience {
		return fmt.Errorf("token claims validation failed: unexpected audience %q", c.Audience)
	}

	expectedIssuer := "https://" + os.Getenv("AUTH0_DOMAIN") + "/"
	if c.Issuer != expectedIssuer {
		return fmt.Errorf("token claims validation failed: unexpected issuer %q", c.Issuer)
	}

	return nil
}

// EnsureValidToken is a gin.HandlerFunc middleware that will check the validity of our JWT.
func EnsureValidToken() gin.HandlerFunc {
	keyFunc := func(token *jwt.Token) (interface{}, error) {
		certificate, err := getPEMCertificate(token)
		if err != nil {
			return token, err
		}

		return jwt.ParseRSAPublicKeyFromPEM([]byte(certificate))
	}

	customClaims := func() jwtgo.CustomClaims {
		return &CustomClaims{}
	}

	validator, err := jwtgo.New(
		keyFunc,
		signatureAlgorithm,
		jwtgo.WithCustomClaims(customClaims),
	)
	if err != nil {
		log.Fatalf("Failed to set up the jwt validator")
	}

	m := jwtmiddleware.New(validator.ValidateToken)

	return func(ctx *gin.Context) {
		var encounteredError = true
		var handler http.HandlerFunc = func(w http.ResponseWriter, r *http.Request) {
			encounteredError = false
			ctx.Request = r
			ctx.Next()
		}

		m.CheckJWT(handler).ServeHTTP(ctx.Writer, ctx.Request)

		if encounteredError {
			ctx.AbortWithStatusJSON(
				http.StatusUnauthorized,
				map[string]string{"message": "Failed to validate JWT."},
			)
		}
	}
}
```

<%= include('../_includes/_api_jwks_description') %>

Create the function to get the remote JWKS for your Auth0 account and return the certificate with the public key in PEM
format.

```go
// 👆 We're continuing from the steps above. Append this to your middleware/jwt.go file.

type (
	jwks struct {
		Keys []jsonWebKeys `json:"keys"`
	}

	jsonWebKeys struct {
		Kty string   `json:"kty"`
		Kid string   `json:"kid"`
		Use string   `json:"use"`
		N   string   `json:"n"`
		E   string   `json:"e"`
		X5c []string `json:"x5c"`
	}
)

func getPEMCertificate(token *jwt.Token) (string, error) {
	response, err := http.Get("https://" + os.Getenv("AUTH0_DOMAIN") + "/.well-known/jwks.json")
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	var jwks jwks
	if err = json.NewDecoder(response.Body).Decode(&jwks); err != nil {
		return "", err
	}

	var cert string
	for _, key := range jwks.Keys {
		if token.Header["kid"] == key.Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + key.X5c[0] + "\n-----END CERTIFICATE-----"
			break
		}
	}

	if cert == "" {
		return cert, errors.New("unable to find appropriate key")
	}

	return cert, nil
}
```

## Protect API Endpoints

To protect individual routes, pass `middleware` (defined above) to the `gin` route.

```go
// main.go

package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"01-Authorization-RS256/middleware"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading the .env file: %v", err)
	}

	router := gin.Default()

	router.Use(cors.New(
		cors.Config{
			AllowOrigins:     []string{"http://localhost:3000"},
			AllowCredentials: true,
			AllowHeaders:     []string{"Authorization"},
		},
	))

	// This route is always accessible.
	router.Any("/api/public", func(ctx *gin.Context) {
		response := map[string]string{
			"message": "Hello from a public endpoint! You don't need to be authenticated to see this.",
		}
		ctx.JSON(http.StatusOK, response)
	})

	// This route is only accessible if the user has a valid access_token.
	router.GET(
		"/api/private",
		middleware.EnsureValidToken(),
		func(ctx *gin.Context) {
			response := map[string]string{
				"message": "Hello from a private endpoint! You need to be authenticated to see this.",
			}
			ctx.JSON(http.StatusOK, response)
		},
	)

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
    router.GET(
        "/api/private-scoped",
        middleware.EnsureValidToken(),
        func(ctx *gin.Context) {
            claims := ctx.Request.Context().Value(jwtmiddleware.ContextKey{}).(*middleware.CustomClaims)
            
            if !claims.HasScope("read:messages") {
                response := map[string]string{"message": "Insufficient scope."}
                ctx.JSON(http.StatusForbidden, response)
                return
            }
            
            response := map[string]string{
                "message": "Hello from a private endpoint! You need to be authenticated to see this.",
            }
            ctx.JSON(http.StatusOK, response)
        },
    )
    
    // ...
}
```

In this example, only the `read:messages` scope is checked. You may want to extend the `HasScope` function or make it
a standalone middleware that accepts multiple scopes to fit your use case.
