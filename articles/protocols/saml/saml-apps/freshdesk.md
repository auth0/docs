---
title: Freshdesk SAML Configuration
description: Freshdesk SAML Configuration
topics:
    - saml
    - identity-providers
    - freshdesk
contentType:
  - how-to
useCase:
  - add-idp
---

<%= include('./_header') %>

```json
{
   "audience":      "https://{FD Domain}.freshdesk.com",
   "mappings": {
     "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
     "given_name":  "User.FirstName",
     "family_name": "User.LastName",
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

The **Callback URL** is `https://{FD Domain}.freshdesk.com/login/saml`.
