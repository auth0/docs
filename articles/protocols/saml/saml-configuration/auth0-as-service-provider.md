---
description: How to configure Auth0 for use as a SAML service provider
tags:
  - saml
---

# Configure Auth0 as a Service Provider

::: warning
Auth0 only supports using Auth0 as the service provider in SAML configurations with **SAML 1.1** or **SAML 2.0**.
:::

This video provides an overview of how to configure Auth0 for use as a SAML service provider.

<iframe src="//fast.wistia.net/embed/iframe/2xrll0d056" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen width="640" height="400"></iframe>
<script src="//fast.wistia.net/assets/external/E-v1.js" async></script>

When Auth0 serves as the SAML service provider, you need to use an Auth0 Connection to configure the service provider side of each SAML federation.

Finally, you'll configure the Identity Provider (IdP) portion of your SAML setup. We have docs for the following providers:

* [ADFS](/adfs)
* [Okta](/okta)
* [OneLogin](/onelogin)
* [Ping7](/ping7)
* [SalesForce](/saml/identity-providers/salesforce)
* [SiteMinder](/siteminder)
* [SSOCircle](/ssocircle)

If you are using any other SAML-compliant IdP with Auth0 as the Service Provider, you can use the [Generic Service Provider Configuration Instructions](/saml-sp-generic).
