```go
// server.go

r := mux.NewRouter()
r.HandleFunc("/callback", callback.CallbackHandler)
```
