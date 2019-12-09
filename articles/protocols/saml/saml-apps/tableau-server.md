---
title: Configure Auth0 as a SAML Identity Provider for Tableau Server
description: Learn how to configure Auth0 to be a SAML Identity Provider for Tableau Server.
topics:
    - saml
    - identity-providers
    - tableau-server
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Tableau Server

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Tableau Server](https://www.tableau.com/products/server).

<%= include('./_configure-saml-addon', {
  saml_app_name: "TableauServer"
}) %>

- **Application Callback URL:** `http://{YOUR_TABLEAU_SERVER}/wg/saml/SSO/index.html`
- **Settings (JSON):**

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
