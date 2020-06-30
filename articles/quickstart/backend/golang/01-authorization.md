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

### Install dependencies

The [**dgrijalva/jwt-go**](https://github.com/dgrijalva/jwt-go) package can be used to verify incoming JWTs. The [**auth0/go-jwt-middleware**](https://github.com/auth0/go-jwt-middleware) library can be used alongside it to fetch your Auth0 public key and complete the verification process. Finally, we'll use the [**gorilla/mux**](https://github.com/gorilla/mux) package to handle our routes and [**codegangsta/negroni**](https://github.com/urfave/negroni) for HTTP middleware.

```bash
go get -d github.com/auth0/go-jwt-middleware
go get -d github.com/dgrijalva/jwt-go
go get -d github.com/codegangsta/negroni
go get -d github.com/gorilla/mux
```

### Create a middleware to validate Access Tokens

The Access Token validation will be done in the  `checkJwt` middleware function which can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

Setup **go-jwt-middleware** middleware to verify Access Token from incoming requests.

```go
// main.go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"errors"
	"log"
	"os"

	"github.com/codegangsta/negroni"
	"github.com/auth0/go-jwt-middleware"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
)

type Response struct {
	Message string `json:"message"`
}

type Jwks struct {
	Keys []JSONWebKeys `json:"keys"`
}

type JSONWebKeys struct {
	Kty string `json:"kty"`
	Kid string `json:"kid"`
	Use string `json:"use"`
	N string `json:"n"`
	E string `json:"e"`
	X5c []string `json:"x5c"`
}

func main() {
	jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options {
        ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
            // Verify 'aud' claim
            aud := "${apiIdentifier}"
            checkAud := token.Claims.(jwt.MapClaims).VerifyAudience(aud, false)
            if !checkAud {
                return token, errors.New("Invalid audience.")
            }
            // Verify 'iss' claim
            iss := "https://${account.namespace}/"
            checkIss := token.Claims.(jwt.MapClaims).VerifyIssuer(iss, false)
            if !checkIss {
                return token, errors.New("Invalid issuer.")
            }

            cert, err := getPemCert(token)
            if err != nil {
                panic(err.Error())
            }

            result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
            return result, nil
        },
        SigningMethod: jwt.SigningMethodRS256,
    })
}
```

<%= include('../_includes/_api_jwks_description') %>

Create the function to get the remote JWKS for your Auth0 account and return the certificate with the public key in PEM format.

```go
// main.go

func getPemCert(token *jwt.Token) (string, error) {
	cert := ""
	resp, err := http.Get("https://${account.namespace}/.well-known/jwks.json")

	if err != nil {
		return cert, err
	}
	defer resp.Body.Close()

	var jwks = Jwks{}
	err = json.NewDecoder(resp.Body).Decode(&jwks)

	if err != nil {
		return cert, err
	}

	for k, _ := range jwks.Keys {
		if token.Header["kid"] == jwks.Keys[k].Kid {
			cert = "-----BEGIN CERTIFICATE-----\n" + jwks.Keys[k].X5c[0] + "\n-----END CERTIFICATE-----"
		}
	}

	if cert == "" {
		err := errors.New("Unable to find appropriate key.")
		return cert, err
	}

	return cert, nil
}
```

## Protect API Endpoints

To protect individual routes pass the instance of `go-jwt-middleware` defined above to the `negroni` handler.

```go
// main.go

func main() {
    // ...

    r := mux.NewRouter()

    // This route is always accessible
    r.Handle("/api/public", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        message := "Hello from a public endpoint! You don't need to be authenticated to see this."
        responseJSON(message, w, http.StatusOK)
    }))

    // This route is only accessible if the user has a valid Access Token
    // We are chaining the jwtmiddleware middleware into the negroni handler function which will check
    // for a valid token.
    r.Handle("/api/private", negroni.New(
        negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
        negroni.Wrap(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            message := "Hello from a private endpoint! You need to be authenticated to see this."
            responseJSON(message, w, http.StatusOK)
    }))))
}

func responseJSON(message string, w http.ResponseWriter, statusCode int) {
	response := Response{message}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	w.Write(jsonResponse)
}
```

### Validate scopes

The `go-jwt-middleware` middleware above verifies that the Access Token included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Let's create a function to check and ensure the Access Token has the correct scope before returning a successful response.

```go
// main.go

type CustomClaims struct {
	Scope string `json:"scope"`
	jwt.StandardClaims
}

func checkScope(scope string, tokenString string) bool {
	token, _ := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func (token *jwt.Token) (interface{}, error) {
		cert, err := getPemCert(token)
		if err != nil {
			return nil, err
		}
		result, _ := jwt.ParseRSAPublicKeyFromPEM([]byte(cert))
		return result, nil
	})

	claims, ok := token.Claims.(*CustomClaims)

	hasScope := false
	if ok && token.Valid {
		result := strings.Split(claims.Scope, " ")
		for i := range result {
			if result[i] == scope {
				hasScope = true
			}
		}
	}

	return hasScope
}
```

We will use this function in the endpoint that requires the scope `read:messages`.

```go
// main.go

func main() {

    // ...

    // This route is only accessible if the user has a valid Access Token with the read:messages scope
    // We are chaining the jwtmiddleware middleware into the negroni handler function which will check
    // for a valid token and scope.
    r.Handle("/api/private-scoped", negroni.New(
        negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
        negroni.Wrap(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            authHeaderParts := strings.Split(r.Header.Get("Authorization"), " ")
            token := authHeaderParts[1]

            hasScope := checkScope("read:messages", token)

            if !hasScope {
                message := "Insufficient scope."
                responseJSON(message, w, http.StatusForbidden)
                return
            }
            message := "Hello from a private endpoint! You need to be authenticated to see this."
            responseJSON(message, w, http.StatusOK)
    }))))
}
```

In our example, we only checked for the `read:messages` scope. You may want to extend the `checkScope` function or make it a standalone middleware that accepts multiple roles to fit your use case.
