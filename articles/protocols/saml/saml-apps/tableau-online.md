---
title: Configure Auth0 as a SAML Identity Provider for Tableau Online
description: Learn how to configure Auth0 to be a SAML Identity Provider for Tableau Online.
topics:
    - saml
    - identity-providers
    - tableau-online
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Tableau Online

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Tableau Online](https://online.tableau.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "TableauOnline"
}) %>

- **Application Callback URL:** `https://sso.online.tableau.com/public/sp/SSO?alias=<YOUR_TABLEAU_ALIAS>`
- **Settings (JSON):**

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

See [https://onlinehelp.tableau.com/current/online/en-us/saml_config_site.htm](https://onlinehelp.tableau.com/current/online/en-us/saml_config_site.htm) for more information.
