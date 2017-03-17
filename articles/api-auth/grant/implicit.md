---
description: Learn how to call APIs from client-side web apps using the OAuth 2.0 Implicit Grant.
crews: crew-2
---

# Call APIs from Client-side Web Apps

In order to access an API from a [client-side app](/quickstart/spa) (typically a Single Page Application or a Mobile Application), you need to implement the OAuth 2.0 **Implicit Grant**. In this document we will see how this flow works.

<div class="alert alert-info">
  If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
</div>

## Overview

The **Implicit Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) is similar to the [Authorization Code Grant](/api-auth/grant/authorization-code), but the main difference is that the client app receives an `access_token` directly, without the need for an `authorization_code`. This happens because the client app, which is typically a JavaScript app running within a browser, is less trusted than a web app running on the server, hence cannot be trusted with the `client_secret` (which is required in the [Authorization Code Grant](/api-auth/grant/authorization-code)). Also, in the Implicit Grant, no refresh tokens for are returned, for the same reason (for an alternative refer to [Silent authentication for SPAs](/api-auth/tutorials/silent-authentication)).

Once the user authenticates, the client app receives the `access_token` in the hash fragment of the URI. The client app can now use this `access_token` to call the API on behalf of the user.

![Implicit Grant](/media/articles/api-auth/implicit-grant.png)

 1. The app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#implicit-grant)), so the user can authenticate.

 1. Auth0 authenticates the user. The first time the user goes through this flow a consent page will be shown where the permissions, that will be given to the Client, are listed (for example: post messages, list contacts, and so forth).

 1. Auth0 redirects the user to the app with an `access_token` (and optionally a `id_token`) in the hash fragment of the URI. The app can now extract the tokens from the hash fragment. In a Single Page Application (SPA) this would be done using Javascript and in a Mobile Application this is typically handled by interacting with a Web View.

 1. The app can use the `access_token` to call the API on behalf of the user.

  <div class="auth0-notification frendly"><i class="notification-icon icon-budicon-266"></i>
     &nbsp;In OAuth 2.0 terms, the web app is the <em>Client</em>, the end user the <em>Resource Owner</em>, the API the <em>Resource Server</em>, the browser the <em>User Agent</em>, and Auth0 the <em>Authorization Server</em>.
  </div>

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute an Implicit Grant](/api-auth/tutorials/implicit-grant).

## Keep reading

<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to implement the Implicit Grant](/api-auth/tutorials/implicit-grant)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to protect your SPA against replay attacks](/api-auth/tutorials/nonce)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Silent authentication for SPAs](/api-auth/tutorials/silent-authentication)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[How to configure an API in Auth0](/apis)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Single Page App Quickstarts](/quickstart/spa)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[ID Token](/tokens/id-token)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Access Token](/tokens/access-token)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Client Authentication for Client-side Web Apps](/client-auth/client-side-web)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Authentication API: GET /authorize](/api/authentication#implicit-grant)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[The OAuth 2.0 protocol](/protocols/oauth2)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[The OpenID Connect protocol](/protocols/oidc)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[Tokens used by Auth0](/tokens)<br/>
<i class="notification-icon icon-budicon-345"></i>&nbsp;[RFC 6749: The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
