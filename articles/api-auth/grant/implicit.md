---
description: Learn how to call APIs from client-side web apps using the OAuth 2.0 Implicit Grant.
---

# Call APIs from Client-side Web Apps

In order to access an API from a [client-side app](/quickstart/spa) (typically a Single Page Application or a Mobile Application), you need to implement the OAuth 2.0 **Implicit Grant**. In this document we will see how this flow works.

<div class="alert alert-info">
  If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
</div>

## Overview

The **Implicit Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) is also a redirect-based flow, similar to the Authorization Code Grant, but the main difference is that all of the interactions with the Authorization Server happen through the User Agent (this includes receiving the access token). After receiving the `access_token`, the User Agent will expose this to the Client, allowing it to call the Resource Server on behalf of the Resource Owner.

![Implicit Grant](/media/articles/api-auth/implicit-grant.png)

 1. The app initiates the flow and redirects the user to Auth0.

 1. The user authenticates.

 1. Auth0 redirects the user to the app with an `access_token` (and optionally a `id_token`) in the hash fragment.

 1. The app can now extract the tokens from the hash fragment. In a Single Page Application (SPA) this would be done using Javascript and in a Mobile Application this is typically handled by interacting with a Web View.

 1. The app can use the `access_token` to call the API on behalf of the user.


  __NOTE__: In OAuth 2.0 terms, the web app is the _Client_, the end user the _Resource Owner_, the API the _Resource Server_, the browser the _User Agent_, and Auth0 the _Authorization Server_.

The first time the user goes through this flow a consent page will be shown where the permissions are listed that will be given to the Client (for example, post messages, list contacts, and so forth).

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute an Implicit Grant Flow](/api-auth/tutorials/implicit-grant).

## Keep reading

<i class="notification-icon icon-budicon-345"></i>&nbsp;[Executing an Implicit Grant flow](/api-auth/tutorials/implicit-grant)<br/>

<i class="notification-icon icon-budicon-345"></i>&nbsp;[Protecting against replay attacks](/api-auth/tutorials/nonce)<br/>

<i class="notification-icon icon-budicon-345"></i>&nbsp;[Silent authentication for SPAs](/api-auth/tutorials/silent-authentication)<br/>
