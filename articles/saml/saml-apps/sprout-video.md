---
title: Sprout Video SAML Configuration
description: Sprout Video SAML Configuration
---

${include('./\_header')}

```
{
 "audience":  "https://{YOUR SPROUT VIDEO ACCOUNT}.vids.io",
 "mappings": {  
       "user_id":     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
       "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
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
