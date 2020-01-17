---
title: Configure Auth0 as a SAML Identity Provider for Workpath
description: Learn how to configure Auth0 to be a SAML Identity Provider for Workpath.
topics:
    - saml
    - identity-providers
    - workpath
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Workpath

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Workpath](https://www.workpath.co/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "Workpath"
}) %>

- **Application Callback URL:** `https://api.workpath.com/v1/saml/assert/{YOUR-WORKPATH-SUBDOMAIN}`
- **Settings (JSON):**

```json
{
  "audience": "https://api.workpath.com/v1/saml/metadata/{YOUR-WORKPATH-SUBDOMAIN}",
  "mappings": {
    "email": "email",
    "given_name": "first_name",
    "family_name": "last_name"
  }
}
```
