---
title: Cisco WebEx SAML Configuration
description: Cisco WebEx SAML Configuration
---

${include('./\_header')}

```
{
   "mappings": {
     "email": ["email", "uid", "Name_ID"]
   },
  "createUpnClaim":       false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities":        false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
     "email",
   ]
}
```

Notice that Webex has an option to automatically provision new users. You will need to send that info along as claims (lastname, etc).
