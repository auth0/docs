---
lodash: true
---

## GoLang API Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/auth0-golang/master/create-package?path=examples/go-api&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
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

````js
go get github.com/auth0/go-jwt-middleware
```

### 2. Configure `go-jwt-middleware` to use your Auth0 Account

You need to set the ClientID and ClientSecret in `go-jwt-middleware`'s configuration so that it can validate [JWT](@@base_url@@/jwt)s for you.

````go
package main

import (
  // ...
  "github.com/auth0/go-jwt-middleware"
  // ...
)

func main() {
  jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
    ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
      decoded, err := base64.URLEncoding.DecodeString("@@account.clientSecret@@")
      if err != nil {
        return nil, err
      }
      return decoded, nil
    },
  })
}
```

### 3. Secure your API

Now, you need to specify one or more routes or paths that you want to protect, so that only users with the correct JWT will be able to do the request.

````js
app.use('/api/path-you-want-to-protect', jwtCheck);
```

### 4. You've nailed it.

Now you have both your FrontEnd and Backend configured to use Auth0. Congrats, you're awesome!
