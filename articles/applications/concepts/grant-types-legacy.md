---
title: Client Secret
description: Learn about client secrets.
topics:
  - applications
  - client-secrets
contentType: concept
useCase:
  - build-an-app
---

## Information for Existing and New Auth0 Customers

As of 8 June 2017, all Auth0 Applications have a `grant_types` property that **must** be populated. Here's how Auth0 will handle this change based on whether you're a current customer with an existing Application or a new customer.

### Existing Applications

To avoid changes in functionality for current Auth0 customers, we will populate the `grant_types` property for all existing Applications as of 8 June 2017 with **all** Auth0 legacy, Auth0 extension, and specification-conformant grant types.

### New Applications

Depending on whether a newly-created Application is [public](/applications/client-types#public-applications) or [confidential](/applications/client-types#confidential-applications), the Application will have varying access to grant types. Trusted first-party applications have access to additional grant types.

#### Public Applications

Public Applications, indicated by the `token_endpoint_auth_method` flag set to `none`, are those created in the Dashboard for Native and Single Page Applications. 

::: panel Token Endpoint Authentication Method
The `Token Endpoint Authentication Method` defines how a Application authenticates against the [token endpoint](/api/authentication#authorization-code). Its valid values are:

* `None`, for a public application without a client secret
* `Post`, for a application using HTTP POST parameters
* `Basic`, for a application using HTTP Basic parameters 

You can find this field at the [Application Settings page](${manage_url}/#/applications/${account.clientId}/settings) of the [Auth0 Dashboard](${manage_url}).
:::

By default, Public Applications are created with the following `grant_types`:

* `implicit`
* `authorization_code`
* `refresh_token`

::: note
Public Applications **cannot** utilize the `client_credentials` grant type. To add this grant type to a Application using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id), set the **token_endpoint_auth_method** to `client_secret_post` or `client_secret_basic`. Either of these will indicate the Application is confidential, not public.
:::

#### Confidential Applications

Confidential Applications, indicated by the `token_endpoint_auth_method` flag set to anything *except* `none`, are those created in the Dashboard for Regular Web Applications or Machine to Machine Applications. Additionally, any Application where `token_endpoint_auth_method` is unspecified is confidential. By default, Confidential Applications are created with the following `grant_types`:

* `implicit`;
* `authorization_code`;
* `refresh_token`;
* `client_credentials`.

#### Trusted First-Party Applications

Trusted first-party applications can additionally use the following `grant_types`:

* `password`
* `http://auth0.com/oauth/grant-type/password-realm`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

::: note
If you are using the [Dashboard](${manage_url}) to enable or disable these grant types, note that all the Password and MFA grant types are enabled when you add the `Password` or `MFA` grant type on your Application. You cannot select these individually.
:::

## Secure Alternatives to the Legacy Grant Types

If you're currently using a legacy grant type, refer to the chart below to see which of the secure alternatives you should use instead.

| Legacy Grant Type | Alternative |
|:-----|:----|
|`http://auth0.com/oauth/legacy/grant-type/ro` | Use the [/oauth/token](/api/authentication#authorization-code) endpoint with a grant type of `password`. See [Resource Owner Password Credentials Exchange](/api-auth/tutorials/adoption/password) and [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant) for additional information. |
| `http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer` | This feature is disabled by default. If you would like this feature enabled, please [contact support](https://support.auth0.com/) to discuss your use case and prevent the possibility of introducing security vulnerabilities. |
| `http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token` | Use the `oauth/token` endpoint to obtain Refresh Tokens. See [OIDC-conformant Refresh Tokens](/api-auth/tutorials/adoption/refresh-tokens) for more info. |
| `http://auth0.com/oauth/legacy/grant-type/delegation/id_token` | This feature is disabled by default. If you would like this feature enabled, please [contact support](https://support.auth0.com/) to discuss your use case and prevent the possibility of introducing security vulnerabilities. |
| `http://auth0.com/oauth/legacy/grant-type/access_token` | Use browser-based social authentication. |

::: note
Those implementing Passwordless Authentication should use [Universal Login](/hosted-pages/login) instead of the `oauth/ro` endpoint.
:::

## Enable a Legacy Grant Type

::: warning
As of 8 June 2017, new Auth0 customers cannot add any of the legacy grant types to their applications. Legacy grant types are only available for previous customers while they migrate to new flows, to avoid breaking changes. To find the secure alternative for your case refer to [Secure Alternatives to the Legacy Grant Types](#secure-alternatives-to-the-legacy-grant-types).
:::

To enable a legacy grant type, you will need to update the `grant_types` property for you Application appropriately. For details on how to do so, refer to [Edit the grant_types Property](#edit-available-grant_types).
