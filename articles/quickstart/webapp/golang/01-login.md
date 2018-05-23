---
title: Login
description: This tutorial will demonstrates how to use the OAuth2 Go package to add authentication and authorization to your web app.
budicon: 448
github:
  path: 01-Login
---

<%= include('../_includes/_getting_started', { library: 'Go', callback: 'http://localhost:3000' }) %>

## Add Dependencies

Install the following dependencies using `go get`.

${snippet(meta.snippets.dependencies)}

::: note
This example uses `mux` for routing but you can use whichever router you want.
:::

## Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

```go
// routes/callback/callback.go

package callback

import (
	"context"
	_ "crypto/sha512"
	"encoding/json"
	"../../app"
	"golang.org/x/oauth2"
	"net/http"
	"os"
)

func CallbackHandler(w http.ResponseWriter, r *http.Request) {

	domain := os.Getenv("${account.namespace}")

	conf := &oauth2.Config{
		ClientID:     os.Getenv("${account.clientId}"),
		ClientSecret: os.Getenv("YOUR_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("http://localhost:3000/callback"),
		Scopes:       []string{"openid", "profile"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://" + domain + "/authorize",
			TokenURL: "https://" + domain + "/oauth/token",
		},
	}
	state := r.URL.Query().Get("state")
	session, err := app.Store.Get(r, "state")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if state != session.Values["state"] {
		http.Error(w, "Invalid state parameter", http.StatusInternalServerError)
		return
	}

	code := r.URL.Query().Get("code")

	token, err := conf.Exchange(context.TODO(), code)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Getting now the userInfo
	client := conf.Client(context.TODO(), token)
	resp, err := client.Get("https://" + domain + "/userinfo")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer resp.Body.Close()

	var profile map[string]interface{}
	if err = json.NewDecoder(resp.Body).Decode(&profile); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session, err = app.Store.Get(r, "auth-session")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session.Values["id_token"] = token.Extra("id_token")
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


## Triggering the Login

Create a file called `login.go` in the `routes/login` folder, and add `LoginHandler` function to handle `/login` route.

This function sets the configuration for [OAuth2 Go](https://godoc.org/golang.org/x/oauth2) to get the authorization url, and redirects the user to the [login page](/hosted-pages/login).

```go
// routes/login/login.go

package login

import (
	"golang.org/x/oauth2"
	"net/http"
	"os"
	"crypto/rand"
	"encoding/base64"
	"../../app"
)

func LoginHandler(w http.ResponseWriter, r *http.Request) {

	domain := os.Getenv("${account.namespace}")
	aud := os.Getenv("YOUR_API_AUDIENCE")

	conf := &oauth2.Config{
		ClientID:     os.Getenv("${account.clientId}"),
		ClientSecret: os.Getenv("YOUR_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("http://localhost:3000/callback"),
		Scopes:       []string{"openid", "profile"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://" + domain + "/authorize",
			TokenURL: "https://" + domain + "/oauth/token",
		},
	}

	if aud == "" {
		aud = "https://" + domain + "/userinfo"
	}

	// Generate random state
	b := make([]byte, 32)
	rand.Read(b)
	state := base64.StdEncoding.EncodeToString(b)

	session, err := app.Store.Get(r, "state")
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

	audience := oauth2.SetAuthURLParam("audience", aud)
	url := conf.AuthCodeURL(state, audience)

	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
}
```

In `server.go` file create the router, and add the function created above to handle `/login` route.

```go
// server.go

r := mux.NewRouter()
r.HandleFunc("/login", login.LoginHandler)
```

Add a link to `/login` route in the `index.html` template.

```html
<!-- routes/home/home.html -->

<div class="login-box auth0-box before">
    <img src="https://i.cloudup.com/StzWWrY34s.png" />
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a class="btn btn-primary btn-lg btn-block" href="/login">SignIn</a>
</div>
```

## Accessing User Information

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

[Click here](/user-profile) to check all the information that the userinfo hash has.

## Logout

To log the user out, you have to clear the data from the session, and redirect the user to the Auth0 logout endpoint. You can find more information about this in the [logout documentation](/logout).

Create a file called `logout.go` in the folder `/routes/logout/logout.go`, and add the function `LogoutHandler` to redirect the user to Auth0's logout endpoint.

```go

// /routes/logout/logout.go
package logout

import (
	"net/http"
	"os"
	"net/url"
)

func LogoutHandler(w http.ResponseWriter, r *http.Request) {

	domain := os.Getenv("AUTH0_DOMAIN")

	var Url *url.URL
	Url, err := url.Parse("https://" + domain)

	if err != nil {
		panic("boom")
	}

	Url.Path += "/v2/logout"
	parameters := url.Values{}
	parameters.Add("returnTo", "http://localhost:3000")
	parameters.Add("client_id", os.Getenv("${account.clientId}"))
	Url.RawQuery = parameters.Encode()

	http.Redirect(w, r, Url.String(), http.StatusTemporaryRedirect)
}
```

::: note
Please take into consideration that the return to URL needs to be in the list of Allowed Logout URLs in the settings section of the application as explained in [our documentation](/logout#redirect-users-after-logout)
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

## Optional Steps

### Checking if the User is Authenticated

We can use [Negroni](https://github.com/codegangsta/negroni) to create a Middleware that will check if the user is Authenticated or not.

First, we need to install it via `go get`:

```bash
go get github.com/codegangsta/negroni
```

Then, we should create a middleware that will check if the `profile` is in the session:

```go
// routes/middlewares/isAuthenticated.go

package middlewares

import (
  "net/http"
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
