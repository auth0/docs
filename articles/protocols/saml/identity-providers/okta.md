---
title: Okta
description: How to configure Okta for use as an identity provider.
toc: true
topics:
    - saml
    - identity-providers
    - okta
contentType:
  - how-to
useCase:
  - add-idp
---

# Configure Okta as an Identity Provider

In this article, we will cover how you can configure Okta for use with Auth0 as a <dfn data-key="security-assertion-markup-language">SAML</dfn> Identity Provider.

## Configure Okta

1. Sign in to the [Okta Developer Console](https://login.okta.com). If you don't already have an Okta account, you will need to create one. 
2. Use the [App Integration Wizard](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard.htm) to add an application for use with Auth0. 
3. Use Okta's [SAML App Wizard](https://help.okta.com/en/prod/Content/Topics/Apps/Apps_App_Integration_Wizard.htm#SAMLWizard) to create your <dfn data-key="security-assertion-markup-language">SAML</dfn> integration. When done, you'll be directed to the **Sign On** page for your newly-created app. Click on **View Setup Instructions** to complete the process.
4. Take note of the **Identity Provider Single Sign-On URL**, and download a copy of the X.509 certificate.

## Configure Auth0

At this point, you will configure the integration from the Auth0 side.

Log in to your Auth0 account, and go to the [Management Dashboard](${manage_url}). Go to **Connections** -> **Enterprise** -> **SAMLP** and click the **plus** icon to be redirected to the page that allows you to create a new Connection.

You will be prompted to provide the appropriate configuration settings for this Connection.

The only mandatory fields are as follows:

* **Connection Name**: a friendly name for your new Connection;
* **Sign In URL**: the **Identity Provider Single Sign-On URL** you made note of when you set up your Okta app;
* **X509 Signing Certificate**: the certificate you downloaded from Okta. You will need to upload the certificate directly to Auth0.

Click **Save** to persist your changes and proceed.

In the next window, you'll be provided two options. If you are a domain administrator, you can click **Continue** for additional instructions on SAML Identity Provider Configuration. If you are not, you can give your domain administrator the provided URL so that they can finish the configuration.

## Enable Access to the Connection

Now that you've created and configured your Connection, you'll need to enable access to the Connection for your Application(s).

Using the [Management Dashboard](${manage_url}), go to the [Applications](${manage_url}/#/applications) to see the list of Applications associated with your Auth0 account.

To enable your Connection for a given Application, click **Connections** on its associated row.

Scroll down to the *Enterprise* section, and click the slider to enable your Okta Connection for the associated Application.

## Test your Connection

You can test your Okta-Auth0 integration using the [Management Dashboard](${manage_url}) if you are an Okta user.

Go to **Connections** -> **Enterprise** -> **SAML**. On the row associated with Okta, click the **play** icon to *Try* your Connection.

If your test was successful, you'll see the **It works!** screen. If not, you'll see an error message containing details on what the issue might be.

::: note
The **Try** button works for users logged in to Auth0 dashboard. You can't send this to an anonymous user, such as a customer. If you don't have a Okta user, you'll need to configure [IdP Initiated SignOn](#idp-initiated-signon) so the someone else can try on their portal.
:::

## IdP Initiated SignOn

Okta provides an Application Portal/Launcher for their users. If you would like to support the Okta Application Portal/Launcher, change the **Single Sign-on URL** in the Okta dashboard to `https://${account.namespace}/login/callback?connection=YOUR_CONNECTION_NAME`

Be sure to change `YOUR_CONNECTION_NAME` to the name of your Auth0 Connection.

See [IdP-Initiated SSO](/protocols/saml/idp-initiated-sso) for information on configuring your Auth0 Connection to route the incoming SAML Response.

## Troubleshooting

The user might see the Okta dashboard after authenticating using a Service Provider-initiated login flow. If you integrated you application with Auth0 using the <dfn data-key="openid">OpenID Connect (OIDC)</dfn> protocol, Auth0 takes the value of the `state` parameter and passes it to Okta using the SAML "RelayState" parameter. As such, make sure that you set `state` to a value that Okta can use.

<%= include('../../../connections/_quickstart-links.md') %>
