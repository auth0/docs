---
title: Workpath SAML Configuration
description: Workpath SAML Configuration
contentType:
  - how-to
useCase:
  - add-idp
---

<%= include('./_header') %>

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

The **<dfn data-key="callback">Callback URL</dfn>** is `https://api.workpath.com/v1/saml/assert/{YOUR-WORKPATH-SUBDOMAIN}`.
