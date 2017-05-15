---
  description: How to configure Auth0 for use as a SAML service AND identity provider
---

# Configure Auth0 as a Service and Identity Provider

:::panel-info SAML-Compliant Providers
Auth0 provides a non-exhaustive [list of SAML-compliant providers](/samlp-providers).
:::

When using Auth0 as both the SAML Service and Identity Provider, you need to configure **two** federations:

* [Configure Auth0 as a Service Provider](/saml-configuration/auth0-as-identity-provider)
* [Configure Auth0 as an Identity Provider](/saml-configuration/auth0-as-service-provider).

## Using Two Auth0 Accounts

The section above assumes that you're using the same Auth0 account as the service provider *and* the identity provider. However, you can also implement a [SAML scenario using **two** Auth0 accounts](/samlsso-auth0-to-auth0) (usually for testing purposes), where one account acts as the identity provider and the other acts as the service provider.
