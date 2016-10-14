---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Python SDK to add authentication and authorization to your web app
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  githubUrl: 'https://github.com/auth0-samples/auth0-python-web-app',
  pkgOrg: 'auth0-samples',
  pkgRepo: 'auth0-python-web-app',
  pkgBranch: 'master',
  pkgPath: '00-Starter-Seed',
  pkgFilePath: null,
  pkgType: 'server'
}) %>

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Python 2.7, 3.5.1
* Flask 0.10.1 and up
* Requests 2.3.0 and up
:::



## Add the Dependencies

${snippet(meta.snippets.dependencies)}

This example uses `flask` but it could work with any server

## Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

${snippet(meta.snippets.setup)}

## Specify the Callback URLs

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/callback
```

## Triggering Login Manually or Integrating Lock

<%= include('../../_includes/_lock-sdk') %>

> **Note:** Please note that the `redirectUrl` specified in the `Auth0Lock` constructor **must match** the URL specified in the previous step

## Accessing User Information

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
