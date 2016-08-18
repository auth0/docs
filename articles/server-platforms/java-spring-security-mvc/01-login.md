---
title: Login
description: This tutorial will show you how to use the Auth0 Java Spring Security MVC SDK to add authentication and authorization to your web app.
---

::: panel-info System Requirements
This tutorial and seed project have been tested with the following:

* Java 1.8
* Maven 3.3
:::

<%= include('../../_includes/_package', {
githubUrl: 'https://github.com/auth0-samples/auth0-spring-security-mvc-sample/tree/master/01-Login',
pkgOrg: 'auth0-samples',
pkgRepo: 'auth0-spring-security-mvc-sample',
pkgBranch: 'master',
pkgPath: '01-Login',
pkgFilePath: null,
pkgType: 'none'
}) %>

In this step we will implement login functionality using Lock. Lock is an embeddable login form for desktop, tablet and mobile devices.


## Add the Auth0 callback handler

First we need to add the handler for the Auth0 callback so that we can authenticate the user and get his information. For that, we'll use the `Auth0CallbackHandler` provided by the SDK.

We have to define a new Controller, configure it to use the `auth0.loginCallback` endpoint, and inherit from `Auth0CallbackHandler`.

Create a new `CallbackController.java` file and set the following contents:

${snippet(meta.snippets.use)}


## Define endpoint security configuration

The [Auth0 Spring Security MVC library](https://github.com/auth0/auth0-spring-security-mvc) contains a security configuration class, called `Auth0SecurityConfig`. This class handles all the library Application Context wiring configuration, and a default `HttpSecurity` endpoint configuration that secures the URL Context path defined with `auth0.securedRoute` property.

This is defined in a method called `authorizeRequests(final HttpSecurity http)` which should be overridden by you.

${snippet(meta.snippets.LoginAuthRequestsMethod)}

By subclassing, and overriding `authorizeRequests` you can define whatever endpoint security configuration (authentication and authorization) is suitable for your own needs.

For example, this is the declared subclass together with overridden method from our sample application.

${snippet(meta.snippets.LoginAuthRequestsSubclass)}


## Display Lock widget

In order to setup [Lock](/libraries/lock) update the `login.jsp` as follows:

${snippet(meta.snippets.LoginJsp)}

__NOTE__: The sample also includes several css, js, and font files, which are not listed in this document for brevity. These files can be found under the `auth0-spring-mvc-sample/src/main/resources/static/` directory and you don't need to include them if you don't want to.

First, we initialize `Auth0Lock` with a `clientID` and the account's `domain`.

```
var lock = new Auth0Lock('${account.clientId}', '${account.namespace}');
```

Afterwards, we use the `showSignin` method to open the widget on signin mode. We set several parameters as input, like `authParams` and `responseType`. For details on what each parameter does, refer to [Lock: User configurable options](/libraries/lock/customization).

By default, this library expects a Nonce value in the state query param as follows `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F` where `xyz` is a randomly generated UUID.

The NonceFactory can be used to generate such a nonce value. State may be needed to hold other attribute values hence why it has its own keyed value of `nonce=B4AD596E418F7CE02A703B42F60BAD8F`. For instance in SSO you may need an `externalCallbackUrl` which also needs to be stored down in the state param: `state=nonce=B4AD596E418F7CE02A703B42F60BAD8F&externalCallbackUrl=http://localhost:3099/callback`.


## Display user information

Depending on what `scopes` you specified upon login, some user information may be available in the [id_token](/tokens#auth0-id_token-jwt-) received.

The full user profile information is available as a session object keyed on `Auth0User`, you can call `SessionUtils.getAuth0User()` to retrieve the information. However, because the authenticated user is also a `java.security.Principal` object we can inject it into the Controller automatically for secured endpoints.

Add the following to your `HomeController.java` file:

${snippet(meta.snippets.LoginHomeController)}

The value `/portal/home` should be replaced with the valid one for your implementation.

Once the user has successfully authenticated, the application displays the `home.jsp`. In order to display some user information, as retrieved from Auth0, update the `home.jsp` as follows:

${snippet(meta.snippets.LoginHomeJsp)}

## Test the app

We are now ready to test the application! 

Build and run the project using `mvn spring-boot:run`. Then, go to [http://localhost:3099/login](http://localhost:3099/login).

You should see the custom login page, instead of Lock.

![Lock Login](/media/articles/java/lock_login_form.png)

Enter the credentials of the user you created earlier to test the login. You should see the following screen.

![Lock Login](/media/articles/java/lock_user_info.png)

## Done!

That's it, you're done! You implemented basic login functionality using [Lock](/libraries/lock). 

Continue to the next tutorial to see how you can create your own custom login.

