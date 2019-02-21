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

Auth0 generates Access Tokens in two formats: 
* Opaque strings: When not using a custom API
* [JSON Web Tokens (JWTs)](/jwt): When using a custom API

When doing a token request, there is always one or more target "audiences" for the access token that Auth0 will issue. The target audience will depend on a few things:

- Whether you are specifying an `audience` parameter in the `/authorize` or token request. The value can be either the identifier for a custom API defined in the dashboard, the Management API v2 identifier (`https://{tenant}.auth0.com/api/v2/`) or the OIDC `/userinfo` endpoint (`${account.namespace}`) for [retrieving the user profile](/api/authentication#get-user-info).
- Whether your tenant has a [Default Audience](/dashboard/dashboard-tenant-settings#api-authorization-settings) configured.
- Whether you include a `scope` value of `openid` in the `/authorize` request, which implicitely means that the token audience will include the OIDC `/userinfo` endpoint.

Access tokens can have more than one audience: if you specify both `scope=openid` and `audience={your_custom_api_identifier}` then the resulting access token will be valid for both your custom API and for the `/userinfo` endpoint.

## How does all this affect the token format? 

- If the token audience is just the OIDC `/userinfo` endpoint, then Auth0 will issue **an opaque Access Token**.
- If the token audiences includes a custom API or Auth0's Management API v2, then the token will be **a JWT token**. The `aud` claim of this JWT will be either a single string (the API identifier) or an array containing both the API identifier and the `/userinfo` endpoint (if token token is valid also for [retrieving the user profile](/api/authentication#get-user-info)).

:::panel Use RS256 for multiple audiences
If you set a custom API audience and also use `scope=openid` in your request, then your custom API must use **RS256** (see [how to change an API's settings](/apis#api-settings)). For security reasons, tokens signed with HS256 can hold only one audience. This also applies if you have set a **Default Audience** at your [API Authorization settings](${manage_url}/#/tenant).
:::

::: warning
Remember that the client application should not depend on the Access Token to be any specific format; instead treat the Access Token as opaque. It is meant **only** for the API.
:::

## Troubleshooting

### I'm getting an opaque Access Token instead of a JWT Access Token

If you are expecting an Access Token in a JWT format to make requests to your custom API and you are getting an opaque token instead, make sure to include the `audience` parameter in the `/authorize` request.
