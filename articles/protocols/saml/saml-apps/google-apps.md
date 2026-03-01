---
title: G Suite SAML Configuration
description: G Suite SAML Configuration
topics:
    - saml
    - identity-providers
    - g-suite
contentType:
  - how-to
useCase:
  - add-idp
---

<%= include('./_header') %>

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

The **<dfn data-key="callback">Callback URL</dfn>** is `https://www.google.com/a/{YOUR-GOOGLE-DOMAIN}/acs`.
