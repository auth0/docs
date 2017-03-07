---
description: Describes how to call APIs from regular web apps using the  Authentication Code Grant.
---

# Calling APIs from Server-side Web Apps

In order to access an API from a [regular web app](/quickstart/webapp), you need to implement the **Authorization Code** OAuth 2.0 grant. In this document we will see how this flow works.

<div class="alert alert-info">
  If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
</div>

## Overview of the flow

The **Authorization Code Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.1)) is a flow where the browser receives an Authorization Code from Auth0 and sends this to the web app. The web app will then interact with Auth0 and exchange the Authorization Code for an [access_token](/tokens/access-token), and optionally an [id_token](/tokens/id-token) and a [refresh_token](/tokens/refresh_token). The web app can now use this `access_token` to call the API on behalf of the user.

![Authorization Code Grant](/media/articles/api-auth/authorization-code-grant.png)

1. The web app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant)), so the user can authenticate.

1. Auth0 authenticates the user (via the browser). The first time the user goes through this flow a consent page will be shown where the permissions are listed that will be given to the Client (for example: post messages, list contacts, and so forth).

1. Auth0 redirects the user to the web app (specifically to the `redirect_uri`, as specified in the [/authorize request](/api/authentication#authorization-code-grant)) with an Authorization Code in the querystring (`code`).

1. The web app sends the Authorization Code to Auth0 and asks to exchange it with an `access_token` (and optionally an `id_token` and a `refresh_token`). This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code). When making this request, the web app authenticates with Auth0, using the Client Id and Client Secret.

1. Auth0 authenticates the web app, validates the Authorization Code and responds back with the token.

1. The web app can use the `access_token` to call the API on behalf of the user.

  __NOTE__: In OAuth 2.0 terms, the web app is the _Client_, the end user the _Resource Owner_, the API the _Resource Server_, the browser the _User Agent_, and Auth0 the _Authorization Server_.


## How to implement the flow

For details on how to implement this using Auth0, refer to [Executing an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant).

## Keep reading

- [How to implement an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant)
- [How to configure an API in Auth0](/apis)
- [Web App Quickstarts](/quickstart/webapp)
- [Client Authentication for Server-side Web Apps](/client-auth/server-side-web)
- [Authentication API: GET /authorize](/api/authentication?http#authorization-code-grant)
- [Authentication API: POST /oauth/token](/api/authentication?http#authorization-code)
- [The OAuth 2.0 protocol](/protocols/oauth2)
- [The OpenID Connect protocol](/protocols/oidc)
- [Tokens used by Auth0](/tokens)
- [Integrating a Web App with Auth0](/protocols/oauth2/oauth-web-protocol)
- [RFC 6749](https://tools.ietf.org/html/rfc6749)
