---
title: Add Login to your ASP.NET MVC application
description: This tutorial demonstrates how to add user login to an ASP.NET Core application.
budicon: 448
topics:
  - quickstarts
  - webapp
  - aspnet-core
  - login
github:
  path: Quickstart/Sample
contentType: tutorial
useCase: quickstart
interactive: true
files:
  - files/auth
  - files/callback
  - files/env
  - files/go-mod
  - files/isAuthenticated
  - files/login
  - files/logout
  - files/main
  - files/router
  - files/user
---

# Add Login to your Go application

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Go web application.

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/callback',
  returnTo: 'http://localhost:3000'
}) %>

## Install dependencies {{{ data-action=code data-code="go.mod" }}}

To integrate Auth0 in a Go application, you want to use the `coreos/go-oidc/v3` and `x/oauth2` packages.

Add a `go.mod` file to list all the dependencies to be used in your application. Apart from the OIDC and OAuth2 packages, we will also be adding `joho/godotenv`, `gin-gonic/gin` and `in-contrib/sessions`.

::: note
This example uses `gin` for routing, but you can use whichever router you want.
:::

Once the dependencies are listed in the `go.mod` file, install them by using the following shell command:

```shell
go mod download
```

## Configure the environment variables {{{ data-action=code data-code=".env" }}}
For the SDK to function properly, you must set the following environment variables in `.env` within the root of your project directory:

- **AUTH0_DOMAIN**: The domain of your Auth0 tenant. Generally, you can find this in the Auth0 Dashboard under your Application's Settings in the Domain field. If you are using a [custom domain](https://auth0.com/docs/custom-domains), you should set this to the value of your custom domain instead.
- **AUTH0_CLIENT_ID**: The ID of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.
- **AUTH0_CLIENT_SECRET**: The Secret of the Auth0 Application you set up earlier in this quickstart. You can find this in the Auth0 Dashboard under your Application's Settings in the Client Secret field.
- **AUTH0_CALLBACK_URL**: The URL used by Auth0 to redirect the user after succesfull authentication.

## Configure OAuth2 and OpenID Connect packages {{{ data-action=code data-code="auth.go" }}}

In order to be able to use Auth0, the OAuth2 and OpenID Connect packages need to be configured. 

Create a file called `auth.go` in the `platform/authenticator` folder. In this package, create a method to 
configure and return [OAuth2](https://godoc.org/golang.org/x/oauth2) and 
[OIDC](https://godoc.org/github.com/coreos/go-oidc) clients, and another one to verify an ID Token.

## Set up your application routes {{{ data-action=code data-code="router.go" }}}

Create a file called `router.go` in the `platform/router` folder. In this package, create a method to configure
and return our routes using [github.com/gin-gonic/gin](https://github.com/gin-gonic/gin). You will be passing an
instance of `Authenticator` to the method, so it can be used within the `login` and `callback` handlers.

::: note
The router uses the [github.com/gin-contrib/sessions](https://github.com/gin-contrib/sessions) middleware to manage our cookie based sessions.
:::

## Serve your application {{{ data-action=code data-code="main.go" }}}

With both the authenticator and router configured, we can wire things up using our
application's entry point. Inside `main.go`, create an instance of the authenticator and the router, which gets passed the authenticator instance.

If you are using a `.env` file, like we are in this example, be sure to call `godotenv.Load()` at the very beginning of the `main()` function.

## Add login to your application {{{ data-action=code data-code="login.go" }}}

In order for user to be able to authenticate themselves, we need to create a handler function to handle the `/login` route.

Create a file called `login.go` in the `web/app/login` folder, and add a `Handler` function. Upon executing the handler, the user will be redirect to Auth0 where they can enter their credentials.

In order to be able to call the `/login` route, add a link to `/login` in the `home.html` template located in the `web/template` directory.

```html
<!-- web/template/home.html -->
<div>
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a href="/login">SignIn</a>
</div>
```

## Handle authentication callback {{{ data-action=code data-code="callback.go" }}}

Once users have authenticated using Auth0's Universal Login Page, they'll return to the app at the `/callback` route.

Create a file called `callback.go` in the `web/app/callback` folder, and add a `Handler` function.

This handler will take the `code` querystring, provided by Auth0, and exchange it for an Id Token and an Access Token.

If the Id Token is valid, it will store the profile information (which gets build based on the claims in the Id Token) in the session along with the Access Token, this is done in order to be able to retrieve and use that information when needed.

## Display User Information {{{ data-action=code data-code="user.go" }}}

Now that your users can log in, you will likely want to be able to retrieve and use the [profile information](/users/concepts/overview-user-profile) associated with authenticated users. 

You can access that [profile information](/users/concepts/overview-user-profile), such as their nickname or profile picture, through the `profile` that was stored in the session previously.

Create a handler for the `/user` endpoint in `web/app/user/user.go` and return the corresponding HTML file. As the `profile` if being passed to `ctx.HTML()`, you can access the profile information such as `picture` and `nickname` inside that same HTML file. 

An example of such an HTML file could look like the example below, but you can retrieve any [profile information](/users/concepts/overview-user-profile), including custom claims.

```html
<!-- web/template/user.html -->

<div>
    <img class="avatar" src="{{ .picture }}"/>
    <h2>Welcome {{.nickname}}</h2>
</div>
```

## Add Logout to your application {{{ data-action=code data-code="logout.go" }}}

To log the user out, clear the data from the session and redirect the user to the Auth0 logout endpoint. You can find more information about this in the [logout documentation](/logout).

Create a file called `logout.go` in the folder `web/app/logout`, and add the function `Handler` to redirect the user to Auth0's logout endpoint.

::: note
The `returnTo` URL needs to be in the list of Allowed Logout URLs in the settings section of the application, For more information, see [Redirect Users After Logout](/logout/guides/redirect-users-after-logout).
:::

Create a file called `user.js` in the folder `web/static/js`, and add the code to remove the cookie from a logged-in
user.

```js
$(document).ready(function () {
    $('.btn-logout').click(function (e) {
        Cookies.remove('auth-session');
    });
});
```

::: note
This sample is using [js.cookie](https://github.com/js-cookie/js-cookie/tree/latest#readme) for cookie handling. 
You need to add the `js.cookie.js` file to the `web/static/js` folder to use it.
:::

## Protect routes {{{ data-action=code data-code="isAuthenticated.go" }}}

When implementing authentication, it makes sense to have certain routes only be accessible by authenticated users. When unauthenticated users try accessing said routes, they should be redirected accordingly.

This is where middleware comes into play. We can use it to hook into the HTTP request and decide whether or not the request should be blocked from reaching the actual endpoint handler.

Create a file calles `isAuthenticated.go` in `platform/middleware` and add a function that will check if the user is authenticated or not based on the `profile` session key. If the user is not authenticated, the middleware will redirect the user to the root of the application.

With the middleware created, we can set it up for any route that needs authentication by adding it to the router.

```go
// platform/router/router.go

router.GET("/user", middleware.IsAuthenticated, user.Handler)
```