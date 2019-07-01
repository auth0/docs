---
title: Tableau Online SAML Configuration
description: Tableau Online SAML Configuration
topics:
    - saml
    - identity-providers
    - tableau
contentType:
  - how-to
useCase:
  - add-idp
---

<%= include('./_header') %>

```json
{
 "audience":  "https://sso.online.tableau.com/public/sp/metadata?alias={YOUR TABLEAU ALIAS}",
 "recipient": "https://sso.online.tableau.com/public/sp/SSO?alias={YOUR TABLEAU ALIAS}",
 "mappings": {
    "email": "Email"
 },
 "createUpnClaim":       false,
 "passthroughClaimsWithNoMapping": false,
 "mapUnknownClaimsAsIs": false,
 "mapIdentities":        false,
 "signatureAlgorithm":   "rsa-sha1",
 "digestAlgorithm":      "sha1",
 "destination":          "https://sso.online.tableau.com/public/sp/SSO?alias={YOUR TABLEAU ALIAS}",
 "lifetimeInSeconds":    3600,
 "signResponse":         false,
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:attrname-format:basic",
 "nameIdentifierProbes": [
   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
 ]
}
```

The **<dfn data-key="callback">Callback URL</dfn>** is `https://sso.online.tableau.com/public/sp/SSO?alias={YOUR TABLEAU ALIAS}`.

See [https://onlinehelp.tableau.com/current/online/en-us/saml_config_site.htm](https://onlinehelp.tableau.com/current/online/en-us/saml_config_site.htm) for more information.
