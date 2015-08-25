---
title: Go API Tutorial
name: Go
thirdParty: false
alias:
  - go
  - golang
languages:
  - Go
image: /media/platforms/golang.png
lodash: true
tags:
  - quickstart
snippets:
  dependencies: server-apis/golang/dependencies
  setup: server-apis/golang/setup
  use: server-apis/golang/use
---

## GoLang API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-golang/master/create-package?path=examples/go-api&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing Go Programming Language app to use it with Auth0.**

### 1. Install `go-jwt-middleware` dependency

Install `go-jwt-middleware` to check for JWTs on HTTP requests.

Just run the following code to install the dependency

@@snippet(meta.snippets.dependencies)@@

### 2. Configure `go-jwt-middleware` to use your Auth0 Account

You need to set the ClientSecret in `go-jwt-middleware`'s configuration so that it can validate [JWTs](/jwt) for you.

@@snippet(meta.snippets.setup)@@

### 3. Secure your API

Now, you can use the `go-jwt-middleware` to secure your API. You can do so using `net/http` handlers or using `negroni` middlewares as well.

@@snippet(meta.snippets.use)@@

### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
