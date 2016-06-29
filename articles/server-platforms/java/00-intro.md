---
title: Introduction
description: This tutorial will show you how to use the Auth0 Java SDK to add authentication and authorization to your web app.
---

This multi-step quickstart will guide you through the process of managing authentication in your Java Servlet Web Application with Auth0.

Auth0 provides and manages a [Servlet SDK](https://github.com/auth0/auth0-servlet). This SDK allows you to use Auth0 with Java for server-side MVC web apps. It presents s simple servlet based solution without introducing specific frameworks or libraries such as Spring. 

__NOTE:__ You can find a listing of all our Java offerings and several sample projects in our [Java technologies and Auth0 libraries](/java-overview) document. 

## Seed &amp; Samples

There are two options to following along this quickstart. You can either download the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) or the samples. 

The seed is a regular java servlet with all the Auth0 dependencies set, but nothing more. It's an empty canvas meant to be filled as you follow along the steps of this quickstart. 

<%= include('../../_includes/_github', {
link: 'https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start',
}) %>

Instead you can choose to follow the samples that are included in each step. Each sample uses the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) as a starting point and applies to it the configuration of each step, so for example the Login sample would be the [seed project](https://github.com/auth0-samples/auth0-servlet-sample/tree/master/00-Start) plus the configuration required to implement the Login.

## Table of Contents

This quickstart consists of the following sections:

- _Introduction_: The document you are reading right now. A quick introduction on what the quickstart is about.
- _Login_: How to create an Auth0 application, add the [Lock](/libraries/lock) widget to your code and perform a login.
- _Login with Custom UI_: How to use [auth0.js](/libraries/auth0js) to build a custom login. Read this if you are not interested in using [Lock](/libraries/lock).
- _Session Handling_: How to store tokens, handle sessions and logout.
- _User Profile_: How to access the user profile from within your app. 
- _Linking Accounts_: How to [link two accounts](/link-accounts) using either the [Lock](/libraries/lock) widget or the [API endpoint](/api/management/v2#!/Users/post_identities).
- _Authorization_: How to pull scope or other access control claims from the token and use those claims to authorize a user to perform certain actions in the application.
- _Calling APIs_: __How to take the access token from__
- _Rules_: How to use [Rules](/rules) to change what is in the [token](/tokens).
- _MFA_: How to add [Multifactor Authentication](/multifactor-authentication) to your app.
- _Customizing Lock_: How to [customize the Lock widget](/libraries/lock/customization).






---

You can get started by either downloading the seed project or if you would like to add Auth0 to an existing application you can follow the tutorial steps.

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.7
* Maven 3.3
:::

<%= include('../../_includes/_github', {
link: 'https://github.com/auth0-samples/auth0-servlet-sample',
}) %>

If you already have an existing Java Servlet Web App, follow the steps below. You can find some useful information on our [Auth0 Servlet GitHub library](https://github.com/auth0/auth0-servlet).

### 1. Add Auth0 dependencies

You need to add the `auth0-servlet` dependency.

If you are using maven, add the dependency to your `pom.xml`:

${snippet(meta.snippets.dependencies)}

If you are using Gradle, add it to the dependencies block:

${snippet(meta.snippets.dependenciesGradle)}

__NOTE:__ See the [seed project](https://github.com/auth0-samples/auth0-servlet-sample) to understand the overall structure of your `pom.xml`.

### 2. Configure your app

To configure `auth0-servlet` to use your Auth0 credentials, edit the `src/main/webapp/WEB-INF/web.xml` file.:

${snippet(meta.snippets.setup)}

__NOTE:__ See the [seed project](https://github.com/auth0-samples/auth0-servlet-sample) that accompanies this library for the overall structure of [web.xml](https://github.com/auth0-samples/auth0-servlet-sample/blob/master/src/main/webapp/WEB-INF/web.xml).

Here is a list of customizable attributes of `web.xml`:

- `auth0.domain`: Your auth0 domain (the tenant you have created when registering with auth0).
- `auth0.clientId`: The unique identifier for your application. You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}).
- `auth0.clientSecret`: This secret will be used to sign and validate tokens which will be used in the different authentication flows. With this key your application will also be able to authenticate to some of the API endpoints (eg: to get an access token from an authorization code). You can find the correct value on the Settings of your app on [Auth0 dashboard](${uiURL}).
- `auth0.onLogoutRedirectTo`: The page that users of your site are redirected to on logout. Should start with `/`.
- `auth0.redirect_on_success`: The landing page URL context path for a successful authentication. Should start with `/`.
- `auth0.redirect_on_error`: The URL context path for the page to redirect to upon failure. Should start with `/`.
- `auth0.redirect_on_authentication_error`: The URL context path for the page to redirect to upon authentication failure. Should start with `/`.


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
