---
title: Cisco WebEx SAML Configuration
description: Cisco WebEx SAML Configuration
tags:
    - saml
    - identity-providers
    - cisco
    - cisco-webex
---

${include('./_header')}

```json
{
   "mappings": {
     "email": ["email", "uid", "Name_ID"]
   },
  "createUpnClaim":       false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities":        false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
     "email",
   ]
}
```

Notice that Webex has an option to automatically provision new users. You will need to send that info along as claims (lastname, and so on).

:::note
If you integrate Auth0 with Cisco Spark services, you might find this article helpful: [Single Sign-On with Cisco Spark Services](https://collaborationhelp.cisco.com/article/en-us/lfu88u).
:::
