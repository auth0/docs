---
title: Egencia SAML Configuration
description: Egencia SAML Configuration
tags:
    - saml
    - identity-providers
    - egencia
---

${include('./_header')}


```json
{
  "audience": "https://{YOUR_ACCOUNT_NAME}.egencia.com",
   "mappings": {
   },
   "createUpnClaim":       false,
   "passthroughClaimsWithNoMapping": false,
   "mapUnknownClaimsAsIs": false,
   "mapIdentities":        false,
   "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
   "nameIdentifierProbes": [
     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
   ],
}
```

The **Callback URL** is `https://www.egencia.com/auth/v1/artifactConsumer`.
