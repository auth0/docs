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

### Add Dependencies

This example uses Go Modules and will download automatically all the needed dependencies during the build process.

::: note
This example uses `mux` for routing but you can use whichever router you want.
:::

### Configure Session Storage

Configure session storage to use FilesystemStore.

```go
// app/app.go

package app

import (
	"encoding/gob"

	"github.com/gorilla/sessions"
)

var (
	Store *sessions.FilesystemStore
)

func Init() error {
	Store = sessions.NewFilesystemStore("", []byte("something-very-secret"))
	gob.Register(map[string]interface{}{})
	return nil
}
```

### Configure OAuth2 and OpenID connect packages

Create a file called `auth.go` in the `auth` folder. In this package you'll create a method to configure and return [OAuth2](https://godoc.org/golang.org/x/oauth2) and [oidc](https://godoc.org/github.com/coreos/go-oidc) clients.

```go
// auth/auth.go

package auth

import (
	"context"
	"log"

	"golang.org/x/oauth2"

	oidc "github.com/coreos/go-oidc"
)

type Authenticator struct {
	Provider *oidc.Provider
	Config   oauth2.Config
	Ctx      context.Context
}

func NewAuthenticator() (*Authenticator, error) {
	ctx := context.Background()

	provider, err := oidc.NewProvider(ctx, "https://${account.namespace}/")
	if err != nil {
		log.Printf("failed to get provider: %v", err)
		return nil, err
	}

	conf := oauth2.Config{
		ClientID:     "${account.clientId}",
		ClientSecret: "YOUR_CLIENT_SECRET",
		RedirectURL:  "http://localhost:3000/callback",
		Endpoint: 	  provider.Endpoint(),
		Scopes:       []string{oidc.ScopeOpenID, "profile"},
	}

	return &Authenticator{
		Provider: provider,
		Config:   conf,
		Ctx:      ctx,
	}, nil
}
```

### Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

```go
// routes/callback/callback.go

package callback

import (
	"context"
	"log"
	"net/http"

	"github.com/coreos/go-oidc"

	"app"
	"auth"
)

func CallbackHandler(w http.ResponseWriter, r *http.Request) {
	session, err := app.Store.Get(r, "auth-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if r.URL.Query().Get("state") != session.Values["state"] {
		http.Error(w, "Invalid state parameter", http.StatusBadRequest)
		return
	}

	authenticator, err := auth.NewAuthenticator()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token, err := authenticator.Config.Exchange(context.TODO(), r.URL.Query().Get("code"))
	if err != nil {
		log.Printf("no token found: %v", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	rawIDToken, ok := token.Extra("id_token").(string)
	if !ok {
		http.Error(w, "No id_token field in oauth2 token.", http.StatusInternalServerError)
		return
	}

	oidcConfig := &oidc.Config{
		ClientID: "${account.clientId}",
	}

	idToken, err := authenticator.Provider.Verifier(oidcConfig).Verify(context.TODO(), rawIDToken)

	if err != nil {
		http.Error(w, "Failed to verify ID Token: " + err.Error(), http.StatusInternalServerError)
		return
	}

	// Getting now the userInfo
	var profile map[string]interface{}
	if err := idToken.Claims(&profile); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session.Values["id_token"] = rawIDToken
	session.Values["access_token"] = token.AccessToken
	session.Values["profile"] = profile
	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Redirect to logged in page
	http.Redirect(w, r, "/user", http.StatusSeeOther)
}
```

Remember to set this handler to the `/callback` path:

${snippet(meta.snippets.setup)}

## Trigger Authentication

Create a file called `login.go` in the `routes/login` folder, and add `LoginHandler` function to handle `/login` route.

```go
// routes/login/login.go

package login

import (
	"crypto/rand"
	"encoding/base64"
	"net/http"

	"app"
	"auth"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	// Generate random state
	b := make([]byte, 32)
	_, err := rand.Read(b)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	state := base64.StdEncoding.EncodeToString(b)

	session, err := app.Store.Get(r, "auth-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	session.Values["state"] = state
	err = session.Save(r, w)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	authenticator, err := auth.NewAuthenticator()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.Redirect(w, r, authenticator.Config.AuthCodeURL(state), http.StatusTemporaryRedirect)
}
```

In `server.go` file create the router, and add the function created above to handle `/login` route.

```go
// server.go

r := mux.NewRouter()
r.HandleFunc("/login", login.LoginHandler)
```

Add a link to `/login` route in the `home.html` template.

```html
<!-- routes/home/home.html -->

<div>
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a href="/login">SignIn</a>
</div>
```

## Display User Information

You can access the user information via the `profile` you stored in the session previously.

```go
// routes/user/user.go

func UserHandler(w http.ResponseWriter, r *http.Request) {

	session, err := app.Store.Get(r, "auth-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	templates.RenderTemplate(w, "user", session.Values["profile"])
}
```

```html
<!-- routes/user/user.html -->

<div>
	<img class="avatar" src="{{.picture}}"/>
	<h2>Welcome {{.nickname}}</h2>
</div>
```

For information about the userinfo hash, see [User Profile](/users/concepts/overview-user-profile).

## Logout

To log the user out, you have to clear the data from the session and redirect the user to the Auth0 logout endpoint. You can find more information about this in the [logout documentation](/logout).

Create a file called `logout.go` in the folder `/routes/logout/logout.go`, and add the function `LogoutHandler` to redirect the user to Auth0's logout endpoint.

```go

// /routes/logout/logout.go
package logout

import (
	"net/http"
	"net/url"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request) {

	domain := "${account.namespace}"

	logoutUrl, err := url.Parse("https://" + domain)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	logoutUrl.Path += "/v2/logout"
	parameters := url.Values{}

	var scheme string
	if r.TLS == nil {
		scheme = "http"
	} else {
		scheme = "https"
	}

	returnTo, err := url.Parse(scheme + "://" +  r.Host)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	parameters.Add("returnTo", returnTo.String())
	parameters.Add("client_id", "${account.clientId}")
	logoutUrl.RawQuery = parameters.Encode()

	http.Redirect(w, r, logoutUrl.String(), http.StatusTemporaryRedirect)
}
```

::: note
The redirect URL needs to be in the list of Allowed Logout URLs in the settings section of the application, For more information, see [Redirect Users After Logout](/logout/guides/redirect-users-after-logout).
:::

Add the function to `mux` handle `/logout` route.

```go
// server.go

r.HandleFunc("/logout", logout.LogoutHandler)
```

Create a file called `user.js` in the folder `public`, and add the code to remove the cookie from logged user.

```js
$(document).ready(function() {
	$('.btn-logout').click(function(e) {
		Cookies.remove('auth-session');
	});
});
```

::: note
This sample is using [js.cookie](https://github.com/js-cookie/js-cookie/tree/latest#readme) to cookie handling. You need to add `js.cookie.js` file in the `public` folder to use it.
:::

### Optional Steps

#### Checking if the User is Authenticated

We can use [Negroni](https://github.com/codegangsta/negroni) to create a Middleware that will check if the user is authenticated or not.

We should create a middleware that will check if the `profile` is in the session:

```go
// routes/middlewares/isAuthenticated.go

package middlewares

import (
	"net/http"

	"app"
)

func IsAuthenticated(w http.ResponseWriter, r *http.Request, next http.HandlerFunc) {

	session, err := app.Store.Get(r, "auth-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if _, ok := session.Values["profile"]; !ok {
		http.Redirect(w, r, "/", http.StatusSeeOther)
	} else {
		next(w, r)
	}
}
```

Finally, we can use Negroni to set up this middleware for any route that needs authentication:

```go
// server.go

r.Handle("/user", negroni.New(
	negroni.HandlerFunc(middlewares.IsAuthenticated),
	negroni.Wrap(http.HandlerFunc(user.UserHandler)),
))
```
