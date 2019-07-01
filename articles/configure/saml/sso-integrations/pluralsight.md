---
title: Pluralsight SAML Configuration
description: Pluralsight SAML Configuration
topics:
    - saml
    - identity-providers
    - pluralsight
contentType:
  - how-to
useCase:
  - add-idp
---

<%= include('./_header') %>


```json
{
  "audience":  "www.pluralsight.com",
  "mappings": {
    "user_id":     "id",
    "email":       "email",
    "given_name":  "firstName",
    "family_name": "lastName"
  },
  "createUpnClaim":       false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities":        false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

The **<dfn data-key="callback">Callback URL</dfn>** is `https://prod-pf.pluralsight.com/sp/ACS.saml2`.
