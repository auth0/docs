---
title: Configure Auth0 as Identity Provider for GitHub Enterprise Server
description: This page explains how to configure Auth0 to be the SAML Identity Provider for a GitHub Enterprise Server private instance.
topics:
    - saml
    - identity-providers
    - github
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as Identity Provider for GitHub Enterprise Server

These instructions explain how to configure Auth0 to serve as an Identity Provider for [GitHub Enterprise Server](https://help.github.com/en/enterprise/2.16/admin/user-management/using-saml) (i.e. your private GitHub appliance). 

::: note
**Heads up!** This article applies to GitHub Enterprise Server (deployed as a private instance). If you are looking for instructions to set up Auth0 as the identity provider for GitHub Enterprise Cloud (github.com), check [this page](/protocols/saml/saml-apps/github-cloud) instead.
:::

## Configure the Addon: SAML2 Web App

Login to [Auth0 dashboard](${manage_url}) and create a new [Application](${manage_url}/#/applications). Give it a meaningful name like "GitHub". You can choose any application type really, but the "Regular Web App" type is the more representative. 

Navigate to the [Addons](${manage_url}/#/applications/${account.clientId}/addons) tab and enable the **SAML2 Web App** using the toggle switch.

![Application Addons](/media/articles/protocols/saml/github-cloud/client-addons.png)

The *Settings* window will be displayed. Set the following values:

- **Application <dfn data-key="callback">Callback URL</dfn>**: `{YOUR_GITHUB_SERVER_URL}/saml/consume`

- **Settings**:

```json
{
  "audience": "{YOUR_GITHUB_SERVER_URL}",
  "mappings": {
    "user_id": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "email": "emails",
    "name": "full_name"
  },
  "passthroughClaimsWithNoMapping": false,
  "mapIdentities": false,
  "signatureAlgorithm": "rsa-sha256",
  "digestAlgorithm": "sha256",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ]
}
```

**Note**: Make sure to replace `{YOUR_GITHUB_SERVER_URL}` with the URL assigned to your GitHub Server (i.e. `https://github.example.com`).

The above mapping will send the `user_id` as the Name Identifier to GitHub. This is a good option if you enable more than one connection for the GitHub application, as it will ensure uniqueness (every user will have a different ID). If you are using a single connection, you might prefer to use the `nickname` or another unique identifier as a friendlier Name Identifier (but **make sure that the property you choose is indeed unique**). 

As an example, if you want `nickname` as the Name Identifier, the `mappings` section above will look like this:

```json
{
  [...]
  "mappings": {
    "nickname": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "email": "emails",
    "name": "full_name"
  },
  [...]
}
```

## Configure SAML Single Sign-on on GitHub
Follow the instruction from [Using SAML on Enterprise Server- GitHub Help](https://help.github.com/en/enterprise/admin/user-management/using-saml#configuring-saml-settings) to complete the configuration on GitHub Enterprise Cloud. You will need the following information:

* **Sign On URL**: `https://${account.namespace}/samlp/{CLIENT_ID}`
  `{CLIENT_ID}` will be the `client_id` for the GitHub application you just created in Auth0.
* **Issuer**: `urn:auth0:${account.tenant}`
* **Verification Certificate**: You will need to download it from `https://${account.namespace}/pem` and upload it in this field.
* **User Attributes**: you should leave the defaults here, as the mapping that we configured in the <dfn data-key="security-assertion-markup-language">SAML</dfn> Web App addon uses the default attribute names proposed by GitHub.
* **Signature method**: `RSA256-SHA256`
* **Digest method**: `SHA256`

The **Sign On URL**, **Issuer** and **Certificate** information can also be found in the **Usage** tab on the SAML Web App addon settings dialog:

![Usage tab](/media/articles/protocols/saml/github-cloud/usage.png)
