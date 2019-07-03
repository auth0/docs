---
description: A brief overview of Embedded Login with Auth0
topics:
  - login
  - embedded-login
  - hosted-pages
contentType: index
useCase: customize-hosted-pages
---

# Embedded Login

Embedded Login is the scenario in which users login directly in your application, and credentials are transmitted to the Auth0 server. There are security concerns with this approach, particularly if you do not use the [Custom Domains](/custom-domains) feature at Auth0, as this potentially opens your application up to [cross-origin authentication](/cross-origin-authentication) issues.

If you need to implement embedded login, you need to have a custom domain set up, so that this can be mitigated. You can then use one of our libraries (Such as the [Lock Widget](/libraries/lock) or [auth0.js SDK](/libraries/auth0js)) to implement login in your application, or do it via our [API](/api/authentication).
