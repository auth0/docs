---
title: OneLogin
layout: doc.nosidebar
---
# Configuring OneLogin as an Identity Provider

# On OneLogin dashboard...

Go to OneLogin dashboard and click on **Find Apps**. Search for "saml"

![](//cdn.auth0.com/docs/img/onelogin-1.png)

Add a **New SAML App**

![](//cdn.auth0.com/docs/img/onelogin-2.png)

Take note of the **SAML Endpoints** (HTTP and SLO)

![](//cdn.auth0.com/docs/img/onelogin-3.png)

Download the X.509 certificate (onelogin.pem)

![](//cdn.auth0.com/docs/img/onelogin-4.png)

# On Auth0 dashboard...

Go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** and click **+NEW**

![](//cdn.auth0.com/docs/img/onelogin-5.png)

Give it a name identifier (e.g. onelogin-customer) and copy the **OneLogin HTTP SAML Endpoint** on the **Sign In URL** input

![](//cdn.auth0.com/docs/img/onelogin-6.png)

Upload the onelogin.pem certificate and copy the **OneLogin HTTP SLO Endpoint** on the **Sign Out URL**.

![](//cdn.auth0.com/docs/img/onelogin-7.png)

Click on **Save**. You will get a dialog with a **Continue** button and a link, both will take you to the following instructions:

![](//cdn.auth0.com/docs/img/onelogin-8.png)

The information here is what the OneLogin admin needs to finish the configuration of the SAML application.

* **SAML Consumer URL**: https://@@account.namespace@@/login/callback
* **SAML Audience**: urn:auth0:@@account.tenant@@:@@connectionName@@

![](//cdn.auth0.com/docs/img/onelogin-9.png)

# Testing

If you have a user on OneLogin you can now click on **Try** on your Auth0 dashboard and you should be redirected to OneLogin:

![](//cdn.auth0.com/docs/img/onelogin-10.png)

> **Note**: the **Try** button only works for users logged in to Auth0 dashboard. You can't send this to an anonymous user (e.g. a customer). If you don't have a OneLogin user, read the following section to configure Idp Initiated SignOn so the customer can try on their portal.

## IdP Initiated SignOn

OneLogin has an Application Portal / Launcher for their users. If you want to support that, you will have to change the SAML Consume URL in OneLogin dashboard to be:

* SAML Consumer URL: https://@@account.namespace@@/login/callback?connection=onelogin-customer

Where `onelogin-customer` is the connection name you assigned in Auth0 dashboard

Also, you have to pick the application to redirect after the SAML assertion is consumed. You can find this in the **Connection -> IdP Initated SSO tab**.

![](//cdn.auth0.com/docs/img/onelogin-11.png)
