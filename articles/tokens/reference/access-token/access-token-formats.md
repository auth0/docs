---
description: Explain different Access Token formats
topics:
  - tokens
  - access-tokens
contentType:
  - reference
useCase:
  - invoke-api
---

# Access Token Formats



You will receive an opaque Access Token suitable for use with the `userinfo` endpoint if you sent the following in your initial request to `authorize` (or `/oauth/token` for the Client Credentials and Resource Owner Password [flows](/flows)):

* `openid` as a value in the `scope` parameter
* No value for the `audience` parameter or no `audience` parameter


You will receive a JWT Access Token if you sent the following in your initial request to `authorize` (or `/oauth/token` for the Client Credentials and Resource Owner Password [flows](/flows)):



:::note
If the Access Token you got from Auth0 is not a JWT but an opaque string (like `kPoPMRYrCEoYO6s5`), this means that the Access Token was not issued for your custom API as the <dfn data-key="audience">audience</dfn>. When requesting a token for your custom API, make sure to use the `audience` parameter in the authorization or token request with the API identifier as the value of the parameter.
:::


Auth0 generates <dfn data-key="access-token">Access Tokens</dfn> in two formats: 

* Opaque strings: When not using a custom API
* <dfn data-key="json-web-token">JSON Web Tokens (JWTs)</dfn>: When using a custom API

When doing a token request, there is always one or more target <dfn data-key="audience">audiences</dfn> for the Access Token that Auth0 will issue. The target audience will depend on a few things:

- Whether you are specifying an `audience` parameter in the `/authorize` or token request. The value can be either the identifier for a custom API defined in the dashboard, the Management API v2 identifier (`https://{tenant}.auth0.com/api/v2/`) or the OIDC `/userinfo` endpoint (`${account.namespace}`) for [retrieving the user profile](/api/authentication#get-user-info).
- Whether your tenant has a [Default Audience](/dashboard/dashboard-tenant-settings#api-authorization-settings) configured.
- Whether you include a <dfn data-key="scope">`scope`</dfn> value of `openid` in the `/authorize` request, which implicitely means that the token audience will include the OIDC `/userinfo` endpoint.

Access Tokens can have more than one audience: if you specify both `scope=openid` and `audience={your_custom_api_identifier}` then the resulting Access Token will be valid for both your custom API and for the `/userinfo` endpoint.

## How does all this affect the token format? 

- If the token audience is just the OIDC `/userinfo` endpoint, then Auth0 will issue an **opaque** Access Token.
- If the token audiences includes a custom API or Auth0's Management API v2, then Auth0 will issue a **JWT** Access Token. The `aud` claim of this JWT will be either a single string (the API identifier) or an array containing both the API identifier and the `/userinfo` endpoint (if token token is valid also for [retrieving the user profile](/api/authentication#get-user-info)).

:::panel Use RS256 for multiple audiences
If you set a custom API audience and also use `scope=openid` in your request, then your custom API must use **RS256** (see [how to change an API's settings](/apis#api-settings)). For security reasons, tokens signed with HS256 can hold only one audience. This also applies if you have set a **Default Audience** at your [API Authorization settings](${manage_url}/#/tenant).
:::

::: warning
Remember that the client application should not depend on the Access Token to be any specific format; instead treat the Access Token as if it is opaque (regardless of whether it actually is). It is meant **only** for the API.
:::

## Troubleshooting

### I'm getting an opaque Access Token instead of a JWT Access Token

If you are expecting an Access Token in a JWT format to make requests to your custom API and you are getting an opaque token instead, make sure to include the `audience` parameter in the `/authorize` request.
