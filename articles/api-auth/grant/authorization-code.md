---
description: Learn how to call APIs from regular web apps using the Authorization Code Grant.
topics:
  - authorization-code
  - api-authorization
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Authorization Code Grant

<%= include('../../_includes/_pipeline2') %>

The **Authorization Code Grant** (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.1)) allows an application to request an [Access Token](/tokens/concepts/overview-access-tokens), and optionally, an [ID Token](/tokens/id-token) and a [Refresh Token](/tokens/refresh_token), in exchange for an Authorization Code. It is used for [Regular Web Apps](/quickstart/webapp) (traditional, server-rendered applications).

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::


## What is the Authentication Code Grant flow?

![Authorization Code Grant](/media/articles/api-auth/authorization-code-grant.png)

1. The web app initiates the flow and redirects the browser to Auth0 (specifically to the [/authorize endpoint](/api/authentication#authorization-code-grant)), so the user can authenticate.

2. Auth0 authenticates the user (via the browser). The first time the user goes through this flow, a consent page is shown that lists the permissions that will be given to the application (for example: post messages, list contacts, and so forth).

3. Auth0 redirects the user to the web app (specifically to the `redirect_uri`, as specified in the [/authorize request](/api/authentication#authorization-code-grant)) with an Authorization Code in the querystring (`code`).

4. The web app sends the Authorization Code to Auth0 and asks to exchange it with an Access Token (and optionally an ID Token and a Refresh Token). This is done using the [/oauth/token endpoint](/api/authentication?http#authorization-code). When making this request, the web app authenticates with Auth0 using the Client Id and Client Secret.

5. Auth0 authenticates the web app, validates the Authorization Code, and responds back with the token.

6. The web app uses the Access Token to call the API on behalf of the user.

::: note
In OAuth 2.0 terms, the web app is the application, the end user is the Resource Owner, the API is the Resource Server, the browser is the User Agent, and Auth0 is the Authorization Server.
:::


## How do I implement the Authorization Code Grant flow?

Learn how to implement this grant flow using Auth0 at [Executing an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant).

## Will rules run for the Authorization Code Grant flow?

[Rules](/rules) will run for the Authorization Code Grant. If you wish to execute special logic unique to the Authorization Code Grant, check that the `context.protocol` property in your rule contains a value of `oidc-basic-profile`. If it does, then the rule is running during the Authorization Code Grant.

For implementation details, refer to [Execute an Authorization Code Grant Flow: Customize the Tokens](/api-auth/tutorials/authorization-code-grant#optional-customize-the-tokens).

## Keep reading

::: next-steps
- [How to implement an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant)
- [How to configure an API in Auth0](/api-auth/guides/configure-api)
- [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [Application Authentication for Server-side Web Apps](/application-auth/server-side-web)
- [Tokens used by Auth0](/tokens)
:::
