---
title: Application Types - Confidential vs. Public
description: Understand the difference between confidential and public application types.
toc: true
topics:
  - applications
  - application-types
contentType: concept
useCase:
  - build-an-app
---
# Application Types: Confidential vs. Public

According to the [OAuth 2.0 spec](https://tools.ietf.org/html/rfc6749#section-2.1), applications can be classified as either confidential or public. The main difference relates to whether or not the application is able to hold credentials (such as a client ID and secret) securely.

When you create an application using the Dashboard, Auth0 will ask you what [Auth0 application type](/applications/concepts/app-types-auth0) you want to assign to the new application and use that information to determine whether the application is confidential or public. 

To check whether your application is confidential or public, see [View Application Type: Confidential or Public](/applications/guides/view-app-type-confidential-public-dashboard).

## Confidential applications

Confidential applications can hold credentials in a secure way without exposing them to unauthorized parties. They require a trusted backend server to store the secret(s).

### Grant types

Because they use a trusted backend server, confidential applications can use grant types that require them to authenticate by specifying their client ID and secret when calling the token endpoint.

The following are considered to be confidential applications:

* A web application with a secure backend that uses the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow), [Password grant](/api-auth/grant/password), or [Password grant with Realm support](/api-auth/tutorials/password-grant#realm-support)
* A machine-to-machine (M2M) application that uses the [Machine-to-Machine (M2M) Flow](/flows/concepts/m2m-flow)

### ID Tokens

Because confidential applications are capable of holding secrets, you can have ID Tokens issued to them that have been signed in one of two ways:

* Symmetrically, using their client secret (`HS256`)
* Asymmetrically, using a private key (`RS256`)

## Public applications

Public applications **cannot** hold credentials securely.

### Grant types

Public applications can only use grant types that do not require the use of their client secret. 

The following are public applications:

* A native desktop or mobile application that uses the Native/Mobile Login Flow](/flows/concepts/mobile-login-flow)
* A JavaScript-based client-side web application (such as a single-page app) that uses the [Single-Page Login Flow](/flows/concepts/single-page-login-flow) grant

### ID Tokens

Because public applications are unable to hold secrets, [ID Tokens](/tokens/id-token) issued to them must be:

* Signed asymmetrically using a private key (`RS256`)
* Verified using the public key corresponding to the private key used to sign the token

## Keep reading
* To check whether your application is confidential or public, see [View Application Type: Confidential or Public](/applications/guides/view-app-type-confidential-public-dashboard).
* Learn about other application categories, such as [first-party vs. third-party](/applications/concepts/app-types-first-third-party) and [Auth0 application types](/applications/concepts/app-types-auth0).
* Explore the grant types available for different application types at [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping).
