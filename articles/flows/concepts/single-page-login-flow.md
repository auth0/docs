---
description: Learn how the single page login flow works and why you should use it for single page apps (SPAs).
topics:
  - authorization-code
  - implicit
  - hybrid
  - api-authorization
  - grants
  - authentication
  - SPA
contentType: concept
useCase:
  - secure-api
  - call-api
  - add-login
---
# Single Page Login Flow

During authentication, single-page applications (SPAs) have some special requirements. Since the SPA is a public client, it is unable to securely store information such as a Client Secret. As such a special authentication flow exists called the OAuth 2.0 Implicit Flow (defined in [OAuth 2.0 RFC 6749, section 4.2](https://tools.ietf.org/html/rfc6749#section-4.2)). Using the Implicit Flow streamlines authentication by returning tokens without introducing any unnecessary additional steps.


## How it works

For SPAs you should use the Implicit Flow in which issued tokens are short-lived. Refresh Tokens are not available in this flow.

![Single-Page Login Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-single-page-login-flow-without-backend.png)

1. The user clicks **Login** within the SPA.
2. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint) passing along a `response_type` parameter that indicates the type of requested credential.
3. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
4. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the SPA.
5. Your Auth0 Authorization Server redirects the user back to the SPA with any of the following, depending on the provided `response_type` parameter (step 2):
* An ID Token;
* An Access Token;
* An ID Token and an Access Token.
6. Your SPA can use the Access Token to call an API.
7. The API responds with requested data.


## How to implement it

The easiest way to implement the Single-Page Login Flow is to follow our [Single-Page App Quickstarts](/quickstart/spa).

You can also use our [SDKs](/libraries).

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow) or [Call Your API Using the Single-Page Login Flow](/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow).

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Tokens used by Auth0](/tokens)
