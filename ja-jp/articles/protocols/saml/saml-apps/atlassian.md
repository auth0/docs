---
description: Learn how to configure Single Sign-on (SSO) with Atlassian.
topics:
    - saml
    - identity-providers
    - atlassian
contentType:
  - how-to
useCase:
  - add-idp
---

# Atlassian SAML Configuration

You can configure Auth0 as the SAML SSO identity provider for Atlassian.

## Prerequisites

* A verified domain in your [Atlassian Organization](https://admin.atlassian.com/).
* [Atlassian Access](https://www.atlassian.com/software/access)

## Configure Auth0 identity provider application

1. Go to [Dashboard > Applcations](${manage_url}/#/applications) and click **Regular Web Applications** to create an app.
2. Add connections to your app. Make sure that the correct set of Auth0 connections are associated with your identity provider app.
3. Go to **Addons** tab and enable the **SAML2 Web App** addon. 
4. Click the **Usage** tab. Here you will find information to populate SAML metadata in Atlassian Access. Note the settings. 

## Configure Atlassian SAML connection

1. Log in to your [Atlassian Admin](https://admin.atlassian.com/) dashboard.
2. Go to **Organization > Security > SAML single sign-on**.
3. Copy the configuration settings from the Auth0 SAML2 Web App addon usage page:

| Setting | Description|
| -- | -- |
| **Identity provider Entity ID** | `urn:TENANT.auth0.com` |
| **Identity provider SSO URL** | `https://TENANT.auth0.com/samlp/APP_ID` |
| **Public x509 certificate** | Content from your .pem file: `https://TENANT.auth0.com/pem` |

4. Click **Save configuration**.
5. On the summary page, copy the **SP Assertion Consumer Service URL**.

## Configure callback URL in Auth0

1. Go back to [Dashboard > Applcations](${manage_url}/#/applications) to your applications SAML2 addon settings.
2. Update the **Application Callback URL** with the **SP Assertion Consumer Service URL** you copied in the previous section.
3. On the **Settings** tab, update the metadata mapping file. For example:

```js
{
  "mappings": {
    "user_id": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "given_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
    "family_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
  },
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
  ],
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:2.0:nameid-format:email"
}
```

![SAML2 Web App Settings](/media/articles/protocols/saml/atlassian-saml2-web-app-settings.png)

4. Click **Save**.

## Test connection

1. Go to [id.atlassian.com](https://id.atlassian.com/) and log in.
2. Login with SAML identity provider and return to Atlassian.
