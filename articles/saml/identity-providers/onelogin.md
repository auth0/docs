---
title: OneLogin
---
# Configuring OneLogin as an Identity Provider

## Configure app on OneLogin dashboard

Go to [OneLogin](https://www.onelogin.com/) dashboard and click on **Apps** > **Add Apps**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-add-app.png)

Search for *saml* and select **SAML Test Connector (IdP w/attr)**

![](/media/articles/saml/identity-providers/onelogin/onelogin-search-app.png)

Change the **Display Name** of your app if you wish and click **SAVE**.

![](/media/articles/saml/identity-providers/onelogin/onelogin-save-app.png)

Go to the **SSO** tab and copy the values of **SAML 2.0 Endpoint (HTTP)** and **SLO Endpoint (HTTP)**. Click on the *View Details* link at the **X.509 Certificate** field.

![](/media/articles/saml/identity-providers/onelogin/onelogin-copy-values.png)

Download the X.509 certificate (onelogin.pem)

![](/media/articles/saml/identity-providers/onelogin/onelogin-download-cert.png)

## Configure connection on Auth0 dashboard

Go to [Auth0 dashboard > Connections > Enterprise > SAMLP Identity Provider](${uiURL}/#/connections/enterprise) and click **Create New** (plus icon)

![](/media/articles/saml/identity-providers/onelogin/auth0-new-samlp.png)

Set a **Connection Name** (e.g. onelogin-customer) and copy the **SAML 2.0 Endpoint (HTTP)** on the **Sign In URL** input, and the **SLO Endpoint (HTTP)** on the **Sign Out URL** input. Upload the `onelogin.pem` certificate.

![](/media/articles/saml/identity-providers/onelogin/auth0-set-values.png)

Click on **SAVE**. You will get a dialog with a **Continue** button and a link, both will take you to the following instructions:

![](/media/articles/saml/identity-providers/onelogin/auth0-instructions.png)

The information here is what the OneLogin admin needs to finish the configuration of the SAML application.

* **SAML Consumer URL**: `https://${account.namespace}/login/callback`
* **SAML Audience**: `urn:auth0:${account.tenant}:${connectionName}`

Copy the values of the **post-back URL** and the **Entity ID** and head back to your [OneLogin](https://www.onelogin.com/) app. At the **Configuration** tab copy the **post-back URL** on the **ACS (Consumer) URL** input, the **Entity ID** on the **Audience** input, and set a valid regular expression on the **ACS (Consumer) URL Validator** input (e.g.  `[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)`).

![](/media/articles/saml/identity-providers/onelogin/onelogin-set-values.png)

# Testing

If you do not already have a user on OneLogin go at the **Users** tab and add one. Also, your new Auth0 SAMLP connection should be associated with an App, otherwise you will get an `invalid_request: the connection was disabled` error.

We are now set to test the connection! On your **SAMLP Identity Provider** connection click the **Try** button.

![](/media/articles/saml/identity-providers/onelogin/auth0-try-conn.png)

You are redirected to a page informing you that the connection works. Well done!

![](/media/articles/saml/identity-providers/onelogin/auth0-try-result.png)

> **Note**: the **Try** button only works for users logged in to Auth0 dashboard. You can't send this to an anonymous user (e.g. a customer). If you don't have a OneLogin user, read the following section to configure Idp Initiated SignOn so the customer can try on their portal.

## IdP Initiated SignOn

OneLogin has an Application Portal / Launcher for their users. If you want to support that, you will have to change the **SAML Consumer URL** in OneLogin dashboard to be:

* SAML Consumer URL: `https://${account.namespace}/login/callback?connection=onelogin-customer`

Where `onelogin-customer` is the connection name you assigned in Auth0 dashboard.

Also, you have to pick the application to redirect after the SAML assertion is consumed. You can find this in the **Connection > IdP Initiated SSO tab**.

![](/media/articles/saml/identity-providers/onelogin/idp-initiated-sso.png)
