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

This example uses `flask` but it could work with any server.

## Initialize Flask-OAuthlib

Create a file named `server.py` and then create OAuth object and register the remote application to connect to a remote
application. To do that add the following:

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
to the [authorization endpoint](/protocols/oauth2#authorization-endpoint) and granted permissions.

${include('../_callbackRegularWebApp')}

You must add `http://localhost:3000/callback` to your `Allowed Callback URLs`.

In this case, the callbackURL should look something like:

```text
http://yourUrl/callback
```

## Add the Auth0 Callback Handler

This handler exchanges the `code` that Auth0 sends to the callback URL and exchange for an `access_token` 
and an `id_token`. For that, you can do the following:
This endpoint made several tasks. First get an `access_token` and `id_token` from the token endpoint.
Then decode the [JWK](/jwt) `id_token` to get the user information.
And store the user information into the flask session.

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
    jwks = urlopen("https://"+AUTH0_DOMAIN+"/.well-known/jwks.json")
    
    payload = jwt.decode(idToken, jwks.read(), algorithms=['RS256'], audience=${account.clientId},
                        issuer="https://"+${account.namespace}+"/")
    
    # Store the tue user information obtained in the id_token in flask sessison.
    session[constants.JWT_PAYLOAD] = payload
    
    session[constants.PROFILE_KEY] = {
        'user_id': payload['user_id'],
        'email': payload['email'],
        'picture': payload['picture']
    }
    
    return redirect('/dashboard')
```

## Trigger Login With Flask-OAuthlib

You can use `Flask-OAuthlib` to redirect the user to the authorize endpoint 
to start the [Authorization Code](/api-auth/grant/authorization-code) grant flow, now we define that route:

```python
@app.route('/login')
def login():
    return auth0.authorize(callback='${account.callback}')
```

::: note
The `callback` specified **must match** the URL specified in the previous step.
:::

## Logout

To logout a user you have to do two things, first clear the data from the session, and redirect the user to logout URI
checkout [logout documentation](/logout) for more information.

```python
@app.route('/logout')
def logout():
    # Clear session stored data
    session.clear()
    # Redirect user to logout endpoint
    params = {'returnTo': url_for('home', _external=True), 'client_id': AUTH0_CLIENT_ID}
    return redirect(auth0.base_url + '/v2/logout?' + urlencode(params))
```

::: note
The final destination URL (the `returnTo` value) needs to be in the list of `Allowed Logout URLs`. 
See the [logout documentation](/logout#redirecting-users-after-logout) for more.
:::

## Display user information

You can access to the user information stored on the `session` when request to token endpoint.
Add the following endpoint to render the template with the user information:

```python
@app.route('/dashboard')
@requires_auth
def dashboard():
    return render_template('dashboard.html',
                           userinfo=session[constants.PROFILE_KEY],
                           userinfo_pretty=json.dumps(session[constants.JWT_PAYLOAD], indent=4))
```

```html
<div class="logged-in-box auth0-box logged-in">
    <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" /></h1>
    <img class="avatar" src="{{userinfo['picture']}}"/>
    <h2>Welcome {{userinfo['email']}}</h2>
    <pre>{{userinfo_pretty}}</pre>
    <a class="btn btn-primary btn-lg btn-logout btn-block" href="/logout">Logout</a>
</div>
```

[Click here](/user-profile) to check all the information that the userinfo hash has.

## Check if the user is authenticated

You can add the following annotation to your `Flask` app to check if the user is authenticated. 
Note that you should import `wraps` first, adding the following line to your file `from functools import wraps`.

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
