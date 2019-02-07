---
title: Application Types - Public vs. Confidential
description: Understand the difference between public and confidential application types.
toc: true
topics:
  - applications
  - application-types
contentType: reference
useCase:
  - build-an-app
---
# Application Types: Public vs. Confidential

According to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-2.1), applications can be classified as either public or confidential. The main difference relates to whether or not the application is able to hold credentials securely.

## Confidential applications

Confidential applications are able to hold credentials (such as a client ID and secret) in a secure way without exposing them to unauthorized parties. This means that you will need a trusted backend server to store the secret(s).

The following application types use confidential applications:

* A web application with a secure backend using the [Authorization Code grant](/api-auth/grant/authorization-code), [Password](/api-auth/grant/password) or [Password Realm](/api-auth/tutorials/password-grant#realm-support) grants
* A machine to machine application using the [Client Credentials grant](/api-auth/grant/client-credentials)

All of these grants require applications to authenticate by specifying their client ID and secret when calling the token endpoint.

Since confidential applications are capable of holding secrets, you can choose to have ID Tokens issued to them that have been signed in one of two ways:

* Symmetrically using their client secret (`HS256`)
* Asymmetrically using a private key (`RS256`)

## Public applications

Public applications **cannot** hold credentials securely. The following application types use public applications:

* Native desktop or mobile applications using the [Authorization Code grant with PKCE](/api-auth/grant/authorization-code-pkce)
* JavaScript-based client-side web applications (such as single-page apps) using the [Implicit](/api-auth/grant/implicit) grant

Since public applications are unable to hold secrets, [ID Tokens](/tokens/id-token) issued to them must be:

* Signed asymmetrically using a private key (`RS256`)
* Verified using the public key corresponding to the private key used to sign the token

## Keep reading
* Learn about other application categories, such as [first-party vs. third-party](/applications/concepts/app-types-first-third-party) and [Auth0 application types](/applications/concpets/app-types-auth0).
