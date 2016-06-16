---
title: Login
description: This tutorial will show you how to use the Auth0 Python SDK to add authentication and authorization to your web app.
---

## Python Web App Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Python 2.7
* Flask 0.10.1
* Requests 2.3.0
:::

<%= include('../../_includes/_package', {
  pkgRepo: 'auth0-python',
  pkgBranch: 'master',
  pkgPath: 'examples/flask-webapp',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

**Otherwise, please follow the steps below to configure your existing Python WebApp to use it with Auth0.**

### 1. Add dependencies

${snippet(meta.snippets.dependencies)}

This example uses `flask` but it could work with any server

### 2. Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

${snippet(meta.snippets.setup)}

### 3. Specify the callback on Auth0 Dashboard

${include('../_callbackRegularWebApp')}

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

We've actually used the annotation on step 5.
