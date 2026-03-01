---
title: Call APIs from Client-side Web Apps
description: Learn how to call APIs from client-side web apps using the OAuth 2.0 Implicit Grant.
toc: true
topics:
  - implicit
  - api-authorization
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Call APIs from Client-side Web Apps

In order to access an API from a [client-side app](/quickstart/spa) (typically a Single-Page Application or a Mobile Application), you need to implement the OAuth 2.0 **Implicit Grant**. In this document we will see how this flow works.

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::

## Overview

The **Implicit Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) is similar to the [Authorization Code Grant](/api-auth/grant/authorization-code), but the main difference is that the application receives an [Access Token](/tokens/concepts/access-tokens) directly, without the need for an `authorization_code`. This happens because the application, which is typically a JavaScript app running within a browser, is less trusted than a web app running on the server, hence cannot be trusted with the `client_secret` (which is required in the [Authorization Code Grant](/api-auth/grant/authorization-code)). Also, in the Implicit Grant, no <dfn data-key="refresh-token">Refresh Tokens</dfn> are returned for the same reason (for an alternative refer to [Silent authentication for SPAs](/api-auth/tutorials/silent-authentication)).

Once the user authenticates, the application receives the Access Token in the hash fragment of the URI. The application can now use this Access Token to call the API on behalf of the user.

![Implicit Grant](/media/articles/api-auth/implicit-grant.png)

 1. The app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#implicit-grant)), so the user can authenticate.

 1. Auth0 authenticates the user. The first time the user goes through this flow a consent page will be shown where the permissions, that will be given to the Application, are listed (for example: post messages, list contacts, and so forth).

 1. Auth0 redirects the user to the app with an [Access Token](/tokens/concepts/access-tokens) (and optionally an [ID Token](/tokens/concepts/id-tokens)) in the hash fragment of the URI. The app can now extract the tokens from the hash fragment. In a Single-Page Application (SPA) this would be done using Javascript and in a Mobile Application this is typically handled by interacting with a Web View.

 1. The app can use the Access Token to call the API on behalf of the user.

::: note
In OAuth 2.0 terms, the web app is the Application, the end user the Resource Owner, the API the Resource Server, the browser the User Agent, and Auth0 the Authorization Server.
:::

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute an Implicit Grant](/api-auth/tutorials/implicit-grant).

## Rules

[Rules](/rules) will run for the Implicit grant. If you wish to execute special logic unique to the Implicit grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-implicit-profile`, then the rule is running during the Implicit grant.

For details on how to implement this, refer to [How to implement the Implicit Grant: Customize the Tokens](/api-auth/tutorials/implicit-grant#optional-customize-the-tokens).

## Silent Authentication

If you need to authenticate your users without a login page (for example, when the user is already logged in via <dfn data-key="single-sign-on">[Single Sign-on (SSO)](/sso)</dfn> scenario) or get a new Access Token (thus simulate refreshing an expired token), you can use Silent Authentication.

For details on how to implement this, refer to [Silent Authentication](/api-auth/tutorials/silent-authentication).

## Keep reading

::: next-steps
* [How to implement the Implicit Grant](/api-auth/tutorials/implicit-grant)
* [How to protect your SPA against replay attacks](/api-auth/tutorials/nonce)
* [How to configure an API in Auth0](/apis)
* [Tokens](/tokens)
* [Application Authentication for Client-side Web Apps](/application-auth/client-side-web)
:::
