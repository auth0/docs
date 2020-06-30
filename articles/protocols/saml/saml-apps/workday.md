---
title: Workday SAML Configuration
description: Workday SAML Configuration
topics:
    - saml
    - identity-providers
    - workday
contentType:
  - how-to
useCase:
  - add-idp
---

<%= include('./_header') %>

```json
{
  "audience": "http://www.workday.com",
  "recipient": "https://www.myworkday.com/<tenant>/login-saml.htmld",
  "mappings": {
  },
  "createUpnClaim":       false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities":        false,
  "signResponse":         true,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  ],
  "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:X509",
}
```

The **<dfn data-key="callback">Callback URL</dfn>** is `https://impl.workday.com/<tenant>/login-saml.htmld`. You may want to change the subdomain `impl` depending on the Workday data center you are using.
