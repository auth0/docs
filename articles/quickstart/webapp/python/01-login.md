---
title: Login
default: true
description: This tutorial demonstrates how to add user login to a Python web Application built with the Flask framework.
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

## Configure Flask to Use Auth0

### Add the Dependencies

This example uses [Flask](http://flask.pocoo.org) and the [Authlib](https://github.com/lepture/authlib) OAuth library.

Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`.

```js
// /requirements.txt

flask
python-dotenv
requests
authlib
six
```

### Initialize Authlib

Create a file named `server.py`, and instantiate an application with your client keys, scopes, and OAuth endpoints.

```python
# /server.py

from functools import wraps
import json
from os import environ as env
from werkzeug.exceptions import HTTPException

from dotenv import load_dotenv, find_dotenv
from flask import Flask
from flask import jsonify
from flask import redirect
from flask import render_template
from flask import session
from flask import url_for
from authlib.integrations.flask_client import OAuth
from six.moves.urllib.parse import urlencode

app = Flask(__name__)

oauth = OAuth(app)

auth0 = oauth.register(
    'auth0',
    client_id='${account.clientId}',
    client_secret='YOUR_CLIENT_SECRET',
    api_base_url='https://${account.namespace}',
    access_token_url='https://${account.namespace}/oauth/token',
    authorize_url='https://${account.namespace}/authorize',
    client_kwargs={
        'scope': 'openid profile email',
    },
)
```

::: note
The callback URL saved in your Application is used in the **Trigger Authentication** section below.
:::

### Add the Callback Handler

This handler exchanges the `code` that Auth0 sends to the callback URL for an Access Token and an ID Token.

The Access Token will be used to call the `/userinfo` endpoint to get the user profile. After the user information is obtained, store then in the flask `session`.

```python
# /server.py

# Here we're using the /callback route.
@app.route('/callback')
def callback_handling():
    # Handles response from token endpoint
    auth0.authorize_access_token()
    resp = auth0.get('userinfo')
    userinfo = resp.json()

    # Store the user information in flask session.
    session['jwt_payload'] = userinfo
    session['profile'] = {
        'user_id': userinfo['sub'],
        'name': userinfo['name'],
        'picture': userinfo['picture']
    }
    return redirect('/dashboard')
```

## Trigger Authentication

Add a `/login` route that uses the `Authlib` client instance to redirect the user to the [login page](/hosted-pages/login). Replace `YOUR_CALLBACK_URL` in the snippet below with the **Allowed Callback URL** configured for your Application in the Auth0 dashboard.

```python
# /server.py

@app.route('/login')
def login():
    return auth0.authorize_redirect(redirect_uri='YOUR_CALLBACK_URL')
```

Create a `home.html` file in a `/template` folder. Add a link to the `/login` route.

```html
<div class="login-box auth0-box before">
    <img src="https://i.cloudup.com/StzWWrY34s.png" />
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a class="btn btn-primary btn-lg btn-login btn-block" href="/login">Log In</a>
</div>
```

### Check if the user is authenticated

Add the following decorator to your `Flask` app. Use it to decorate methods that require authentication.

::: note
You should import `wraps` first, adding the following line to your `server.py` file: `from functools import wraps`.
:::

```python
# /server.py

def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    if 'profile' not in session:
      # Redirect to Login page here
      return redirect('/')
    return f(*args, **kwargs)

  return decorated
```

## Display User Information

Add a `/dashboard` route to `server.py` that will render the user information stored in the Flask session.

Decorate it with `@requires_auth`. It will only be accessible if the user has been authenticated.

```python
# /server.py

@app.route('/dashboard')
@requires_auth
def dashboard():
    return render_template('dashboard.html',
                           userinfo=session['profile'],
                           userinfo_pretty=json.dumps(session['jwt_payload'], indent=4))
```

Add a `dashboard.html` file in a `/template` folder to display the user information.

Add a link to allow users to Log Out.

```html
<div class="logged-in-box auth0-box logged-in">
    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
    <img class="avatar" src="{{userinfo['picture']}}"/>
    <h2>Welcome {{userinfo['name']}}</h2>
    <pre>{{userinfo_pretty}}</pre>
    <a class="btn btn-primary btn-lg btn-logout btn-block" href="/logout">Logout</a>
</div>
```

## Logout

To log the user out, you have to clear the data from the session, and redirect the user to the Auth0 logout endpoint. You can find more information about this in [our documentation logout documentation](/logout).

```python
# /server.py

@app.route('/logout')
def logout():
    # Clear session stored data
    session.clear()
    # Redirect user to logout endpoint
    params = {'returnTo': url_for('home', _external=True), 'client_id': '${account.clientId}'}
    return redirect(auth0.api_base_url + '/v2/logout?' + urlencode(params))
```

::: note
The redirect URL needs to be in the list of Allowed Logout URLs in the settings section of the application, For more information, see [Redirect Users After Logout](/logout/guides/redirect-users-after-logout).
:::
