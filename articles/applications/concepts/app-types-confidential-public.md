---
description: Understand the difference between confidential and public application types.
toc: true
topics:
  - applications
  - application-types
contentType: concept
useCase:
  - build-an-app
---
# Confidential and Public Applications

According to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-2.1), applications can be classified as either confidential or public. The main difference relates to whether or not the application is able to hold credentials (such as a client ID and secret) securely.

When you create an application using the Dashboard, Auth0 will ask you what [Auth0 application type](/applications) you want to assign to the new application and use that information to determine whether the application is confidential or public. 

To check whether your application is confidential or public, see [View Application Type: Confidential or Public](/dashboard/guides/applications/view-app-type-confidential-public).

## Confidential applications

Confidential applications can hold credentials in a secure way without exposing them to unauthorized parties. They require a trusted backend server to store the secret(s).

### Grant types

Because they use a trusted backend server, confidential applications can use grant types that require them to authenticate by specifying their client ID and secret when calling the token endpoint.

The following are considered to be confidential applications:

* A web application with a secure backend that uses the [Authorization Code Flow](/flows/concepts/auth-code), [Password grant](/api-auth/grant/password), or [Password grant with Realm support](/api-auth/tutorials/password-grant#realm-support)
* A machine-to-machine (M2M) application that uses the [Client Credentials Flow](/flows/concepts/client-credentials)

### ID Tokens

Because confidential applications are capable of holding secrets, you can have ID Tokens issued to them that have been signed in one of two ways:

* Symmetrically, using their client secret (`HS256`)
* Asymmetrically, using a private key (`RS256`)

## Public applications

Public applications **cannot** hold credentials securely.

### Grant types

Public applications can only use grant types that do not require the use of their client secret. 

The following are public applications:

* A native desktop or mobile application that uses the [Authorization Code Flow with PKCE](/flows/concepts/auth-code-pkce)
* A JavaScript-based client-side web application (such as a single-page app) that uses the [Implicit Flow](/flows/concepts/implicit) grant

### ID Tokens

Because public applications are unable to hold secrets, [ID Tokens](/tokens/concepts/id-tokens) issued to them must be:

* Signed asymmetrically using a private key (`RS256`)
* Verified using the public key corresponding to the private key used to sign the token

## Keep reading

* [View Application Type](/dashboard/guides/applications/view-app-type-confidential-public)
* [First-Party and Third-Party Applications](/applications/concepts/app-types-first-third-party)
* [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping)
