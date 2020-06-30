---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Django application using Auth0.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - django
github:
  path: 01-Login
contentType: tutorial
useCase: quickstart
---
<%= include('../_includes/_getting_started', { library: 'Django', callback: 'http://localhost:3000/complete/auth0' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Create a Django Application configured to use Auth0

This guide will use [`social_django`](https://github.com/python-social-auth/social-app-django) which is the Django implementation of [Python Social Auth](http://python-social-auth.readthedocs.io/en/latest/). It adds an OAuth stack to the [user authentication & authorization system](https://docs.djangoproject.com/en/2.1/topics/auth/) bundled by the Django Web Framework.

::: note
This quickstart uses Django 2, if you are using Django 1 instead, follow the [sample](https://github.com/auth0-samples/auth0-django-web-app/tree/v1).
:::

### Install the Dependencies

Add the following dependencies to your `requirements.txt`:

```text
django~=2.1
social-auth-app-django~=3.1
python-jose~=3.0
python-dotenv~=0.9
```

Once the dependencies are listed in requirements.txt, run the following command:

```bash
pip install -r requirements.txt
```

### Create a Django Project

This guide assumes you already have a Django application set up. If that is not the case, follow the steps in the [Django Tutorial](https://docs.djangoproject.com/en/2.1/intro/tutorial01/).

The sample project was created with the following commands:

```bash
$ django-admin startproject webappexample
$ cd webappexample
$ python manage.py startapp auth0login
```

### Django Settings

The `settings.py` file contains the configuration of your Django project.

Add one entry for `social_django` and for your application into the `INSTALLED_APPS` entry.

```python
# webappexample\settings.py

INSTALLED_APPS = [
    'social_django',
    '<your application name>'  # such as 'webappexample'
]
```

1) Set the **Callback URL** in the [Application Settings](${manage_url}/#/applications/${account.clientId}/settings) to:
Add your Auth0 domain, the Client Id and the Client Secret. You can get this information the [application settings](#/applications/${account.clientId}/settings) in the Auth0 Dashboard.


```python
# webappexample\settings.py

SOCIAL_AUTH_TRAILING_SLASH = False  # Remove trailing slash from routes
SOCIAL_AUTH_AUTH0_DOMAIN = '${account.namespace}'
SOCIAL_AUTH_AUTH0_KEY = '${account.clientId}'
SOCIAL_AUTH_AUTH0_SECRET = 'YOUR_CLIENT_SECRET'
```

Set the `SOCIAL_AUTH_AUTH0_SCOPE` variable with the scopes the application will request when authenticating. Check the [Scopes documentation](/scopes) for more information.

```python
# webappexample\settings.py

SOCIAL_AUTH_AUTH0_SCOPE = [
    'openid',
    'profile',
    'email'
]
```

### Initialize the Database

The `social_django` application defined in `INSTALLED_APPS` requires a database. Run the following command to create all the required databases for the applications defined in `INSTALLED_APPS`:

```bash
$ python manage.py migrate
```

### Create the Auth0 Authentication Backend

The `social_django` application is now configured. The next step is to create an authentication backend that bridges `social_django` with Auth0.

Create a file to implement the custom `Auth0` authentication backend.

```python
# auth0login/auth0backend.py

from urllib import request
from jose import jwt
from social_core.backends.oauth import BaseOAuth2


class Auth0(BaseOAuth2):
    """Auth0 OAuth authentication backend"""
    name = 'auth0'
    SCOPE_SEPARATOR = ' '
    ACCESS_TOKEN_METHOD = 'POST'
    REDIRECT_STATE = False
    EXTRA_DATA = [
        ('picture', 'picture'),
        ('email', 'email')
    ]

    def authorization_url(self):
        return 'https://' + self.setting('DOMAIN') + '/authorize'

    def access_token_url(self):
        return 'https://' + self.setting('DOMAIN') + '/oauth/token'

    def get_user_id(self, details, response):
        """Return current user id."""
        return details['user_id']

    def get_user_details(self, response):
        # Obtain JWT and the keys to validate the signature
        id_token = response.get('id_token')
        jwks = request.urlopen('https://' + self.setting('DOMAIN') + '/.well-known/jwks.json')
        issuer = 'https://' + self.setting('DOMAIN') + '/'
        audience = self.setting('KEY')  # CLIENT_ID
        payload = jwt.decode(id_token, jwks.read(), algorithms=['RS256'], audience=audience, issuer=issuer)

        return {'username': payload['nickname'],
                'first_name': payload['name'],
                'picture': payload['picture'],
                'user_id': payload['sub'],
                'email': payload['email']}
```

::: note
The callback URL will be calculated by `social-auth` by concatenating `/callback` with the backend `name` property, so it will be `/callback/auth0`.
:::

Register the authentication backends in `settings.py`. Add the custom backend for `Auth0` and `ModelBackend` for users to be able to login with username/password method.

```python
# webappexample\settings.py

AUTHENTICATION_BACKENDS = {
    'YOUR_DJANGO_APP_NAME.auth0backend.Auth0',
    'django.contrib.auth.backends.ModelBackend'
}
```

Configure the login, redirect login and redirect logout URLs as set below. The LOGIN_URL ends with `auth0` as it needs to match the `name` property of the custom backend defined above.

```python
# webappexample\settings.py

LOGIN_URL = '/login/auth0'
LOGIN_REDIRECT_URL = '/dashboard'
```

## Trigger Authentication

Add a handler for the "index" view in your `views.py` to render the `index.html` if the user needs to log in. If the user is already logged in, the "dashboard" view will be shown instead.

```python
# auth0login/views.py

from django.shortcuts import render, redirect

def index(request):
    user = request.user
    if user.is_authenticated:
        return redirect(dashboard)
    else:
        return render(request, 'index.html')
```

Add a link to `/login/auth0` in the `index.html` template.

```html
<!-- auth0login/templates/index.html -->

<div class="login-box auth0-box before">
    <img src="https://i.cloudup.com/StzWWrY34s.png" />
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a class="btn btn-primary btn-lg btn-login btn-block" href="/login/auth0">Log In</a>
</div>
```

## Display User Information

After the user is logged in, you can access the user information from the `request.user` property. Add a handler for the `/dashboard` endpoint in the `views.py` file. This same "dashboard" view will be displayed when a user that is already logged in tries to visit the "index" view. 

```python
# auth0login/views.py

from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
import json

@login_required
def dashboard(request):
    user = request.user
    auth0user = user.social_auth.get(provider='auth0')
    userdata = {
        'user_id': auth0user.uid,
        'name': user.first_name,
        'picture': auth0user.extra_data['picture'],
        'email': auth0user.extra_data['email'],
    }

    return render(request, 'dashboard.html', {
        'auth0User': auth0user,
        'userdata': json.dumps(userdata, indent=4)
    })
```

Add the following snippet to `dashboard.html` to display the [user information](/users/normalized/oidc).

```html
<!-- auth0login/templates/dashboard.html -->
<div class="logged-in-box auth0-box logged-in">
    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
    <img class="avatar" src="{{ auth0User.extra_data.picture }}"/>
    <h2>Welcome {{ user.username }}</h2>
    <pre>{{ userdata }}</pre>
</div>
```

## Logout

To log a user out, add a link to `/logout` in `dashboard.html`.

```html
<!-- auth0login/templates/dashboard.html -->

<div class="logged-in-box auth0-box logged-in">
    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
    <img class="avatar" src="{{ auth0User.extra_data.picture }}"/>
    <h2>Welcome {{ user.username }}</h2>
    <pre>{{ userdata }}</pre>
    <a class="btn btn-primary btn-lg btn-logout btn-block" href="/logout">Logout</a>
</div>
```

Then, add a `logout` method in `views.py` to clear the session and redirect the user to the Auth0 logout endpoint.

```python
# auth0login/views.py

# ...
from django.contrib.auth import logout as log_out
from django.conf import settings
from django.http import HttpResponseRedirect
from urllib.parse import urlencode

# ...

def logout(request):
    log_out(request)
    return_to = urlencode({'returnTo': request.build_absolute_uri('/')})
    logout_url = 'https://%s/v2/logout?client_id=%s&%s' % \
                 (settings.SOCIAL_AUTH_AUTH0_DOMAIN, settings.SOCIAL_AUTH_AUTH0_KEY, return_to)
    return HttpResponseRedirect(logout_url)
```

## Add URL Mappings

In previous steps, we added methods to the `views.py` file. We need to map those methods to URLs.

Django has a [URL dispatcher](https://docs.djangoproject.com/en/2.1/topics/http/urls/) that lets you map URL patterns to views.

Add mappings for the root folder, the dashboard folder, and the authentication applications in `urls.py`.

```python
# auth0login\urls.py

urlpatterns = [
    path('', views.index),
    path('dashboard', views.dashboard),
    path('logout', views.logout),
    path('', include('django.contrib.auth.urls')),
    path('', include('social_django.urls')),
]
```

## Run the Sample

To run the sample from a terminal, change the directory to the root folder of the project and execute the following line:

```bash
python manage.py migrate
python manage.py runserver 3000
```

The application will be accessible on [http://localhost:3000](http://localhost:3000). Follow the Log In link to log in or sign up to your Auth0 tenant. Upon successful login or signup, you should be redirected to the user's profile page.

![login page](/media/articles/web/hosted-login.png)