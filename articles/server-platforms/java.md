---
title: Auth0 Java Servlet Tutorial
description: This tutorial will show you how to use the Auth0 with a Java Servlet SDK to add authentication and authorization to your web app.
name: Java Servlet
image: /media/platforms/java.png
tags:
  - quickstart
alias:
  - java
seo_alias: java
snippets:
  dependencies: server-platforms/java/dependencies
  setup: server-platforms/java/setup
  use: server-platforms/java/use
---

## Java Servlet Web App Tutorial

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
:::

You can download a [sample project](https://github.com/auth0-samples/auth0-servlet-sample) to start.

If you already have an existing Java Servlet Web App, follow the steps below. You can find more information at the [Auth0 Servlet](https://github.com/auth0/auth0-servlet) on GitHub.

### 1. Add Auth0 dependencies

You need to add the `auth0-servlet` dependency.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:



**NOTE:** See the [seed project](https://github.com/auth0-samples/auth0-servlet-sample) to understand the overall structure of your `pom.xml`.

### 2. Configure your app

To configure `auth0-servlet` to use your Auth0 credentials, edit the 
`src/main/webapp/WEB-INF/web.xml` file.

${snippet(meta.snippets.setup)}

**NOTE:**  See the [seed project](https://github.com/auth0-samples/auth0-servlet-sample) that accompanies this library for the overall structure of [web.xml](https://github.com/auth0-samples/auth0-servlet-sample/blob/master/src/main/webapp/WEB-INF/web.xml).

Here is a list of customizable attributes of web.xml:

- `auth0.domain`: This is your Auth0 domain namespace (the tenant you created when registering with Auth0 - i.e.`your_account_name.auth0.com`).
- `auth0.clientId`: This is the `client_id` of your Auth0 application (see [Settings](${uiURL}/#/applications) page of your app on the Auth0 dashboard).
- `auth0.clientSecret`: This is the `client_secret` of your Auth0 application (see [Settings](${uiURL}/#/applications) page of your app on the Auth0 dashboard).
- `auth0.onLogoutRedirectTo`: This is the page that users of your site will be redirected to on logout. Should begin with `/`.

### 3. Add the Auth0 callback handler

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

By default, this library expects a `nonce` value in the `state` query parameter as follows: `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F` where the value is a randomly generated UUID. NonceFactory can be used to generate the `nonce` value. 

The `state` may need to hold other attribute values. For instance, in SSO you may need an `externalCallbackUrl` that also needs to be stored in the state parameter: `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F&externalCallbackUrl=http://localhost:3099/callback`.

### 5. Access user information

Depending on which `scopes` you specified on login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received. The full user profile information is available as a session object keyed on `Auth0User` that you can call `SessionUtils.getAuth0User()` to retrieve. 

However, because the authenticated user is also a `java.security.Principal` object, you can automatically inject it into the Controller for secured endpoints.
