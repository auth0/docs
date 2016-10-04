---
title: Login
description: This tutorial will demonstrates how to use the Auth0 Go SDK to add authentication and authorization to your web app
---

<%= include('../../_includes/_package', {
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-golang-samples',
  githubUrl:'https://github.com/auth0-samples/auth0-golang-samples/tree/master/00-Starter-Seed/regular-web-app',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed/regular-web-app',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:
* Go 1.5.3 and up
:::

<%= include('../../_includes/_signup') %>

## Add Dependencies

Install the following dependencies using `go get`

${snippet(meta.snippets.dependencies)}

> This example uses `mux` for routing but you can use whichever router you want

## Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

```go
package callback

import (
  // Don't forget this first import or nothing will work
  _ "crypto/sha512"
  "encoding/json"
  "io/ioutil"
  "net/http"
  "os"
  "golang.org/x/oauth2"
)

func CallbackHandler(w http.ResponseWriter, r *http.Request) {

  domain := "${account.namespace}"

  // Instantiating the OAuth2 package to exchange the Code for a Token
  conf := &oauth2.Config{
    ClientID:     os.Getenv("AUTH0_CLIENT_ID"),
    ClientSecret: os.Getenv("AUTH0_CLIENT_SECRET"),
    RedirectURL:  os.Getenv("AUTH0_CALLBACK_URL"),
    Scopes:       []string{"openid", "name", "email", "nickname"},
    Endpoint: oauth2.Endpoint{
      AuthURL:  "https://" + domain + "/authorize",
      TokenURL: "https://" + domain + "/oauth/token",
    },
  }

  // Getting the Code that we got from Auth0
  code := r.URL.Query().Get("code")

  // Exchanging the code for a token
  token, err := conf.Exchange(oauth2.NoContext, code)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  // Getting now the User information
  client := conf.Client(oauth2.NoContext, token)
  resp, err := client.Get("https://" + domain + "/userinfo")
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  // Reading the body
  raw, err := ioutil.ReadAll(resp.Body)
  defer resp.Body.Close()
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  // Unmarshalling the JSON of the Profile
  var profile map[string]interface{}
  if err := json.Unmarshal(raw, &profile); err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  // Saving the information to the session.
  // We're using https://github.com/astaxie/beego/tree/master/session
  // The GlobalSessions variable is initialized in another file
  // Check https://github.com/auth0/auth0-golang/blob/master/examples/regular-web-app/app/app.go
  session, _ := app.GlobalSessions.SessionStart(w, r)
  defer session.SessionRelease(w)

  session.Set("id_token", token.Extra("id_token"))
  session.Set("access_token", token.AccessToken)
  session.Set("profile", profile)

  // Redirect to logged in page
  http.Redirect(w, r, "/user", http.StatusMovedPermanently)

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

  session, _ := app.GlobalSessions.SessionStart(w, r)
  defer session.SessionRelease(w)

  // Getting the profile from the session
  profile := session.Get("profile")

  templates.RenderTemplate(w, "user", profile)
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

  session, _ := app.GlobalSessions.SessionStart(w, r)
  defer session.SessionRelease(w)
  if session.Get("profile") == nil {
    http.Redirect(w, r, "/", http.StatusMovedPermanently)
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
