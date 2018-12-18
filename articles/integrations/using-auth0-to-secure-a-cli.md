---
title: Using Auth0 to secure a CLI
description: How to use Auth0 to secure a CLI.
topics:
  - integrations
  - cli
contentType: how-to
useCase: integrate-saas-sso
---

# Using Auth0 to secure a CLI

Authentication in CLI programs is straightforward if the identity provider supports sending credentials, like database connections, SMS passwordless and AD. If the identity provider requires a browser redirect, then the process is slightly more complicated.

::: note
   If your identity provider supports sending credentials, then you should use the [Machine-to-Machine (M2M) Flow](/flows/guides/m2m-flow). For details on how to implement this, refer to [Call API Using the Machine-to-Machine (M2M) Flow](/flows/guides/m2m-flow/call-api-using-m2m-flow).
:::

Auth0 implements the [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow), which makes use of the [Proof Key for Code Exchange] (https://tools.ietf.org/html/rfc7636) enhancement. This flow makes it easy to add authentication to a CLI while keeping higher standards of security.

## How the Native/Mobile Login Flow Works

Traditionally, public applications (such as mobile apps, SPAs, and CLIs) have used the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) to obtain a token. In this flow, there's no __application authentication__ because there's no easy way of storing a `client_secret`.

The [Native/Mobile Login Flow](/flows/concepts/mobile-login-flow) increases security by adding a cryptographic challenge in the token exchange. This prevents rogue apps from intercepting the response from Auth0 and getting hold of the token.

## How to implement the Native/Mobile Login Flow

The steps to follow to implement this flow are the following:

1. __Create a Code Verifier__. This is a randomly generated value that will be used to generate the `code_challenge` (which will be sent in the authorization request).

2. __Create a Code Challenge__. A hashed (`SHA256`) and base64Url encoded value, generated using the `code_verifier`.

3. __Initiate the Authorization Request__. The regular OAuth 2.0 authorization request, with the caveat that now it includes two parameters: the `code_challenge` and the `code_challenge_method` which should be `S256`. If the authorization is successful, then Auth0 will redirect the browser to the callback with a `code` query parameter: `${account.callback}/?code=123`.

::: note
   In order for the CLI to be able to receive the callback and retrieve the code, it needs to implement an HTTP server that corresponds to the allowed callback for the client.
:::

4. __Exchange the Authorization Code for a Token__. With the `code`, the program then uses the [/oauth/token endpoint](/api/authentication#authorization-code-pkce-) to obtain a token. In this second step, the CLI program adds a `verifier` parameter with the exact same random secret generated in step 1. Auth0 uses this to correlate and verify that the request originates from the same application. If successful, the response is another JSON object, with an ID Token and Access Token. Note that if the `verifier` doesn't match with what was sent in the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-), the request will fail.

::: note
   For implementation details and sample scripts, refer to [Call API Using the Mobile Login Flow](/flows/guides/mobile-login-flow/call-api-using-mobile-login-flow).
:::
