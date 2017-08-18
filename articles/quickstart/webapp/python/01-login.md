---
title: Login
default: true
description: This tutorial demonstrates how to use the Auth0 Python SDK to add authentication and authorization to your web app
budicon: 448
---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

<%= include('../../../_includes/_package', {
  org: 'auth0-samples',
  repo: 'auth0-python-web-app',
  path: '00-Starter-Seed',
  requirements: [
    'Python 2.7, 3.5.1',
    'Flask 0.10.1 and up',
    'Requests 2.3.0 and up'
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

## Trigger Login With auth0.js

Now, you can use `Auth0.js` to call the authorize endpoint of the Authentication API and redirect your users to our [Hosted Login page](/hosted-pages/login). This way, you will be implementing the [Authorization Code](/api-auth/grant/authorization-code) grant flow, so you will obtain a `code`.

```html
<script src="${auth0js_urlv8}"></script>
```

```js
// public/app.js

$(document).ready(function() {
  var auth = new auth0.WebAuth({
    domain: '${account.namespace}',
    clientID: '${account.clientId}'
   });


    $('.btn-login').click(function(e) {
      e.preventDefault();
      auth.authorize({
        audience: 'https://' + '${account.namespace}' + '/userinfo',
        scope: 'openid profile',
        responseType: 'code',
        redirectUri: '${account.callback}'
      });
    });
});  
```

::: note
The `redirectUri` specified in the constructor **must match** the URL specified in the previous step.
:::

## Add the Auth0 Callback Handler

You'll need to create a callback handler that Auth0 will call once it redirects to your app. This handler exchanges the `code` we have obtained previously for an `access_token` and an `id_token`. For that, you can do the following:

${snippet(meta.snippets.setup)}

## Access User Information

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

## Logout

You can implement logout by clearing a session and redirecting to [logout endpoint](/logout#redirect-users-after-logout).

```python
@app.route('/logout')
def logout():
    session.clear()
    parsed_base_url = urlparse('${account.callback}')
    base_url = parsed_base_url.scheme + '://' + parsed_base_url.netloc
    return redirect('https://%s/v2/logout?returnTo=%s&client_id=%s' % ('${account.namespace}', base_url, '${account.clientId}'))
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
