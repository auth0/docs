---
description: How to use Home Realm Discovery with SAML
tags:
  - saml
  - home-realm-discovery
---

# Select from Multiple Identity Providers

If you need to use Home Realm Discovery, which is basically selecting between multiple Auth0 Connections (each of which represents a different identity provider), [you can do so programmatically](/hrd) by:

* Specifying the Connection in the call invoking authentication;
* Specifying the email domain(s) for each Connection in the Connection Settings page of the Auth0 Dashboard;
* Adding custom buttons to the Lock widget so that users choose the Connection they want to use.
