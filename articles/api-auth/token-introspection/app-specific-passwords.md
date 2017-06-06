---
description: How to use app-specific password flows
---

# Application-Specific Passwords

An **application-specific password** (ASP) can be used to get you limited access to a protected resource, such as an API. In Auth0, you can use them in one of two ways:

* As a replacement for the password portion of your credentials when using basic authentication. More specifically, instead of providing your username/password combination, you'd provide your username/ASP combination;
* As an alternative to Bearer tokens when calling an Auth0 API endpoint.

## Prerequisites

Before you can use Application-Specific Passwords (ASP), you'll need to complete the following steps:

1. Provide your API's public key to Auth0
2. Set up the client grant for ASP

### Step 1: Provide Your API's Public Key to Auth0

There are three ways by which Auth0 can obtain the public key:

1. You can define the `verificationKey` on the API's Auth0 record. This is a JSON Web Key (JWK) or PEM-encoded certificate.
2. You can define the `verificationLocation` on the API's Auth0 record. This is a URI from which Auth0 fetches JSON Web Keys (JWK).
3. If the API's `identifier` is `http:`- or `https:`-based (such as `https://example.com/foo`), then Auth0 attempts to fetch the key from the well-known JWK registry of the host (for the provided URI example, Auth0 attempts to fetch from `https://example.com/.well-known/jwks.json`).

### Step 2: Set Up the Client Grant for App-Specific Passwords

Ensure that you've granted the appropriate [scopes](/scopes/current#api-scopes) (such as `read`, `create`, `delete:user_application_passwords`) to the [Client](/clients) you'll be using with the Management API. These will the be the scopes the API can include with newly-issued ASPs.

## Create Application-Specific Passwords Using the Management API

You can create app-specific passwords using the Management API.

::: note
The only time you can view the value of the App-Specific Password is during creation.
:::

## Use Application-Specific Passwords with Auth0

In Auth0, you can use application-specific passwords (ASPs) in one of two ways:

* As a replacement for the password portion of your credentials when using basic authentication;
* As an alternative to Bearer tokens when calling an Auth0 API endpoint.

### Use App-Specific Passwords in a Basic Authentication Flow

In this scenario, your API accepts a username and password combination. The user may provide either their actual credentials *or* a username and an app-specific password.

If the user opts for the latter option, your API should check the credentials against Auth0's [`/oauth/token` endpoint](/api/authentication#client-credentials) using `grant_type`: `password` (for full instructions on how to configure this type of authentication flow, please see [How to Implement the Resource Owner Password Grant](https://auth0.com/docs/api-auth/tutorials/password-grant#optional-customize-the-tokens))

If the authentication fails, the API then uses [token introspection](/api-auth/token-introspection#calling-the-authentication-api-s-token-introspection-endpoint) to verify that the password is a valid app-specific password. If it is, and the ASP is active, the API will return the claims associated with the token. Based on these results, your API can make authorization decisions.

### Use App-Specific Passwords as Bearer Tokens

Your API consumes ASPs the same way it would consume any other Bearer token, regardless of whether it's a JWT or not.

The primary difference, however, is that using JWT access tokens means that you don't have to make a call to Auth0 to check the token's validity -- the API can verify the validity of the token on its own by checking the token's signature.

With ASPs, your API (which is also known as the *resource server*) needs to call Auth0 to check the ASPs's validity, as well as the validity of the claims associated with the tokens.

Sample flow:

1. The user uses the ASP as a Bearer token to call your API
2. The API recognizes the token as non-JWT, so it has to [introspect](/api-auth/token-instrospection). It makes a call to `oauth/introspect`, and the response indicates whether the token is active or not. If the token is active, the endpoint also returns the claims associated with the token. The response looks something like this:

```json
{
  "token_type": "application_specific_password_token",
  "scope": "read:foo create:foo update:foo",
  "iat": 1490234011,
  "sub": "auth0|1234",
  "aud": "https://demo.api",
  "iss": "https://tenant.auth0.com/",
  "active": true,
  "username": "user@gmail.com"
}
```

3. Upon receiving the results of the call, the API can make an authorization decision, such as whether the user is allowed to use the indicated scopes.

::: note
Anytime the token introspection endpoint is called using an ASP, the ASP record is updated with the `last_accessed` timestamp.
:::
