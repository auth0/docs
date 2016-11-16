---
title: Go
---

```go
jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
  ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
    return []byte("<%= api.signing_secret %>"), nil
  },
  SigningMethod: jwt.SigningMethodHS256,
})

app := jwtMiddleware.Handler(myHandler)
```
