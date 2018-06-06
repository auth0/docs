---
title: Tableau Server SAML Configuration
description: Tableau Server SAML Configuration
tags:
    - saml
    - identity-providers
    - tableau
---

${include('./_header')}

```json
{
 "audience":  "{YOUR TABLEAU AUDIENCE}",
 "recipient": "http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html",
 "mappings": {
    "email": "username"
 },
 "createUpnClaim":       false,
 "passthroughClaimsWithNoMapping": false,
 "mapUnknownClaimsAsIs": false,
 "mapIdentities":        false,
 "signatureAlgorithm":   "rsa-sha1",
 "digestAlgorithm":      "sha1",
 "destination":          "http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html",
 "lifetimeInSeconds":    3600,
 "signResponse":         false,
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
 "nameIdentifierProbes": [
   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
 ]
}
```

The **Callback URL** is `http://{YOUR TABLEAU SERVER}/wg/saml/SSO/index.html`.
