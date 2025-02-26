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


The <b>Application Callback URL</b> would found at: Freshworks Dashboard => Security => SAML SSO => <b>Assertion Consumer Service(ACS) URL</b>
The audience can be at Freshworks Dashboard => Security => SAML SSO => <b>Service Provider(SP) Entity ID</b> URL

```json
{
  "audience": "https://{FD Domain}.freshworks.com/sp/SAML/{xxxxxxxxxxxxxxxxxxx}/metadata",
  "mappings": {
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "given_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
    "family_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
  },
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

The **<dfn data-key="callback">Callback URL</dfn>** is `https://{FD Domain}.freshdesk.com/login/saml`.
