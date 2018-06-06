---
description: How to SSO with Heroku.
tags:
    - saml
    - identity-providers
    - heroku
---

# Configure SSO with Heroku

::: note
You must have administrative rights to your organization account on Heroku to configure SSO. Organization accounts are included with Heroku Enterprise plans.
:::

You can configure SSO so that your users can log into Heroku using any of Auth0's supported [identity providers](/identityproviders).

## 1. Obtain Your Heroku Identifiers

On the Settings page for your organization in Heroku, scroll to the **Single Sign On (SSO) section.

![](/media/articles/saml/saml-apps/heroku/heroku-dashboard.png)

You will need the following two parameters from this section to integrate with Auth0:

* __Heroku Entity ID__
* __ACS URL__

## 2. Register Heroku with Auth0

Log in to your [Auth0 Dashboard](${manage_url}/#/applications) and select the [application](/applications) for which you want to enable SSO with Heroku. Go to the __Addons__ section of your Application, and enable __SAML2 Web App__:

![](/media/articles/saml/saml-apps/heroku/auth0-dashboard.png)

Enter the __ACS URL__ from the previous step into the __Application Callback URL__ field and update the settings as follows:

```json
{
 "audience":"THE-HEROKU-ENTITY-ID",
 "mappings": {
   "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
 },
 "createUpnClaim": false,
 "passthroughClaimsWithNoMapping": false,
 "mapUnknownClaimsAsIs": false,
 "mapIdentities": false,
 "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
 "nameIdentifierProbes": [
   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
 ]
}
```

![](/media/articles/saml/saml-apps/heroku/auth0-dashboard-saml.png)

::: note
The `audience` parameter is the __Heroku Entity ID__. It will be formatted like this: `https://sso.heroku.com/saml/YOUR-HEROKU-ORG`
:::

Click **Save**. 

![](/media/articles/saml/saml-apps/heroku/auth0-dashboard-saml-usage.png)

## 3. Provide Auth0 Metadata to Heroku

Open up the __Usage__ section of the SAML2 Web App Configuration pop-up and download the __Identity Provider Metadata__.

Return to Heroku. Click on __Upload Metadata__ and select the file containing the **Identity Provider Metadata** you downloaded in the previous step.

![](/media/articles/saml/saml-apps/heroku/heroku-dashboard.png)

Once you've uploaded your metadata, your SSO integration is fully set up.