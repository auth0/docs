---
title: Okta
description: How to configure Okta for use as an identity provider.
toc: true
tags:
    - saml
    - identity-providers
    - okta
---

# Configure Okta as an Identity Provider

This article walks you through configuring Okta for use as an identity provider.

## Configure Okta

Log in to your Okta account. If you don't already have one, you will need to create one.

On the general Okta dashboard, click **Admin**. This takes you to the Okta Admin Dashboard.

![Okta Dashboard](/media/articles/saml/identity-providers/okta/okta-dashboard.png)

Using the list of shortcuts at the right-hand side of the screen, click **Add Applications**.

![Okta Admin Dashboard](/media/articles/saml/identity-providers/okta/okta-admin-dashboard.png)

On the *Add Application* page, select **Create New App**.

![Create New Okta App](/media/articles/saml/identity-providers/okta/create-new-app.png)

On the *Create a New Application Integration* pop-up window, select the **Platform** for your application, and choose **SAML 2.0** as the *Sign on method*. Click **Create** to proceed.

![Create New app Integration](/media/articles/saml/identity-providers/okta/new-app-integration.png)

You will now create your SAML integration. On the *General Settings* page, provide the following:

* **App name**;
* **App logo** (optional);
* **App visibility**: select whether you want your users to see your application icon and in what settings.

![SAML Integration General Settings](/media/articles/saml/identity-providers/okta/saml-general-settings.png)

Click **Next** to proceed.

Next, you will see the *SAML Settings* page. Enter the following values into the appropriate fields:

* **Single sign on URL**: `https://${account.namespace}/login/callback`
* **Audience URI (SP Entity ID)**: `urn:auth0:${account.tenant}:YOUR_CONNECTION_NAME`

![SAML Integration Configure SAML](/media/articles/saml/identity-providers/okta/saml-settings.png)

You will also need to add the following *Attribute Statement*:

* **Name**: email
* **Name format** (optional): Unspecified
* **Value**: <%= "${user.email}" %>

At this point, you can click **Preview the SAML Assertion** to generate XML you can use to verify that your provided settings are correct.

Click **Next** to proceed.

Lastly, answer *Are you a customer or partner?* by selecting **I'm an Okta customer adding an internal app**. Click **Finish**.

![SAML Integration Feedback](/media/articles/saml/identity-providers/okta/okta-support.png)

You'll be directed to the *Sign On* page for your newly-created app. Click on **View Setup Instructions** to complete the process.

![Okta App Sign On](/media/articles/saml/identity-providers/okta/view-setup-instructions.png)

Take note of the **Identity Provider Single Sign-On URL**, and download a copy of the X.509 certificate.

![Configuration Information](/media/articles/saml/identity-providers/okta/config-info.png)

## Configure Auth0

At this point, you will configure the integration from the Auth0 side.

Log in to your Auth0 account, and go to the [Management Dashboard](${manage_url}). Go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider** and click the **plus** icon to launch the dialog window that allows you to create a new Connection.

![List of Auth0 Connections](/media/articles/saml/identity-providers/okta/enterprise-connections.png)

When prompted, click **Create New Connection.**

![Create New Auth0 Connection](/media/articles/saml/identity-providers/okta/create-new-connection.png)

You will be prompted to provide the appropriate configuration settings for this Connection.

![Configure New Auth0 Connection](/media/articles/saml/identity-providers/okta/configure-new-connection.png)

The only mandatory fields are as follows:

* **Connection Name**: a friendly name for your new Connection;
* **Sign In URL**: the **Identity Provider Single Sign-On URL** you made note of when you set up your Okta app;
* **X509 Signing Certificate**: the certificate you downloaded from Okta. You will need to upload the certificate directly to Auth0.

![Configuration Values](/media/articles/saml/identity-providers/okta/configured-connection.png)

Click **Save** to persist your changes and proceed.

In the next dialog window, you'll be provided two options. If you are a domain administrator, you can click **Continue** for additional instructions on SAML Identity Provider Configuration. If you are not, you can give your domain administrator the provided URL so that they can finish the configuration.

![Auth0 Admin Instructions](/media/articles/saml/identity-providers/okta/admin-settings.png)

## Enable Access to the Connection

Now that you've created and configured your Connection, you'll need to enable access to the Connection for your Application(s).

Using the [Management Dashboard](${manage_url}), go to the [Applications](${manage_url}/#/applications) to see the list of Applications associated with your Auth0 account.

![Auth0 Applications](/media/articles/saml/identity-providers/okta/clients.png)

To enable your Connection for a given Application, click **Connections** on its associated row.

Scroll down to the *Enterprise* section, and click the slider to enable your Okta Connection for the associated Application.

![Enable Connection for an Application](/media/articles/saml/identity-providers/okta/enable-connection.png)

## Test your Connection

You can test your Okta-Auth0 integration using the [Management Dashboard](${manage_url}) if you are an Okta user.

Go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider**. On the row associated with Okta, click the **play** icon to *Try* your Connection.

![Test Okta Connection](/media/articles/saml/identity-providers/okta/test.png)

If your test was successful, you'll see the **It works!** screen. If not, you'll see an error message containing details on what the issue might be.

::: note
The **Try** button works for users logged in to Auth0 dashboard. You can't send this to an anonymous user, such as a customer. If you don't have a Okta user, you'll need to configure [IdP Initiated SignOn](#idp-initiated-signon) so the someone else can try on their portal.
:::

## IdP Initiated SignOn

**Beginning with auth0.js v9.3.4, you must [enable the impersonation flags](/user-profile/user-impersonation#enable-impersonation) to use IdP-initiated login.**

<%= include('../../../_includes/_deprecate-impersonation.md') %>

Okta provides an Application Portal/Launcher for their users. If you would like to support the Okta Application Portal/Launcher, change the **Single sign on URL** in the Okta dashboard to `https://${account.namespace}/login/callback?connection=YOUR_CONNECTION_NAME`

Be sure to change `YOUR_CONNECTION_NAME` to the name of your Auth0 Connection.

Lastly, you'll need to select the Application to which the Auth0 redirects after it validates the SAML Response.

Go to **Connections** -> **Enterprise** -> **SAMLP Identity Provider**. On the row associated with Okta, click **Settings**, and switch to the **IdP-Initiated SSO** screen.

Set the **Default Application** and indicate that the **Response Protocol** is *SAML*.

![Enable IDP](/media/articles/saml/identity-providers/okta/enable-idp-connection.png)

Click **Save**.

## Troubleshooting

The user might see the Okta dashboard after authenticating using a Service Provider-initiated login flow. If you integrated you application with Auth0 using the OpenID Connect protocol, Auth0 takes the value of the `state` parameter and passes it to Okta using the SAML "RelayState" parameter. As such, make sure that you set `state` to a value that Okta can use.


<%= include('../../../connections/_quickstart-links.md') %>
