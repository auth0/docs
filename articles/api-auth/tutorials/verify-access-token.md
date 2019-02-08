---
description: How an API can verify a bearer JWT Access Token
toc: true
topics:
  - api-authentication
  - oidc
  - access-tokens
contentType: tutorial
useCase:
  - secure-api
  - call-api
---
# Verify Access Tokens for Custom APIs

<%= include('../../_includes/_pipeline2') %>

When a custom API receives a request with a bearer [Access Token](/tokens/overview-access-tokens), the first thing to do is to validate the token. 

At Auth0, an Access Token used for a custom API is formatted as a [JSON Web Token](/jwt) which must be validated before use.

:::note
If the Access Token you got from Auth0 is not a JWT but an opaque string (like `kPoPMRYrCEoYO6s5`), this means that the access token was not issued for your custom API as the audience. When requesting a token for your API, make sure to use the `audience` parameter in the authorization or token request with the API identifier as the value of the parameter.
:::

Validating the token consists of a series of steps, and if any of these fails, then the request **must** be rejected. This document lists all the validations that your API should perform:

- Check that the JWT is well formed
- Check the signature
- Validate the standard claims
- Check the Application permissions (scopes)

::: note
<a href="https://jwt.io/">JWT.io</a> provides a list of libraries that can do most of the work for you: parse the JWT, verify the signature and the claims. All of the [backend API quickstarts](/quickstart/backend) use SDKs that perform the JWT validation and parsing.
:::

## Parse the JWT

First, the API needs to parse the JSON Web Token (JWT) to make sure it's well formed. If this fails the token is considered invalid and the request must be rejected.

A well formed JWT, consists of three strings separated by dots (.): the header, the payload and the signature. Typically it looks like the following:

![Sample JWT](/media/articles/api-auth/sample-jwt.png)

The header and the payload are Base64Url encoded. The signature is created using these two, a secret and the hashing algorithm being used (as specified in the header: HMAC, SHA256 or RSA).

For details on the JWT structure refer to [What is the JSON Web Token structure?](/jwt#what-is-the-json-web-token-structure-).

### How can I parse the JWT?

In order to parse the JWT you can either manually implement all the checks as described in the specification [RFC 7519 > 7.2 Validating a JWT](https://tools.ietf.org/html/rfc7519#section-7.2), or use one of the libraries listed in the _Libraries for Token Signing/Verification_ section of [JWT.io](https://jwt.io/).

For example, if your API is implemented with Node.js and you want to use the [node-jsonwebtoken library](https://github.com/auth0/node-jsonwebtoken), then you would call the [jwt.verify()](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method. If the parsing fails then the library will return a [JsonWebTokenError error](https://github.com/auth0/node-jsonwebtoken#jsonwebtokenerror) with the message `jwt malformed`.

We should note here that many web frameworks (such as [ASP.NET Core](/quickstart/backend/aspnet-core-webapi) for example) have JWT middleware that handle the token validation. Most of the times this will be a better route to take, rather that resorting to use a third-party library, as the middleware typically integrates well with the framework's overall authentication mechanisms.

### How can I visually inspect a token?

A quick way to see what is inside a JWT is by using the [JWT.io](https://jwt.io/) website (alternatively, you can use the [JWT Debugger Chrome Extension](https://chrome.google.com/webstore/detail/jwt-debugger/ppmmlchacdbknfphdeafcbmklcghghmd?hl=en)). It has a handy debugger which allows you to quickly check that a JWT is well formed, and also inspect the values of the various claims.

Just paste your token at the _Encoded_ text area and review the decoded results at the right.

![Decode JWT with JWT.io](/media/articles/api-auth/decode-jwt.png)

## Check the Signature Algorithm

The API needs to check if the algorithm, as specified by the JWT header (property `alg`), matches the one expected by the API. If not, the token is considered invalid and the request must be rejected.

In this case the mismatch might be due to mistake (it is common that the tokens are signed using the `HS256` signing algorithm, but your API is configured for `RS256`, or vice versa), but it could also be due to an attack, hence the request has to be rejected.

### How can I check the signature algorithm?

To check if the signature matches the API's expectations, you have to decode the JWT and retrieve the `alg` property of the JWT header.

Alternatively, you can use one of the libraries listed in the _Libraries for Token Signing/Verification_ section of [JWT.io](https://jwt.io/).

Following the Node.js example of the previous section, the [jwt.verify()](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method of the [node-jsonwebtoken library](https://github.com/auth0/node-jsonwebtoken), supports an `algorithms` argument, that contains a list of strings with the names of the allowed algorithms.

## Verify the signature

The API needs to verify the signature of each token. 

This is necessary to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

Remember that the signature is created using the header and the payload of the JWT, a secret and the hashing algorithm being used (as specified in the header: HMAC, SHA256 or RSA). The way to verify it, depends on the hashing algorithm:

- For `HS256`, the API's __Signing Secret__ is used. You can find this information at your [API's Settings](${manage_url}/#/apis). Note that the field is only displayed for APIs that use `HS256`.
- For `RS256`, the tenant's [JSON Web Key Set (JWKS)](/jwks) is used. Your tenant's JWKS is `https://${account.namespace}/.well-known/jwks.json`.

The most secure practice, and our recommendation, is to use `RS256`.

### How can I verify the signature?

To verify a token's signature, you can use one of the libraries available in [JWT.io](https://jwt.io/#libraries-io).

Following the Node.js example of the previous section, the [jwt.verify()](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method supports a `secretOrPublicKey` argument. This should be populated with a string or buffer containing either the secret (for `HS256`), or the PEM encoded public key (for `RS256`). 

::: panel Where can I find my public key?
Go to [Dashboard > Applications](${manage_url}/#/applications). Open the **Settings** of your application, scroll down and open **Advanced Settings**. Open the **Certificates** tab and you will find the Public Key in the **Signing Certificate** field.

If you want to verify the signature of a token from one of your applications, we recommend getting it by parsing your tenant's [JSON Web Key Set (JWKS)](/jwks). Your tenant's JWKS is `https://${account.namespace}/.well-known/jwks.json`. 

For more info on **RS256** and **JWKS** see [Navigating RS256 and JWKS](https://auth0.com/blog/navigating-rs256-and-jwks/).
:::

If the verification fails you will get a `invalid signature` error.

## Validate the Claims

Once the API verifies the token's signature, the next step is to validate the standard claims of the token's payload. The following validations need to be made:

- _Token expiration_: The current date/time _must_ be before the expiration date/time listed in the `exp` claim (which is a Unix timestamp). If not, the request must be rejected.
- _Token issuer_: The `iss` claim denotes the issuer of the JWT. The value _must_ match the one configured in your API. For JWTs issued by Auth0, `iss` holds your Auth0 domain with a `https://` prefix and a `/` suffix: `https://${account.namespace}/`. If you are using the [custom domains](/custom-domains) feature, the value will instead be in the following format: `https://<YOUR-CUSTOM-DOMAIN>/`.
- _Token audience_: The `aud` claim identifies the recipients that the JWT is intended for. For JWTs issued by Auth0, `aud` holds the unique identifier of the target API (field __Identifier__ at your [API's Settings](${manage_url}/#/apis)). If the API is not the intended audience of the JWT, it _must_ reject the request.

::: panel Token issuance
Auth0 issues tokens with the **iss** claim of whichever domain you used with the request. Custom domain users might use either, their custom domain, or their Auth0 domain. For example, if you used **https://northwind.auth0.com/authorize...** to obtain an Access Token, the **iss** claim of the token you receive will be **https://northwind.auth0.com/**. If you used your custom domain **https://login.northwind.com/authorize...**, the **iss** claim value will be **https://login.northwind.com/**. 

If you get an Access Token for the [Management API](/api/management/v2) using an authorization flow with your custom domain, you **must** call the Management API using the custom domain (your token will be considered invalid otherwise).
:::

### How can I validate the claims?

To validate the claims, you have to decode the JWT, retrieve the claims (`exp`, `iss`, `aud`) and validate their values.

The easiest way however, is to use one of the libraries listed in the _Libraries for Token Signing/Verification_ section of [JWT.io](https://jwt.io/). Note that not all libraries validate all the claims. In [JWT.io](https://jwt.io/) you can see which validations each library supports (look for the green check marks).

Following the Node.js example, the [jwt.verify()](https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback) method of the [node-jsonwebtoken library](https://github.com/auth0/node-jsonwebtoken), validates these claims, depending on the input arguments:

- `audience`: set `aud` to the __Identifier__ of the API
- `issuer`: string or array of strings of valid values for the `iss` field
- `ignoreExpiration`: set to `false` to validate the expiration of the token

## Check the Permissions

By now you have verified that the JWT is valid. The last step is to verify that the application has the permissions required to access the protected resources.

To do so, you need to check the [scopes](/scopes) of the decoded JWT. This claim is part of the payload and it is a space-separated list of strings.

### How can I check the permissions?

To check the permissions granted to the application, you need to check the contents of the `scope`.

For example, a user management API might provide three endpoints to read, create or delete a user record: `/create`, `/read` and `/delete`. We have configured this API, so each endpoint requires a specific permission (or scope):

- The `read:users` scope provides access to the `/read` endpoint.
- The `create:users` scope provides access to the `/create` endpoint.
- The `delete:users` scope provides access to the `/delete` endpoint.

If a request requests to access the `/create` endpoint, but the `scope` claim does NOT include the value `create:users`, then the API should reject the request with `403 Forbidden`.

You can see how to do this, for a simple timesheets API in Node.js, in this document: [Check the Application permissions](/architecture-scenarios/application/server-api/api-implementation-nodejs#check-the-application-permissions).

## Sample Implementation

You can find a sample API implementation, in Node.js, in [Server Application + API: Node.js Implementation for the API](/architecture-scenarios/application/server-api/api-implementation-nodejs).

This document is part the [Server + API Architecture Scenario](/architecture-scenarios/application/server-api), an implementation of a Client Credentials grant for a hypothetical scenario. For more information on the complete solution refer to [Server + API Architecture Scenario](/architecture-scenarios/application/server-api).


## Read more

- [RFC 7519 - JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519)
- [JSON Web Tokens (JWT) in Auth0](/jwt)
- [APIs in Auth0](/apis)
- [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [Tokens used by Auth0](/tokens)
- [Server Application + API: Node.js Implementation for the API](/architecture-scenarios/application/server-api/api-implementation-nodejs#check-the-application-permissions)
- [How to implement API authentication and authorization scenarios](/api-auth)
