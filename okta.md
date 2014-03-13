---
title: Okta
layout: doc.nosidebar
---

# Configuring Okta as an Identity Provider

# On Okta dashboard...

Go to Okta dashboard and click on **Applications**. Click on **Create New App**.

![](img/okta-1.png)

Select **SAML 2.0**.

![](img/okta-2.png)

Enter the name of your app and optionally a Logo and click **Next**.

![](img/okta-3.png)

Enter the following values:

* **Single sign on URL**: https://@@account.namespace@@/login/callback
* **Audience URI (SP Entity ID)**: urn:auth0:@@account.tenant@@
* Add an Attribute Statement to map "email" to ${user.email}

![](img/okta-4.png)

Select this is an internal application and then Finish.

Click on **View Setup Instructions**

![](img/okta-5.png)

Take note of the following:

* **Identity Provider Single Sign-On URL**
* **Download certificate**

![](img/okta-6.png)

# On Auth0 dashboard...

Go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** and click **+NEW**

* Give it a name identifier (e.g. okta-customer) and copy the **Identity Provider Single Sign-On URL** that you've got from Okta on the **Sign In URL** input

* Upload the okta.cer certificate

![](img/okta-7.png)

Click on **Save** and close the next dialog. You will get asked which application you want to connect this to.

# Testing

If you have a user on Okta you can now click on **Try** on your Auth0 dashboard and you should be redirected to OneLogin:

![](img/okta-8.png)

> **Note**: the **Try** button only works for users logged in to Auth0 dashboard. You can't send this to an anonymous user (e.g. a customer). If you don't have a OneLogin user, read the following section to configure Idp Initiated SignOn so the customer can try on their portal.

![](img/okta-9.png)

## Idp Initiated SignOn

Okta has an Application Portal / Launcher for their users. If you want to support that, you will have to change the Single sign on URL in OneLogin dashboard to be:

* **Single sign on URL**: https://@@account.namespace@@/login/callback?connection=okta-customer

Where `okta-customer` is the connection name you assigned in Auth0 dashboard.

Also, you have to pick the application to redirect after the SAML assertion is consumed. You can find this in the connection -> Idp Initated SSO tab


