---
title: Login
default: true
description: This tutorial demonstrates how to use the Python Oauthlib to add authentication and authorization to your web app
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-python-web-app',
  path: '01-Login',
  requirements: [
    'Python 2.7, 3.0 and up',
    'Flask 0.10.1 and up',
    'Requests 2.3.0 and up'
    'Flask-oauthlib 0.9.4 and up',
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

${snippet(meta.snippets.dependencies)}

This example uses `flask` but it could work with any server

## Trigger Login With OAuth

Now, you can use `OAuth` to call the authorize endpoint of the Authentication API and redirect your users to our [Hosted Login page](/hosted-pages/login). This way, you will be implementing the [Authorization Code](/api-auth/grant/authorization-code) grant flow, so you will obtain a `code`.

```python
# server.py

from flask import Flask
from flask import redirect
from flask import render_template
from flask import request
from flask import session
from flask import url_for
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

We define the route that will redirect the user to the authorization endpoint
```python
@app.route('/login')
def login():
    return auth0.authorize(callback='${account.callback}')
```

## Add the Auth0 Callback Handler

You'll need to create a callback handler so Auth0 will redirect the user after he authenticate and grant the access. This handler exchanges the `code` we have obtained previously for an `access_token` and an `id_token` and store them in the session. For that, you can do the following:

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
    
    session['access_token'] = (resp['access_token'], '')
    
    # Oauthlib will call userinfo endpoint with the access_token obtained from the function decorated
    # with @auth0.tokengetter
    user_info = auth0.get('userinfo')
    session['profile'] = user_info.data
    
    return redirect('/dashboard')
```

Register the function that will obtain the stored access token.
```python
@auth0.tokengetter
def get_auth0_oauth_token():
    return session.get('access_token')
```

## Access User Information

You can access the user information via the `profile` you stored in the session on previously step

```python
@app.route("/dashboard")
@requires_auth
def dashboard():
    return render_template('dashboard.html', user=session['profile'])

```

```html
<div>
  <img class="avatar" src="{{user['picture']}}"/>
  <h2>Welcome {{user['nickname']}}</h2>
</div>
```

[Click here](/user-profile) to check all the information that the userinfo hash has.

## Logout

You can implement logout by clearing a session and redirecting to [logout endpoint](/logout#redirect-users-after-logout).

```python
@app.route('/logout')
def logout():
    session.clear()
    params = {'returnTo': url_for('home', _external=True), 'client_id': '${account.clientId}'}
    return redirect(auth0.base_url + '/v2/logout?' + urlencode(params))
```

## Optional Steps

#### Check if the user is authenticated

You can add the following annotation to your `Flask` app to check if the user is authenticated. Note that you should import `wraps` first, adding the following line to your file `from functools import wraps`.

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
