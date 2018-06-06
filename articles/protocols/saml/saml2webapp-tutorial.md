---
description: How to use Auth0 in a SAML2 web application.
tags:
  - saml
  - web-apps
---

# Using Auth0 with a SAML2 Web App

You can configure a SAML2 Web Application for use with an Auth0 Application via the Management Dashboard.

## Enable the SAML2 Web App Addon for your Auth0 Application

1. Log in to Auth0, and navigate to the [Applications](${manage_url}/#/applications) page of the [Management Dashboard](${manage_url}).

  ![](/media/articles/protocols/saml/saml2-web-app/mgmt-dshbrd-clients.png)

2. Identify the Application with which you want to use a SAML2 Web Application. Click the Application's name to go to its configuration settings pages.
3. Go to the *Addons* page for the Application.

  ![](/media/articles/protocols/saml/saml2-web-app/select-addon.png)

4. In the SAML2 Web App box, click the slider to enable the Addon. You will see a *Settings* page for the Addon.

  ![](/media/articles/protocols/saml/saml2-web-app/configure-addon.png)

5. To enable the Addon from the Auth0 side, you will need to provide you **Application Callback URL**, which receives the SAML response, as well as the **Settings** for your setup. Within the *Settings* page, there is a sample object that you can use when determining which settings you want to enable:

```js
{
// "audience":  "urn:foo",
// "recipient": "http://foo",
// "mappings": {
//   "user_id":     "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
//   "email":       "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
//   "name":        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
//   "given_name":  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",
//   "family_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
//   "upn":         "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn",
//   "groups":      "http://schemas.xmlsoap.org/claims/Group"
// },
// "createUpnClaim":       true,
// "passthroughClaimsWithNoMapping": true,
// "mapUnknownClaimsAsIs": false,
// "mapIdentities":        true,
// "signatureAlgorithm":   "rsa-sha1",
// "digestAlgorithm":      "sha1",
// "destination":          "http://foo",
// "lifetimeInSeconds":    3600,
// "signResponse":         false,
// "typedAttributes":      true,
// "includeAttributeNameFormat":  true,
// "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified",
// "nameIdentifierProbes": [
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
//   "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
// ],
// "authnContextClassRef": "urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified",
// "logout": {
//   "callback": "http://foo/logout"
// }
}
```

You can click **Debug** to test if your provided parameters are valid.

Click **Save** when done.

## Provide Your Auth0 Application Details to Your SAML2 Web App

While the specific steps for providing your Auth0 Application details to your SAML2 Web App will vary, you can get the configuration information you need from the *Usage* tab after you have set up the Addon from the Auth0 side.

  ![](/media/articles/protocols/saml/saml2-web-app/usage.png)
