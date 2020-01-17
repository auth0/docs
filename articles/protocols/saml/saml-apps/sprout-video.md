---
title: Configure Auth0 as a SAML Identity Provider for Sprout Video
description: Learn how to configure Auth0 to be a SAML Identity Provider for Sprout Video.
topics:
    - saml
    - identity-providers
    - sprout-video
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as a SAML Identity Provider for Sprout Video

On this page, you'll find steps on configuring Auth0 as a SAML Identity Provider for [Sprout Video](https://sproutvideo.com/).

<%= include('./_configure-saml-addon', {
  saml_app_name: "SproutVideo"
}) %>

- **Settings (JSON):**

```json
{
 "audience":  "https://{YOUR_SPROUT_VIDEO_ACCOUNT}.vids.io",
 "mappings": {  
       "user_id":     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
       "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
 },
 "createUpnClaim":       false,
 "passthroughClaimsWithNoMapping": false,
 "mapUnknownClaimsAsIs": false,
 "mapIdentities":        false,
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
 "nameIdentifierProbes": [
   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
 ],
}
```
