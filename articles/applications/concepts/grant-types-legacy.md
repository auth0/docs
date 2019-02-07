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

Traditional grant types supported for legacy customers only. If you are a legacy customer, we highly recommend moving to a more secure alternative.

As of 8 June 2017, all Auth0 Applications have a `grant_types` property that **must** be populated. Here's how Auth0 will handle this change based on whether you're a current customer with an existing Application or a new customer.

### Existing Applications

To avoid changes in functionality for current Auth0 customers, we will populate the `grant_types` property for all existing Applications as of 8 June 2017 with **all** Auth0 legacy, Auth0 extension, and specification-conformant grant types.

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
