---
lodash: true
---

## Python Webapp Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="@@base_url@@/auth0-python/master/create-package?path=examples/flask-webapp&type=server@@account.clientParam@@" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing Python WebApp to use it with Auth0.**

### 1. Add dependencies

Add the following dependencies to your `requirements.txt` and run `pip install -r requirements.txt`

````js
flask
requests
```

This example uses `flask` but it could work with any server

### 2. Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

````python
import os
import json

import requests
from flask import Flask, request, jsonify, session, redirect, render_template, send_from_directory

# Here we're using the /callback route.
@app.route('/callback')
def callback_handling():
  env = os.environ
  code = request.args.get('code')

  json_header = {'content-type': 'application/json'}

  token_url = "https://{domain}/oauth/token".format(domain='@@account.namespace@@')

  token_payload = {
    'client_id':     '@@account.clientId@@',
    'client_secret': '@@account.clientSecret@@',
    'redirect_uri':  '@@account.callback@@',
    'code':          code,
    'grant_type':    'authorization_code'
  }

  token_info = requests.post(token_url, data=json.dumps(token_payload), headers = json_header).json()

  user_url = "https://{domain}/userinfo?access_token={access_token}" \
      .format(domain='@@account.namespace@@', access_token=token_info['access_token'])

  user_info = requests.get(user_url).json()

  # We're saving all user information into the session
  session['profile'] = user_info

  # Redirect to the User logged in page that you want here
  # In our case it's /dashboard
  return redirect('/dashboard')
```

### 3. Specify the callback on Auth0 Dashboard

@@includes.callbackRegularWebapp@@

In this case, the callbackURL should look something like:

````
http://yourUrl/callback
```
### 4. Triggering login manually or integrating the Auth0 widget

@@widgetSDK2@@

> **Note:** Please note that the `callbackURL` specified in the `Auth0Widget` constructor **must match** the one specified in the previous step

### 5. Accessing user information

You can access the user information via the `profile` you stored in the session on step 2

````python
@app.route("/dashboard")
@requires_auth
def dashboard():
    return render_template('dashboard.html', user=session['profile'])

```

````html
<div>
  <img class="avatar" src="{{user['picture']}}"/>
  <h2>Welcome {{user['nickname']}}</h2>
</div>
```

[Click here](@@base_url@@/user-profile) to check all the information that the userinfo hash has.

### 6. You've nailed it.

You have configured your Python Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add the following annotation to your `Flask` app to check if the user is authenticated

````python
def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    if not session.has_key('profile'):
      # Redirect to Login page here
      return redirect('/')
    return f(*args, **kwargs)

  return decorated
```

We've actually used the annotation on step 5.
