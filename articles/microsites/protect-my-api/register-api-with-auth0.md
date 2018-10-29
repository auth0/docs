---
title: Protect My API: Register Your API with Auth0
description: Learn how to register your API with Auth0, the first step in protecting your API.
ctaText: Quickstarts
ctaLink: /docs/quickstart/backend
contentType: tutorial
template: microsite
topics: api
useCase: secure-api
---

# Protect My API: Register Your API with Auth0

So you’ve built a shiny new API and you want to share it with the world. On second thought, you don’t want to share it with the entire world, but right now, anyone can call it. Let’s fix this by protecting your endpoints with Auth0.

## What can Auth0 do for you?

Auth0 helps you authenticate your users and issue the appropriate [Access Token](/tokens/concepts/overview-access-tokens). With an Access Token in hand, your users can then call your API.

Auth0 also helps you:

- Perform step-up authentication for high-value transactions
- Dynamically register applications that can call your API
- Control access to your API by revoking permissions
- Consolidate users identity into a single source of truth

## Prerequisites
Before we begin, you will need to:

- [ ] Know what scopes your API offers
- [ ] Log in to the Auth0 Dashboard. If you don’t already have an Auth0 account, you should [sign up for one now](https://auth0.com/signup).

## To do
- [ ] Add your API in the Auth0 Dashboard
- [ ] Specify your API's scopes
- [ ] Authorize any machine to machine applications that will call your API
- [ ] Configure additional API settings

## Register your API with Auth0

Before you can use Auth0 to protect your API, you will need to [register your API with Auth0 using the Dashboard](/api-auth/guides/configure-api).

### Add your API in the Auth0 Dashboard

Before anyone can call your API, they will need to get an Access Token. Later, you will need to verify this Access Token to make sure that the sender of the token is who they say they are and to ensure that the message wasn't changed along the way. The information within this token can be verified and trusted because it is digitally signed. When you are adding your API, you will need to choose which signing algorithm to use for the tokens issued for your API.

::: panel Which signing algorithm should I choose?
The most secure practice (and our recommendation) is to use RS256 because with RS256:

- you are sure that only the holder of the private key (Auth0) can sign tokens, while anyone can check if the token is valid using the public key.
- you can request a token that is valid for multiple audiences.
- if the private key is compromised, you can implement key rotation. (With HS256, you would have to re-deploy the API with a new secret.)

To learn more, read all about [signing algorithms](/api-auth/concepts/signing-algorithms).
:::

### Specify your API’s scopes

You'll need to define the scopes Auth0's allowed to grant to your users. By default, any user associated with an Auth0 application can ask for any scope you define here. If you want to [restrict access to your API’s scopes](/api-auth/restrict-requests-for-scopes) (for example, based on a user’s role or application association), you can use rules.

### Authorize any machine to machine applications that will call your API

If you expect any machine to machine applications to use your API, create them in the Dashboard and authorize them to request Access Tokens through a [Client Credentials grant](/api-auth/grant/client-credentials), which issues a token to the application itself rather than to an end user. Other types of applications do not require further configuration based on the grant types they will execute.

::: panel What are these grant types of which you speak?

The [OAuth 2.0 specification](https://tools.ietf.org/html/rfc6749) describes a number of grants, or methods, that an application can use to get an Access Token.

If your API doesn't require a user or the task being requested is independent of the user account life cycle (for example, an API that returns the weather or stock prices), or if your API operates within a trusted zone with the application calling it (for example, when one backend API calls another API both written and controlled by the same entity, otherwise known as a first-party application), then the [Client Credentials grant](/api-auth/grant/client-credentials) is used.

If your API results vary based on the user making the request and the API requires information about who the user is that it can validate (for example, a request for a bank account balance made through an API for an online banking service), then any of the following may be used, depending on use case:

- [Resource Owner Password grant](/api-auth/grant/password)
- [Authorization Code grant](/api-auth/grant/authorization-code)
- [Authorization Code using PKCE grant](/api-auth/grant/authorization-code-pkce)
- [Implicit grant](/api-auth/grant/implicit)

To find out more about grant types and when each one is used, our handy flowchart, [Which OAuth 2.0 Flow Should I Use?](/api-auth/which-oauth-flow-to-use), is a great starting point.
:::

### Configure additional API settings

For your API, you may also want to:

- Skip user consent for first-party applications
- Change how long it takes for your tokens to expire
- Send Refresh Tokens when applications request them

You can also allow third-party developers to [dynamically register applications](/api-auth/dynamic-client-registration) that can call your API.

::: panel What are Refresh Tokens?
To be on the safe side, your user's Access Token shouldn't last forever. But this means that sometime in the future, their Access Tokens will expire – what then?

Enter Refresh Tokens.

Refresh Tokens allow your user to grab a new Access Token without having to ask for permissions again (as long as you haven't revoked the right for their application to call the API).

If you allowed Auth0 to send a Refresh Token whenever it grants an Access Token and an application requests it, your users can [use the Refresh Token to refresh their Access Token](/tokens/refresh-token/current#use-a-refresh-token) without going through the authorization song-and-dance again. This only works for apps using the [Resource Owner Password grant](/api-auth/grant/password), [Authorization Code grant](/api-auth/grant/authorization-code), and [Authorization Code using PKCE grant](/api-auth/grant/authorization-code-pkce), though.
:::

::: card-panel
## What's next?

Now that you have registered your API with Auth0, your next challenge will be to [validate an Access Token]() when your API receives it.
:::

## Related Reading

:::: card-panel--grid
::: card-panel
### Guides

[Architecture Scenario: Implement SPA + API](/architecture-scenarios/spa-api)
[Architecture Scenario: Implement Server + API](/architecture-scenarios/server-api)
[Architecture Scenario: Implement Mobile + API](/architecture-scenarios/mobile-api)
[Represent Multiple APIs Using a Single Auth0 API](/api-auth/tutorials/represent-multiple-apis)
:::

::: card-panel--half
### Concepts

[Which OAuth 2.0 Flow Should I Use?](/api-auth/which-oauth-flow-to-use)
[Signing Algorithms](/concepts/signing-algorithms)
[Dynamic Client Registration](/api-auth/dynamic-client-registration)
:::

::: card-panel--half
### References

[OAuth 2.0](/protocols/oauth2)
[Auth0 Backend/API Quickstarts](/quickstart/backend)
:::
::::
