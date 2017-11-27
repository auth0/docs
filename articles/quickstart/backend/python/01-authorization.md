---
title: Authorization
description: This tutorial will show you how to use the Auth0 to add authorization to your Python API.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-python-api-samples',
  path: '00-Starter-Seed',
  requirements: [
    'python 2.7, 3.3 and up'
    'flask 0.11.1',
    'python-dotenv 0.6.5',
    'python-jose 1.3.2',
    'flask-cors 3.0.2',
    'six 1.10.0'
  ]
}) %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Install the Dependencies

This quickstart demonstrates how to add authorization to your Python API using [Flask](http://flask.pocoo.org/). Add the following dependencies to your `requirements.txt`:

```python
# /requirements.txt

flask
python-dotenv
python-jose
flask-cors
six
```

## Create the Flask APP

Create a `server.py` file and initializate the Flask App. Set the domain, audience and the error handling.

```python
# /server.py

import json
from six.moves.urllib.request import urlopen
from functools import wraps

from flask import Flask, request, jsonify, _app_ctx_stack
from flask_cors import cross_origin
from jose import jwt

AUTH0_DOMAIN = '${account.namespace}'
API_AUDIENCE = YOUR_API_AUDIENCE
ALGORITHMS = ["RS256"]

APP = Flask(__name__)

# Error handler
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code
    
@APP.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response
```

## Create the JWT Validation Decorator

<%= include('../_includes/_api_jwks_description_no_link') %>

Add a decorator which verifies the `access_token` against your JWKS.

```python
# /server.py

# Format error response and append status code
def get_token_auth_header():
    """Obtains the access token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)
    
    parts = auth.split()
    
    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with"
                            " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be"
                            " Bearer token"}, 401)

    token = parts[1]
    return token

def requires_auth(f):
    """Determines if the access token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    "please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 400)

            _app_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 400)
    return decorated
```

## Use this Decorator in your Methods

You can now use the decorator in any routes that require authentication.

${snippet(meta.snippets.use)}

## Protect individual endpoints

Individual routes can be configured to look for a particular `scope` in the `access_token` by using the following:

```python
# /server.py

def requires_scope(required_scope):
    """Determines if the required scope is present in the access token
    Args:
        required_scope (str): The scope required to access the resource
    """
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    token_scopes = unverified_claims["scope"].split()
    for token_scope in token_scopes:
        if token_scope == required_scope:
            return True
    return False
```

Then, establish what scopes are needed in order to access the route. In this case `example:scope` is used:

```python
# /server.py

@APP.route("/secured/private/ping")
@cross_origin(headers=["Content-Type", "Authorization"])
@cross_origin(headers=["Access-Control-Allow-Origin", "*"])
@requires_auth
def secured_private_ping():
    """A valid access token and an appropriate scope are required to access this route
    """
    if requires_scope("example:scope"):
        return "All good. You're authenticated and the access token has the appropriate scope"
    return "You don't have access to this resource"
```

<%= include('../_includes/_call_api') %>
