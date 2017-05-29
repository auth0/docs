---
title: Using Auth0 to secure a CLI
description: How to use Auth0 to secure a CLI.
---

# Using Auth0 to secure a CLI

Authentication in CLI programs is straightforward if the identity provider supports sending credentials, like database connections, SMS passwordless and AD. If the identity provider requires a browser redirect, then the process is slightly more complicated.

::: note
   If your identity provider supports sending credentials, then the grant you should implement is the [Client Credentials](/api-auth/grant/client-credentials). For details on how to implement this refer to [How to implement the Client Credentials Grant](/api-auth/tutorials/client-credentials).
:::

Auth0 implements the [Proof Key for Code Exchange by OAuth Public Clients](https://tools.ietf.org/html/rfc7636). This flow makes it easy to add authentication to a CLI while keeping higher standards of security.

## How PKCE works

Traditionally, public clients (e.g. mobile apps, SPAs and CLIs) have used the [implicit flow](/api-auth/grant/implicit) to obtain a token. In this flow, there's no __client authentication__ because there's no easy way of storing a `client_secret`.

The [PKCE flow](/api-auth/grant/authorization-code-pkce) (`pixy` for friends), increases security by adding a cryptographic challenge in the token exchange. This prevents rogue apps to intercept the response from Auth0, and get hold of the token.

## How to implement PKCE

The steps to follow to implement this grant are the following:

1. __Create a Code Verifier__. This is a randomly generated value that will be used to generate the `code_challenge` (which will be sent in the authorization request).

2. __Create a Code Challenge__. A hashed (`SHA256`) and base64Url encoded value, generated using the `code_verifier`. 

3. __Initiate the Authorization Request__. The regular OAuth 2.0 authorization request, with the caveat that now it includes two parameters: the `code_challenge` and the `code_challenge_method` which should be `S256`. If the authorization is successful, then Auth0 will redirect the browser to the callback with a `code` query parameter: `${account.callback}/?code=123`.

::: warning
   In order for the CLI to be able to receive the callback and retrieve the code, it should run on the web server. 
:::

4. __Exchange the Authorization Code for a Token__. With the `code`, the program then uses the [/oauth/token endpoint](/api/authentication#authorization-code-pkce-) to obtain a token. In this second step, the CLI program adds a `verifier` parameter with the exact same random secret generated in step 1. Auth0 uses this to correlate and verify that the request originates from the same client. If successful the response is another JSON object, with an `id_token`, and `access_token`. Note that if the `verifier` doesn't match with what was sent in the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-), the request will fail.

::: note
   For implementation details and sample scripts, refer to [Execute an Authorization Code Grant Flow with PKCE](/api-auth/tutorials/authorization-code-grant-pkce).
:::
