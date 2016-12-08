---
description: Client-side SSO with single page applications.
---

# Client-side SSO (Single Page Apps)

To log a user in silently (i.e. without displaying the Lock screen) the following conditions need to be met:

1. The Client needs to be configured to **Use Auth0 instead of the IdP to do Single Sign On** in the [Clients section of the Auth0 Management Dashboard](${manage_url}/#/clients)
2. An SSO cookie must exist for the tenant's domain. In other words the user must have signed in previously, and the SSO cookie which was saved is still valid.
3. When calling the Auth0 authentication endpoint, the connection name is passed along for which the user must be signed in. This connection name is the same as the one specified in the SSO cookie. You can pass the connection name along either as a parameter when calling the `signin` function of the [**auth0.js** Library](/libraries/auth0js), or by passing the `connection` query string parameter when calling the `/authorize` endpoint of the [Authentication API](/api/authentication)

## The SSO scenario

In our SSO scenario, let's say we have 3 applications

* App 1: app1.com (Single Page App)
* App 2: app2.com (Single Page App)
* App 3: app3.com (Regular Web app)

If a user logs in to any of these applications, and then subsequently navigates from this application to any of the other applications, we would want the user to be logged in automatically. 

In this document we will be looking specifically how to achieve this in a Single Page (JavaScript) Application

## Obtaining the SSO cookie information  

If a users logs in to any of the applications and then subsequently tries to log in to any of the other applications, you can check to see whether an SSO session is active for that user by making use of the `getSSOData` function in the [auth0.js library](/libraries/auth0js#sso).

```js
auth0.getSSOData(function (err, ssoData) {
  if (err) return console.log(err.message);
  expect(ssoData.sso).to.exist;
});
```

This function will return an `ssoData` object which will indicate whether an active SSO session exist. The `ssoData` object will contain the fields as per the following example:

```json
{
  sso: true,
  sessionClients: [
    "jGMow0KO3WDJELW8XIxolqb1XIitjkYL"
  ],
  lastUsedClientID: "jGMow0KO3WDJELW8XIxolqb1XIitjkYL",
  lastUsedUsername: "alice@example.com",
  lastUsedConnection: {
    name: "Username-Password-Authentication",
    strategy: "auth0"
  }
}
```

## Passing the Connection Name when logging the user in

You can then use this information to call the `signin` function to log the user in. When you call the `signin` function you pass along the name of the connection used in the active SSO session as the `connection` parameter. Auth0 will determine that an SSO cookie is saved for that connection, and will log the user directly without displaying the Lock user interface. 


```js
auth0.getSSOData(function (err, ssoData) {
  if (!err && ssoData.sso) {
    auth0.signin({
      connection: ssoData.lastUsedConnection.name,
      scope: 'openid name picture',
      params: {
        state: getQueryParameter('targetUrl')
      }
    });
  } else {
    // Display regular login option, e.g. a Login button which will invoke Lock
  }
});
```

## Full SSO Sample Code

Below is an expanded code sample of how you can implement this in a SPA application using jQuery to either show or hide the Login button or user information depending on whether a user is logged in or not. 

The full code sample for both the SPA applications as well as the normal web application can be found in [this github repository](https://github.com/auth0/auth0-sso-sample/tree/master/app1.com)

```html
<script type="text/javascript">
  // hide the page in case there is an SSO session (to avoid flickering)
  document.body.style.display = 'none';

  // instantiate Lock
  var lock = new Auth0Lock('${account.clientId}', '${account.namespace}', {
    auth: {
      params: {
        scope: 'openid name picture'
      }
    }
  });
  var auth0 = new Auth0({
    domain: '${account.namespace}',
    clientID: '${account.clientId}',
    callbackOnLocationHash: true
  });

  // Handle authenticated event to store id_token in localStorage
  lock.on("authenticated", function (authResult) {
    isAuthCallback = true;

    lock.getProfile(authResult.idToken, function (error, profile) {
      if (error) {
        // Handle error
        return;
      }

      localStorage.setItem('userToken', authResult.idToken);

      goToHomepage(authResult.state, authResult.idToken);
      return;
    });
  });

  var isAuthCallback = false;

  // Get the user token if we've saved it in localStorage before
  var idToken = localStorage.getItem('userToken');
  if (idToken) {
    // This would go to a different route like
    // window.location.href = '#home';
    // But in this case, we just hide and show things
    goToHomepage(getQueryParameter('targetUrl'), idToken);
    return;
  } else {
    // user is not logged, check whether there is an SSO session or not
    auth0.getSSOData(function (err, data) {
      if (!isAuthCallback && !err && data.sso) {
        // there is! redirect to Auth0 for SSO
        auth0.signin({
          connection: data.lastUsedConnection.name,
          scope: 'openid name picture',
          params: {
            state: getQueryParameter('targetUrl')
          }
        });
      } else {
        // regular login
        document.body.style.display = 'inline';
      }
    });
  }

  // Showing Login
  $('.btn-login').click(function (e) {
    e.preventDefault();
    lock.show();
  });

</script>

<!-- Regular login -->
<body>
  <button class="btn-login">Login</button>
</body>
```

## Single Logout

If the user logged out from app1.com, then we want to clean up the token on app2.com (and app3.com). Read more about [Single Log Out](/logout). 

To do that, you have to check every X amount of time whether the SSO session is still alive in Auth0. If it is not, then remove the token from Local Storage for the application. This will ensure that the user's local session is cleared.

```js
setInterval(function() {
  // if the token is not in local storage, there is nothing to check (i.e. the user is already logged out)
  if (!localStorage.getItem('userToken')) return;

  auth0.getSSOData(function (err, data) {
    // if there is still a session, do nothing
    if (err || (data && data.sso)) return;

    // if we get here, it means there is no session on Auth0,
    // then remove the token and redirect to #login
    localStorage.removeItem('userToken');
    window.location.href = '#login'

  });
}, 5000)
```
