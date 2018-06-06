---
title: Workday SAML Configuration
description: Workday SAML Configuration
tags:
    - saml
    - identity-providers
    - workday
---

${include('./_header')}

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
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  ],
  "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:X509",
}
```

The **Callback URL** is `https://impl.workday.com/<tenant>/fx/home.flex`.
