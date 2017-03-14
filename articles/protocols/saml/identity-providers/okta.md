---
title: Okta
description: How to configure Okta for use as an identity provider.
---

# Configure Okta for Use as an Identity Provider

This article walks you through configuring Okta for use as an identity provider.

## Configure Your Okta Application

Log in to your Okta account. If you don't already have one, you will need to create one.

On the general Okta dashboard, click **Admin**. This takes you to the Okta Admin Dashboard.

![](/media/articles/saml/identity-providers/okta/okta-dashboard.png)

Using the list of shortcuts at the right-hand side of the screen, click **Add Applications**.

![](/media/articles/saml/identity-providers/okta/okta-admin-dashboard.png)

On the *Add Application* page, select **Create New App**.

![](/media/articles/saml/identity-providers/okta/create-new-app.png)

On the *Create a New Application Integration* pop-up window, select the **Platform** for your application, and choose **SAML 2.0** as the *Sign on method*. Click **Create** to proceed.

![](/media/articles/saml/identity-providers/okta/new-app-integration.png)

You will now create your SAML integration. On the *General Settings* page, provide the following:

* **App name**;
* **App logo** (optional);
* **App visibility**: select whether you want your users to see your application icon and in what settings.

![](/media/articles/saml/identity-providers/okta/saml-general-settings.png)

Click **Next** to proceed.

Next, you will see the *SAML Settings* page. Enter the following values into the appropriate fields:

* **Single sign on URL**: `https://${account.namespace}/login/callback`
* **Audience URI (SP Entity ID)**: `urn:auth0:${account.tenant}:${connectionName}`

![](/media/articles/saml/identity-providers/okta/saml-settings.png)

You will also need to add the following *Attribute Statement*:

* **Name**: email
* **Name format** (optional): Unspecified
* **Value**: <%= "${user.email}" %>"

At this point, you can click **Preview the SAML Assertion** to generate XML you can use to verify that your provided settings are correct.

Click **Next** to proceed.

Lastly, answer *Are you a customer or partner?* by selecting **I'm an Okta customer adding an internal app**. Click **Finish**.

![](/media/articles/saml/identity-providers/okta/okta-support.png)

You'll be directed to the *Sign On* page for your newly-created app. Click on **View Setup Instructions** to complete the process.

![](/media/articles/saml/identity-providers/okta/view-setup-instructions.png)

Take note of the **Identity Provider Single Sign-On URL**, and download a copy of the X.509 certificate.

![](/media/articles/saml/identity-providers/okta/config-info.png)

## Configure Your Auth0 Client

Go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** and click **+NEW**

* Give it a name identifier (e.g. okta-customer) and copy the **Identity Provider Single Sign-On URL** that you've got from Okta on the **Sign In URL** input

* Upload the okta.cer certificate

![](/media/articles/saml/identity-providers/okta/okta-7.png)

Click on **Save** and close the next dialog. You will get asked which application you want to connect this to.

## Test the Connection

If you have a user on Okta you can now click on **Try** on your Auth0 dashboard and you should be redirected to Okta:

![](/media/articles/saml/identity-providers/okta/okta-8.png)

> **Note**: the **Try** button only works for users logged in to Auth0 dashboard. You can't send this to an anonymous user (e.g. a customer). If you don't have a Okta user, read the following section to configure IdP Initiated SignOn so the customer can try on their portal.

![](/media/articles/saml/identity-providers/okta/okta-9.png)

## IdP Initiated SignOn

Okta has an Application Portal / Launcher for their users. If you want to support that, you will have to change the Single sign on URL in Okta dashboard to be:

* **Single sign on URL**: `https://${account.namespace}/login/callback?connection=okta-customer`

Where `okta-customer` is the connection name you assigned in Auth0 dashboard.

Also, you have to pick the application to redirect after the SAML assertion is consumed. You can find this in the **Connection -> IdP Initiated SSO tab**.

## Troubleshooting

If a user is returned to the Okta dashboard after authenticating via Okta in a ServiceProvider-initiated login flow, check the following:

1. If your application is integrated with Auth0 using the OpenID Connect protocol, Auth0 will take the value of the 'state' parameter and pass it on to Okta in the SAML "RelayState" parameter. Therefore, make sure you are setting the 'state' parameter to a value that Okta can use.

2. In the Okta configuration screen titled "(2) Configure SAML", click on "Show Advanced Settings" and check the option for "Request Compression".  The Okta documentation indicates this should be checked if the value of this parameter is compressed.  Some Okta users have reported it should be checked for HTTP Redirect binding and uncompressed for HTTP POST binding.

<%= include('../../../connections/_quickstart-links.md') %>
