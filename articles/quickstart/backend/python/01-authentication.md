---
title: Authentication
description: This tutorial will show you how to use the Auth0 to add authentication to your Python API.
---

<%= include('../_includes/_api_auth_preamble') %>

## Install the Dependencies

This quickstart demonstrates how to add authentication to your Python API using Flask. Add the following dependencies to your `requirements.txt`:

```python
flask
python-jose
flask-cors
```

## Create the JWT Validation Decorator

<%= include('../_includes/_api_jwks_description_no_link') %>

Add a decorator which verifies the `access_token` against your JWKS.

```python
import json
import os
import urllib

from dotenv import Dotenv
from functools import wraps
from flask import Flask, request, jsonify, _app_ctx_stack
from flask_cors import cross_origin
from jose import jwt

try:
    env = Dotenv('./.env')
    auth0_domain = env['AUTH0_DOMAIN']
    api_audience = env['API_ID']
except IOError:
    env = os.environ

app = Flask(__name__)


# Format error response and append status code.
def handle_error(error, status_code):
    resp = jsonify(error)
    resp.status_code = status_code
    return resp


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', None)
        if not auth:
            return handle_error({'code': 'authorization_header_missing',
                                'description':
                                    'Authorization header is expected'}, 401)

        parts = auth.split()

        if parts[0].lower() != 'bearer':
            return handle_error({'code': 'invalid_header',
                                'description':
                                    'Authorization header must start with'
                                    'Bearer'}, 401)
        elif len(parts) == 1:
            return handle_error({'code': 'invalid_header',
                                'description': 'Token not found'}, 401)
        elif len(parts) > 2:
            return handle_error({'code': 'invalid_header',
                                'description': 'Authorization header must be'
                                 'Bearer + \s + token'}, 401)

        token = parts[1]
        jsonurl = urllib.urlopen('https://'+auth0_domain+'/.well-known/jwks.json')
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=unverified_header['alg'],
                    audience=api_audience,
                    issuer='https://'+auth0_domain+'/'
                )
            except jwt.ExpiredSignatureError:
                return handle_error({'code': 'token_expired',
                                    'description': 'token is expired'}, 401)
            except jwt.JWTClaimsError:
                return handle_error({'code': 'invalid_claims',
                                    'description': 'incorrect claims, please check the audience and issuer'}, 401)
            except Exception:
                return handle_error({'code': 'invalid_header',
                                    'description': 'Unable to parse authentication'
                                    ' token.'}, 400)

            _app_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        return handle_error({'code': 'invalid_header',
                             'description': 'Unable to find appropriate key'}, 400)    
    return decorated
```

## Use this Decorator in your Methods

You can now use the decorator in any routes that require authentication.

${snippet(meta.snippets.use)}

## Make a Call to your API

You can now make requests to your secure API by providing the `access_token` as an `Authorization` header in your requests.

```har
{
  "method": "GET",
  "url": "http://localhost:8000/path_to_your_api",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ACCESS_TOKEN_HERE" }
  ]
}
```
