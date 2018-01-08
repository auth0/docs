```python
# Controllers API

# This doesn't need authentication
@app.route("/ping")
@cross_origin(headers=['Content-Type', 'Authorization'])
def public():
    response = "All good. You don't need to be authenticated to call this"
    return jsonify(message=response)

# This does need authentication
@app.route("/secured/ping")
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def private():
    response = "All good. You only get this message if you're authenticated"
    return jsonify(message=response)
```
