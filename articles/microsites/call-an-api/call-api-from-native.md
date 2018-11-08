---
title: Call an API from a Native/Mobile Application
description: An introduction to the concepts and tasks related to calling an API from a native/mobile application. 
template: microsite
v2: True
---

# Call an API from a Native/Mobile Application

Auth0 helps you authenticate your users and issue them the appropriate Access Tokens by taking care of the technical aspects required. Your users, with Access Tokens in hand, can then call an API securely. If the Access Token expires, we'll help you refresh the token so that you can keep working.

## Choose the 0Auth 2.0 flow that's right for you

Before you can proceed with calling your API, you will need to get an Access Token with the appropriate scopes. Use this flowchart: [Which OAuth 2.0 Flow Should I Use?](/api-auth/which-oauth-flow-to-use) as a starting point. Based on your use case, choose the OAuth 2.0 flow you need to use to get an Access Token securely. You will need this Access Token to call the API.

Before you begin, you will need to:

- [Register your application with Auth0](/applications/webapps). 
- Set the appropriate [Grant Type property](/applications/application-grant-types) for your application.
- Get the client ID and client secret values for your application. Auth0 automatically assigns these when you register your application, and you will need these values to obtain an [Access Token](/tokens/overview-access-tokens) that allows you to call an API.
- Know how to call your API, as well as the scopes offered by the API. If you don't already have this information, get it from the API documentation.

## Secure the authorization and token requests

[Use the Proof Key for Code Exchange (PKCE) grant type](/api-auth/tutorials/authorization-code-grant-pkce) to get tokens from Auth0. The PKCE grant authorization code variant is designed to handle the security issues that can occur with native applications. These types of applications are susceptible to authorization code interception attacks. A party can intercept the authorization code returned by Auth0 and exchange it for Access and Refresh Tokens to which it would otherwise not have rights. The PKCE grant defends against such attacks by establishing a secure binding between the authorization request and the subsequent token request. 

To secure the authorization and token requests, do the following steps:

* Get an Access Token.
  * Create a [code verifier](/api-auth/tutorials/authorization-code-grant-pkce#1-create-a-code-verifier) and [code challenge](/api-auth/tutorials/authorization-code-grant-pkce#2-create-a-code-challenge).
  * Get the users's authorization and redirect them to Auth0 to receive an authorization code.
  * [Exchange the user's authorization code for an Access Token](/api-auth/tutorials/authorization-code-grant#2-exchange-the-authorization-code-for-an-access-token).
* Call your API including your new Access Token in the Authorization header.
* [Refresh your Access Token](/tokens/refresh-token/current#use-a-refresh-token) if it expires.

### Get an Access Token by PKCE grant

With PKCE, your application creates a cryptographically random key, the *code verifier*, and a transformed value, the *code challenge*. You configure the code challenge, according to the PKCE specification, and the user sends it to Auth0's authorization endpoint to ask if your application can access the resources it controls. The endpoint responds to your application via the Redirect URI, which now includes the authorization code appended to the end. 

When your application receives the authorization code exchanges it for an Access Token. It sends the authorization code and the code verifier to Auth0's token endpoint. 

### Call your API

There are three ways to include the Access Token that grants you the right to call the API, but the OAuth 2.0 specification calls for its inclusion in the [HTTP Authorization header](/api-auth/tutorials/authorization-code-grant#3-call-the-api) whenever possible. 

### Refresh your Access Token

Your Access Token has a limited lifetime and therefore your Access Token will eventually expire. Use Refresh Tokens to get new Access Tokens without having to bother the end user for permissions again. 

We recommend that you request Auth0 send a Refresh Token whenever it grants an Access Token. You can use it to refresh your Access Token without going through the authorization process again.

## What's next

* [Call APIs from Mobile Apps](/api-auth/grant/authorization-code-pkce)

:::: further-reading
::: concepts
* [Application Grant Types](/applications/application-grant-types)
* [Access Tokens](/tokens/overview-access-tokens)

:::

::: guides
* [Authorization Code Grant PKCE Tutorial](/api-auth/tutorials/authorization-code-grant-pkce)
* [Register Web Applications](/applications/webapps)
* [Refresh Your Access Token](/tokens/refresh-token/current#use-a-refresh-token)
* [Authorization Code Grant](/api-auth/tutorials/authorization-code-grant)
:::

::: references
* [API Authorization](/api-auth)
* [Authentication API](/api/authentication)
* [0Auth 2.0](/protocols/oauth2)
:::
::::