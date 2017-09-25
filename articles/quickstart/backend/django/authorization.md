---
title: Authorization
description: This tutorial will show you how to use the Auth0 to add authorization to your Django REST Framework API.
---

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-django-api',
  path: '01-Authorization',
  requirements: [
    'python 2.7, 3.3 and up',
    'django 1.8 and up',
    'djangorestframework 3.0 and up',
    'djangorestframework-jwt 1.11.0',
    'python-jose 1.3.2',
    'cryptography 2.0.3'
  ]
}) %>

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Install the Dependencies

This quickstart demonstrates how to add authorization to your Python API using [Django REST Framework](http://www.django-rest-framework.org/). Add the following dependencies to your `requirements.txt`.

```python
django
djangorestframework
djangorestframework-jwt
cryptography
python-jose
```

## Create Django Project

If you are starting a new Django project, first create a Django project named `mysite`, and then start an app called `myapp`. Run in command line.

```bash
$ django-admin startproject mysite
$ cd mysite
$ python manage.py startapp myapp
```

## Django Settings

Add the necessary imports in `settings.py` file.

```python
import json
from six.moves.urllib import request

from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
```

Add `rest_framework` app to your `INSTALLED_APPS`.

```python
INSTALLED_APPS = [
    # ...
    'rest_framework'
]
```

Then add `JSONWebTokenAuthentication` to Django REST framework's `DEFAULT_AUTHENTICATION_CLASSES`.

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}
```

By default, your API will be set up to use RS256 as the algorithm for signing tokens. Since RS256 works by using a private/public keypair, tokens can be verified against the public key for your Auth0 account. This public key is accessible at [https://${account.namespace}/.well-known/jwks.json](https://${account.namespace}/.well-known/jwks.json). Obtain the public key from your [JWKS](/jwks). Then set the settings for [REST Framework JWK](http://getblimp.github.io/django-rest-framework-jwt/).

```python
jsonurl = request.urlopen("https://${account.namespace}/.well-known/jwks.json")
jwks = json.loads(jsonurl.read())
cert = '-----BEGIN CERTIFICATE-----\n' + jwks['keys'][0]['x5c'][0] + '\n-----END CERTIFICATE-----'

certificate = load_pem_x509_certificate(str.encode(cert), default_backend())
publickey = certificate.public_key()

JWT_AUTH = {
    'JWT_PAYLOAD_GET_USERNAME_HANDLER':
        'authorization.user.jwt_get_username_from_payload_handler',
    'JWT_PUBLIC_KEY': publickey,
    'JWT_ALGORITHM': 'RS256',
    'JWT_AUDIENCE': '${apiIdentifier}',
    'JWT_ISSUER': '${account.namespace}',
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
}
```

## Add the URLs Patterns

In the file `urls.py` from `/mysite` folder add `myapp` URLs patterns.

```python
from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('myapp.urls'))
]
```

Create the file `urls.py` in a `/myapp` folder. Add the URLs patterns.

```python
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^api/public/', views.public),
    url(r'^api/private/', views.private),
    url(r'^api/private-scoped/', views.private_scoped),
]

```

## Django User

Create `user.py` file in `/myapp` folder and define the function to map the username from payload to Django authentication system user. Use `sub` field from payload as username.

```python
def jwt_get_username_from_payload_handler(payload):
    return payload.get('sub')
```

Then create a user in Django authentication system. Please check the Django documentation [Django documentation](https://docs.djangoproject.com/en/1.11/topics/auth/default/#creating-users) for more information. For username you should use `sub` field obtained from `access_token` payload.

## Authorization

In the file `views.py` add `public` and `private` endpoints. Add the decorator `@api_view` to the methods that requires authentication.

```python
from functools import wraps

from rest_framework.decorators import api_view
from django.http import HttpResponse
from jose import jwt

def public(request):
    return HttpResponse("All good. You don't need to be authenticated to call this")


@api_view(['GET'])
def private(request):
    return HttpResponse("All good. You only get this message if you're authenticated")
```

## Protect Individual Endpoints

Individual endpoints can be configured to look for a particular `scope` in the `access_token` by using the following.

```python
def get_token_auth_header(request):
    """Obtains the access token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token

def requires_scope(required_scope):
    """Determines if the required scope is present in the access token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            unverified_claims = jwt.get_unverified_claims(token)
            token_scopes = unverified_claims["scope"].split()
            for token_scope in token_scopes:
                if token_scope == required_scope:
                    return f(*args, **kwargs)
            return HttpResponse("You don't have access to this resource")
        return decorated
    return require_scope
```

Then, establish what scopes are needed in order to access the method. In this case `example:scope` is used.

```python
@api_view(['GET'])
@requires_scope('example:scope')
def private_scoped(request):
    return HttpResponse("All good. You're authenticated and the access token has the appropriate scope")
```

<%= include('../_includes/_call_api') %>
