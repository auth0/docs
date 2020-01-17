---
title: Configure Auth0 as a SAML Identity Provider for Datadog
description: Learn how to configure Auth0 to be a SAML Identity Provider for a Datadog.
topics:
    - saml
    - identity-providers
    - datadog
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Datadog

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Datadog](https://www.datadoghq.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "Datadog"
}) %>

- **Application Callback URL:** `https://app.datadoghq.com/account/saml/assertion`
- **Settings (JSON):**

```json
{
  "audience": "https://app.datadoghq.com/account/saml/metadata.xml",
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

Datadog has an option to automatically provision new users. Check out [Datadog docs](http://docs.datadoghq.com/guides/saml/) for more details.
