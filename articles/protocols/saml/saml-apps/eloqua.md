---
title: Eloqua (Oracle Eloqua Marketing Cloud) SAML Configuration
description: Eloqua (Oracle Eloqua Marketing Cloud) SAML Configuration
tags:
    - saml
    - identity-providers
    - eloqua
---

${include('./_header')}


```json
{
"audience": "<Service Provider Entity Url from within Eloqua>",
 "recipient": "https://login.eloqua.com/auth/saml2/acs",
   "mappings": {
    "user_id": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
   },
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
 "nameIdentifierProbes": [
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
 "destination": "https://login.eloqua.com/auth/saml2/acs"
  }

```

The **Callback URL** is `https://login.eloqua.com/auth/saml2/acs`.

::: note
The Service Provider Entity URL copied from within the IDP settings in Eloqua to set the audience restriction within Auth0.
:::