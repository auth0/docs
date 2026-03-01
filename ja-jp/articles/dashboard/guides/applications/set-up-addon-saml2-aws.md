---
title: Set Up the SAML2 Web App Add-On with AWS for Applications
description: Learn how to set up the SAML2 Web App add-ons with Amazon Web Services (AWS) for an application registered with Auth0 using the Auth0 Management Dashboard.
topics:
    - applications
    - add-ons
    - AWS
    - SAML
    - dashboard
contentType:
    - how-to
useCase: 
    - integrate-third-party-apps
---
# Set Up the SAML2 Web App Add-On with AWS for Applications

This guide will show you how to set up the SAML2 Web App [add-on](/addons) with Amazon Web Services (AWS) for an application using Auth0's Dashboard.

::: warning
This is just one step in the process of integrating Auth0 with AWS. For complete steps, choose an integration from [Integrate Auth0 with Amazon Web Services (AWS)](/integrations/aws).
:::

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to update.

2. Click **Add-ons**, and enable the toggle for the **SAML2 Web App** add-on.

3. Locate **Application <dfn data-key="callback">Callback URL</dfn>** and enter `https://signin.aws.amazon.com/saml`, then paste the following <dfn data-key="security-assertion-markup-language">SAML</dfn> configuration code into **Settings**, then click **Enable**. 

```js
{
  "audience": "https://signin.aws.amazon.com/saml",
  "mappings": {
    "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  },
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:persistent",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

4. Click the **Usage** tab, locate **Identity Provider Metadata**, and download the metadata file. You'll need this when you configure Auth0 as the identity provider (IdP) for AWS in the next step.
