---
title: Add Login to your Express App
description: "Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add user login, logout, and profile to a Node.js Express application using the Express OpenID Connect SDK."
interactive: true
files:
- files/server
github:
  path: 01-Login
---

<!-- markdownlint-disable MD025 MD034 -->

# Add Login to Your Express Application

Auth0 allows you to add authentication to almost any application type quickly. This guide demonstrates how to integrate Auth0, add user login, logout, and profile to a Node.js Express application using the Express OpenID Connect SDK.

## Configure Auth0 {{{ data-action=configure }}}

To use Auth0 services, you’ll need to have an application set up in the Auth0 Dashboard. The Auth0 application is where you will configure how you want authentication to work for the project you are developing.

### Configure an application

Use the interactive selector to create a new Auth0 application or select an existing application that represents the project you want to integrate with. Every application in Auth0 is assigned an alphanumeric, unique client ID that your application code will use to call Auth0 APIs through the SDK.

Any settings you configure using this quickstart will automatically update for your Application in the <a href="${manage_url}/#/">Dashboard</a>, which is where you can manage your Applications in the future.

If you would rather explore a complete configuration, you can view a sample application instead.

### Configure Callback URLs

A callback URL is a URL in your application that you would like Auth0 to redirect users to after they have authenticated. If not set, users will not be returned to your application after they log in.

::: note
If you are following along with our sample project, set this to http://localhost:3000/callback.
:::

### Configure Logout URLs

A logout URL is a URL in your application that you would like Auth0 to redirect users to after they have logged out. If not set, users will not be able to log out from your application and will receive an error.

::: note
If you are following along with our sample project, set this to http://localhost:3000/logout.
:::

## Install the Express OpenID Connect SDK {{{ data-action=code data-code="server.js#3:10" }}}

Your application will need the [`express-openid-connect`](https://github.com/auth0/express-openid-connect) package which is an Auth0-maintained OIDC-compliant SDK for Express.

Install the Express OpenID Connect SDK by running the following commands in your terminal:

```bash
cd <your-project-directory>
npm install express-openid-connect
```

### Configure Router
The Express OpenID Connect library provides the `auth` router in order to attach authentication routes to your application. You will need to configure the router with the following configuration keys:

- `authRequired` - Controls whether authentication is required for all routes
- `auth0Logout` - Uses Auth0 logout feature
- `baseURL` - The URL where the application is served
- `secret` - A long, random string
- `issuerBaseURL`  - The Domain as a secure URL found in your [Application settings](${manage_url}/#/applications/${account.clientId}/settings)
- `clientID` - The Client ID found in your [Application settings](${manage_url}/#/applications/${account.clientId}/settings)

For additional configuration options visit the [API documentation](https://auth0.github.io/express-openid-connect).

:::note
You can generate a suitable string for `LONG_RANDOM_STRING` using `openssl rand -hex 32` on the command line.
:::

::::checkpoint
:::checkpoint-default
A user can now log into your application by visiting the `/login` route provided by the library. If you are running your project on `localhost:3000` that link would be [`http://localhost:3000/login`](http://localhost:3000/login).
:::
:::checkpoint-failure
Sorry about that. You should check the error details on the Auth0 login page to make sure you have entered the callback URL correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::

## Display User Profile {{{ data-action=code data-code="server.js#29:32" }}}
To display the user's profile, your application should provide a protected route.

Add the `requiresAuth` middleware for routes that require authentication.  Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.

::::checkpoint
:::checkpoint-default
A user can log out of your application by visiting the `/logout` route provided by the library. If you are running your project on `localhost:3000` that link would be [`http://localhost:3000/logout`](http://localhost:3000/logout).
:::
:::checkpoint-failure
Sorry about that. You should check that you configured the logout URL correctly.

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.
:::
::::
