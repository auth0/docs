---
title: Configure Auth0 as a SAML Identity Provider for Pluralsight
description: Learn how to configure Auth0 to be a SAML Identity Provider for Pluralsight.
topics:
    - saml
    - identity-providers
    - Pluralsight
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Pluralsight

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Pluralsight](https://www.pluralsight.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "Pluralsight"
}) %>

- **Application Callback URL:** `https://prod-pf.pluralsight.com/sp/ACS.saml2`
- **Settings (JSON):**

```json
{
  "audience":  "www.pluralsight.com",
  "mappings": {
    "user_id":     "id",
    "email":       "email",
    "given_name":  "firstName",
    "family_name": "lastName"
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
