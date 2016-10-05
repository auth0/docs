---
title: Datadog SAML Configuration
description: Datadog SAML Configuration
template: saml/saml-apps/_template
---

@@block:samlconfig@@

```
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

**Callback URL**: `https://app.datadoghq.com/account/saml/assertion`

Notice that Datadog has an option to automatically provision new users. Check [here](http://docs.datadoghq.com/guides/saml/) for more details.

@@endblock@@