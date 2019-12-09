---
title: Configure Auth0 as a SAML Identity Provider for Freshdesk
description: Learn how to configure Auth0 to be a SAML Identity Provider for Freshdesk.
topics:
    - saml
    - identity-providers
    - freshdesk
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Freshdesk

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Freshdesk](https://freshdesk.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "Freshdesk"
}) %>

- **Application Callback URL:** `https://<YOUR_FRESHDESK_DOMAIN>.freshdesk.com/login/saml`
- **Settings (JSON):**

```json
{
   "audience":      "https://<YOUR_FRESHDESK_DOMAIN>.freshdesk.com",
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
