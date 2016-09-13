---
url: /libraries/auth0js
---

# auth0.js

__auth0.js__ is a UI-less client-side library for [Auth0](http://auth0.com). It allows you to trigger the authentication process with the service, and process the response (usually parsing the [JWT](/jwt) (JSON web token) that results from a successful authentication).

## Installing

First, you need to import the library in your page. You have various options:

1.  Import the library from [our CDN](${auth0js_url}).
2.  If you are using browserify, install with `npm i auth0-js --production --save`.
3.  [Download the file from releases](https://github.com/auth0/auth0.js/releases).

> Note: The samples below use jQuery, but `auth0.js` does not depend on jQuery and any equivalent library can be used with it.

## Initialize

Construct a new instance of the Auth0 client as follows:

```
<script src="${auth0js_url}"></script>
<script type="text/javascript">
  var auth0 = new Auth0({
    domain:       '${account.namespace}',
    clientID:     '${account.clientId}',
    callbackURL:  '{YOUR APP URL}',
    responseType: 'token'
  });

  //...
</script>
```

## Basic operations

### Login

Trigger the login on any of your enabled `Connections` with:

```
  //trigger login with google
  $('.login-google').click(function () {
    auth0.login({
      connection: 'google-oauth2'
    });
  });

  //trigger login with github
  $('.login-github').click(function () {
    auth0.login({
      connection: 'github'
    });
  });

  //trigger login with an enterprise connection
  $('.login-contoso').click(function () {
    auth0.login({
      connection: 'contoso.com'
    });
  });

  //trigger login with a db connection that requires username/password
  //'db-conn' is the name of the sample database connection that this project is using. Change 'db-conn' to your connection's name
  $('.login-dbconn').click(function () {
    auth0.login({
      connection: 'db-conn',
      username:   $('.username').val(),
      password:   $('.password').val(),
    });
  });

  //trigger login with a db connection and avoid the redirect (best experience for SPA)
  $('.login-dbconn').click(function () {
    auth0.login({
      connection: 'db-conn',
      username:   $('.username').val(),
      password:   $('.password').val(),
    },
    function (err, profile, id_token, access_token) {
      // store in cookies
    });
  });

  //trigger login popup with google
  $('.login-google-popup').click(function (e) {
    e.preventDefault();
    auth0.login({
      connection: 'google-oauth2',
      popup: true,
      popupOptions: {
        width: 450,
        height: 800
      }
    }, function(err, profile, id_token, access_token, state) {
      if (err) {
        alert("something went wrong: " + err.message);
        return;
      }
      alert('hello ' + profile.name);
    });
  });
```

You can also request `scopes` that are not pre-configured for your social connections:

```
  //trigger login requesting additional scopes with google
  $('.login-google').click(function () {
    auth0.login({
      connection: 'google-oauth2',
      connection_scope: ['https://www.googleapis.com/auth/orkut', 'https://picasaweb.google.com/data/']
    });
  });

  // alternatively a comma separated list also works
  $('.login-google').click(function () {
    auth0.login({
      connection: 'google-oauth2',
      connection_scope: 'https://www.googleapis.com/auth/orkut,https://picasaweb.google.com/data/'
    });
  });
```

Trigger the login with offline mode support to get the `refresh_token`

```
  //'db-conn' is the name of the sample database connection that this project is using. Change 'db-conn' to your connection's name
$('.login-dbconn').click(function () {
    auth0.login({
      connection: 'db-conn',
      username:   $('.username').val(),
      password:   $('.password').val(),
      scope: 'openid offline_access'
    },
    function (err, profile, id_token, access_token, state, refresh_token) {
      // store in cookies
      // refresh_token is sent because offline_access is set as a scope
    });
  });
```

### Processing the callback

#### Redirect Mode

Once you have succesfully authenticated, Auth0 will redirect to the `callbackURL` parameter defined in the constructor. Auth0 will append a few extra parameters after a hash on the URL. These include: an `access_token` and an `id_token` (a JWT). You can parse the hash and retrieve the full user profile as follows:

```
  $(function () {
    var result = auth0.parseHash(window.location.hash);

    //use result.id_token to call your rest api

    if (result && result.id_token) {
      auth0.getProfile(result.id_token, function (err, profile) {
        alert('hello ' + profile.name);
      });
      // If offline_access was a requested scope
      // You can grab the result.refresh_token here

    } else if (result && result.error) {
      alert('error: ' + result.error);
    }
  });
```

Or just parse the hash (if loginOption.scope is `openid`, then the profile will only contain the `user_id`):
Taking this into consideration: " 'openid': It will return, not only the access_token, but also an id_token which is a Json Web Token (JWT). The JWT will only contain the user id (sub claim). You can use the ParameterBuilder.SCOPE_OPENID constant". You can get more information about scopes in the [Scopes documentation](/scopes).

```js
  $(function () {
      var result = auth0.parseHash(window.location.hash);
      if (result && result.profile) {
        alert('your user_id is: ' + result.profile.sub);
        //use result.id_token to call your rest api
      }
    });
  });
```

If there is no hash, `result` will be null. If the hash contains an `id_token`, the profile field will be populated.

#### Popup Mode

While using this mode, the result will be passed as the `login` method callback;

```js
  auth0.login({ popup: true }, function(err, profile, id_token, access_token, state, refresh_token) {
    if (err) {
      // Handle the error!
      return;
    }

    //use id_token to call your rest api
    alert('hello ' + profile.name);

    // refresh_token is sent only if offline_access is set as a scope
  });
});
```

## Operations for Database connections

### Sign-ups

If you use [Database Connections](/connections/database/mysql) you can signup new users with:

```
  $('.signup').click(function () {
    auth0.signup({
      connection: 'db-conn',
      username:   'foo@bar.com',
      password:   'shhh...secret'
    }, function (err) {
      console.log(err.message);
    });
  });
```

After a successful login, `auth0.js` will auto login the user. If you do not want this to happen, use the `auto_login: false` option in the signup method.

### Change Password

```
  $('.change_password').click(function () {
    auth0.changePassword({
      connection: 'db-conn',
      email:   'foo@bar.com'
    }, function (err, resp) {
      console.log(err.message);
    });
  });
```

This request will always return a 200, regardless of whether the user exists or not.
If the user did not exist, you will see a "Failed Password Change" event log in the Auth0 dashboard.

## Advanced operations

### Delegation Token Request

A delegation token is a new token for a different service or app/API.

If you just want to get a new token for an application registered in Auth0 that is not the current one, you can do the following:

```
var options = {
  id_token: 'your-id-token',    // The id_token you have now
  targetClientId: 'The-ClientId-Of-The-App-you-are-getting-a-JWT-for'
  api: 'firebase',              // The type of app (Auth0 can generate multiple token formats)
  scope: "openid name email nickname"   // default: openid. Add any other scopes you need, i.e. "openid {scope1} {scope2}"
};

auth0.getDelegationToken(options, function (err, delegationResult) {
	// Call your API using delegationResult.id_token
});
```

### Refresh tokens

If you want to refresh your existing (non-expired) token:

```
auth0.renewIdToken(current_id_token, function (err, delegationResult) {
  // Get here the new delegationResult.id_token
});
```

If you want to refresh your existing (expired) token, if you have the refresh_token, you can call the following:

```
auth0.refreshToken(refresh_token, function (err, delegationResult) {
  // Get here the new delegationResult.id_token
});
```

### Validate a User

You can validate a user of a specific (db) connection with his username and password:

```
auth0.validateUser({
  connection:   'db-conn',
  username:     'foo@bar.com',
  password:     'blabla'
}, function (err, valid) { });
```

### SSO

The `getSSOData` method fetches Single-Sign-On information from Auth0:

```
  auth0.getSSOData(function (err, ssoData) {
    if (err) return console.log(err.message);
    expect(ssoData.sso).to.exist;
  });
```

```
  // Don't bring active directory data
  auth0.getSSOData(false, fn);
```

### CORS

There is a cross-origin request when you ask for credentials in your application like this:

```
  auth0.login({
    connection: 'db-conn',
    username:   $('.username').val(),
    password:   $('.password').val(),
  });
```

Most modern browsers support [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).

Auth0.js version 6 fallbacks to JSONP when CORS is not available. In this mode the credentials are sent over query string. This information is encrypted at the protocol level (HTTPS) but it is a bad practice. To disable the JSONP fallback use `forceJSONP: false` as follows:

```
var auth0 = new Auth0({
  domain:      '${account.namespace}',
  clientID:    '${account.clientId}',
  callbackURL: '{YOUR APP URL}',
  forceJSONP:  false
});
```

Future versions of Auth0.js will drop support for JSONP.

If you do need to support older browsers do not ask the credentials in your application. Let auth0 prompt for credentials in the auth0 domain as follows:

```
  auth0.login({
    connection: 'db-conn',
  });
```

You can customize the login page shown when doing this from your dashboard.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them as [issues in our repository](https://github.com/auth0/auth0.js/issues). Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.
