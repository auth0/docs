---
title: Configure Auth0 as a SAML Identity Provider for Workday
description: Learn how to configure Auth0 to be a SAML Identity Provider for Workday.
topics:
    - saml
    - identity-providers
    - workday
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Workday

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Workday](https://www.workday.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "Workday"
}) %>

- **Application Callback URL:** `https://impl.workday.com/<tenant>/login-saml.htmld`. You may want to change the subdomain `impl` depending on the Workday data center you are using.
- **Settings (JSON):**

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
  "signResponse":         true,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  ],
  "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:X509",
}
```

