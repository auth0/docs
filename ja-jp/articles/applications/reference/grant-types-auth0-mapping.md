---
title: Auth0 Grant Types Mapping
description: Learn which grant types are available to which application types with Auth0.
toc: true
topics:
  - applications
  - application-types
  - grant-types
contentType: reference
useCase:
  - build-an-app
---

# Auth0 Grant Types Mapping

When registered, Auth0 Applications have access to different grant types based on [application](/applications) type. The biggest deciding factor is whether the application is [confidential or public](/applications/concepts/app-types-confidential-public).

Additionally, trusted first-party applications have access to additional grant types.

## Public applications

When a **Native App** or **Single-Page App** is registered in the Dashboard, it is automatically flagged as a public application, which is indicated by a `token_endpoint_auth_method` flag set to `none`.

By default, Auth0 creates public applications with the following `grant_types` enabled:

* `implicit`
* `authorization_code`
* `refresh_token`

**Native Apps** can also use the `device_code` grant type.

::: note
Public applications **cannot** use the `client_credentials` grant type. To use this grant type, you must indicate that the application is confidential rather than public. Use the [Management API](/api/management/v2#!/Clients/patch_clients_by_id) to set the **token_endpoint_auth_method** to `client_secret_post` or `client_secret_basic`.
:::

## Confidential applications

When a **Regular Web App** or **Machine-to-Machine (M2M) App** is registered in the Dashboard, it is automatically flagged as a confidential application, which is indicated by a `token_endpoint_auth_method` flag set to anything *except* `none`. 

By default, Auth0 creates confidential applications with the following `grant_types` enabled:

* `implicit`
* `authorization_code`
* `refresh_token`
* `client_credentials`

## Trusted first-party applications

Trusted first-party applications have the same `grant_types` enabled as confidential applications, plus the following:

* `password`
* `http://auth0.com/oauth/grant-type/password-realm`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

::: note
If you are using the [Dashboard](${manage_url}) to enable or disable these grant types, be aware that all the Password and MFA grant types are enabled when you add the `Password` or `MFA` grant type to your Application. You cannot select them individually.
:::

For more info about first-party and third-party applications, see [First-Party and Third-Party Applications](/applications/concepts/app-types-first-third-party).
