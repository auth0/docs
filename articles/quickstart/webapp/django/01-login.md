---
title: Login
default: true
description: This tutorial demonstrates how integrate Auth0 with a Django Web Applcation.
budicon: 448
---

You can get started by either downloading the complete project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-django-samples',
  path: '01-Login',
  requirements: [
    'Python 2.7, 3.0 and up',
    'Django 1.11 and up',
    'social-auth-app-django 1.2.0 and up',
    'python-jose 1.3.2 and up',
    'Six 1.10.0 and up'
  ]
}) %>

<%= include('../_includes/_getting_started', { library: 'Djangos', callback: 'http://localhost:8000/complete/auth0' }) %>

## Add the Dependencies

Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`

```text
django
social-auth-app-django
python-jose
six
```

## Creating a Django project

This tutorial assumes you already have a Django application set up. If that is not the case, follow the steps in the [Django Tutorial](https://docs.djangoproject.com/en/1.11/intro/tutorial01/).

The sample project was created with the following command:

```bash
$ django-admin startproject webappexample
```

The sample application was created with the following command:

```bash
$ python manage.py startapp auth0login
```

## Django User Authentication System

The Django Web Framework bundles a [user authentication & authorization system[(https://docs.djangoproject.com/en/1.11/topics/auth/)] that handles users accounts, groups, permissions and cookie-based user sessions. This tutorial will use it.

## Django Settings

The `settings.py` file contains the configuration of your Django project. 

Add one entry for `social_django` and your application into the `INSTALLED_APPS` entry.

```python
# webappexample\settings.py

INSTALLED_APPS = [
    'social_django',
    '<your application name>'  # e.g. 'webappexample'
]
```

Add your Auth0 domain, the Client Id and the Client Secret. You can get this information the [client settings](/#/applications/${account.clientId}/settings) in the Auth0 Dashboard.


```python
# webappexample\settings.py

SOCIAL_AUTH_TRAILING_SLASH = False                    # Remove end slash from routes
SOCIAL_AUTH_AUTH0_DOMAIN = '${account.namespace}'
SOCIAL_AUTH_AUTH0_KEY = '${account.clientId}'
SOCIAL_AUTH_AUTH0_SECRET = '${account.clientSecret}'
```

Set the SOCIAL_AUTH_AUTH0_SCOPE variable with scopes the application will request when authenticating. Check the [Scopes documentation](scopes/current) for more information.

```python
# webappexample\settings.py

SOCIAL_AUTH_AUTH0_SCOPE = [
    'openid',
    'profile'
]
```

## Initialize the Database

The `social_django` application defined in `INSTALLED_APPS` makes use of database. The following command will create the required databases for all the applications defined in  `INSTALLED_APPS`:

```bash
$ python manage.py migrate
```

## Create the Auth0 Authentication Backend

Up to now we configured `social_django`. The next step is to create an Authentication Backend that bridges `social_django' with Auth0.

Create a file to implement the custom `Auth0` authentication backend.

```python
# auth0login/auth0backend.py

from six.moves.urllib import request
from jose import jwt
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
        # Obtain JWT and the keys to validate the signature
        idToken = response.get('id_token')
        jwks = request.urlopen("https://" + self.setting('DOMAIN') + "/.well-known/jwks.json")
        issuer = "https://" + self.setting('DOMAIN') + "/"
        audience = self.setting('KEY') #CLIENT_ID
        # Decode the jwt to get the user information
        payload = jwt.decode(idToken, jwks.read(), algorithms=['RS256'], audience=audience, issuer=issuer)
        
        return {'username': payload['nickname'],
                'email': payload['email'],
                'first_name': payload['name'],
                'picture': payload['picture'],
                'user_id': payload['user_id']}
```


Register the authentication backends in `settings.py` . You have to add the custom backend for `Auth0` and `ModelBackend` to users be able to login with username/password method.

```python
# webappexample\settings.py

AUTHENTICATION_BACKENDS = {
    'YOUR_DJANGO_APP_NAME.auth0backend.Auth0',
    'django.contrib.auth.backends.ModelBackend'
}
```

Configure the login, redirect login and redirect logout URLs. The 'auth0' part of the LOGIN_URL needs to match the 'name' of the custom backend defined above.

```python
# webappexample\settings.py

LOGIN_URL = "/login/auth0"
LOGIN_REDIRECT_URL = "/dashboard"
LOGOUT_REDIRECT_URL = "/"
```

## Define Django Routes

In `urls.py` add the following URLs:

```python
# auth0login\urls.py

urlpatterns = [
    url('^$', views.index),
    url(r'^dashboard', views.dashboard),
    url(r'^', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^', include('social_django.urls', namespace='social')),
]
```

## Trigger Login with Social-Auth-App-Django

Add a handler for the Index view in your `views.py` to render the `index.html`:

```python
# auth0login/views.py

def index(request):
    return render(request, 'index.html')
```

Add a link to Log In in the `index.html` template.

```html
<!-- auth0login/templates/index.html -->

<div class="login-box auth0-box before">
    <img src="https://i.cloudup.com/StzWWrY34s.png" />
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a class="btn btn-primary btn-lg btn-login btn-block" href="/login/auth0">Log In</a>
</div>
```

## Access User Information

After the user is logged in, you can access the user information from the `request.user` property. Add a handler for the /dashboard route in the `views.py` file.

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

Add the following snippet to `dashboard.html` to display the [user information](https://auth0.com/docs/user-profile/normalized/oidc).

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

To logout a user, add a link to `/logout` URL in `dashboard.html`:

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
