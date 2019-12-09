---
title: Configure Auth0 as a SAML Identity Provider for Hosted Graphite
description: Learn how to configure Auth0 to be a SAML Identity Provider for Hosted Graphite.
topics:
    - saml
    - identity-providers
    - hosted-graphite
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Hosted Graphite

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Hosted Graphite](https://www.hostedgraphite.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "HostedGraphite"
}) %>

- **Application Callback URL:** `https://www.hostedgraphite.com/complete/saml/<YOUR-USER-ID>/`
- **Settings (JSON):**

```json
{
  "audience": "https://www.hostedgraphite.com/metadata/{YOUR-USER-ID}/",
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```
