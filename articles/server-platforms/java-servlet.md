---
title: Auth0 Java Servlet Tutorial
description: This tutorial will show you how to use the Auth0 with a plain old Java Servlet SDK to add authentication and authorization to your web app.
name: Java Servlet
image: /media/platforms/java.png
tags:
  - quickstart
alias:
  - java
seo_alias: java
snippets:
  dependencies: server-platforms/java-servlet/dependencies
  setup: server-platforms/java-servlet/setup
  use: server-platforms/java-servlet/use
---

## Java Servlet Web App Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
:::

You can download a sample project [here](https://github.com/auth0-samples/auth0-servlet-sample).

If you have an existing Java Servlet Web App, please follow the steps below. You can find some useful information on our [GitHub library](https://github.com/auth0/auth0-servlet).

### 1. Add Auth0 dependencies

Add the following dependencies to your `pom.xml` and run `mvn install`.

${snippet(meta.snippets.dependencies)}

See the [seed project](https://github.com/auth0-samples/auth0-servlet-sample) to understand the proposed overall structure of your `pom.xml`.

### 2. Configure your app

We need to configure `auth0-servlet` to use our Auth0 credentials. For that, just edit
`src/main/webapp/WEB-INF/web.xml`.

${snippet(meta.snippets.setup)}

Please take a look at the [seed project](https://github.com/auth0-samples/auth0-servlet-sample) that accompanies this library for an overall structure of [web.xml](https://github.com/auth0-samples/auth0-servlet-sample/blob/master/src/main/webapp/WEB-INF/web.xml).

Here is a breakdown of attributes and what they do:

- `auth0.domain`: This is your auth0 domain (tenant you have created when registering with auth0 - account name).
- `auth0.clientId`: This is the client id of your auth0 application (see Settings page on auth0 dashboard).
- `auth0.clientSecret`: This is the client secret of your auth0 application (see Settings page on auth0 dashboard).
- `auth0.onLogoutRedirectTo`: This is the page / view that users of your site are redirected to on logout. Should start with `/`.

### 3. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll use the `Auth0CallbackHandler` provided by the SDK. For normal purposes, this works as-is, and will "just work" based on the configuration you setup in `web.xml`. However, for more fine-grained control, it is easy to inherit the library version of `Auth0CallbackHandler` and override methods to tailor behaviour according to need. Please see the [library](https://github.com/auth0/auth0-servlet) GitHub [README](https://github.com/auth0/auth0-servlet/blob/master/README.md) for details.

### 4. Triggering login manually or integrating the Auth0Lock

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
        var error = $(error);
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
            state: $(state),
            // change scopes to whatever you like
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

By default, this library expects a Nonce value in the state query param as follows `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F` where `xyz` is a randomly generated UUID.

The NonceFactory can be used to generate such a nonce value. State may be needed to hold other attribute values hence why it has its own keyed value of `nonce=B4AD596E418F7CE02A703B42F60BAD8F`. For instance in SSO you may need an `externalCallbackUrl` which also needs to be stored down in the state param: `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F&externalCallbackUrl=http://localhost:3099/callback`.


### 5. Accessing user information

Depending on what `scopes` you specified upon login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received. The full user profile information is available as a session object keyed on `Auth0User`, you can simply call `SessionUtils.getAuth0User()`. However, because the authenticated user is also a `java.security.Principal` object we can inject it into the Controller automatically for secured endpoints.

### 6. You're done!

You have configured your Java Webapp to use Auth0. Congrats, you're awesome!