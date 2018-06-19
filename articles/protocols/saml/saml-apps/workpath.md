---
title: Workpath SAML Configuration
description: Workpath SAML Configuration
---

${include('./_header')}

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

The **Callback URL** is `https://api.workpath.com/v1/saml/assert/{YOUR-WORKPATH-SUBDOMAIN}`.
