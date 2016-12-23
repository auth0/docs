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
      secret := os.Getenv("AUTH0_CLIENT_SECRET")			
      if secret != "" {
        return nil, errors.New("AUTH0_CLIENT_SECRET is not set")
      }
      return secret, nil
    },
  })
}
```
