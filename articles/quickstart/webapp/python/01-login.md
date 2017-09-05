---
title: Login
default: true
description: This tutorial demonstrates how to use the Python OAuthlib to add authentication and authorization to your web app
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

Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`.

```js
flask
requests
flask-oauthlib
```

This example uses [Flask](http://flask.pocoo.org) and the [Flask OAuthlib](https://flask-oauthlib.readthedocs.io) OAuth client library.

## Initialize Flask-OAuthlib

Create a file named `server.py`, and instantiate a client with your client keys, scopes, and OAuth endpoints.

```python
# server.py
    
from flask import Flask
from flask import render_template
from flask import request
from flask_oauthlib.client import OAuth
    
app = Flask(__name__)
# This secret key is used by flask to store the session as a signed cookie.
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
to the [authorization endpoint](/protocols/oauth2#authorization-endpoint).

${include('../_callbackRegularWebApp')}

If you are following along with the downloadable sample projects for this tutorial directly, the **Callback URL** should be set to:

```text
http://localhost:3000/callback
```

## Add the Auth0 Callback Handler

This handler exchanges the `code` that Auth0 sends to the callback URL and exchange for an `access_token` 
and an `id_token`.

The `id_token` is a [JWT](/jwt) that contains the information of the user profile, to get the information from it you have
to decode and validate its signature. After the user information is obtained, store then in the flask `session`.

```python
# Here we're using the /callback route.
@app.route('/callback')
def callback_handling():
    # Handles response from token endpoint
    resp = auth0.authorized_response()
    if resp is None:
        raise Exception('Access denied: reason=%s error=%s' % (
            request.args['error_reason'],
            request.args['error_description']
        ))
    
    # Obtain JWT and the keys to validate the signature
    idToken = resp['id_token']
    jwks = urlopen("https://"+${account.namespace}+"/.well-known/jwks.json")
    
    payload = jwt.decode(idToken, jwks.read(), algorithms=['RS256'], audience=${account.clientId},
                        issuer="https://"+${account.namespace}+"/")
    
    # Store the tue user information obtained in the id_token in flask session.
    session[constants.JWT_PAYLOAD] = payload
    
    session[constants.PROFILE_KEY] = {
        'user_id': payload['sub'],
        'name': payload['name'],
        'picture': payload['picture']
    }
    
    return redirect('/dashboard')
```

## Trigger Login With Flask-OAuthlib

Add an route that uses the `Flask-OAuthlib` client instance to redirect the user to the authorize endpoint.

```python
@app.route('/login')
def login():
    return auth0.authorize(callback='${account.callback}')
```

::: note
The `callback` specified **must match** the URL specified in the previous step.
:::

## Logout

To logout the user you have to clear the data from the session, and then redirect the user to the Auth0 logout endpoint.
Checkout [logout documentation](/logout) for more information.

```python
@app.route('/logout')
def logout():
    # Clear session stored data
    session.clear()
    # Redirect user to logout endpoint
    params = {'returnTo': url_for('home', _external=True), 'client_id': ${account.clientId}}
    return redirect(auth0.base_url + '/v2/logout?' + urlencode(params))
```

::: note
The final destination URL (the `returnTo` value) needs to be in the list of `Allowed Logout URLs`. 
See the [logout documentation](/logout#redirecting-users-after-logout) for more.
:::


## Check if the user is authenticated

Add the following decorator to your `Flask` app to check if the user is authenticated. 

::: note
You should import `wraps` first, adding the following line to your `server.py` file: `from functools import wraps`.
:::

```python
def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    if 'profile' not in session:
      # Redirect to Login page here
      return redirect('/')
    return f(*args, **kwargs)
    
  return decorated
```

## Display user information

To access the user information stored on the `session` add an endpoint to render it in a template .

```python
@app.route('/dashboard')
@requires_auth
def dashboard():
    return render_template('dashboard.html',
                           userinfo=session[constants.PROFILE_KEY],
                           userinfo_pretty=json.dumps(session[constants.JWT_PAYLOAD], indent=4))
```

Create a `dashboard.html` file in a `template` folder in the root of the project to display the user information.

```html
<div class="logged-in-box auth0-box logged-in">
    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
    <img class="avatar" src="{{userinfo['picture']}}"/>
    <h2>Welcome {{userinfo['name']}}</h2>
    <pre>{{userinfo_pretty}}</pre>
    <a class="btn btn-primary btn-lg btn-logout btn-block" href="/logout">Logout</a>
</div>
```
