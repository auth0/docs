---
title: Datadog SAML Configuration
description: Datadog SAML Configuration
topics:
    - saml
    - identity-providers
    - datadog
contentType:
  - how-to
useCase:
  - add-idp
---

<%= include('./_header') %>

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

The **<dfn data-key="callback">Callback URL</dfn>** is `https://app.datadoghq.com/account/saml/assertion`.

Notice that Datadog has an option to automatically provision new users. Check [Datadog docs](http://docs.datadoghq.com/guides/saml/) for more details.
