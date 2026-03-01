---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Python web application built with the Django framework and Authlib OAuth library.
budicon: 448
contentType: tutorial
useCase: quickstart
topics:
  - quickstarts
  - webapp
  - login
  - python
  - django
github:
    path: 01-Login
---
<%= include('../_includes/_getting_started', { library: 'Python', callback: 'http://localhost:3000/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Create application

For this guide we demonstrate how to integrate Auth0 with a Python application using the [Django framework](https://www.djangoproject.com/) and [Authlib](https://authlib.org/). Let's start by ensuring Django is installed on your system. From your shell, run the following command:

```sh
pip install django~=4.0
```

If you already have a Python application setup, you can skip to the next step. Otherwise, let's create our new application project. From your shell, run the following command, and switch to the new project folder:

```sh
django-admin startproject webappexample
cd webappexample
```

## Install dependencies

For this integration you'll need few library dependencies, such as Authlib. Go ahead and create a `requirements.txt` file in your project directory, and include the following:

```python
# 📁 requirements.txt -----

authlib ~= 1.0
django ~= 4.0
python-dotenv ~= 0.19
requests ~= 2.27
```

You should now run `pip install -r requirements.txt` from your shell to make these dependencies available to your project.

## Configure your `.env` file

Next, create an `.env` file in your project directory. This file will hold your client keys and other configuration details.

```ini
# 📁 .env -----

AUTH0_CLIENT_ID=${account.clientId}
AUTH0_CLIENT_SECRET=${account.clientSecret}
AUTH0_DOMAIN=${account.namespace}
```

## Update `settings.py`

You'll want to make some minor changes to your `webappexample/settings.py` file to read those `.env` values. At the top of the file, add these imports:

```python
# 📁 webappexample/settings.py -----

import os
from dotenv import load_dotenv, find_dotenv
```

Next, beneath the 'BASE_DIR' definition, add the following:

```python
# 📁 webappexample/settings.py -----

# Add the following line after 'BASE_DIR = ...'
TEMPLATE_DIR = os.path.join(BASE_DIR, "webappexample", "templates")
```

Next, find the `TEMPLATES` variable and update the `DIRS` value to add our `TEMPLATE_DIR` string. This tells Django where to look for our template files, once we create them. Keep any other content of this array the same.

```python
# 📁 webappexample/settings.py -----

TEMPLATES = [
    {
        # Leave other lines as they are; we're just updating `DIRS`.
        "DIRS": [TEMPLATE_DIR],
    },
]
```

Finally, at the end of this file, add the following:

```python
# 📁 webappexample/settings.py -----

# Load environment definition file
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)


# Load Auth0 application settings into memory
AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN")
AUTH0_CLIENT_ID = os.environ.get("AUTH0_CLIENT_ID")
AUTH0_CLIENT_SECRET = os.environ.get("AUTH0_CLIENT_SECRET")
```

## Setup your application

Now you're ready to start writing your application. Open the `webappexample/views.py` file in your project director.

Begin by importing all the libraries your application will be making use of:

```python
# 📁 webappexample/views.py -----

import json
from authlib.integrations.django_client import OAuth
from django.conf import settings
from django.shortcuts import redirect, render
from django.urls import reverse
from urllib.parse import quote_plus, urlencode
```

Now you can configure Authlib to handle your application's authentication with Auth0:

```python
# 👆 We're continuing from the steps above. Append this to your webappexample/views.py file.

oauth = OAuth()

oauth.register(
    "auth0",
    client_id=settings.AUTH0_CLIENT_ID,
    client_secret=settings.AUTH0_CLIENT_SECRET,
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f"https://{settings.AUTH0_DOMAIN}/.well-known/openid-configuration",
)
```

You can learn more about the configuration options available for Authlib's OAuth `register()` method from [their documentation.](https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in)

## Setup your route handlers

For this demonstration, we'll be adding 4 routes for your application: your login, callback, logout and index routes.

### Triggering authentication with `/login`
When visitors to your app visit the `/login` route, they'll be redirected to Auth0 to begin the authentication flow.

```python
# 👆 We're continuing from the steps above. Append this to your webappexample/views.py file.

def login(request):
    return oauth.auth0.authorize_redirect(
        request, request.build_absolute_uri(reverse("callback"))
    )
```

### Finalizing authentication with `/callback`
After your users finish logging in with Auth0, they'll be returned to your application at the `/callback` route. This route is responsible for actually saving the session for the user, so when they visit again later, they won't have to sign back in all over again.

```python
# 👆 We're continuing from the steps above. Append this to your webappexample/views.py file.

def callback(request):
    token = oauth.auth0.authorize_access_token(request)
    request.session["user"] = token
    return redirect(request.build_absolute_uri(reverse("index")))
```

### Clearing a session with `/logout`
As you might expect, this route handles signing a user out from your application. It will clear the user's session in your app, and briefly redirect to Auth0's logout endpoint to ensure their session is completely clear, before they are returned to your home route (covered next.)

```python
# 👆 We're continuing from the steps above. Append this to your webappexample/views.py file.

def logout(request):
    request.session.clear()

    return redirect(
        f"https://{settings.AUTH0_DOMAIN}/v2/logout?"
        + urlencode(
            {
                "returnTo": request.build_absolute_uri(reverse("index")),
                "client_id": settings.AUTH0_CLIENT_ID,
            },
            quote_via=quote_plus,
        ),
    )
```

### There's no place like `/home`
Last but not least, your home route will serve as a place to either render an authenticated user's details, or offer to allow visitors to sign in.

```python
# 👆 We're continuing from the steps above. Append this to your webappexample/views.py file.

def index(request):
    return render(
        request,
        "index.html",
        context={
            "session": request.session.get("user"),
            "pretty": json.dumps(request.session.get("user"), indent=4),
        },
    )
```

### Register your routes
Finally, you'll need to tell Django how to connect these new routes. Replace the contents of your `webappexample/urls.py` file with the following:

```python
# 📁 webappexample/urls.py -----

from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout"),
    path("callback", views.callback, name="callback"),
]

```

## Add templates

Now we just need to create the simple template files used in the routes about (during `render()` calls).

Create a new sub-directory within the `webappexample` folder named `templates`, and create a `index.html` file:

```html
# 📁 webappexample/templates/index.html -----

<html>
  <head>
    <meta charset="utf-8" />
    <title>Auth0 Example</title>
  </head>
  <body>
    {% if session %}
    <h1>Welcome {{session.userinfo.name}}!</h1>
    <p><a href="{% url 'logout' %}">Logout</a></p>
    <div><pre>{{pretty}}</pre></div>
    {% else %}
    <h1>Welcome Guest</h1>
    <p><a href="{% url 'login' %}">Login</a></p>
    {% endif %}
  </body>
</html>

```

## Run your application

You're ready to run your application! From your project directory, open a shell and use:

```sh
python3 manage.py migrate
python3 manage.py runserver 3000
```

Your application should now be ready to open from your browser at [http://localhost:3000](http://localhost:3000).
