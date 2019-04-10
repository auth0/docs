---
title: Available Grant Types
description: Learn which grant types are available with Auth0.
toc: true
topics:
  - applications
  - grant-types
contentType: reference
useCase:
  - build-an-app
---
# Available Grant Types

Various grant types are valid when registering Auth0 Applications. These can be divided into the following categories:
 
* **[Spec-conforming grants](#spec-conforming-grants)**: Grants defined by and conforming to external specifications (such as [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html))
* **[Auth0 extension grants](#auth0-extension-grants)**: Auth0-specific grants that conform to the [OAuth extension mechanism](https://tools.ietf.org/html/rfc6749#section-4.5) to support additional clients or to provide a bridge between OAuth and other trust frameworks.
* **[Auth0 legacy grants](#auth0-legacy-grants)**: Traditional grant types supported for legacy customers only. If you are a legacy customer, we highly recommend moving to a more secure alternative. For info on working with legacy grant types and their alternatives, see [Legacy Grant Types](/applications/concepts/grant-types-legacy).

## Spec-conforming grants

| `grant_type` | More info |
|:-----|:----|
| `implicit` | [Implicit Grant](/flows/concepts/single-page-login-flow) |
| `authorization_code` | [Authorization Code Grant](/flows/concepts/regular-web-app-login-flow) |
| `client_credentials` | [Client Credentials Grant](/flows/concepts/m2m-flow) |
| `password` | [Resource Owner Password Grant](/api-auth/grant/password) |
| `refresh_token` | [Use a Refresh Token](/tokens/refresh-token/current#use-a-refresh-token) |

## Auth0 extension grants

| `grant_type` | More info |
|:-----|:----|
| `http://auth0.com/oauth/grant-type/password-realm` | [Use an extension grant similar to the Resource Owner Password Grant that includes the ability to indicate a specific realm](/api-auth/grant/password#realm-support) |
| `http://auth0.com/oauth/grant-type/mfa-oob` | [Multi-factor Authentication OOB Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-oob-grant-request) |
| `http://auth0.com/oauth/grant-type/mfa-otp` | [Multi-factor Authentication OTP Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-otp-grant-request) |
| `http://auth0.com/oauth/grant-type/mfa-recovery-code` | [Multi-factor Authentication Recovery Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-recovery-grant-request) |

## Auth0 legacy grants

Legacy grants include:

* `http://auth0.com/oauth/legacy/grant-type/ro`
* `http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer`
* `http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token`
* `http://auth0.com/oauth/legacy/grant-type/delegation/id_token`
* `http://auth0.com/oauth/legacy/grant-type/access_token`

For info on working with legacy grant types and their alternatives, see [Legacy Grant Types](/applications/concepts/grant-types-legacy).

## Keep reading

* To learn which grant types are enabled for different application types, see [Auth0 Grant Types Mapping](/applications/reference/grant-types-auth0-mapping).
