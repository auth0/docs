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

Use the Proof Key for Code Exchange (PKCE) grant to get an authorization code. A PKCE grant Authorization Code grant variant designed to handle the security issues that may be present with native applications. These apps are susceptible to authorization code interception attack. A party can intercept the authorization code returned by Auth0 and exchange it for Access and Refresh Tokens to which it would otherwise not have rights. PKCE was introduced to defend against such attacks. PKCE works by establishing a secure binding between the authorization request and the subsequent token request.

The Authorization Code using PKCE grant is identical to the Authorization Code Grant, but with one significant change. With PKCE, your application creates a cryptographically random key called the *code verifier*, as well as a transformed value called the *code challenge*. Your application then sends both values to Auth0 when requesting the authorization code.

When your app receives the authorization code and it needs to exchange it for an Access Token, it will send the authorization code and the code verifier to Auth0's token endpoint.

## Call an API

Your application sends the user (with the code challenge you create, per PKCE spec) to Auth0's authorization endpoint to ask them if your application can access the resources they control. Auth0 then responds to your application via the Redirect URI, which now includes the authorization code appended to the end. Finally, your application will send the authorization code back to Auth0 in exchange for your brand new Access Token.

There are three ways that you can include the Access Token that grants you the right to call the API, but the OAuth 2.0 specification calls for its inclusion in the HTTP Authorization header whenever possible. As such, this is the method we recommend you use.

## Refresh your Access Tokens

Your Access Token shouldn't last forever, and this means that sometime in the future, your Access Token will expire.  Use Refresh Tokens to get a new Access Token without having to bother the end user (or whomever the resource owner is) for permissions again. 

If you requested that Auth0 send a Refresh Token whenever it grants an Access Token, you can use it to refresh your Access Token without going through the authorization song-and-dance again.



