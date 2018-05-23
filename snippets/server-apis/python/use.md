```python
# Controllers API

# This doesn't need authentication
@app.route("/api/public")
@cross_origin(headers=['Content-Type', 'Authorization'])
def public():
    response = "Hello from a public endpoint! You don't need to be authenticated to see this."
    return jsonify(message=response)

# This does need authentication
@app.route("/api/private")
@cross_origin(headers=['Content-Type', 'Authorization'])
@requires_auth
def private():
    response = "Hello from a private endpoint! You need to be authenticated to see this."
    return jsonify(message=response)

@APP.route("/api/private-scoped")
@cross_origin(headers=["Content-Type", "Authorization"])
@cross_origin(headers=["Access-Control-Allow-Origin", "*"])
@requires_auth
def private_scoped():
    """A valid Access Token and an appropriate scope are required to access this route
    """
    if requires_scope("read:messages"):
        response = "All good. You're authenticated and the Access Token has the appropriate scope."
        return jsonify(message=response)
    raise AuthError({
        "code": "Unauthorized",
        "description": "You don't have access to this resource."
    }, 403)
```
