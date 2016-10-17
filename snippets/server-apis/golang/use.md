```go
// JSON response function
func respondJson(text string, w http.ResponseWriter) {
	response := Response{text}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

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
