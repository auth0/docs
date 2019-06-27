---
title: Configure Auth0 as Identity Provider for GitHub Enterprise Cloud
description: This page explains how to configure Auth0 to be the SAML Identity Provider for a GitHub Enterprise Cloud (github.com) organization.
topics:
    - saml
    - identity-providers
    - github
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Auth0 as Identity Provider for GitHub Enterprise Cloud

These instructions explain how to configure Auth0 to serve as an Identity Provider for [GitHub Enterprise Cloud](https://help.github.com/en/articles/about-authentication-with-saml-single-sign-on) (i.e., github.com). Note that GitHub requires an Enterprise-level subscription to enable using an external <dfn data-key="security-assertion-markup-language">SAML</dfn> identity provider.

When setting up SAML <dfn data-key="single-sign-on">Single Sign-on (SSO)</dfn> in your organization, you can test your implementation without affecting your organization members by leaving Require SAML SSO authentication for all members of the organization name organization unchecked. See [GitHub documentation on authentication with SAML](https://help.github.com/en/articles/about-authentication-with-saml-single-sign-on) for more information.

::: note
**Heads up!** This article applies to GitHub Enterprise Cloud (github.com). If you are looking for instructions to set up Auth0 as the identity provider for GitHub Enterprise Server (private instance), check [this page](/protocols/saml/saml-apps/github-server) instead.
:::

## Configure the Addon: SAML2 Web App

Login to [Auth0 dashboard](${manage_url}) and create a new [Application](${manage_url}/#/applications). Give it a meaningful name like "GitHub". You can choose any application type really, but the "Regular Web App" type is the more representative. 

Navigate to the [Addons](${manage_url}/#/applications/${account.clientId}/addons) tab and enable the **SAML2 Web App** using the toggle switch.

![Application Addons](/media/articles/protocols/saml/github-cloud/client-addons.png)

The *Settings* window will be displayed. Set the following values:

- **Application <dfn data-key="callback">Callback URL</dfn>**: `https://github.com/orgs/{YOUR_GITHUB_ORG_NAME}/saml/consume`

- **Settings**:

```json
{
  "audience": "https://github.com/orgs/{YOUR_GITHUB_ORG_NAME}",
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

**Note**: Make sure to replace `{YOUR_GITHUB_ORG_NAME}` with the GitHub organization name that corresponds to your subscription.

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

## Configure SAML Single Sign-On on GitHub
Follow the instruction from GitHub's [Enabling and testing SAML Single Sign-on (SSO) for your organization](https://help.github.com/en/articles/enabling-and-testing-saml-single-sign-on-for-your-organization) to complete the configuration on GitHub Enterprise Cloud. You will need the following information:

* **Sign On URL** (for step 6): `https://${account.namespace}/samlp/{CLIENT_ID}`
  `{CLIENT_ID}` will be the `client_id` for the GitHub application you just created in Auth0.
* **Issuer** (step 7): `urn:auth0:${account.tenant}`
* **Public Certificate** (step 8): Download it from `https://${account.namespace}/pem`. Open the downloaded file with a text editor, copy the contents and paste them in the text area on GitHub.
* **Signature method** (step 9): `RSA256-SHA256`
* **Digest method** (step 9): `SHA256`

The **Sign On URL**, **Issuer** and **Certificate** information can also be found in the **Usage** tab on the SAML Web App addon settings dialog:

![Usage tab](/media/articles/protocols/saml/github-cloud/usage.png)

As recommended in GitHub's documentation, before enabling SAML SSO for your organization, click **Test SAML configuration** to ensure that the information you've entered is correct.