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
AUTH0_DOMAIN=${account.namespace}
AUTH0_CLIENT_SECRET=${account.clientSecret}
AUTH0_CALLBACK_URL=http://localhost:3000/callback
AUTH0_AUDIENCE=
APP_SECRET_KEY=
```

- If you've created an API for your application, set it's identifier as the `AUTH0_AUDIENCE` value.
- Generate a suitable string for `APP_SECRET_KEY` using `openssl rand -hex 32` from your shell.

## Setup your application

Now you're ready to writing your application. Create a `server.py` file in your project directory - this file will hold all of your application logic.

Begin by importing all the libraries your application will be making use of:

```python
# 📁 server.py -----

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, jsonify, redirect, render_template, session, url_for
from werkzeug.exceptions import HTTPException
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

app = Flask(__name__, static_url_path="/public", static_folder="./public")
app.secret_key = env.get("APP_SECRET_KEY")
app.debug = True
```

Although it isn't required, let's use a custom error handler to render more easily read exceptions for your users (and ourselves):

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

@app.errorhandler(Exception)
def handle_auth_error(ex):
    response = jsonify(message=str(ex))
    response.status_code = ex.code if isinstance(ex, HTTPException) else 500
    return response
```

Finally, you can now configure Authlib to handle your application's authentication with Auth0:

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

def fetch_token(name, request):
    token = OAuth2Token.find(name=name, user=request.user)
    return token.to_token()

oauth = OAuth(app)

auth0 = oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    api_base_url="https://" + env.get("AUTH0_DOMAIN"),
    access_token_url="https://" + env.get("AUTH0_DOMAIN") + "/oauth/token",
    authorize_url="https://" + env.get("AUTH0_DOMAIN") + "/authorize",
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url="https://"
        + env.get("AUTH0_DOMAIN")
        + "/.well-known/openid-configuration",
    fetch_token=fetch_token,
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
    return auth0.authorize_redirect(
        redirect_uri=env.get("AUTH0_CALLBACK_URL"), audience=env.get("AUTH0_AUDIENCE")
    )
```

### Finalizing authentication with `/callback`
After your users finish logging in with Auth0, they'll be returned to your application at the `/callback` route. This route is responsible for actually saving the session for the user, so when they visit again later, they won't have to sign back in all over again.

```python
# 👆 We're continuing from the steps above. Append this to your server.py file.

@app.route("/callback")
def callback_handling():
    auth0.authorize_access_token()
    resp = auth0.get("userinfo")
    userinfo = resp.json()

    session["jwt_payload"] = userinfo
    session["profile"] = {
        "user_id": userinfo["sub"],
        "name": userinfo["name"],
        "picture": userinfo["picture"],
    }
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
        auth0.api_base_url
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
    if "profile" in session:
        return render_template(
            "dashboard.html",
            userinfo=session["profile"],
            userinfo_pretty=json.dumps(session["jwt_payload"], indent=4),
        )

    return render_template("home.html")
```

## Style your application

### Creating the template files

Now we just need to create the simple template files used in the routes about (during `render_template()` calls).

Create a new sub-directory in your project folder named `templates`, and create two files within: `dashboard.html` and `home.html`. You can paste the content from the two fields below into those files, respectfully:

```html
# 📁 templates/dashboard.html -----

<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- font awesome from BootstrapCDN -->
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="/public/app.css" rel="stylesheet">
    </head>
    <body class="home">
        <div class="container">
            <div class="login-page clearfix">
                <div class="logged-in-box auth0-box logged-in">
                    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
                    <img class="avatar" src="{{userinfo['picture']}}"/>
                    <h2>Welcome {{userinfo['name']}}</h2>
                    <pre>{{userinfo_pretty}}</pre>
                    <a id="qsLogoutBtn" class="btn btn-primary btn-lg btn-logout btn-block" href="/logout">Logout</a>
                </div>
            </div>
        </div>
    </body>
</html>
```

```html
# 📁 templates/home.html -----

<html>
    <head>

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- font awesome from BootstrapCDN -->
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">

        <link href="/public/app.css" rel="stylesheet">
    </head>
    <body class="home">
        <div class="container">
            <div class="login-page clearfix">
              <div class="login-box auth0-box before">
                <img src="https://i.cloudup.com/StzWWrY34s.png" />
                <h3>Auth0 Example</h3>
                <p>Zero friction identity infrastructure, built for developers</p>
                <a id="qsLoginBtn" class="btn btn-primary btn-lg btn-login btn-block" href="/login">Log In</a>
              </div>
            </div>
        </div>
    </body>
</html>
```

Finally, create another folder from your project directory named `public`, and a file within it called `app.css`. Simply paste the following content into that:

```css
/* 📁 public/app.css ----- */

body{font-family:"proxima-nova",sans-serif;text-align:center;font-size:300%;font-weight:100}
pre{text-align:left}
input[type=checkbox],input[type=radio]{position:absolute;opacity:0}
input[type=checkbox] + label,input[type=radio] + label{display:inline-block}
input[type=checkbox] + label:before,input[type=radio] + label:before{content:"";display:inline-block;vertical-align:-.2em;width:1em;height:1em;border:.15em solid #0074d9;border-radius:.2em;margin-right:.3em;background-color:#fff}
input[type=radio] + label:before{border-radius:50%}
input[type=radio]:checked + label:before,input[type=checkbox]:checked + label:before{background-color:#0074d9;box-shadow:inset 0 0 0 .15em #fff}
input[type=radio]:focus + label:before,input[type=checkbox]:focus + label:before{outline:0}
.btn{font-size:140%;text-transform:uppercase;letter-spacing:1px;border:0;background-color:#16214D;color:#fff}
.btn:hover{background-color:#44C7F4}
.btn:focus{outline:none!important}
.btn.btn-lg{padding:20px 30px}
.btn:disabled{background-color:#333;color:#666}
h1,h2,h3{font-weight:100}
#logo img{width:300px;margin-bottom:60px}
.home-description{font-weight:100;margin:100px 0}
h2{margin-top:30px;margin-bottom:40px;font-size:200%}
label{font-size:100%;font-weight:300}
.btn-next{margin-top:30px}
.answer{width:70%;margin:auto;text-align:left;padding-left:10%;margin-bottom:20px}
.login-page .login-box{padding:100px 0}
```

## Run your application

You're ready to run your application! From your project directory, open a shell and use:

```sh
python3 server.py
```

Your application should now be ready to open from your browser at [http://localhost:3000](http://localhost:3000).
