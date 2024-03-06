---
title: Add Login to your Go web application
description: This tutorial demonstrates how to add user login to a Go web application using Auth0.
budicon: 448
topics:
  - quickstarts
  - webapp
  - login
  - golang
github:
  path: 01-Login
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

# Add Login to Your Go Application

Auth0 allows you to add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing Go web application.

<%= include('../../_includes/_configure_auth0_interactive', { 
  callback: 'http://localhost:3000/callback',
  returnTo: 'http://localhost:3000'
}) %>

## Install dependencies {{{ data-action=code data-code="go.mod" }}}

Create a `go.mod` file to list all the dependencies in your application. 

To integrate Auth0 in a Go application, add the`coreos/go-oidc/v3` and `x/oauth2` packages. 

In addition to the OIDC and OAuth2 packages, add`joho/godotenv`, `gin-gonic/gin` and `gin-contrib/sessions`.

::: note
This example uses `gin` for routing, but you can use whichever router you want.
:::

Save the `go.mod` file with the necessary dependencies and install them using the following command in your terminal:

```shell
go mod download
```

## Configure the environment variables {{{ data-action=code data-code=".env" }}}
You must set the following environment variables in `.env` within the root of your project directory:

- **AUTH0_DOMAIN**: The domain of your Auth0 tenant. Find your Auth0 Domain in the Auth0 Dashboard under your Application's Settings in the Domain field. For [custom domains](https://auth0.com/docs/custom-domains), set this to the value of your custom domain instead.
- **AUTH0_CLIENT_ID**: The ID of the Auth0 Application you set up earlier in this quickstart. Find this in the Auth0 Dashboard under your Application's Settings in the Client ID field.
- **AUTH0_CLIENT_SECRET**: The Secret of the Auth0 Application you set up earlier in this quickstart. Find this in the Auth0 Dashboard under your Application's Settings in the Client Secret field.
- **AUTH0_CALLBACK_URL**: The URL used by Auth0 to redirect the user after successful authentication.

## Configure OAuth2 and OpenID Connect packages {{{ data-action=code data-code="auth.go" }}}

Next, configure the OAuth2 and OpenID Connect packages.

Create a file called `auth.go` in the `platform/authenticator` folder. In this package, create a method to 
configure and return [OAuth2](https://godoc.org/golang.org/x/oauth2) and 
[OIDC](https://godoc.org/github.com/coreos/go-oidc) clients, and another one to verify an ID Token.

## Set up your application routes {{{ data-action=code data-code="router.go" }}}

Create a file called `router.go` in the `platform/router` folder. In this package, create a method to configure
and return our routes using [github.com/gin-gonic/gin](https://github.com/gin-gonic/gin). You will be passing an
instance of `Authenticator` to the method, for use with the `login` and `callback` handlers.

::: note
The router uses the [github.com/gin-contrib/sessions](https://github.com/gin-contrib/sessions) middleware to manage our cookie-based sessions.
:::

## Add login to your application {{{ data-action=code data-code="login.go" }}}

For the user to authenticate themselves, we need to create a handler function to handle the `/login` route.

Create a file called `login.go` in the `web/app/login` folder, and add a `Handler` function. Upon executing the handler, the user will be redirected to Auth0 where they can enter their credentials.

To call the `/login` route, add a link to `/login` in the `home.html` template located in the `web/template` directory.

```html
<!-- Save this within ./web/template/home.html -->

<div>
    <h3>Auth0 Example</h3>
    <p>Zero friction identity infrastructure, built for developers</p>
    <a href="/login">SignIn</a>
</div>
```

## Handle authentication callback {{{ data-action=code data-code="callback.go" }}}

Once users have authenticated using Auth0's Universal Login Page, they will return to the app at the `/callback` route.

Create a file called `callback.go` in the `web/app/callback` folder, and add a `Handler` function.

This handler will take the `code` query string, provided by Auth0, and exchange it for an ID token and an access token.

If the ID token is valid, it will store the profile information and access token in the session. The profile information is based on the claims contained in the ID token. Session storage allows the application to access that information as needed.

## Display user profile information {{{ data-action=code data-code="user.go" }}}

Now that your users can log in, you will likely want to be able to retrieve and use the [profile information](/users/concepts/overview-user-profile) associated with authenticated users. 

You can access that [profile information](/users/concepts/overview-user-profile), such as their nickname or profile picture, through the `profile` that was stored in the session previously.

Create a handler for the `/user` endpoint in `web/app/user/user.go` and return the corresponding HTML file. As the `profile` is being passed to `ctx.HTML()`, you can access the profile information such as `picture` and `nickname` inside that same HTML file. 

An example of such an HTML file could look like the example below, but you can retrieve any [profile information](/users/concepts/overview-user-profile), including custom claims.

```html
<!-- Save this within ./web/template/user.html -->

<div>
    <img class="avatar" src="{{ .picture }}"/>
    <h2>Welcome {{.nickname}}</h2>
</div>
```

## Add logout to your application {{{ data-action=code data-code="logout.go" }}}

To log the user out, clear the data from the session and redirect the user to the Auth0 logout endpoint. You can find more information about this in the [logout documentation](/logout).

Create a file called `logout.go` in the folder `web/app/logout`, and add the function `Handler` to redirect the user to Auth0's logout endpoint.

::: note
The `returnTo` URL needs to be in the list of Allowed Logout URLs in the settings section of the application, For more information, see [Redirect Users After Logout](/logout/guides/redirect-users-after-logout).
:::

Create a file called `user.js` in the folder `web/static/js`, and add the code to remove the cookie from a logged-in
user.

```js
// Save this within ./web/static/js/user.js

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

Recommended practice dictates certain routes are accessible only to authenticated users. When unauthenticated users try accessing protected routes, your application should redirect them.

In this case, you will implement middleware to hook into the HTTP request. The middleware function determines if the request should route to the endpoint handler or block the request.

Create a file called `isAuthenticated.go` in `platform/middleware` and add a function that checks if the user is authenticated or not based on the `profile` session key. If the user is not authenticated, the middleware will redirect the user to the root of the application.

With the middleware created, we can set it up for any route that needs authentication by adding it to the router.

```go
// This goes within ./platform/router/router.go

router.GET("/user", middleware.IsAuthenticated, user.Handler)
```

## Serve your application {{{ data-action=code data-code="main.go" }}}

With both the authenticator and router configured, we can wire things up using our
application's entry point. Inside `main.go`, create an instance of the authenticator and the router, which gets passed the authenticator instance.

If you are using a `.env` file, you must call `godotenv.Load()` at the very beginning of the `main()` function.

Serve your application by using the following command in your terminal:

```shell
go run main.go
```
