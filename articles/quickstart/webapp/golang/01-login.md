---
title: Login
description: This tutorial demonstrates how to add user login to a Go web application using Auth0.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - golang
contentType: tutorial
useCase: quickstart
github:
  path: 01-Login
---
<%= include('../_includes/_getting_started', { library: 'Go', callback: 'http://localhost:3000/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Configure Go to Use Auth0

### Download dependencies

Start by adding a `go.mod` file to list all the dependencies to be used.

```text
// go.mod

module 01-Login

go 1.21

require (
	github.com/coreos/go-oidc/v3 v3.8.0
	github.com/gin-contrib/sessions v0.0.5
	github.com/gin-gonic/gin v1.9.1
	github.com/joho/godotenv v1.5.1
	golang.org/x/oauth2 v0.15.0
)
```

We can now make the dependencies available for us by running the following shell command:

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

# Our Auth0 application's Client ID.
AUTH0_CLIENT_ID='${account.clientId}'

# Our Auth0 application's Client Secret.
AUTH0_CLIENT_SECRET='${account.clientSecret}'

# The Callback URL of our application.
AUTH0_CALLBACK_URL='http://localhost:3000/callback'
```

### Configure OAuth2 and OpenID Connect packages

Create a file called `auth.go` in the `platform/authenticator` folder. In this package you'll create a method to 
configure and return [OAuth2](https://godoc.org/golang.org/x/oauth2) and 
[oidc](https://godoc.org/github.com/coreos/go-oidc) clients, and another one to verify an ID Token.

```go
// platform/authenticator/auth.go

package authenticator

import (
	"context"
	"errors"
	"os"

	"github.com/coreos/go-oidc/v3/oidc"
	"golang.org/x/oauth2"
)

// Authenticator is used to authenticate our users.
type Authenticator struct {
	*oidc.Provider
	oauth2.Config
}

// New instantiates the *Authenticator.
func New() (*Authenticator, error) {
	provider, err := oidc.NewProvider(
		context.Background(),
		"https://"+os.Getenv("AUTH0_DOMAIN")+"/",
	)
	if err != nil {
		return nil, err
	}

	conf := oauth2.Config{
		ClientID:     os.Getenv("AUTH0_CLIENT_ID"),
		ClientSecret: os.Getenv("AUTH0_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("AUTH0_CALLBACK_URL"),
		Endpoint:     provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "profile"},
	}

	return &Authenticator{
		Provider: provider,
		Config:   conf,
	}, nil
}

// VerifyIDToken verifies that an *oauth2.Token is a valid *oidc.IDToken.
func (a *Authenticator) VerifyIDToken(ctx context.Context, token *oauth2.Token) (*oidc.IDToken, error) {
	rawIDToken, ok := token.Extra("id_token").(string)
	if !ok {
		return nil, errors.New("no id_token field in oauth2 token")
	}

	oidcConfig := &oidc.Config{
		ClientID: a.ClientID,
	}

	return a.Verifier(oidcConfig).Verify(ctx, rawIDToken)
}
```

### Setting up your application routes

Create a file called `router.go` in the `platform/router` folder. In this package you'll create a method to configure
and return our routes using [github.com/gin-gonic/gin](https://github.com/gin-gonic/gin). You will be passing an
instance of `Authenticator` to the method, so it can be used within the `login` and `callback` handlers.

```go
// platform/router/router.go

package router

import (
	"encoding/gob"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"

	"01-Login/platform/authenticator"
	"01-Login/platform/middleware"
	"01-Login/web/app/callback"
	"01-Login/web/app/login"
	"01-Login/web/app/logout"
	"01-Login/web/app/user"
)

// New registers the routes and returns the router.
func New(auth *authenticator.Authenticator) *gin.Engine {
	router := gin.Default()

	// To store custom types in our cookies,
	// we must first register them using gob.Register
	gob.Register(map[string]interface{}{})

	store := cookie.NewStore([]byte("secret"))
	router.Use(sessions.Sessions("auth-session", store))

	router.Static("/public", "web/static")
	router.LoadHTMLGlob("web/template/*")

	router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "home.html", nil)
	})
	router.GET("/login", login.Handler(auth))
	router.GET("/callback", callback.Handler(auth))
	router.GET("/user", user.Handler)
	router.GET("/logout", logout.Handler)

	return router
}
```

::: note
The router uses the [github.com/gin-contrib/sessions](https://github.com/gin-contrib/sessions) middleware to manage 
our cookie based sessions.
:::

### Serving your application

Next, let's create our application's entry point `main.go` and wire everything up together:

```go
// main.go

package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"

	"01-Login/platform/authenticator"
	"01-Login/platform/router"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Failed to load the env vars: %v", err)
	}

	auth, err := authenticator.New()
	if err != nil {
		log.Fatalf("Failed to initialize the authenticator: %v", err)
	}

	rtr := router.New(auth)

	log.Print("Server listening on http://localhost:3000/")
	if err := http.ListenAndServe("0.0.0.0:3000", rtr); err != nil {
		log.Fatalf("There was an error with the http server: %v", err)
	}
}
```

## Logging In

Create a file called `login.go` in the `web/app/login` folder, and add a `Handler` function to handle the `/login`
route.

```go
// web/app/login/login.go

package login

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"01-Login/platform/authenticator"
)

// Handler for our login.
func Handler(auth *authenticator.Authenticator) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		state, err := generateRandomState()
		if err != nil {
			ctx.String(http.StatusInternalServerError, err.Error())
			return
		}

		// Save the state inside the session.
		session := sessions.Default(ctx)
		session.Set("state", state)
		if err := session.Save(); err != nil {
			ctx.String(http.StatusInternalServerError, err.Error())
			return
		}

		ctx.Redirect(http.StatusTemporaryRedirect, auth.AuthCodeURL(state))
	}
}

func generateRandomState() (string, error) {
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		return "", err
	}

	state := base64.StdEncoding.EncodeToString(b)

	return state, nil
}
```

Add a link to `/login` route in the `home.html` template.

```html
<!-- web/template/home.html -->

<div>
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a href="/login">SignIn</a>
</div>
```

## Handling Authentication Callback

Once users have authenticated using Auth0's Universal Login Page, they'll return to the app at the `/callback`
route that will be handled in the following `Handler` function:

```go
// web/app/callback/callback.go

package callback

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"

	"01-Login/platform/authenticator"
)

// Handler for our callback.
func Handler(auth *authenticator.Authenticator) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		session := sessions.Default(ctx)
		if ctx.Query("state") != session.Get("state") {
			ctx.String(http.StatusBadRequest, "Invalid state parameter.")
			return
		}

		// Exchange an authorization code for a token.
		token, err := auth.Exchange(ctx.Request.Context(), ctx.Query("code"))
		if err != nil {
			ctx.String(http.StatusUnauthorized, "Failed to exchange an authorization code for a token.")
			return
		}

		idToken, err := auth.VerifyIDToken(ctx.Request.Context(), token)
		if err != nil {
			ctx.String(http.StatusInternalServerError, "Failed to verify ID Token.")
			return
		}

		var profile map[string]interface{}
		if err := idToken.Claims(&profile); err != nil {
			ctx.String(http.StatusInternalServerError, err.Error())
			return
		}

		session.Set("access_token", token.AccessToken)
		session.Set("profile", profile)
		if err := session.Save(); err != nil {
			ctx.String(http.StatusInternalServerError, err.Error())
			return
		}

		// Redirect to logged in page.
		ctx.Redirect(http.StatusTemporaryRedirect, "/user")
	}
}
```

## Displaying User Information

You can access the user information via the `profile` you stored in the session previously.

```go
// web/app/user/user.go

package user

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// Handler for our logged-in user page.
func Handler(ctx *gin.Context) {
	session := sessions.Default(ctx)
	profile := session.Get("profile")

	ctx.HTML(http.StatusOK, "user.html", profile)
}
```

```html
<!-- web/template/user.html -->

<div>
    <img class="avatar" src="{{ .picture }}"/>
    <h2>Welcome {{.nickname}}</h2>
</div>
```

For information about the userinfo hash, see [User Profile](/users/concepts/overview-user-profile).

## Logging Out

To log the user out, clear the data from the session and redirect the user to the Auth0 logout endpoint. You can find
more information about this in the [logout documentation](/logout).

Create a file called `logout.go` in the folder `web/app/logout/logout.go`, and add the function `Handler` to redirect
the user to Auth0's logout endpoint.

```go
// web/app/logout/logout.go

package logout

import (
	"net/http"
	"net/url"
	"os"

	"github.com/gin-gonic/gin"
)

// Handler for our logout.
func Handler(ctx *gin.Context) {
	logoutUrl, err := url.Parse("https://" + os.Getenv("AUTH0_DOMAIN") + "/v2/logout")
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	scheme := "http"
	if ctx.Request.TLS != nil {
		scheme = "https"
	}

	returnTo, err := url.Parse(scheme + "://" + ctx.Request.Host)
	if err != nil {
		ctx.String(http.StatusInternalServerError, err.Error())
		return
	}

	parameters := url.Values{}
	parameters.Add("returnTo", returnTo.String())
	parameters.Add("client_id", os.Getenv("AUTH0_CLIENT_ID"))
	logoutUrl.RawQuery = parameters.Encode()

	ctx.Redirect(http.StatusTemporaryRedirect, logoutUrl.String())
}
```

::: note
The redirect URL needs to be in the list of Allowed Logout URLs in the settings section of the application, For more information, see [Redirect Users After Logout](/logout/guides/redirect-users-after-logout).
:::

Create a file called `user.js` in the folder `web/static/js`, and add the code to remove the cookie from a logged-in
user.

```js
$(document).ready(function () {
    $('.btn-logout').click(function (e) {
        Cookies.remove('auth-session');
    });
});
```

::: note
This sample is using [js.cookie](https://github.com/js-cookie/js-cookie/tree/latest#readme) for cookie handling. 
You need to add the `js.cookie.js` file to the `web/static/js` folder to use it.
:::

## Optional Steps

### Checking if the user is authenticated

Create a middleware that will check if the user is authenticated or not based on the `profile` session key:

```go
// platform/middleware/isAuthenticated.go

package middleware

import (
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

// IsAuthenticated is a middleware that checks if
// the user has already been authenticated previously.
func IsAuthenticated(ctx *gin.Context) {
	if sessions.Default(ctx).Get("profile") == nil {
		ctx.Redirect(http.StatusSeeOther, "/")
	} else {
		ctx.Next()
	}
}
```

Finally, set up this middleware for any route that needs authentication by adding it to the router.

```go
// platform/router/router.go

router.GET("/user", middleware.IsAuthenticated, user.Handler)
```
