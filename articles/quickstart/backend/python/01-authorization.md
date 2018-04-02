---
title: Authorization
description: This tutorial will show you how to use the Auth0 to add authorization to your Python API.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-python-api-samples',
  path: '00-Starter-Seed',
  requirements: [
    'python 2.7, 3.3 and up',
    'flask 0.11.1',
    'python-jose-cryptodome 1.3.2',
    'flask-cors 3.0.2',
    'six 1.10.0',
    'flask_caching 1.3.3'
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
python-jose-cryptodome
flask-cors
six
flask_caching
```

## Create the Flask Application

Create a `server.py` file and initializate the Flask Application. Set the domain, audience and the error handling.

```python
# /server.py

import json
from six.moves.urllib.request import urlopen
from functools import wraps

from flask import Flask, request, jsonify, _request_ctx_stack
from flask_cors import cross_origin
from jose import jwt, jws
from flask_caching import Cache

AUTH0_DOMAIN = '${account.namespace}'
API_IDENTIFIER = '${apiIdentifier}'
AUTH0_ISSUER = "https://" + AUTH0_DOMAIN + "/"
AUTH0_JWKS = "https://" + AUTH0_DOMAIN + "/.well-known/jwks.json"
ALGORITHMS = ["RS256"]

app = Flask(__name__)

# Error handler
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code
    
@app.errorhandler(AuthError)
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

def get_public_key(token):
    """Obtain the public key from JWKS
    """

    jwks_url = urlopen(AUTH0_JWKS)
    jwks = json.loads(jwks_url.read())
    try:
        unverified_header = jwt.get_unverified_header(token)
    except jwt.JWTError:
        raise AuthError({"code": "invalid_header",
                         "description":
                             "Invalid header. "
                             "Use an RS256 signed JWT Access Token"}, 401)
    if unverified_header["alg"] == "HS256":
        raise AuthError({"code": "invalid_header",
                         "description":
                             "Invalid header. "
                             "Use an RS256 signed JWT Access Token"}, 401)
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
        return rsa_key
    else:
        raise AuthError({"code": "invalid_header",
                         "description": "Unable to find appropriate key"}, 401)


# Format error response and append status code
def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
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


def decode_jwt(token, rsa_key):
    try:
        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_IDENTIFIER,
            issuer=AUTH0_ISSUER
        )
    except jwt.ExpiredSignatureError:
        raise AuthError({"code": "token_expired",
                         "description": "token is expired"}, 401)
    except jwt.JWTClaimsError:
        raise AuthError({"code": "invalid_claims",
                         "description":
                             "incorrect claims,"
                             " please check the audience and issuer"}, 401)
    except jwt.JWTError:
        raise AuthError({"code": "invalid_token",
                         "description": "The signature is invalid"}, 401)
    except Exception:
        raise AuthError({"code": "invalid_header",
                         "description":
                             "Unable to parse authentication"
                             " token."}, 401)
    return payload


def requires_auth(f):
    """Determines if the Access Token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()

        rsa_key = get_public_key(token)
        payload = decode_jwt(token, rsa_key)
        _request_ctx_stack.top.current_user = payload
        return f(*args, **kwargs)
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
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    token = get_token_auth_header()
    unverified_claims = jwt.get_unverified_claims(token)
    if unverified_claims.get("scope"):
            token_scopes = unverified_claims["scope"].split()
            for token_scope in token_scopes:
                if token_scope == required_scope:
                    return True
    return False
```

Then, establish what scopes are needed in order to access the route. In this case `read:messages` is used:

```python
# /server.py

@app.route("/api/private-scoped")
@cross_origin(headers=["Content-Type", "Authorization"])
@cross_origin(headers=["Access-Control-Allow-Origin", "*"])
@requires_auth
def private_scoped():
    """A valid Access Token and an appropriate scope are required to access this route
    """
    if requires_scope("read:messages"):
        response = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
        return jsonify(message=response)
    raise AuthError({
        "code": "Unauthorized",
        "description": "You don't have access to this resource."
    }, 403)
```

## Cache JWKS

To avoid fetch JWKS from your Auth0 account each time you need to validate the incoming `access_token`, you can store the obtained public key.

Create an instance of [flask-caching](https://github.com/sh4nks/flask-caching), setting cache type and timeout.

```python
# /server.py

config = {
    'CACHE_TYPE': 'simple',
    'CACHE_DEFAULT_TIMEOUT': 0
}

cache = Cache(app, config=config)
```

Update `get_public_key` function to return the public key from cache, and if isn't cached fetch from JWKS.

```python
# /server.py

def get_public_key(token, get_from_cache=True):
    """Obtain the public key from JWKS
    Args:
        token (str): Bearer token
        get_from_cache (Boolean): If It's True get public key from cache,
                                  otherwise fetch from JWKS
    Returns:
        dict: A dictionary with JWK
    """
    rsa_key = cache.get('rsa_key')
    if rsa_key is not None and get_from_cache:
        return rsa_key

    jwks_url = urlopen(AUTH0_JWKS)
    jwks = json.loads(jwks_url.read())
    try:
        unverified_header = jwt.get_unverified_header(token)
    except jwt.JWTError:
        raise AuthError({"code": "invalid_header",
                         "description":
                             "Invalid header. "
                             "Use an RS256 signed JWT Access Token"}, 401)
    if unverified_header["alg"] == "HS256":
        raise AuthError({"code": "invalid_header",
                         "description":
                             "Invalid header. "
                             "Use an RS256 signed JWT Access Token"}, 401)
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
        cache.set('rsa_key', rsa_key)
        return rsa_key
    else:
        raise AuthError({"code": "invalid_header",
                         "description": "Unable to find appropriate key"}, 401)
```

We've added `get_from_cache` parameter with `True` as default value, this way by default it'll try to get public key from cache. Set this parameter to `False` if you want to fetch from JWKS.

Update `requires_auth` decorator get the public key from cache.

```python
# /server.py

def requires_auth(f):
    """Determines if the access token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        rsa_key = get_public_key(token)

        # Try to decode with the cached JWKS key.
        # If it fails, it could be because the JWKS key expired, so we retrieve it
        # from the JWKS endpoint and try decoding again.

        try:
            payload = decode_jwt(token, rsa_key)
        except AuthError as ex:
            if ex.error["code"] == "invalid_signature":
                rsa_key = get_public_key(token, False)
                payload = decode_jwt(token, rsa_key)

        _request_ctx_stack.top.current_user = payload

        return f(*args, **kwargs)
    return decorated
```
