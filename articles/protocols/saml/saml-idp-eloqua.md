---
description: How to configure Auth0 to serve as an Identity Provider for Oracle Eloqua.
---

# Configure Auth0 as Identity Provider for Oracle Eloqua

These instructions explain how to configure Auth0 to serve as an Identity Provider for [Oracle Eloqua Marketing Cloud](http://www.oracle.com/partners/en/products/applications/eloqua-marketing-cloud-service/get-started/index.html).

## Configure the Addon: SAML2 Web App

Login to [Auth0 dashboard](${manage_url}) and create a new [Client](${manage_url}/#/clients).

Navigate to the [Addons](${manage_url}/#/clients/${account.clientId}/addons) tab and enable the **SAML2 Web App** using the toggle switch.

![Client Addons](/media/articles/protocols/saml/eloqua/client-addons.png)

The *Settings* window will be displayed. Set the following values:

- **Application Callback URL**: `https://login.eloqua.com/auth/saml2/acs`

- **Settings**:

  ```text
  {
    "audience": "http://foo",
    "recipient": "https://login.eloqua.com/auth/saml2/acs",
    "mappings": {
      "user_id": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "email": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",  
      "name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
      "given_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname",  
      "family_name": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname",
      "upn": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn",
      "groups": "http://schemas.xmlsoap.org/claims/Group"
    },
    "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
    "nameIdentifierProbes": [
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ],
    "destination": "https://login.eloqua.com/auth/saml2/acs"
  }

  ```

Note that the `audience` is set to `http://foo`. This will be changed when the Identity Provider settings are completed on the Eloqua side.

Click **Save**.

Go to the *Usage* tab and download the Identity Provider metadata. This IDP metadata will be used while setting up the configuration in Eloqua.

![Download Identity Provider Metadata](/media/articles/protocols/saml/eloqua/download-idp-metadata.png)

## Configure Oracle Eloqua

Login as Admin on Eloqua and click on *Settings > Users > Single Sign-On > Identity Provider Settings*.

Click **Upload Identity Provider from Metadata**. You should upload here the Identity Provider metadata you downloaded in the previous from the Auth0 dashboard.

![Upload Identity Provider Metadata](/media/articles/protocols/saml/eloqua/upload-idp-metadata-1.png)

Browse to find the downloaded metadata file.

![Upload Identity Provider Metadata](/media/articles/protocols/saml/eloqua/upload-idp-metadata-2.png)

Edit the newly added identity provider and complete the following steps:

- Set the **User Identity Mapping** to `Assertion contains the Email Address from the User object` and click **Save**.

- From the *Identity Provider Details* copy the **Service Provider Entity URL**.

- Within ELOQUA IDP settings, if this is the default IDP, mark this IDP as default.


## Update the Audience Restriction

We will now use the **Service Provider Entity URL** copied from within the IDP settings in Eloqua to set the `audience` restriction within Auth0.

Navigate to *Dashboard > Clients > select your client > Addons > SAML2 Web App > Settings* and set the `audience` to the value you copied.

## Test

Login to Eloqua with Auth0 should be enabled now. You can sign in to Eloqua with both IDP initiated login and SP initiated login.

### SP Initiated Login

Navigate to [https://login.eloqua.com/auth/saml2](https://login.eloqua.com/auth/saml2) , enter your company name and start the SAML login process with Auth0.

![Eloqua SP Initiated Login](/media/articles/protocols/saml/eloqua/sp-login.png)


### IdP Initiated Login

For IDP Initiated login use the **Identity Provider Login URL** defined under the *Dashboard > Clients > select your client > Addons > SAML 2 Web App > Usage*.

![Eloqua IdP Initiated Login](/media/articles/protocols/saml/eloqua/idp-login.png)
