---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Django REST Framework API.
topics:
    - quickstart
    - backend
    - django
github:
    path: 01-Authorization
contentType: tutorial
useCase: quickstart
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Setup the Django Application

### Install dependencies

 Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`.

```python
cryptography~=2.8
django~=2.2.7
djangorestframework~=3.10.31
django-cors-headers~=3.1.1
drf-jwt~=1.13.3
pyjwt~=1.7.1
requests~=2.22.0
```

### Create a Django project

This guide assumes you already have a Django application set up. If that is not the case, follow the steps in the [Django Tutorial](https://docs.djangoproject.com/en/2.2/intro/tutorial01/).

The sample project was created with the following commands:

```bash
$ django-admin startproject apiexample
$ cd apiexample
$ python manage.py startapp auth0authorization
```

### Add a Django remote user

You need to define a way to map the username from the Access Token payload to the Django authentication system user.

Add [`RemoteUserMiddleware`](https://docs.djangoproject.com/en/2.2/ref/middleware/#django.contrib.auth.middleware.RemoteUserMiddleware) middleware component after `AuthenticationMiddleware` to middleware list.

```python
# apiexample/settings.py

MIDDLEWARE = [
    # ...
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.RemoteUserMiddleware',
]
```

Add `ModelBackend` and `RemoteUserBackend` to the Authentication Backends.

```python
# apiexample/settings.py

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'django.contrib.auth.backends.RemoteUserBackend',
]
```

Create `utils.py` file in your application's folder and define a function that maps the `sub` field from the `access_token` to the username. Then, the [authenticate](https://docs.djangoproject.com/en/2.2/ref/contrib/auth/#django.contrib.auth.backends.RemoteUserBackend.authenticate) method from [RemoteUserBackend](https://docs.djangoproject.com/en/2.2/ref/contrib/auth/#django.contrib.auth.backends.RemoteUserBackend) will create a remote user in the Django authentication system and return a User object for the username.

```python
# auth0authorization/utils.py

from django.contrib.auth import authenticate

def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username
```

## Validate Access Tokens

The `settings.py` file contains the configuration of the Django project.

Add `rest_framework` app to the `INSTALLED_APPS` entry.

```python
# apiexample/settings.py

INSTALLED_APPS = [
    # ...
    'rest_framework'
]
```

Add `JSONWebTokenAuthentication` to Django REST framework's `DEFAULT_AUTHENTICATION_CLASSES`.

```python
# apiexample/settings.py

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

Configure the [Django REST Framework JWK](https://github.com/Styria-Digital/django-rest-framework-jwt/) by setting the `JWT_AUTH` variable.

Set the `JWT_AUDIENCE` to your API identifier and the `JWT_ISSUER` to your Auth0 domain. By default, those values will be retrieved from the `.env` file.

```python
# apiexample/settings.py

JWT_AUTH = {
    'JWT_PAYLOAD_GET_USERNAME_HANDLER':
        'auth0authorization.utils.jwt_get_username_from_payload_handler',
    'JWT_DECODE_HANDLER':
        'auth0authorization.utils.jwt_decode_token',
    'JWT_ALGORITHM': 'RS256',
    'JWT_AUDIENCE': '${apiIdentifier}',
    'JWT_ISSUER': 'https://${account.namespace}/',
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
}
```

Create the function to fetch the JWKS from your Auth0 account to verify and decode the incoming Access Token.

```python
# auth0authorization/utils.py

import json

import jwt
import requests

def jwt_decode_token(token):
    header = jwt.get_unverified_header(token)
    jwks = requests.get('https://{}/.well-known/jwks.json'.format('${account.namespace}')).json()
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise Exception('Public key not found.')

    issuer = 'https://{}/'.format('${account.namespace}')
    return jwt.decode(token, public_key, audience='${apiIdentifier}', issuer=issuer, algorithms=['RS256'])
```

### Validate scopes

Add the following methods to the `views.py` file to create a decorator that will check the granted scopes from the `access_token`.

```python
# auth0authorization/views.py

from functools import wraps
import jwt

from django.http import JsonResponse

def get_token_auth_header(request):
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    parts = auth.split()
    token = parts[1]

    return token

def requires_scope(required_scope):
    """Determines if the required scope is present in the Access Token
    Args:
        required_scope (str): The scope required to access the resource
    """
    def require_scope(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return f(*args, **kwargs)
            response = JsonResponse({'message': 'You don\'t have access to this resource'})
            response.status_code = 403
            return response
        return decorated
    return require_scope
```

## Protect API Endpoints 

<%= include('../_includes/_api_endpoints') %>

In the file `views.py` add `public` and `private` endpoints. Add the `@api_view` decorator to all the endpoints to indicate that the method requires authentication. Lastly, add the decorator `@permission_classes([AllowAny])` to the `public` endpoint to accept unauthenticated requests.

```python
# auth0authorization/views.py

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@api_view(['GET'])
@permission_classes([AllowAny])
def public(request):
    return JsonResponse({'message': 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'})


@api_view(['GET'])
def private(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated to see this.'})
```

Use the `requires_scope` decorator in the methods that require specific scopes granted. The method below requires the `read:messages` scope granted.

```python
# auth0authorization/views.py

@api_view(['GET'])
@requires_scope('read:messages')
def private_scoped(request):
    return JsonResponse({'message': 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.')
```

### Add URL mappings

In previous steps, we added methods to the `views.py` file. We need to map those methods to URLs.

Django has a [URL dispatcher](https://docs.djangoproject.com/en/2.2/topics/http/urls/) that lets you map URL patterns to views.

Create the file `urls.py` in your application folder. Add the URL patterns.

```python
# auth0authorization/urls.py

from django.urls import path

from . import views

urlpatterns = [
    path('api/public', views.public),
    path('api/private', views.private),
    path('api/private-scoped', views.private_scoped),
]
```

The Django project also has a `urls.py` file. Add a reference to your application's `urls.py` file.

```python
# apiexample/urls.py

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('auth0authorization.urls'))
]
```
