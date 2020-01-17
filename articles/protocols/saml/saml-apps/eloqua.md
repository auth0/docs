---
title: Configure Auth0 as a SAML Identity Provider for Eloqua
description: Learn how to configure Auth0 to be a SAML Identity Provider for Eloqua (Oracle Eloqua Marketing Cloud).
topics:
    - saml
    - identity-providers
    - eloqua
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Eloqua

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Eloqua (Oracle Eloqua Marketing Cloud)]().

<%= include('./_configure-saml-addon', {
  saml_app_name: "Eloqua"
}) %>

- **Application Callback URL:** `https://login.eloqua.com/auth/saml2/acs`
- **Settings (JSON):**

```json
{
"audience": "<Service Provider Entity Url from within Eloqua>",
 "recipient": "https://login.eloqua.com/auth/saml2/acs",
   "mappings": {
    "user_id": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
   },
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
 "nameIdentifierProbes": [
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ],
 "destination": "https://login.eloqua.com/auth/saml2/acs"
  }

```

::: note
The Service Provider Entity URL copied from within the IDP settings in Eloqua to set the audience restriction within Auth0.
:::