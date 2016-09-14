# Client-side SSO (Single Page Apps)

Let's say you have three applications:

* App 1: app1.com (single page app)
* App 2: app2.com (single page app)
* App 3: app3.com (regular web app)

> You can see an example of a SPA configured to use SSO in [this github repository](https://github.com/auth0/auth0-sso-sample/tree/master/app1.com)

The user logs in on app1.com and tries to access app2.com. Since app2.com is a Single Page App you need to have some code like the following to do SSO. This code should be on every SPA you have (In this case App1 and App2).:

```html
<script type="text/javascript">
// hide the page in case there is an SSO session (to avoid flickering)
document.body.style.display = 'none';

// instantiate Lock
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');



// sso requires redirect mode, hence we need to parse
// the response from Auth0 that comes on location hash
var hash = lock.parseHash(window.location.hash);
if (hash && hash.id_token) {
  // the user came back from the login (either SSO or regular login),
  // save the token
  localStorage.setItem('userToken', hash.id_token);
  // redirect to "targetUrl" if any
  window.location.href = hash.state || '#home';
  return;
}

// Get the user token if we've saved it in localStorage before
var idToken = localStorage.getItem('userToken');
if (idToken) {
  // If there's a token, just redirect to "targetUrl" if any
  window.location.href = hash.state || '#home';  
  return;
}

// user is not logged, check whether there is an SSO session or not
lock.$auth0.getSSOData(function(err, data) {
  if (!err && data.sso) {
    // there is! redirect to Auth0 for SSO
    lock.$auth0.signin({
      // If the user wanted to go to some other URL, you can track it with `state`
      state: getQueryParam(location.search, 'targetUrl'),
      responseType: 'token'
    });
  } else {
    // regular login
    document.body.style.display = 'inline';
  }
});
</script>

<!-- Regular login -->
<body>
  <button onclick="lock.show()">Login</button>
</body>
```

> If not using lock, you can use auth0.js for the `getSSOData` and `signin` API

If the single sign on happens against app3.com (a regular web app), then you have to redirect to `app3.com/sso?targetUrl=/foo/bar`. Read more about this on [Single Sign On with Regular Web Apps](/sso/regular-web-apps-sso).


## Single Logout

If the user logged out from app1.com, then we want to clean up the token on app2.com (and app3.com). Read more about [Single Log Out](/logout).

To do that, you have to check every X amount of time whether the SSO session is still alive in Auth0. If it is not, then remove the token from storage for the app.

```js
setInterval(function() {
  // if the token is not in local storage, there is nothing to check (i.e. the user is already logged out)
  if (!localStorage.getItem('userToken')) return;

  lock.$auth0.getSSOData(function(err, data) {
    // if there is still a session, do nothing
    if (err || (data && data.sso)) return;

    // if we get here, it means there is no session on Auth0,
    // then remove the token and redirect to #login
    localStorage.removeItem('userToken');
    window.location.href = '#login'

  });
}, 5000)
```

> If not using lock, you can use auth0.js for the `getSSOData` and `signin` API
