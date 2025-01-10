---
description: Describes how to call APIs from regular web apps using the Authentication Code Grant.
topics:
  - authorization-code
  - api-authorization
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Call APIs from Server-side Web Apps

In order to access an API from a [regular web app](/quickstart/webapp), you need to implement the **Authorization Code** OAuth 2.0 grant. In this document we will see how this flow works.

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::

## Overview of the flow

The **Authorization Code Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.1)) is a flow where the browser receives an Authorization Code from Auth0 and sends this to the web app. The web app will then interact with Auth0 and exchange the Authorization Code for an [Access Token](/tokens/concepts/access-tokens), and optionally an [ID Token](/tokens/concepts/id-tokens) and a <dfn data-key="refresh-token">Refresh Token</dfn>. The web app can now use this Access Token to call the API on behalf of the user.

![Authorization Code Grant](/media/articles/api-auth/authorization-code-grant.png)

1. The web app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant)), so the user can authenticate.

1. Auth0 authenticates the user (via the browser). The first time the user goes through this flow a consent page will be shown where the permissions are listed that will be given to the application (for example: post messages, list contacts, and so forth).

1. Auth0 redirects the user to the web app (specifically to the `redirect_uri`, as specified in the [/authorize request](/api/authentication#authorization-code-grant)) with an Authorization Code in the querystring (`code`).

1. The web app sends the Authorization Code to Auth0 and asks to exchange it with an Access Token (and optionally an ID Token and a Refresh Token). This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code). When making this request, the web app authenticates with Auth0, using the Client Id and Client Secret.

1. Auth0 authenticates the web app, validates the Authorization Code and responds back with the token.

1. The web app can use the Access Token to call the API on behalf of the user.

::: note
In OAuth 2.0 terms, the web app is the application, the end user the Resource Owner, the API the Resource Server, the browser the User Agent, and Auth0 the Authorization Server.
:::


## How to implement the flow

For details on how to implement this using Auth0, refer to [Executing an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant).

## Rules

[Rules](/rules) will run for the Authorization Code grant. If you wish to execute special logic unique to the Authorization Code grant, you can look at the `context.protocol` property in your rule. If the value is `oidc-basic-profile`, then the rule is running during the Authorization Code grant.

For details on how to implement this, refer to [Execute an Authorization Code Grant Flow: Customize the Tokens](/api-auth/tutorials/authorization-code-grant#optional-customize-the-tokens).

## Keep reading

::: next-steps
- [How to implement an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant)
- [How to configure an API in Auth0](/apis)
- [Tokens](/tokens)
- [Application Authentication for Server-side Web Apps](/application-auth/server-side-web)
:::
