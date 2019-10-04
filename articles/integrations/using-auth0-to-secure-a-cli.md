---
title: Secure a CLI with Auth0
description: How to use Auth0 to secure a CLI.
topics:
  - integrations
  - cli
contentType: how-to
useCase: 
  - integrate-saas-sso
  - cli-authentication
  - 
---

# Secure a CLI with Auth0

There are three ways to secure a CLI with Auth0 in order of most secure to least secure:

* [Device Authorization Flow](/flows/concepts/device-auth)
* [PKCE Authorization Code Flow](/flows/concepts/auth-code-pkce)
* [Using OIDC-compliant Resource Owner Password Grants and Client Credentials Grants](#using-oidc-compliant-resource-owner-password-grants-and-client-credentials-grants)

## Device Authorization Flow

With input-constrained devices that connect to the internet, rather than authenticate the user directly, the device asks the user to go to a link on their computer or smartphone and authorize the device. This avoids a poor user experience for devices that do not have an easy way to enter text. To do this, device apps use the Device Authorization Flow (drafted in [OAuth 2.0](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15)), in which they pass along their Client ID to initiate the authorization process and get a token.

The easiest way to implement the Device Authorization Flow is to follow the steps in [Call API Using Device Authorization Flow](/flows/guides/device-auth/call-api-device-auth).

## PKCE Authorization Code Flow

Auth0 implements the [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce), which makes use of the [Proof Key for Code Exchange](https://tools.ietf.org/html/rfc7636) enhancement. This flow makes it easy to add authentication to a CLI while keeping higher standards of security.

::: warning
In the past, public applications (such as mobile apps, SPAs, and CLIs) have used the [Implicit Flow](/flows/concepts/implicit) to obtain a token. In this flow, there's no __application authentication__ because there's no easy way of storing a `client_secret`.
:::

The [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce) increases security by adding a cryptographic challenge in the token exchange. This prevents rogue apps from intercepting the response from Auth0 and getting hold of the token.

::: panel Requires a localhost HTTP server 
To use the PKCE flow, you need to create a localhost HTTP server that handles the callback. This HTTP server should spun up on demand, just for the life of the login flow, and listen on a random port.
:::

1. Create a code verifier which is a randomly generated value that used to generate the `code_challenge` that is sent in the authorization request.

2. Create a code challenge which is a hashed (`SHA256`) and base64Url encoded value, generated using the `code_verifier`.

3. Initiate the authorization request with the caveat that it includes two parameters: 

    - `code_challenge` 
    - `code_challenge_method` which should be `S256`
    
    If the authorization is successful, then Auth0 redirects the browser to the <dfn data-key="callback">callback</dfn> with a `code` query parameter: `${account.callback}/?code=123`.

::: note
In order for the CLI to be able to receive the callback and retrieve the code, it needs to implement an HTTP server that corresponds to the allowed callback for the client.
:::

4. Exchange the authorization code for a token. With the `code`, the program then uses the [/oauth/token endpoint](/api/authentication#authorization-code-pkce-) to obtain a token. In this second step, the CLI program adds a `verifier` parameter with the exact same random secret generated in step 1. Auth0 uses this to correlate and verify that the request originates from the same application. If successful, the response is another JSON object, with an ID Token and <dfn data-key="access-token">Access Token</dfn>. Note that if the `verifier` doesn't match with what was sent in the [/authorize endpoint](/api/authentication#authorization-code-grant-pkce-), the request will fail.

::: note
For implementation details and sample scripts, refer to [Call API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce).
:::

## Using OIDC-compliant Resource Owner Password Grants and Client Credentials Grants

Using Resource Owner Password Grant (ROPG) and Client Credentials Grant (CCG) are less secure than the redirect-based options described above. 

If your identity provider supports sending credentials, then you should use the [Client Credentials Flow](/flows/concepts/client-credentials). For details on how to implement this, refer to [Call API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials).

We do not recommend using the ROPG flow for native applications. In the [RFC 8252 OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252) from the Internet Engineering Task Force (IETF), it is recommended that “OAuth 2.0 authorization request from native apps should ONLY be made through external user-agents, primarily the user’s browser”. For details, see [RFC 8252 Embedded User-Agents](https://tools.ietf.org/html/rfc8252#section-8.12). There is also more information on this in our blog post [OAuth 2.0 Best Practices for Native Apps](https://auth0.com/blog/oauth-2-best-practices-for-native-apps/).

::: note
If you must use ROPG in your native app instead of PKCE as we recommend, then you can use our [OIDC compliant ROPG endpoint](/api/authentication#resource-owner-password).
:::

Use the CCG flow when users and downstream identity providers aren't involved and you want to authenticate based on distinct machines or devices.
