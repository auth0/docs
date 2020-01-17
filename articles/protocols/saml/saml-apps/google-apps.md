---
title: Configure Auth0 as a SAML Identity Provider for G Suite
description: Learn how to configure Auth0 to be a SAML Identity Provider for G Suite.
topics:
    - saml
    - identity-providers
    - g-suite
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for G Suite

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [G Suite](https://gsuite.google.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "GSuite"
}) %>

- **Application Callback URL:** `https://www.google.com/a/{YOUR-GOOGLE-DOMAIN}/acs`
- **Settings (JSON):**

```json
{
  "audience": "https://www.google.com/a/{YOUR-GOOGLE-DOMAIN}/acs",
  "mappings": {
    "nickname": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
  },
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "signatureAlgorithm": "rsa-sha256",
  "digestAlgorithm": "sha256",
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:email",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ],
}
```

