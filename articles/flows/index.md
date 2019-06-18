---
url: /flows
section: articles
classes: topic-page
title: Flows
description: Introduction to the various flows used for authentication and authorization of applications and APIs.
topics:
  - api-authentication
  - api-authorization
  - oidc
contentType: index
useCase:
  - secure-api
  - call-api
  - add-login
---

# Authentication and Authorization Flows

Auth0 uses <dfn data-key="openid">[OpenID Connect (OIDC)](/protocols/oidc)</dfn> and [OAuth 2.0](/protocols/oauth2) to authenticate users and get their authorization to access protected resources. With Auth0, you can easily support different flows in your own applications and APIs without worrying about the OAuth 2.0/OIDC specification, or the other technical aspects of authentication and authorization.

We support scenarios for server-side, mobile, desktop, client-side, machine-to-machine, and device applications:

* [Authorization Code Flow](/flows/concepts/auth-code)
  * [Add Login Using the Authorization Code Flow](/flows/guides/auth-code/add-login-auth-code)
  * [Call API Using the Authorization Code Flow](/flows/guides/auth-code/call-api-auth-code)
  
* [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce)
  * [Add Login Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/add-login-auth-code-pkce)
  * [Call API Using the Authorization Code Flow with PKCE](/flows/guides/auth-code-pkce/call-api-auth-code-pkce)
  
* [Single-Page App Login Flow](/flows/concepts/implicit)
  * [Add Login Using the Implicit Flow](/flows/guides/implicit/add-login-implicit)
  * [Call API Using the Implicit Flow](/flows/guides/implicit/call-api-implicit)

* [Client Credentials Flow](/flows/concepts/client-credentials)
  * [Call API Using the Client Credentials Flow](/flows/guides/client-credentials/call-api-client-credentials)

* [Device Authorization Flow](/flows/concepts/device-auth)
  * [Add Authorization Using the Device Authorization Flow](/flows/guides/device-auth/add-auth-device-auth)

