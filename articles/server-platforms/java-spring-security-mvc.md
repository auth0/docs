---
title: Auth0 Java Spring Security MVC Tutorial
description: This tutorial will show you how to use the Auth0 Java Spring Security MVC SDK to add authentication and authorization to your web app.
name: Java Spring Security MVC
image: /media/platforms/spring.png
tags:
  - quickstart
alias:
  - spring
  - spring-security
seo_alias: java spring mvc
snippets:
  dependencies: server-platforms/java-spring-security-mvc/dependencies
  setup: server-platforms/java-spring-security-mvc/setup
  use: server-platforms/java-spring-security-mvc/use
---

## Java Spring Security MVC Web App Tutorial

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.8
* Maven 3.3
:::

<%= include('../_includes/_package', {
  pkgRepo: 'auth0-spring-security-mvc',
  pkgBranch: 'master',
  pkgPath: 'examples/auth0-spring-security-mvc-sample',
  pkgFilePath: 'examples/auth0-spring-security-mvc-sample/src/main/resources/auth0.properties',
  pkgType: 'replace'
}) %>

**If you have an existing Java Spring Web App, please follow the steps below.**

### 1. Add Auth0 dependencies

Add the following dependencies to your `pom.xml` and run `mvn install`.

See the sample project to understand the proposed overall structure of your pom.xml

### 2. Configure your app

We need to configure `auth0-spring-mvc` to use our Auth0 credentials. For that, just create a file called `auth0.properties`.
Place this under `src/main/resources`. Set the following settings:

```
auth0.domain: {your domain}
auth0.clientId: {your client id}
auth0.clientSecret: {your secret}
auth0.onLogoutRedirectTo: /login
auth0.securedRoute: /portal/*
auth0.loginCallback: /callback
auth0.loginRedirectOnSuccess: /portal/home
auth0.loginRedirectOnFail: /login
auth0.servletFilterEnabled: true
```

Please take a look at the sample that accompanies this library for an easy seed project to see this working.

Here is a breakdown of what each attribute means:

- `auth0.domain` - This is your auth0 domain (tenant you have created when registering with auth0 - account name)
- `auth0.clientId` - This is the client id of your auth0 application (see Settings page on auth0 dashboard)
- `auth0.clientSecret` - This is the client secret of your auth0 application (see Settings page on auth0 dashboard)
- `auth0.onLogoutRedirectTo` - This is the page / view that users of your site are redirected to on logout. Should start with `/`
- `auth0.securedRoute`: - This is the URL pattern to secure a URL endpoint. Should start with `/`
- `auth0.loginCallback` -  This is the URL context path for the login callback endpoint. Should start with `/`
- `auth0.loginRedirectOnSuccess` - This is the landing page URL context path for a successful authentication. Should start with `/`
- `auth0.loginRedirectOnFail` - This is the URL context path for the page to redirect to upon failure. Should start with `/`
- `auth0.servletFilterEnabled` - This is a boolean value that switches having an authentication filter enabled On / Off.


### 3. Add Auth0 callback handler

We need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll use the `Auth0CallbackHandler` provided by the SDK.

Simply define a new Controller, configure it to use the `auth0.loginCallback` endpoint, and inherit from `Auth0CallbackHandler`.

Example usage - Simply extend this class and define Controller in subclass.

```java
package com.auth0.example;

import com.auth0.web.Auth0CallbackHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
public class CallbackController extends Auth0CallbackHandler {
  @RequestMapping(value = "${account.callback}", method = RequestMethod.GET)
  protected void callback(final HttpServletRequest req, final HttpServletResponse res)
  throws ServletException, IOException {
    super.handle(req, res);
  }
}
```

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

By default, this library expects a Nonce value in the state query param as follows `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F` where `xyz`
is a randomly generated UUID.

The NonceFactory can be used to generate such a nonce value. State may be needed to hold other attribute values hence why it has its
own keyed value of `nonce=B4AD596E418F7CE02A703B42F60BAD8F`. For instance in SSO you may need an `externalCallbackUrl` which also needs
to be stored down in the state param - `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F&externalCallbackUrl=http://localhost:3099/callback`


### 5. Accessing user information

Depending on what `scopes` you specified upon login, some user information may be available in the `id_token` received.
The full user profile information is available as a session object keyed on 'Auth0User' - you can simply calling
SessionUtils.getAuth0User() - however, because the authenticated user is also a java.security.Principal object we can
inject it into the Controller automatically for secured endpoints.

```java
   @RequestMapping(value="/portal/home", method = RequestMethod.GET)
   protected String home(final Map<String, Object> model, final Principal principal) {
       logger.info("Home page");
       final Auth0User user = (Auth0User) principal;
       logger.info("Principal name: "  user.getName());
       model.put("user", user);
       return "home";
   }
```

### 6. You're done!

You have configured your Java Webapp to use Auth0.