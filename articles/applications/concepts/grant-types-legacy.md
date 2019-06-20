---
title: Legacy Grant Types
description: Learn about legacy grant types and more secure alternatives.
topics:
  - applications
  - client-secrets
contentType: concept
useCase:
  - build-an-app
---

# Legacy Grant Types

Legacy grant types are traditional grant types supported for legacy customers only. If you are a legacy customer, we highly recommend moving to a more secure alternative.

::: warning 
As of 8 June 2017, all Auth0 Applications were given a `grant_types` property that **must** be populated. To avoid changes in functionality for Auth0 customers at that time, we populated the `grant_types` property for all existing Applications with **all** Auth0 legacy, Auth0 extension, and specification-conforming grant types.

At this time, new Auth0 customers were no longer able to add legacy grant types to their applications. Legacy grant types are only available for previous customers while they migrate to new flows, to avoid breaking changes. If you were a customer prior to 8 June 2017, you can [use the Dashboard](/dashboard/guides/applications/update-grant-types) or [use the Management API](/api/management/guides/applications/update-grant-types) to enable a legacy grant type.
:::

## Secure Alternatives

If you're currently using a legacy grant type, refer to the chart below to see which of the secure alternatives you should use instead.

| Legacy Grant Type | Alternative |
|:-----|:----|
|`http://auth0.com/oauth/legacy/grant-type/ro` | Use the [/oauth/token](/api/authentication#authorization-code) endpoint with a grant type of `password`. See [Resource Owner Password Credentials Exchange](/api-auth/tutorials/adoption/password) and [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant) for additional information. |
| `http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer` | This feature is disabled by default. If you would like this feature enabled, please [contact support](https://support.auth0.com/) to discuss your use case and prevent the possibility of introducing security vulnerabilities. |
| `http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token` | Use the `oauth/token` endpoint to obtain <dfn data-key="refresh-token">Refresh Tokens</dfn>. See [OIDC-conformant Refresh Tokens](/api-auth/tutorials/adoption/refresh-tokens) for more info. |
| `http://auth0.com/oauth/legacy/grant-type/delegation/id_token` | This feature is disabled by default. If you would like this feature enabled, please [contact support](https://support.auth0.com/) to discuss your use case and prevent the possibility of introducing security vulnerabilities. |
| `http://auth0.com/oauth/legacy/grant-type/access_token` | Use browser-based social authentication. |

::: note
Those implementing <dfn data-key="passwordless">Passwordless</dfn> Authentication should use [Universal Login](/hosted-pages/login) instead of the `oauth/ro` endpoint.
:::
