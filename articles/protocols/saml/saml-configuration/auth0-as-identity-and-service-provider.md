---
description: How to configure Auth0 for use as a SAML service AND identity provider
  tags:
    - saml  
---

# Configure Auth0 as a Service and Identity Provider

::: note
Auth0 provides a non-exhaustive [list of SAML-compliant providers](/samlp-providers).
:::

::: warning
Auth0 only supports:
* Using Auth0 as the service provider in SAML configurations with **SAML 1.1** or **SAML 2.0**.
* Using Auth0 as the identity provider in SAML configurations with **SAML 2.0**.
:::

When using Auth0 as both the SAML Service and Identity Provider, you need to configure **two** federations:

* [Configure Auth0 as a Service Provider](/protocols/saml/saml-configuration/auth0-as-service-provider)
* [Configure Auth0 as an Identity Provider](/protocols/saml/saml-configuration/auth0-as-identity-provider).

## Using Two Auth0 Tenants

The section above assumes that you're using the same Auth0 tenant as the service provider *and* the identity provider. However, you can also implement a [SAML scenario using **two** Auth0 tenants](/samlsso-auth0-to-auth0) (usually for testing purposes), where one tenant acts as the identity provider and the other acts as the service provider.
