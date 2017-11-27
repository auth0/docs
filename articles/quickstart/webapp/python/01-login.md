---
title: Login
default: true
description: This tutorial demonstrates how to use the Python OAuthlib to add authentication and authorization to your web app
budicon: 448
---

You can get started by either downloading the complete sample or following the tutorial steps to integrate Auth0 with an existing application.

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

<%= include('../_includes/_getting_started', { library: 'Python', callback: 'http://localhost:3000/callback' }) %>

## Add the Dependencies

This example uses [Flask](http://flask.pocoo.org) and the [Flask OAuthlib](https://flask-oauthlib.readthedocs.io) OAuth client library.

Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`.

```js
flask
requests
flask-oauthlib
```

## Initialize Flask-OAuthlib

With `OAuth` you call the authorize endpoint of the Authentication API and redirect your users to our [hosted login page](/hosted-pages/login). This way, you will be implementing the [authorization code grant flow](https://auth0.com/docs/api-auth/tutorials/authorization-code-grant), so you will obtain a `code`.
Create a file named `server.py`, and instantiate a client with your client keys, scopes, and OAuth endpoints.

```python
# server.py
    
from flask import Flask
from flask import render_template
from flask import request
from flask_oauthlib.client import OAuth
    
app = Flask(__name__)

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

## Add the Auth0 Callback Handler

This handler exchanges the `code` that Auth0 sends to the callback URL for an `access_token` 
and an `id_token`.

The `id_token` is a [JWT](/jwt) that contains the user profile information for the requested [OIDC Conformant claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) , to get the information from it you have to decode and validate its signature. After the user information is obtained, store then in the flask `session`.

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
    id_token = resp['id_token']
    jwks = urlopen("https://"+"${account.namespace}"+"/.well-known/jwks.json")
    
    payload = jwt.decode(id_token, jwks.read(), algorithms=['RS256'], audience='${account.clientId}',
                        issuer="https://"+"${account.namespace}"+"/")
    
    # Store the tue user information obtained in the id_token in flask session.
    session[constants.JWT_PAYLOAD] = payload
    
    session[constants.PROFILE_KEY] = {
        'user_id': payload['sub'],
        'name': payload['name'],
        'picture': payload['picture']
    }
    
    return redirect('/dashboard')
```

## Trigger Authentication

Add a `/login` route that uses the `Flask-OAuthlib` client instance to redirect the user to Auth0's [hosted login page](/hosted-pages/login).

```python
@app.route('/login')
def login():
    return auth0.authorize(callback='${account.callback}')
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

## Logout

To log the user out, you have to clear the data from the session, and redirect the user to the Auth0 logout endpoint. You can find more information about this in [our documentation logout documentation](/logout).

```python
@app.route('/logout')
def logout():
    # Clear session stored data
    session.clear()
    # Redirect user to logout endpoint
    params = {'returnTo': url_for('home', _external=True), 'client_id': '${account.clientId}'}
    return redirect(auth0.base_url + '/v2/logout?' + urlencode(params))
```

::: note
Please take into consideration that the return to URL needs to be in the list of Allowed Logout URLs in the settings section of the client as explained in [our documentation](/logout#redirect-users-after-logout)
:::

## Check if the user is authenticated

Add the following decorator to your `Flask` app. Use it to decorate methods that require authentication.

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

## Showing the User Profile

Add a `/dashboard` route to `server.py` that will render the user information stored in the Flask session. 

Decorate it with `@requires_auth`. It will only be accessible if the user has been authenticated.

```python
@app.route('/dashboard')
@requires_auth
def dashboard():
    return render_template('dashboard.html',
                           userinfo=session[constants.PROFILE_KEY],
                           userinfo_pretty=json.dumps(session[constants.JWT_PAYLOAD], indent=4))
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
