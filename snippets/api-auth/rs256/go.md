---
title: Go
---

```go
jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
  ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
    keyData, _ := ioutil.ReadFile("test/sample_key.pub")
    key, _ := jwt.ParseRSAPublicKeyFromPEM(keyData)

    return key, nil
  },
  SigningMethod: jwt.SigningMethodRS256,
})

app := jwtMiddleware.Handler(myHandler)
```
