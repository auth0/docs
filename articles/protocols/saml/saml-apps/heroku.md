---
title: Configuring SSO with Heroku
description: How to SSO with Heroku.
---

# Configuring SSO with Heroku

Follow these simple steps to configure SSO for Heroku's dashboard. Once enabled you will be able to login into Heroku using any of the [Auth0 supported identity providers](identityproviders).

## 1. Login to Heroku

Go to your organization settings page in Heroku, and scroll to the SSO settings:

![](/media/articles/saml/saml-apps/heroku/heroku-dashboard.png)

Keep this page open. The two parameters you will need in the next step are:

* __Heroku Entity ID__
* __ACS URL__

## 2. Register Heroku in Auth0

Log in to your dashboard and [create a new application](${manage_url}/#/applications). Pick a name (e.g. Heroku), select the __Addons__ section of the new app, and enable __SAML2__:

![](/media/articles/saml/saml-apps/heroku/auth0-dashboard.png)

Enter the __ACS URL__ from the previous step into the __Application Callback URL__. Then enter the following settings:

```
{
 "audience":  "{THE HEROKU ENTITY ID}",
 "mappings": {
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

![](/media/articles/saml/saml-apps/heroku/auth0-dashboard-saml.png)

> Notice the `audience` parameter is the __Heroku Entity ID__ value from step 1. It will be of the form: `https://sso.heroku.com/saml/{YOUR HEROKU ORG}`

Scroll down and click on "Save". Now select the __Usage__ section in the __SAML__ configuration and download the __Identity Provider Metadata__:

![](/media/articles/saml/saml-apps/heroku/auth0-dashboard-saml-usage.png)

## 3. Complete configuration in Heroku

Back on Heroku, click on __Upload Metadata__ and select the file you downloaded in the previous step:

![](/media/articles/saml/saml-apps/heroku/heroku-dashboard-metadata.png)

You are done, congratulations!
