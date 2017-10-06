---
description: Migration guide for using Delegation for token exchange
toc: true
---
# Using Delegation for Token Exchange

Using Delegation for Token Exchange

As of the 1st of February 2018, Auth0 customers will no longer be able to use Delegation for:

- exchanging an ID token issued to one client for a new one issued to a different client
- using a refresh token to obtain a fresh ID token

In an effort to simplify the developer experience, increase our conformance with specifications, and enhance security, we are deprecating and removing this feature.

Customers using this feature should move to a new flow.

::: note
Delegation can also used in order to exchange an ID token for a third-party API token, such as Firebase or AWS. This will continue to work for existing tenants created prior to June 8. We will be shipping a new feature to allow you to issue tokens for 3rd party APIs such as Firebase or AWS in December 2017, at which point delegation will be deprecated altogether.
:::

## Am I affected by this?

You are impacted if you are using the delegation API to exchange an ID token issued to one client for a new one issued to a different client, or to exchange a refresh token for a fresh ID token. 

Various [Auth0 SDKs](/support/matrix#sdks-and-libraries) provide this functionality using a function call such as `getDelegationToken()` in [auth0.js](/libraries/auth0js). If you are not sure about which of your clients might be using this feature, you can check your tenant logs for `TBD MESSAGE` to confirm.

## What should I do?

The optimal solution, depends on your [client's type](/clients/client-types):

- If your client is a Single Page Application (SPA) and hence cannot hold client credentials securely, then you should use our [Silent Authentication](/api-auth/tutorials/silent-authentication) feature. Silent authentication lets you perform an authentication flow where Auth0 will only reply with redirects, and never with a login page. This way you can refresh a user session with no UX interruption for the end user.

- If your client is [confidential](/clients/client-types#confidential-clients) (i.e. capable of holding credentials securely) or a native app, then you can get a refresh token during the authentication flow and use it to get a new ID token or Access token, without having to re-authenticate the user. In order to get a refresh token you should ask for one during the authentication flow (by including `offline_access` at the `scope` param, for details see [Get a Refresh Token](/tokens/refresh-token#get-a-refresh-token)). This functionality is available only for the following grants:
  - [Authorization Code Grant](/api-auth/tutorials/authorization-code-grant) (for web apps)
  - [Authorization Code Grant with PKCE](/api-auth/tutorials/authorization-code-grant-pkce) (for mobile apps)
  - [Password Grant](/api-auth/tutorials/password-grant) (for highly trusted clients). Unlike the Authorization Code Grant, this authentication mechanism does not redirect users to Auth0. It authenticates users with a single request, exchanging their password credentials for a token.

::: note
If you do not have your own API, you can use `https://${account.namespace}/userinfo` as the `audience` and you will get an Access token valid for [the /userinfo endpoint](/api/authentication#get-user-info) (and optionally an ID token).
:::

::: note
If you've defined a custom API in the Dashboard, the API should allow offline access to issue refresh tokens. This is configured via the **Allow Offline Access** switch on the [API Settings](${manage_url}/#/apis). Once you have a refresh token, you can use [the refresh token exchange endpoint](/api/authentication#refresh-token) to get a new Access token or ID token. For details see [Refresh Token](/tokens/refresh-token).
:::

- If you are modeling your APIs as Auth0 Clients, then you should [create APIs](/apis#how-to-configure-an-api-in-auth0) and use [Access tokens](/tokens/access-token) instead.

::: warning
If you take no action prior to `MANDATORY DATE`, the delegation with ID tokens feature will be disabled for your tenant. 
:::

If you would like to opt-in early and disable this feature before the  mandatory date, you can login to [Dashboard](${manage_url}) and enable the **Disable Legacy Delegation (ID Tokens)** toggle in [Tenant Settings > Advanced](${manage_url}/#/tenant/advanced).

## More Info

::: next-steps
- [Why you should always use access tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [Calling your APIs with Auth0 Tokens](/api-auth/tutorials/adoption/api-tokens)
- [Learn more on ID Tokens](/tokens/id-token)
- [Learn more on Access Tokens](/tokens/access-token)
- [Learn more on Refresh Tokens](/tokens/refresh-token)
:::