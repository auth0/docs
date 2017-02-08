---
description: Describes how to call APIs from regular web apps using the  Authentication Code Grant.
---

# Calling APIs from Server-side Web Apps

The OAuth 2.0 grant that [regular web apps](/quickstart/webapp) use in order to access an API, is the **Authorization Code Grant**.

<div class="alert alert-info">
  If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
</div>

::: panel-info OAuth 2.0 Terms
- _Resource Owner_: the entity that can grant access to a protected resource. Typically this is the end-user.
- _Resource Server_: the server hosting the protected resources. This is the API you want to access.
- _Client_: an application requesting access to a protected resource on behalf of the end-user. This is your Web App.
- _Authorization Server_: the server that authenticates the Resource Owner, and issues access tokens after getting proper authorization. In this case, Auth0.
:::

## Overview of the flow

The **Authorization Code Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.1)) is a flow where the browser receives an `authorization_code` from Auth0 and transfers this to the web app. The web app will then interact with Auth0 and exchange the `authorization_code` for an [access_token](/tokens/access-token), and optionally an [id_token](/tokens/id-token) and a [refresh_token](/tokens/refresh_token). The web app can now use this `access_token` to call the API on behalf of the user.

![Authorization Code Grant](/media/articles/api-auth/authorization-code-grant.png)

 1. The web app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant)), so the user can authenticate.
 1. Auth0 authenticates the user (via the browser). The first time the user goes through this flow a consent page will be shown where the permissions are listed that will be given to the Client (for example: post messages, list contacts, and so forth).
 1. Auth0 redirects the user to the web app (specifically to the `redirect_uri`, as specified in the [/authorize request](/api/authentication#authorization-code-grant)) with an `authorization_code` in the querystring.
 1. The web app sends the `authorization_code` to Auth0 and asks to exchange it with an `access_token` (and optionally an `id_token` and a `refresh_token`). This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code). When making this request, the web app authenticates with Auth0, using the Client Id and Client Secret.
 1. Auth0 authenticates the web app, validates the `authorization_code` and responds back with the token.
 1. The web app can use the `access_token` to call the API on behalf of the user.



## How to implement the flow

For details on how to implement this using Auth0, refer to [Executing an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant).

## More reading

- [Configuring your tenant for API Authorization](/api-auth/tutorials/configuring-tenant-for-api-auth)
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
