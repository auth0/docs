---
title: Login
description: This tutorial will show you how to use the Auth0 Java SDK to add authentication and authorization to your web app.
---

<%= include('../../_includes/_github', {
link: 'https://github.com/auth0-samples/auth0-angularjs2-systemjs-sample/tree/master/01-Login',
}) %>

In order to setup [Lock](/libraries/lock) update the `login.jsp` as follows:

```html
${'<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>'}
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="/css/bootstrap.css"/>
  <link rel="stylesheet" type="text/css" href="/css/jquery.growl.css"/>
  <script src="http://code.jquery.com/jquery.js"></script>
  <script src="http://cdn.auth0.com/js/lock-9.min.js"></script>
  <script src="/js/jquery.growl.js" type="text/javascript"></script>
</head>
<body>
  <div class="container">
    <script type="text/javascript">
      $(function () {
        var error = {error};
        if (error) {
          $.growl.error({message: "An error was detected. Please log in"});
        } else {
          $.growl({title: "Welcome!", message: "Please log in"});
        }
      });

      $(function () {
        var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
        lock.showSignin({
          authParams: {
            state: {state},
            // change scopes to whatever you like, see https://auth0.com/docs/scopes
            // claims are added to JWT id_token - openid profile gives everything
            scope: 'openid user_id name nickname email picture'
          },
          responseType: 'code',
          popup: false,
          callbackURL: '${account.callback}'
        });
      });
    </script>
  </div>
</body>
</html>
```

First, we initialize `Auth0Lock` with a `clientID` and the account's `domain`.

```
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
```

Afterwards, we use the `showSignin` method to open the widget on signin mode. We set several parameters as input, like `authParams` and `responseType`. For details on what each parameter does, refer to [Lock: User configurable options](/libraries/lock/customization).

Once the user has successfully authenticated, the application displays the `home.jsp`. In order to display some user information, as retrieved from Auth0, update the `home.jsp` as follows:

```html

```


---

### 3. Add Auth0 callback handler

You can use the `Auth0CallbackHandler` provided by the SDK to authenticate the user. This should work as-is based on the configuration you setup in `web.xml`.

For more fine-grained control, you can inherit the library version of `Auth0CallbackHandler` to override methods for tailored behavior. See the [Auth0 Servlet ReadMe](https://github.com/auth0/auth0-servlet) on GitHub for details.

### 4. Integrate Lock

Here is a recommended login setup using Lock:

```html
${'<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>'}
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Login</title>
<link rel="stylesheet" type="text/css" href="/css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="/css/jquery.growl.css"/>
<script src="http://code.jquery.com/jquery.js"></script>
<script src="http://cdn.auth0.com/js/lock-9.min.js"></script>
<script src="/js/jquery.growl.js" type="text/javascript"></script>
</head>
<body>
<div class="container">
<script type="text/javascript">
$(function () {
var error = {error};
if (error) {
$.growl.error({message: "An error was detected. Please log in"});
} else {
$.growl({title: "Welcome!", message: "Please log in"});
}
});

$(function () {
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
lock.showSignin({
authParams: {
state: {state},
// change scopes to whatever you like, see https://auth0.com/docs/scopes
// claims are added to JWT id_token - openid profile gives everything
scope: 'openid user_id name nickname email picture'
},
responseType: 'code',
popup: false,
callbackURL: '${account.callback}'
});
});
</script>
</div>
</body>
</html>
```

By default, this library expects a Nonce value in the state query param as follows `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F`, where the value is a randomly generated UUID. The NonceFactory can be used to generate such a `nonce` value. 

The `state` may need to hold other attribute values. For instance, in SSO you may need an `externalCallbackUrl` that also needs to be stored in the state parameter: `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F&externalCallbackUrl=http://localhost:3099/callback`.


### 5. Access user information

Depending on which `scopes` you specified upon login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received.

The full user profile information is available as a session object keyed on `Auth0User`, you can call `SessionUtils.getAuth0User()` to retrieve it. 

However, because the authenticated user is also a `java.security.Principal` object we can inject it into the Controller automatically for secured endpoints.

### 6. You're done!

You have configured your Java Webapp to use Auth0. Congrats, you're awesome!
