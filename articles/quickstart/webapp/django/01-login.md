---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Django application using Auth0.
budicon: 448
github:
  path: 01-Login
---
<%= include('../_includes/_getting_started', { library: 'Django', callback: 'http://localhost:3000/complete/auth0' }) %>

## Create a Django Application configured to use Auth0

This guide will use [`social_django`](https://github.com/python-social-auth/social-app-django) which is the Django implementation of [Python Social Auth](http://python-social-auth.readthedocs.io/en/latest/). It adds an OAuth stack to the [user authentication & authorization system](https://docs.djangoproject.com/en/1.11/topics/auth/) bundled by the Django Web Framework.

### Install the Dependencies

Add the following dependencies to your `requirements.txt`:

```text
django
social-auth-app-django
python-dotenv
requests
```

Once the dependencies are listed in requirements.txt, run the following command:

```bash
pip install -r requirements.txt
```

### Create a Django Project

This guide assumes you already have a Django application set up. If that is not the case, follow the steps in the [Django Tutorial](https://docs.djangoproject.com/en/1.11/intro/tutorial01/).

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

Add your Auth0 domain, the Client Id and the Client Secret. You can get this information the [application settings](/#/applications/${account.clientId}/settings) in the Auth0 Dashboard.


```python
# webappexample\settings.py

SOCIAL_AUTH_TRAILING_SLASH = False                    # Remove end slash from routes
SOCIAL_AUTH_AUTH0_DOMAIN = '${account.namespace}'
SOCIAL_AUTH_AUTH0_KEY = '${account.clientId}'
SOCIAL_AUTH_AUTH0_SECRET = 'YOUR_CLIENT_SECRET'
```

Set the `SOCIAL_AUTH_AUTH0_SCOPE` variable with the scopes the application will request when authenticating. Check the [Scopes documentation](/scopes/current) for more information.

```python
# webappexample\settings.py

SOCIAL_AUTH_AUTH0_SCOPE = [
    'openid',
    'profile'
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

import requests
from social_core.backends.oauth import BaseOAuth2


class Auth0(BaseOAuth2):
    """Auth0 OAuth authentication backend"""
    name = 'auth0'
    SCOPE_SEPARATOR = ' '
    ACCESS_TOKEN_METHOD = 'POST'
    EXTRA_DATA = [
        ('picture', 'picture')
    ]
    
    def authorization_url(self):
        """Return the authorization endpoint."""
        return "https://" + self.setting('DOMAIN') + "/authorize"
    
    def access_token_url(self):
        """Return the token endpoint."""
        return "https://" + self.setting('DOMAIN') + "/oauth/token"
    
    def get_user_id(self, details, response):
        """Return current user id."""
        return details['user_id']
    
    def get_user_details(self, response):
        url = 'https://' + self.setting('DOMAIN') + '/userinfo'
        headers = {'authorization': 'Bearer ' + response['access_token']}
        resp = requests.get(url, headers=headers)
        userinfo = resp.json()

        return {'username': userinfo['nickname'],
                'first_name': userinfo['name'],
                'picture': userinfo['picture'],
                'user_id': userinfo['sub']}
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

LOGIN_URL = "/login/auth0"
LOGIN_REDIRECT_URL = "/dashboard"
LOGOUT_REDIRECT_URL = "/"
```

## Trigger Authentication

Add a handler for the `index` view in your `views.py` to render the `index.html`

```python
# auth0login/views.py

def index(request):
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

After the user is logged in, you can access the user information from the `request.user` property. Add a handler for the `/dashboard` endpoint in the `views.py` file.

```python
# auth0login/views.py

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
import json

@login_required
def dashboard(request):
    user = request.user
    auth0user = user.social_auth.get(provider="auth0")
    userdata = {
        'user_id': auth0user.uid,
        'name': user.first_name,
        'picture': auth0user.extra_data['picture']
    }
    
    return render(request, 'dashboard.html', {
        'auth0User': auth0user,
        'userdata': json.dumps(userdata, indent=4)
    })
```

Add the following snippet to `dashboard.html` to display the [user information](/user-profile/normalized/oidc).

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

## Add URL Mappings

In previous steps we added methods to the `views.py` file. We need to map those methods to URLs.

Django has a [URL dispatcher](https://docs.djangoproject.com/en/1.11/topics/http/urls/) that lets you map URL patterns to views.

Add mappings for the root folder, the dashboard folder, and the authentication applications in `urls.py`.

```python
# auth0login\urls.py

urlpatterns = [
    url('^$', views.index),
    url(r'^dashboard', views.dashboard),
    url(r'^', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^', include('social_django.urls', namespace='social')),
]
```
