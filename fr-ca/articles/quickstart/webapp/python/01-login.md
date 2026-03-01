---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Python web Application built with the Flask framework and Authlib OAuth library.
budicon: 448
contentType: tutorial
useCase: quickstart
topics:
  - quickstarts
  - webapp
  - login
  - python
  - flask
github:
    path: 01-Login
---
<%= include('../_includes/_getting_started', { library: 'Python', callback: 'http://localhost:3000/callback' }) %>

<%= include('../../../_includes/_logout_url', { returnTo: 'http://localhost:3000' }) %>

## Install dependencies

For the purposes of this example, we'll be using the [Authlib](https://authlib.org/) OAuth library and [Flask](https://flask.palletsprojects.com/en/2.0.x/).

Begin by creating a `requirements.txt` file in your project directory:

```python
# 📁 requirements.txt -----

flask>=2.0.3
python-dotenv>=0.19.2
authlib>=1.0
requests>=2.27.1
```

You should now run `pip install -r requirements.txt` from your shell to make these dependencies available to your project.

## Configure your `.env` file

Next, create an `.env` file in your project directory. This file will hold your client keys and other configuration details.

```ini
# 📁 .env -----

AUTH0_CLIENT_ID=${account.clientId}
AUTH0_CLIENT_SECRET=${account.clientSecret}
AUTH0_DOMAIN=${account.namespace}
APP_SECRET_KEY=

```

- Generate a suitable string for `APP_SECRET_KEY` using `openssl rand -hex 32` from your shell.

## Setup your application

Now you're ready to start writing your application. Create a `server.py` file in your project directory - this file will hold all of your application logic.

Begin by importing all the libraries your application will be making use of:

```python
# 📁 server.py -----

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for
```

Next, your application will need to load the configuration `.env` file you made in the previous step:

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)
```

Now you can configure Flask for your application's needs:

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")
```

Finally, you can now configure Authlib to handle your application's authentication with Auth0:

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)
```

You can learn more about the configuration options available for Authlib's OAuth `register()` method from [their documentation.](https://docs.authlib.org/en/latest/client/frameworks.html#using-oauth-2-0-to-log-in)

## Setup your routes

For this demonstration, we'll be adding 4 routes for your application: your login, callback, logout and home routes.

### Triggering authentication with `/login`
When visitors to your app visit the `/login` route, they'll be redirected to Auth0 to begin the authentication flow.

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )
```

### Finalizing authentication with `/callback`
After your users finish logging in with Auth0, they'll be returned to your application at the `/callback` route. This route is responsible for actually saving the session for the user, so when they visit again later, they won't have to sign back in all over again.

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("/")
```

### Clearing a session with `/logout`
As you might expect, this route handles signing a user out from your application. It will clear the user's session in your app, and briefly redirect to Auth0's logout endpoint to ensure their session is completely clear, before they are returned to your home route (covered next.)

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )
```

### There's no place like `/home`
Last but not least, your home route will serve as a place to either render an authenticated user's details, or offer to allow visitors to sign in.

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

@app.route("/")
def home():
    return render_template("home.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))
```

### Server instantiation
Finally, you'll need to add some small boilerplate code for Flask to actually run your app and listen for connections.

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
```

## Add templates

Now we just need to create the simple template files used in the routes about (during `render_template()` calls).

Create a new sub-directory in your project folder named `templates`, and create two files within: `dashboard.html` and `home.html`. You can paste the content from the two fields below into those files, respectfully:

```html
# 📁 templates/home.html -----

<html>
  <head>
    <meta charset="utf-8" />
    <title>Auth0 Example</title>
  </head>
  <body>
    {% if session %}
        <h1>Welcome {{session.userinfo.name}}!</h1>
        <p><a href="/logout">Logout</a></p>
        <div><pre>{{pretty}}</pre></div>
    {% else %}
        <h1>Welcome Guest</h1>
        <p><a href="/login">Login</a></p>
    {% endif %}
  </body>
</html>
```

## Run your application

You're ready to run your application! From your project directory, open a shell and use:

```sh
python3 server.py
```

Your application should now be ready to open from your browser at [http://localhost:3000](http://localhost:3000).
