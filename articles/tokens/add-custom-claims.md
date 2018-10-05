---
description: How to add custom claims to Access Tokens using Rules
topics:
  - tokens
  - access-tokens
contentType:
  - how-to
useCase:
  - invoke-api
---

# Add Custom Claims to Access Tokens

You can add custom claims to your Access Token (or [ID Token](/tokens/id-token)) using [Rules](/rules). The claim name must conform to a namespaced format, which basically means adding any non-Auth0 HTTP or HTTPS URL as a prefix. 

::: note
The Auth0 namespaces you cannot use are `auth0.com`, `webtask.io` and `webtask.run`. The format you should follow is:  `http://my-namespace/claim-name`.
:::

For more information on the namespaced format of custom claims, refer to [User Profile Claims and Scope](/api-auth/tutorials/adoption/scope-custom-claims).

For an example of how to add a custom claim, refer to [Add Custom Claims](/rules/current#api-authorization-add-claims-to-access-tokens).
