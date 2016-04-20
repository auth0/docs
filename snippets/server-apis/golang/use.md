```go
// Regular HTTP HandlerFunc
func SecuredPingHandler(w http.ResponseWriter, r *http.Request) {
  respondJson("All good. You only get this message if you're authenticated", w)
}

// Negroni sample
r := mux.NewRouter()
r.Handle("/secured/ping", negroni.New(
  negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
  negroni.Wrap(http.HandlerFunc(SecuredPingHandler)),
))
http.Handle("/", r)
http.ListenAndServe(":3001", nil)

// net/http sample
app := jwtMiddleware.Handler(SecuredPingHandler)
http.ListenAndServe("0.0.0.0:3001", app)
```
