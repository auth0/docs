---
title: Login
default: true
description: This tutorial demonstrates how to use the Python Oauthlib to add authentication and authorization to your web app
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application 
you can follow the tutorial steps.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-python-web-app',
  path: '01-Login',
  requirements: [
    'Python 2.7, 3.0 and up',
    'Flask 0.10.1 and up',
    'Requests 2.3.0 and up',
    'Flask-oauthlib 0.9.4 and up'
  ]
}) %>


## Add the Dependencies

Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`

```js
flask
requests
flask-oauthlib
```

This example uses `flask` but it could work with any server


## Initialize Flask-OAuthlib

Create a file named server.py and add the following

```python
# server.py

from flask import Flask
from flask import render_template
from flask import request
from flask_oauthlib.client import OAuth

app = Flask(__name__)
app.secret_key = 'A_SECRET_KEY'
oauth = OAuth(app)
auth0 = oauth.remote_app(
    'auth0',
    consumer_key='${account.clientId}',
    consumer_secret='${account.clientSecret}',
    request_token_params={
        'scope': 'openid profile',
        'audience': 'https://' + '${account.namespace}' + '/userinfo'
    },
    base_url='https://%s' % '${account.namespace}',
    access_token_method='POST',
    access_token_url='/oauth/token',
    authorize_url='/authorize',
)
```

## Specify the Callback URLs

The callback URL is a URL in your web application where Auth0 redirects to after the user has authenticated 
to the [authorization endpoint](/protocols/oauth2#authorization-endpoint) and granted permissions

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```text
http://yourUrl/callback
```

## Add the Auth0 Callback Handler

This handler exchanges the `code` that Auth0 sends to the callback URL and exchange for an `access_token` 
and an `id_token`. For that, you can do the following:

```python
# Here we're using the /callback route.
@app.route('/callback')
def callback_handling():
    resp = auth0.authorized_response()
    if resp is None:
        return 'Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        )
    
    return render_template('dashboard.html')
```

## Trigger Login With Flask-OAuthlib

You can use `Flask-OAuthlib` to redirect the user to the authorize endpoint 
to start the [Authorization Code](/api-auth/grant/authorization-code) grant flow, now we define that route

```python
@app.route('/login')
def login():
    return auth0.authorize(callback='${account.callback}')
```

::: note
The `callback` specified **must match** the URL specified in the previous step.
:::