---
title: Call APIs from Client-side Web Apps
description: Learn how to call APIs from client-side web apps using the Implicit Grant.
toc: true
topics:
  - implicit
  - api-authorization
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Implicit Grant

<%= include('../../_includes/_pipeline2') %>

The **Implicit Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) allows an application to request an Access Token (and optionally, an ID Token) and is used for client-side apps, usually Single-Page Applications, which typically consist of a JavaScript app running within a browser, or mobile apps. 

The Implicit Grant is similar to the [Authorization Code Grant](/api-auth/grant/authorization-code), but instead of exchanging an Authorization Code for an Access Token, the application receives an [Access Token](/tokens/concepts/overview-access-tokens) directly. This is because the Single-Page Application is less trusted than a regular web app running on the server, so it cannot be trusted with the `client_secret` (which is required in the [Authorization Code Grant](/api-auth/grant/authorization-code)). For the same reason, no Refresh Tokens are returned. (For a way to simulate a Refresh Token, refer to [Silent Authentication for SPAs](/api-auth/tutorials/silent-authentication)).

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::

## What is the Implicit Grant flow?

![Implicit Grant](/media/articles/api-auth/implicit-grant.png)

 1. The app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#implicit-grant)), so the user can authenticate.

 2. Auth0 authenticates the user. The first time the user goes through this flow, a consent page will be shown that lists the permissions that will be given to the application (for example: post messages, list contacts, and so forth).

 3. Auth0 redirects the user to the app with an [Access Token](/tokens/concepts/overview-access-tokens) (and optionally an [ID Token](/tokens/id-token)) in the hash fragment of the URI. The app can now extract the tokens from the hash fragment. In a Single Page Application (SPA), this would be done using Javascript, and in a Mobile Application, this is typically handled by interacting with a Web View.

 4. The app uses the Access Token to call the API on behalf of the user.

::: note
In OAuth 2.0 terms, the web app is the Application, the end user is the Resource Owner, the API is the Resource Server, the browser is the User Agent, and Auth0 is the Authorization Server.
:::

## How do I implement the Implicit Grant flow?

Learn how to implement this grant flow using Auth0 at [Execute an Implicit Grant](/api-auth/tutorials/implicit-grant).

## Will rules run for the Implicit Grant flow?

[Rules](/rules) will run for the Implicit grant. If you wish to execute special logic unique to the Implicit grant, check that the `context.protocol` property in your rule contains a value of `oidc-implicit-profile`. If it does, then the rule is running during the Implicit Grant.

For implementation details, refer to [How to implement the Implicit Grant: Customize the Tokens](/api-auth/tutorials/implicit-grant#optional-customize-the-tokens).

## Silent Authentication

If you need to authenticate your users without a login page (for example, when the user is already logged in via [SSO](/sso) scenario) or get a new Access Token (thus simulating refreshing an expired token), you can use Silent Authentication.

For implementation details, refer to [Silent Authentication](/api-auth/tutorials/silent-authentication).

## Keep reading

::: next-steps
* [How to implement the Implicit Grant](/api-auth/tutorials/implicit-grant)
* [How to protect your SPA against replay attacks](/api-auth/tutorials/nonce)
* [How to configure an API in Auth0](/api-auth/guides/configure-api)
* [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
* [Application Authentication for Client-side Web Apps](/application-auth/client-side-web)
:::
