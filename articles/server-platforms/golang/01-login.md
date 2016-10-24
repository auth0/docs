---
title: Login
description: This tutorial will demonstrates how to use the Auth0 Go SDK to add authentication and authorization to your web app
budicon: 448
---

<%= include('../../_includes/_package2', {
  org: 'auth0-samples',
  repo: 'auth0-golang-web-app',
  path: '01-Login'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Go 1.5.3 and up
:::

## Add Dependencies

Install the following dependencies using `go get`

${snippet(meta.snippets.dependencies)}

> This example uses `mux` for routing but you can use whichever router you want

## Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

```go
package callback

import (
	_ "crypto/sha512"
	"encoding/json"
	"github.com/auth0-samples/auth0-golang-web-app/01-Login/app"
	"golang.org/x/oauth2"
	"io/ioutil"
	"net/http"
	"os"
)

func CallbackHandler(w http.ResponseWriter, r *http.Request) {

	domain := os.Getenv("AUTH0_DOMAIN")

	conf := &oauth2.Config{
		ClientID:     os.Getenv("AUTH0_CLIENT_ID"),
		ClientSecret: os.Getenv("AUTH0_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("AUTH0_CALLBACK_URL"),
		Scopes:       []string{"openid", "profile"},
		Endpoint: oauth2.Endpoint{
			AuthURL:  "https://" + domain + "/authorize",
			TokenURL: "https://" + domain + "/oauth/token",
		},
	}

	code := r.URL.Query().Get("code")

	token, err := conf.Exchange(oauth2.NoContext, code)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Getting now the userInfo
	client := conf.Client(oauth2.NoContext, token)
	resp, err := client.Get("https://" + domain + "/userinfo")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	raw, err := ioutil.ReadAll(resp.Body)
	defer resp.Body.Close()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var profile map[string]interface{}
	if err = json.Unmarshal(raw, &profile); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session, err := app.Store.Get(r, "auth-session")
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

## Set the Callback URL

${include('../\_callbackRegularWebApp')}

In this case, the redirectUrl should look something like:

```
http://yourUrl/callback
```

## Triggering Login Manually or Using Lock

<%= include('../../_includes/_lock-sdk') %>

> **Note:** Please note that the `redirectUrl` specified in the `Auth0Lock` constructor **must match** the one specified in the previous step

## Accessing User Information

You can access the user information via the `profile` you stored in the session on step 2

```go
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
<div>
  <img class="avatar" src="{{.picture}}"/>
  <h2>Welcome {{.nickname}}</h2>
</div>
```

[Click here](/user-profile) to check all the information that the userinfo hash has.

## Optional Steps

### Checking if the User is Authenticated

We can use [Negroni](https://github.com/codegangsta/negroni) to create a Middleware that will check if the user is Authenticated or not.

First, we need to install it via `go get`:

```bash
go get github.com/codegangsta/negroni
```

Then, we should create a middleware that will check if the `profile` is in the session:

```go
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
r.Handle("/user", negroni.New(
  negroni.HandlerFunc(middlewares.IsAuthenticated),
  negroni.Wrap(http.HandlerFunc(user.UserHandler)),
))
```
