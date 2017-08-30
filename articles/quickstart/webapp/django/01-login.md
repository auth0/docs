---
title: Login
default: true
description: This tutorial demonstrates how to use the Social Auth App Django to add authentication and authorization to your web app
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application
you can follow the tutorial steps.

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

## Specify the Callback URLs

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```text
http://yourUrl/callback
```

## Add the Dependencies

Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`

```text
django
social-auth-app-django
python-jose
six
```
## Django User Authentication System

The Django comes with a user authentication system that handles users accounts, groups, permissions and cookie-based 
user sessions. The system ley you handle both authentication and authorization.

You use the authentication framework and its default models to manage user storage.
Also has middleware to manage session across requests and associate users with request.

## Create Django project

To create a Django project you’ll need to auto-generate some code that establishes a Django project.
From the command line into a directory where you’d like to store your code, run the following command:

```bash
$ django-admin startproject mysite
```

Where `mysite` is the name of the project.

Then to create your app, make sure you’re in the same directory as manage.py and type this command:

```bash
$ python manage.py startapp YOUR_DJANGO_APP_NAME
```

Where `YOUR_DJANGO_APP_NAME` is the name of your app.

## Django Settings

A Django settings file contains all the configuration of your Django installation.
Add the following settings in `settings.py` file.

First add the applications `social_django` to add the default Django ORM and `YOUR_DJANGO_APP_NAME` 
into `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'social_django',
    'YOUR_DJANGO_APP_NAME'
]
```

Add the client secret and client id, scope and and domain of the client application.
You can get this information from your [client settings](/#/applications/${account.clientId}/settings).

```python
SOCIAL_AUTH_AUTH0_KEY = '${account.clientId}'
SOCIAL_AUTH_AUTH0_SECRET = '${account.clientSecret}'
SOCIAL_AUTH_AUTH0_SCOPE = [
    'openid',
    'profile'
]
SOCIAL_AUTH_AUTH0_DOMAIN = '${account.namespace}'
```

Register the necessary authentication backend in the `AUTHENTICATION_BACKENDS`. You have to add the custom backend 
for `Auth0` and `ModelBackend` to users be able to login with username/password method.

```python
AUTHENTICATION_BACKENDS = {
    'YOUR_DJANGO_APP_NAME.auth0backend.Auth0',
    'django.contrib.auth.backends.ModelBackend'
}
```

Configure the login, redirect login and redirect logout URLs.

```python
LOGIN_URL = "/login/auth0"
LOGIN_REDIRECT_URL = "/dashboard"
LOGOUT_REDIRECT_URL = "/"
```

Some of the needed applications in `INSTALLED_APPS` makes use of database, so we need to create the tables in the 
database before we can use them. To do that, run the following command:

```bash
$ python manage.py migrate
```

## Create the Auth0 Authentication Backend

Create a file to implement the custom `Auth0` authentication backend. To do that you have to extends BaseOAuth2 class.

```python
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

## Add the URLs

In the file `urls.py` add the following URLs:

```python
urlpatterns = [
    url('^$', views.index),
    url(r'^dashboard', views.dashboard),
    url(r'^', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^', include('social_django.urls', namespace='social')),
]
```

## Trigger Login with Social-Auth-App-Django

First add `index` in your `views.py` to render the `index.html`:

```python
def index(request):
    return render(request, 'index.html')
```

Now, add a link to Log In in the `index.html` template:

```html
<div class="login-box auth0-box before">
    <img src="https://i.cloudup.com/StzWWrY34s.png" />
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a class="btn btn-primary btn-lg btn-login btn-block" href="/login/auth0">Log In</a>
</div>
```

## Access user information

Django user authentication system attach the user in the request so we can get the user information from the request.

```python
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

Then display the user information in the `dashboard.htm` template.

```html
<div class="logged-in-box auth0-box logged-in">
    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
    <img class="avatar" src="{{ auth0User.extra_data.picture }}"/>
    <h2>Welcome {{ user.username }}</h2>
    <pre>{{ userdata }}</pre>
</div>
```

[Click here](/user-profile) to check all the information that the userinfo hash has.

## Logout

To logout a user, just simply add a link to `/logout` URL in the `dashboard.html` template:

```html
<div class="logged-in-box auth0-box logged-in">
    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
    <img class="avatar" src="{{ auth0User.extra_data.picture }}"/>
    <h2>Welcome {{ user.username }}</h2>
    <pre>{{ userdata }}</pre>
    <a class="btn btn-primary btn-lg btn-logout btn-block" href="/logout">Logout</a>
</div>
```
