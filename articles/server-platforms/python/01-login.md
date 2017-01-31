---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Python SDK to add authentication and authorization to your web app
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-python-web-app',
  path: '00-Starter-Seed',
  requirements: [
    'Python 2.7, 3.5.1',
    'Flask 0.10.1 and up',
    'Requests 2.3.0 and up'
  ]
}) %>

## 1. Add the Dependencies

${snippet(meta.snippets.dependencies)}

This example uses `flask` but it could work with any server

## 2. Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. For that, you can do the following:

${snippet(meta.snippets.setup)}

## 3. Specify the Callback URLs

${include('../_callbackRegularWebApp')}

In this case, the callbackURL should look something like:

```
http://yourUrl/callback
```

## 4. Trigger Login Manually or Integrate Lock

<%= include('../../_includes/_lock-sdk') %>

> **Note:** Please note that the `redirectUrl` specified in the `Auth0Lock` constructor **must match** the URL specified in the previous step

## 5. Access User Information

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

### 6. Optional steps

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
