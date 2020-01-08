---
title: Validate Access Token
description: Learn how to validate an Access Token.
topics:
  - tokens
  - api-authentication
  - oidc
  - access-tokens
  - authorization
contentType: 
  - tutorial
useCase:
  - secure-api
  - call-api
---
# Validate Access Tokens

::: note
This document discusses validation of Access Tokens issued by Auth0. If you have received an Access Token from an [Identity Provider (IdP)](/identityproviders), in general, you don't need to validate it. You can pass it to the issuing IdP, and the IdP takes care of the rest.
:::

An Access Token is a credential that can be used by an application to access an API. Before you can validate an [Access Token](/tokens/concepts/access-tokens), you first need to know the format of the token. Auth0 issues Access Tokens in two formats: opaque and <dfn data-key="json-web-token">[JSON Web Token (JWT)](/tokens/concepts/jwts)</dfn>.

::: warning
Remember that an Access Token is meant for an API and should be validated only by the API for which it was intended. Client applications should not depend on the Access Token to be any specific format, and instead treat it as if it is opaque (regardless of whether it actually is).
:::

## Opaque Access Tokens

Opaque Access Tokens can be used with the [`/userinfo` endpoint](/api/authentication#get-user-info) to return a user's profile. If you receive an opaque Access Token, you don't need to validate it. You can use it with the `/userinfo` endpoint, and Auth0 takes care of the rest. 

To learn more about getting an opaque Access Token for the `userinfo` endpoint, see [Get Access Tokens](/tokens/guides/get-access-tokens#opaque-access-tokens).

## JWT Access Tokens

Access Tokens issued for the Auth0 Management API and Access Tokens issued for any custom API that you have registered with Auth0 will always be [JSON Web Tokens](/tokens/concepts/jwts).

### Auth0 Management API Access Tokens

An Access Token issued for the Auth0 Management API should be treated as opaque (regardless of whether it actually is), so you don't need to validate it. You can use it with the Auth0 Management API, and Auth0 takes care of the rest. 

To learn more about getting an Access Token for the Auth0 Management API, see [Auth0 Management API Tokens](/api/management/v2/tokens).

### Custom API Access Tokens

::: warning
If validation of your Custom API Access Token fails, make sure it was issued with your custom API as the `audience`. To learn more about getting an Access Token for your Custom API, see [Get an Access Token: Control Access Token Audience](/tokens/guides/get-access-tokens#control-access-token-audience).
:::

To validate a JWT issued for a custom API that you have registered with Auth0, you will need to:

1. Perform standard JWT validation
2. Check additional standard claims
3. Check permissions (<dfn data-key="scope">scopes</dfn>)

If any of these checks fail, the token is considered invalid, and the request must be rejected.

#### Perform standard JWT validation

Because the Access Token is a JWT, you will first need to perform the standard JWT validation steps. To learn about JWT validation, see [Validate JSON Web Tokens](/tokens/guides/validate-jwts).

#### Check additional standard claims

If you've performed the standard JWT validation, you have already decoded the [JWT's Payload](/tokens/references/jwt-structure#payload) and looked at its standard claims. Some additional claims to verify for Access Tokens include:

* **Token audience** (`aud`, array of strings): Depending on the initial token request, the `aud` field could contain both an audience corresponding to your custom API and an audience corresponding to the `userinfo`endpoint. At least one of the audience values for the token must match the unique identifier of the target API as defined in your [API's Settings](${manage_url}/#/apis) in the **Identifier** field. To learn more about getting Access Tokens with multiple audiences, see [Get an Access Token](/tokens/guides/get-access-tokens).

If this check fails, the token is considered invalid, and the request must be rejected.

#### Check permissions

The final step is to verify that the Application has been granted the permissions required to access your API. To do so, you will need to check an additional claim in the decoded JWT's Payload:

* **Scopes** (`scope`, space-separated list of strings): Should match the permissions required for the endpoint being accessed.

For example, say your custom API provides three endpoints to read, create, or delete a user record: `/create`, `/read`, and `/delete`. When you [registered your API with Auth0](/getting-started/set-up-api), you created three corresponding permissions:

- `create:users` provides access to the `/create` endpoint
- `read:users` provides access to the `/read` endpoint
- `delete:users` provides access to the `/delete` endpoint

In this case, if an Application requests to access the `/create` endpoint, but the Access Token's `scope` claim does not include the value `create:users`, then the API should reject the request with `403 Forbidden`.

For an example using a simple timesheet API in Node.js, see [Architecture Scenarios: Server Client + API - Node.js API Implementation](/architecture-scenarios/application/server-api/api-implementation-nodejs#check-the-client-permissions), an implementation of a Client Credentials grant for a hypothetical scenario. To see the complete solution, visit [Architecture Scenarios: Server Client + API](/architecture-scenarios/application/server-api).

## Keep reading

- [RFC 7519 - JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)
- [JSON Web Tokens](/tokens/concepts/jwts)
- [APIs in Auth0](/apis)
- [Tokens](/tokens)
- [Architecture Scenarios: Server Client + API - Node.js API Implementation](/architecture-scenarios/application/server-api/api-implementation-nodejs#check-the-application-permissions)
- [How to implement API authentication and authorization scenarios](/api-auth)
