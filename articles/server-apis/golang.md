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
tags:
  - quickstart
snippets:
  dependencies: server-apis/golang/dependencies
  setup: server-apis/golang/setup
  use: server-apis/golang/use
---

## GoLang API Tutorial

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-golang',
  pkgBranch: 'master',
  pkgPath: 'examples/go-api',
  pkgFilePath: null,
  pkgType: 'server' + account.clientParam
}) %>

**Otherwise, Please follow the steps below to configure your existing Go Programming Language app to use it with Auth0.**

### 1. Install `go-jwt-middleware` dependency

Install `go-jwt-middleware` to check for JWTs on HTTP requests.

Just run the following code to install the dependency

${snippet(meta.snippets.dependencies)}

### 2. Configure `go-jwt-middleware` to use your Auth0 Account

You need to set the ClientSecret in `go-jwt-middleware`'s configuration so that it can validate [JWTs](/jwt) for you.

${snippet(meta.snippets.setup)}

### 3. Secure your API

Now, you can use the `go-jwt-middleware` to secure your API. You can do so using `net/http` handlers or using `negroni` middlewares as well.

${snippet(meta.snippets.use)}

### 4. You're done!

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
