---
description: How to export data out of Auth0.
topics:
    - support
    - data
    - data-export
contentType:
  - how-to
  - reference
useCase:
  - support
---

# Export Data Out of Auth0

All data in your Auth0 tenant is always under your control and is [available through the management API](/api/v2) at any time.
The only information which is not available through the API (for security reasons) are the password hashes of your [Auth0-hosted database users](/connections/database) and private keys.
You can still request this information by opening a [support ticket](${env.DOMAIN_URL_SUPPORT}). Please note that this operation is not available for our Free subscription tier.

## Keep user credentials on your infrastructure

If you want to store user passwords on your database, you can set up a [custom database connection](/connections/database/mysql) which Auth0 will query each time a user logs in.
In this case Auth0 will never store any password hashes, unless you choose to [progressively migrate users to Auth0](/connections/database/migrating).

## If you don't want to use proprietary Auth0 components

Auth0 primarily uses <dfn data-key="openid">OpenID Connect (OIDC)</dfn> as its authentication protocol, so you should be able to implement an integration to your application using standard libraries. The same situation applies when [integrating Auth0 through SAML](/saml-configuration).

All of Auth0's SDKs, libraries, and samples [are published on GitHub as free software](https://github.com/auth0/).

## Social identity providers

If you choose not to use Auth0 but keep using the same OAuth client IDs and secrets for your social identity providers, you will retain access to user information without needing to display new consent dialogs.

## Custom code

All of Auth0's custom code features (rules, custom database scripts, custom OAuth connections, and so on) run on a Node.js sandbox service.

All libraries available on the sandbox service are also available on npm for use with standard Node.js code.

## Keep reading

::: next-steps
* [Auth0 privacy policy](https://auth0.com/privacy)
* [Availability and trust](https://auth0.com/availability-trust)
* [Data security and confidentiality policies](https://auth0.com/security)
:::
