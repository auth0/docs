---
lodash: true
title: Python Web App Tutorial
name: Python
image: //auth0.com/lib/platforms-collection/img/python.png
tags:
  - quickstart
snippets:
  dependencies: server-platforms/python/dependencies
  setup: server-platforms/python/setup
  use: server-platforms/python/use
---

## Python Web App Tutorial

<div class="package" style="text-align: center;">
  <blockquote>
    <a href="/auth0-python/master/create-package?path=examples/flask-webapp&type=server${account.clientParam}" class="btn btn-lg btn-success btn-package" style="text-transform: uppercase; color: white">
      <span style="display: block">Download a Seed project</span>
      <% if (account.userName) { %>
      <span class="smaller" style="display:block; font-size: 11px">with your Auth0 API Keys already set and configured</span>
      <% } %>
    </a>
  </blockquote>
</div>

**Otherwise, Please follow the steps below to configure your existing Python WebApp to use it with Auth0.**

### 1. Add dependencies

${snippet(meta.snippets.dependencies)}

This example uses `flask` but it could work with any server

### 2. Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

${snippet(meta.snippets.setup)}

### 3. Specify the callback on Auth0 Dashboard

${include('./_callbackRegularWebapp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/callback
```
### 4. Triggering login manually or integrating the Auth0Lock

${lockSDK}

> **Note:** Please note that the `callbackURL` specified in the `Auth0Lock` constructor **must match** the one specified in the previous step

### 5. Accessing user information

You can access the user information via the `profile` you stored in the session on step 2

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

### 6. You're done!

You have configured your Python Webapp to use Auth0. Congrats, you're awesome!

### Optional steps

#### Checking if the user is authenticated

You can add the following annotation to your `Flask` app to check if the user is authenticated

```python
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
