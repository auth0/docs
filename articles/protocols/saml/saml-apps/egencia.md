---
title: Configure Auth0 as a SAML Identity Provider for Egencia
description: Learn how to configure Auth0 to be a SAML Identity Provider for Egencia.
topics:
    - saml
    - identity-providers
    - egencia
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Egencia

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Egencia](https://www.egencia.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "Egencia"
}) %>

- **Application Callback URL:** `https://www.egencia.com/auth/v1/artifactConsumer`
- **Settings (JSON):**

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
