---
title: Authorization
description: This tutorial will show you how to use the Auth0 Go SDK to add authentication and authorization to your API.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-golang-api-samples',
  path: '01-Authorization-RS256',
  requirements: [
    'Go 1.8.2'
  ]
}) %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

This sample demonstrates how to check for a JWT in the `Authorization` header of an incoming HTTP request and verify that it is valid. The validity check is done in the `checkJwt` middleware function which can be applied to any endpoints you wish to protect. If the token is valid, the resources which are served by the endpoint can be released, otherwise a `401 Authorization` error will be returned.

## Install the Dependencies

The **go-jose** package can be used to verify incoming JWTs. The **go-auth0** library can be used alongside it to fetch your Auth0 public key and complete the verification process. Finally, we'll use the **gorilla/mux** package to handle our routes.

```bash
go get "gopkg.in/square/go-jose.v2"
go get "github.com/auth0-community/go-auth0"
go get "github.com/gorilla/mux"
```

## Configuration

<%= include('../_includes/_api_jwks_description_no_link') %>

Configure the **checkJwt** middleware to use the remote JWKS for your Auth0 account.

```go
// main.go
const JWKS_URI = "https://${account.namespace}/.well-known/jwks.json"
const AUTH0_API_ISSUER = "https://${account.namespace}/"

var AUTH0_API_AUDIENCE = []string{"${apiIdentifier}"}

func checkJwt(h http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    client := auth0.NewJWKClient(auth0.JWKClientOptions{URI: JWKS_URI})
    audience := AUTH0_API_AUDIENCE

    configuration := auth0.NewConfiguration(client, audience, AUTH0_API_ISSUER, jose.RS256)
    validator := auth0.NewValidator(configuration)

    token, err := validator.ValidateRequest(r)

    if err != nil {
      fmt.Println("Token is not valid or missing token")

      response := Response{
        Message: "Missing or invalid token.",
      }

      w.WriteHeader(http.StatusUnauthorized)
      json.NewEncoder(w).Encode(response)

    } else {
      h.ServeHTTP(w, r)
    }
  })
}
```

## Configuring Scopes

The `checkJwt` middleware above verifies that the `access_token` included in the request is valid; however, it doesn't yet include any mechanism for checking that the token has the sufficient **scope** to access the requested resources.

Scopes provide a way for you to define which resources should be accessible by the user holding a given `access_token`. For example, you might choose to permit `read` access to a `messages` resource if a user has a **manager** access level, or a `write` access to that resource if they are an **administrator**.

To configure scopes in your Auth0 dashboard, navigate to [your API](${manage_url}/#/apis) and choose the **Scopes** tab. In this area you can apply any scopes you wish, including one called `read:messages`, which will be used in this example.

Let's extend our backend to check and ensure the `access_token` has the correct scope before returning a successful response.

```go
// main.go
func checkScope(r *http.Request, validator *auth0.JWTValidator, token *jwt.JSONWebToken) bool {
  claims := map[string]interface{}{}
  err := validator.Claims(r, token, &claims)

  if err != nil {
    fmt.Println(err)
    return false
  }

  if strings.Contains(claims["scope"].(string), "read:messages") {
    return true
  } else {
    return false
  }
}
```

Next, let's implement this `checkScope` function in our middleware. We'll omit the redundent code from above.

```go
// main.go
func checkJwt(h http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    // Validate the access_token
    if err != nil {
      // Handle invalid token case
    } else {
      // Ensure the token has the correct scope
      result := checkScope(r, validator, token)
      if result == true {
        // If the token is valid and we have the right scope, we'll pass through the middleware
        h.ServeHTTP(w, r)
      } else {
        response := Response{
          Message: "You do not have the read:messages scope.",
      }
        w.WriteHeader(http.StatusUnauthorized)
        json.NewEncoder(w).Encode(response)
      }
    }
  })
}
```

## Protect Individual Endpoints

Individual routes can now be protected with the `checkJwt` middleware. Below is an example showing two routes, one which is publicaly accessible, and one that is protected with the `checkJwt` middlewware. The protected route will require both a valid `access_token` and the `read:messages` scope before returning the requested resource.

```go
// main.go
func main() {
  r := mux.NewRouter()

  // This route is always accessible
  r.Handle("/api/public", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    response := Response{
      Message: "Hello from a public endpoint! You don't need to be authenticated to see this.",
    }
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(response)
  }))

  // This route is only accessible if the user has a valid access_token with the read:messages scope
  // We are wrapping the checkJwt middleware around the handler function which will check for a
  // valid token and scope.
  r.Handle("/api/private", checkJwt(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    response := Response{
      Message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    }
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(response)
  })))
}
```

In our example we only checked for the `read:messages` scope. You may want to extend the `checkScope` function or make it a standalone middleware that accepts multiple roles to fit your use case.

<%= include('../_includes/_call_api') %>
