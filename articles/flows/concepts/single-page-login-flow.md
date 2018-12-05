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

During authentication, single page applications (SPAs) have some special needs.

Since SPAs are JavaScript applications running within a browser, they do not have distinct components that can be kept separate (i.e., the application and the browser are the same, so information available to one is also available to the other). 

Most SPAs have back-ends (perhaps containing their own API and using a cookie-based session to authorize incoming requests), which can benefit from the Authorization Code Flow, which requests an authorization code and then authenticates the back-end when it exchanges it for tokens. Because this flow allows for authentication of the back-end, it also allows for persistent authentication using Refresh Tokens.

To handle both the client-side and server-side authentication needs of SPAs, the Hybrid Flow combines the client-side Implicit Flow with the server-side Authorization Code Flow, which provides flexibility to allow the front-end and back-end of an application to receive their own scoped tokens.

In the case of a SPA with no back-end, no additional security is useful, so using the Implicit Flow streamlines authentication by returning tokens without introducing any unnecessary additional steps.


## How it works

Because the Hybrid Flow combines the Implicit Flow with the Authorization Code Flow, its steps are very similar to the steps required to implement the other two flows.

### SPA with back-end

For SPAs with a back-end, the back-end can be trusted with the application's Client Secret and can request a long-lived Access Token to use with your API. Refresh Tokens can also be requested.

![Single Page Login Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-single-page-login-flow-with-backend.png)

1. The user clicks **Login** within the single page application.
2. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint) passing along a `response_type` parameter that indicates the type of requested credential.
3. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
4. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the single page application.
5. Your Auth0 Authorization Server redirects the user back to the application with any of the following, depending on the provided `response_type` parameter (step 2):
* An authorization code and an ID Token;
* An authorization code and an Access Token;
* An authorization code, an Access Token, and an ID Token.
6. The SPA sends the authorization code to its back-end.
7. From the SPA's back-end, Auth0's SDK sends the authorization `code` to the Auth0 Authorization Server (**/token** endpoint) along with the application's Client ID and Client Secret.
8. Your Auth0 Authorization Server verifies the authorization `code`, Client ID, and Client Secret. Because Auth0 has already obtained the user's consent, the user is not prompted again.
9. Your Auth0 Authorization Server responds to the back-end with a second ID Token and Access Token (and optionally, a Refresh Token).
10. Your backend can use the second Access Token to call an API.
11. The API responds with requested data.

### SPA without back-end

For SPAs without a back-end, you should use the Implicit Flow in which issued tokens are short-lived. Refresh Tokens are not available in this flow.

![Single Page Login Flow Authentication Sequence](/media/articles/flows/concepts/auth-sequence-single-page-login-flow-without-backend.png)

1. The user clicks **Login** within the single page application.
2. Auth0's SDK redirects the user to the Auth0 Authorization Server (**/authorize** endpoint) passing along a `response_type` parameter that indicates the type of requested credential.
3. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
4. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the single page application.
5. Your Auth0 Authorization Server redirects the user back to the application with any of the following, depending on the provided `response_type` parameter (step 2):
* An ID Token;
* An Access Token;
* An ID Token and an Access Token.
6. Your application can use the Access Token to call an API.
7. The API responds with requested data.


## How to implement it

The easiest way to implement the Single Page Login Flow is to follow our [Single Page App Quickstarts](/quickstart/spa).

You can also use our [SDKs](/libraries).

Finally, you can follow our tutorials to use our API endpoints to [Add Login Using the Single Page Login Flow](/flows/guides/single-page-login-flow/add-login-using-single-page-login-flow) or [Call Your API Using the Single Page Login Flow](/flows/guides/single-page-login-flow/call-api-using-single-page-login-flow).

## Keep reading

- Auth0 offers many ways to personalize your user's login experience using [rules](/rules) and [hooks](/hooks).
- [Tokens used by Auth0](/tokens)
