---
title: Configure Auth0 as a SAML Identity Provider for Cisco WebEx
description: Learn how to configure Auth0 to be a SAML Identity Provider for a Cisco WebEx.
topics:
    - saml
    - identity-providers
    - cisco
    - cisco-webex
    - webex
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Cisco WebEx

On this page, you'll find steps on configuring Auth0 to serve as a SAML Identity Provider for [Cisco WebEx](https://www.webex.com/).

<%= include('./_configure-saml-addon.md', {
  saml_app_name: "CiscoWebEx"
}) %>

- **Settings (JSON):**

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
