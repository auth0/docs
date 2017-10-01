---
title: Authorization
description: This tutorial dmonstrates how to use Auth0 to add authorization to your Django REST Framework API.
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

This guide demonstrates how to add authorization to your Python API using [Django REST Framework](http://www.django-rest-framework.org/).

## Install the Dependencies

 Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt'.

```python
django
djangorestframework
djangorestframework-jwt
cryptography
python-jose
```

## Create a Django Project

This guide assumes you already have a Django application set up. If that is not the case, follow the steps in the [Django Tutorial](https://docs.djangoproject.com/en/1.11/intro/tutorial01/)

The sample project was created with the following commands:

```bash
$ django-admin startproject apiexample
$ cd apiexample
$ python manage.py startapp auth0authorization
```

## Django Settings

The `settings.py` file contains the configuration of the Django project.

Add the following imports in `settings.py` file.

```python
# apiexample\settings.py

import json
from six.moves.urllib import request

from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
```

Add `rest_framework` app to the `INSTALLED_APPS` entry.

```python
# apiexample\settings.py

INSTALLED_APPS = [
    # ...
    'rest_framework'
]
```

Add `JSONWebTokenAuthentication` to Django REST framework's `DEFAULT_AUTHENTICATION_CLASSES`.

```python
# apiexample\settings.py

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

By default, your API will be set up to use RS256 as the algorithm for signing tokens. Since RS256 works by using a private/public keypair, tokens can be verified against the public key for your Auth0 account. This public key is accessible at [https://${account.namespace}/.well-known/jwks.json](https://${account.namespace}/.well-known/jwks.json). 

Obtain the public key from your [JWKS](/jwks). Then set the settings for [REST Framework JWK](http://getblimp.github.io/django-rest-framework-jwt/).

Set the 'JWT_
```python
# apiexample\settings.py

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

## Add a Django User

You need to define a way to map the username from the `access_token` payload to the Django authentication system user.

Create `user.py` file in your application's folder and define a function that maps the  `sub` field from the `access_token` to the username.

```python
# auth0authorization/user.py

def jwt_get_username_from_payload_handler(payload):
    return payload.get('sub')
```

Then create a user in Django authentication system. Please check the Django documentation [Django documentation](https://docs.djangoproject.com/en/1.11/topics/auth/default/#creating-users) for more information. 

## Protect Individual Endpoints

In the file `views.py` add `public` and `private` endpoints. Add the `@api_view` decorator to the `private` endpoint to indicate that the method requires authentication.

```python
# auth0authorization\views.py

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

## Configure the Scopes

To configure scopes, click the Scopes section of the [Dashboard's APIs section](${manage_url}/#/apis) and configure the scopes you need.

::: note
This example uses the read:messages scopes.
:::

API endpoints can be configured to look for a particular `scope` in the `access_token`.

Add the following methods to the `views.py` file to extract the granted scopes from the access_token.

```python
# auth0authorization\views.py

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

Use the decorator in the methods that require specific scopes granted. The method below requires the `read:messages` scope granted. 

```python
# auth0authorization\views.py

@api_view(['GET'])
@requires_scope('read:messages')
def private_scoped(request):
    return HttpResponse("All good. You're authenticated and the access token has the appropriate scope")
```

## Add URL Mappings

In previous steps we added methods to the `views.py` file. We need to map those methods to URLs.

Django has a [URL dispatcher](
https://docs.djangoproject.com/en/1.11/topics/http/urls/) that lets you map URL patterns to views.

Create the file `urls.py` in your application folder. Add the URLs patterns.

```python
// auth0authorization/views.py

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^api/public/', views.public),
    url(r'^api/private/', views.private),
    url(r'^api/private-scoped/', views.private_scoped),
]
```

The Django project also has a `urls.py` file. Add a reference to your applications `urls.py` file.

```python
// apiexample/urls.py

from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('auth0authorization.urls'))
]
```

<%= include('../_includes/_call_api') %>
