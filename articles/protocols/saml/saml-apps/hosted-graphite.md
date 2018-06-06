---
title: Hosted Graphite SAML Configuration
description: Hosted Graphite SAML Configuration
tags:
    - saml
    - identity-providers
    - hosted-graphite
---

${include('./_header')}

```json
{
  "audience": "https://www.hostedgraphite.com/metadata/{YOUR-USER-ID}/",
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

The **Callback URL** is `https://www.hostedgraphite.com/complete/saml/{YOUR-USER-ID}/`.
