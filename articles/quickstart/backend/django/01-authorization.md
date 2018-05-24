---
title: Authorization
description: This tutorial demonstrates how to add authorization to a Django REST Framework API.
github:
    path: 01-Authorization
---

<%= include('../../../_includes/_api_auth_intro') %>

<%= include('../_includes/_api_create_new') %>

<%= include('../_includes/_api_auth_preamble') %>

## Setup the Django Application

### Install dependencies

 Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`.

```python
django
djangorestframework
djangorestframework-jwt
cryptography
pyjwt
python-dotenv
```

### Create a Django project

This guide assumes you already have a Django application set up. If that is not the case, follow the steps in the [Django Tutorial](https://docs.djangoproject.com/en/1.11/intro/tutorial01/).

The sample project was created with the following commands:

```bash
$ django-admin startproject apiexample
$ cd apiexample
$ python manage.py startapp auth0authorization
```

### Add a Django remote user

You need to define a way to map the username from the `access_token` payload to the Django authentication system user.

Add [`RemoteUserMiddleware`](https://docs.djangoproject.com/en/1.11/ref/middleware/#django.contrib.auth.middleware.RemoteUserMiddleware) middleware component after `AuthenticationMiddleware` to middleware list.

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

Create `user.py` file in your application's folder and define a function that maps the `sub` field from the `access_token` to the username.

```python
# auth0authorization/user.py

from django.contrib.auth import authenticate

def jwt_get_username_from_payload_handler(payload):
    username = payload.get('sub').replace('|', '.')
    authenticate(remote_user=username)
    return username
```

Then create a remote user in Django authentication system. Please check the [Django documentation](https://docs.djangoproject.com/en/2.0/howto/auth-remote-user/) for more information.

## Validate Access Tokens

The `settings.py` file contains the configuration of the Django project.

Add the following imports in `settings.py` file.

```python
# apiexample/settings.py

import json
from six.moves.urllib import request

from cryptography.x509 import load_pem_x509_certificate
from cryptography.hazmat.backends import default_backend
```

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

Add code to download the JWKS for your Auth0 domain and create a public key variable with it:

```python
# apiexample/settings.py

jsonurl = request.urlopen("https://${account.namespace}/.well-known/jwks.json")
jwks = json.loads(jsonurl.read())
cert = '-----BEGIN CERTIFICATE-----\n' + jwks['keys'][0]['x5c'][0] + '\n-----END CERTIFICATE-----'

certificate = load_pem_x509_certificate(str.encode(cert), default_backend())
publickey = certificate.public_key()
```

Configure the [Django REST Framework JWK](http://getblimp.github.io/django-rest-framework-jwt/) by setting the JWT_AUTH variable. 

Set the `JWT_AUDIENCE` to your API identifier and the `JWT_ISSUER` to your Auth0 domain. By default those values will be retrieved from the `.env` file.

```python
# apiexample/settings.py

JWT_AUTH = {
    'JWT_PAYLOAD_GET_USERNAME_HANDLER':
        'auth0authorization.user.jwt_get_username_from_payload_handler',
    'JWT_PUBLIC_KEY': publickey,
    'JWT_ALGORITHM': 'RS256',
    'JWT_AUDIENCE': '${apiIdentifier}',
    'JWT_ISSUER': '${account.namespace}',
    'JWT_AUTH_HEADER_PREFIX': 'Bearer',
}
```

### Validate scopes

Add the following methods to the `views.py` file to create a decorator that will check the granted scopes from the `access_token`.

```python
# auth0authorization/views.py

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
            unverified_claims = jwt.get_unverified_claims(token)
            token_scopes = unverified_claims["scope"].split()
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

In the file `views.py` add `public` and `private` endpoints. Add the `@api_view` decorator to the `private` endpoint to indicate that the method requires authentication.

```python
# auth0authorization/views.py

from functools import wraps

from rest_framework.decorators import api_view
from django.http import JsonResponse
from jose import jwt

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
    return JsonResponse("Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.")
```

### Add URL mappings

In previous steps we added methods to the `views.py` file. We need to map those methods to URLs.

Django has a [URL dispatcher](https://docs.djangoproject.com/en/1.11/topics/http/urls/) that lets you map URL patterns to views.

Create the file `urls.py` in your application folder. Add the URL patterns.

```python
# auth0authorization/urls.py

from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^api/public$', views.public),
    url(r'^api/private$', views.private),
    url(r'^api/private-scoped$', views.private_scoped),
]
```

The Django project also has a `urls.py` file. Add a reference to your application's `urls.py` file.

```python
# apiexample/urls.py

from django.conf.urls import url, include
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^', include('auth0authorization.urls'))
]
```
