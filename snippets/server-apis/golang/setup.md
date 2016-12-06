```go
package main

import (
  // ...
  "github.com/auth0/go-jwt-middleware"
  // ...
)

func main() {
  jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
    ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
      token, err := "${account.clientSecret}"
      if err != nil {
        return nil, err
      }
      return token, nil
    },
  })
}
```
