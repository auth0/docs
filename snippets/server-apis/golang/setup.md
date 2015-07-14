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
      decoded, err := base64.URLEncoding.DecodeString("@@account.clientSecret@@")
      if err != nil {
        return nil, err
      }
      return decoded, nil
    },
  })
}
```
