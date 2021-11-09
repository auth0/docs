---
title: Add Login to your React App
description: "Auth0 allows you to add authentication to your React application quickly and to gain access to user profile information. This guide demonstrates how to integrate Auth0 with any new or existing React application using the Auth0 React SDK."
interactive: true
files:
  - _files/app
  - _files/index
  - _files/login
  - _files/logout
---

# Add Login to your React App

Auth0 allows you to quickly add authentication and gain access to user profile information in your application. This guide demonstrates how to integrate Auth0 with any new or existing React application using the Auth0 React SDK. 

## Configure Auth0 {{{ data-action=configure }}}

### Create a new application
Create a new application or select an existing application to integrate with. You can also create and manage your applications in the Dashboard at Dashboard > Applications > Applications. 

If you are logged in configuring your settings in the quickstart will automatically update your settings in the dashboard.

### Configure Callback URLs

A callback URL is a URL in your application where Auth0 redirects the user after they have authenticated. If not set, users won't have a place to be redirected to after logging in.

### Configure Logout URLs

A logout URL is a URL in your application that Auth0 can return to after the user has been logged out of the authorization server. This is specified in the returnTo query parameter. If this field is not set, users will be unable to log out from the application and will get an error.

## Install the Auth0 React SDK {{{ data-action=code data-code="app.js#5:10" }}}

In your terminal, run the command within your application directory to install the Auth0 React SDK.

### Configure the Auth0Provider component

The Auth0Provider component takes the following props:

- `domain` and `clientId`: The values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.
- `redirectUri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

:::note
If you are using a custom domain with Auth0, the value of the domain property is the value of your custom domain instead of the value reflected in the "Settings" tab.
:::

::::checkpoint

:::checkpoint-default

Now that you have configured `Auth0Provider`, run your application to verify that:
* the SDK is initializing correctly
* your application is not throwing any errors related to Auth0

:::

:::checkpoint-success
Yay!
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::
::::

## Third Step {{{ data-action=code data-code="login.js#4:7" }}}

In your terminal, run the command within your application directory to install the Auth0 React SDK.

### Configure the Auth0Provider component

The Auth0Provider component takes the following props:

- `domain` and `clientId`: The values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.
- `redirectUri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

:::note
If you are using a custom domain with Auth0, the value of the domain property is the value of your custom domain instead of the value reflected in the "Settings" tab.
:::

::::checkpoint

:::checkpoint-default

Now that you have configured `Auth0Provider`, run your application to verify that:
* the SDK is initializing correctly
* your application is not throwing any errors related to Auth0

:::

:::checkpoint-success
Yay!
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::

## Fourth Step

In your terminal, run the command within your application directory to install the Auth0 React SDK.

### Configure the Auth0Provider component

The Auth0Provider component takes the following props:

- `domain` and `clientId`: The values of these properties correspond to the "Domain" and "Client ID" values present under the "Settings" of the single-page application that you registered with Auth0.
- `redirectUri`: The URL to where you'd like to redirect your users after they authenticate with Auth0.

:::note
If you are using a custom domain with Auth0, the value of the domain property is the value of your custom domain instead of the value reflected in the "Settings" tab.
:::

::::checkpoint

:::checkpoint-default

Now that you have configured `Auth0Provider`, run your application to verify that:
* the SDK is initializing correctly
* your application is not throwing any errors related to Auth0

:::

:::checkpoint-success
Yay!
:::

:::checkpoint-failure
Sorry about that. Here's a couple things to double check:
* make sure the correct application is selected
* did you save after entering your URLs?
* make sure the domain and client ID imported correctly

Still having issues? Check out our [documentation](https://auth0.com/docs) or visit our [community page](https://community.auth0.com) to get more help.

:::

::::