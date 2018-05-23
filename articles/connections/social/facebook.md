---
title: Connect your app to Facebook
connection: Facebook
index: 2
image: /media/connections/facebook.png
seo_alias: facebook
description: This article shows you how to connect your app to Facebook
toc: true
tags:
  - connections
  - social
  - facebook
---
# Connect your app to Facebook

This article describes how to add login with Facebook to your app. It also discusses how you can get an Access Token in order to access the Facebook API.

First you need to connect your Auth0 application to Facebook. This is summarized in the following steps:

- Setup a Facebook app
- Get your Facebook **App ID** and **App Secret**
- Copy these keys into your Auth0 settings
- Enable the Facebook social connection in Auth0

## 1. Login to Facebook Developers

Go to [Facebook Developers](https://developers.facebook.com) and login with your account. Select **Add a New App** from the dropdown in the upper right:

![Add a New App](/media/articles/connections/social/facebook/facebook-1.png)

## 2. Name your application

Provide a **Display Name** and **Contact Email**.

![Create a New App](/media/articles/connections/social/facebook/facebook-2.png)

Next you will need to complete the **Security Check**.

## 3. Setup Facebook Login

On the **Product Setup** page that follows, click **Set Up** under **Facebook Login**:

![Click Get Started](/media/articles/connections/social/facebook/facebook-3.png)

Next choose the type of application, for this tutorial we have selected **Web**.

The **Quickstart** for **Facebook Login** will appear. Under the **Facebook Login** menu on the left, click on **Settings** to open the **Application OAuth Settings** page:

![Application OAuth Settings](/media/articles/connections/social/facebook/oauth-settings.png)

Enter the following URL in the **Valid OAuth redirect URIs** field:

`https://${account.namespace}/login/callback`

::: panel Find your Auth0 domain name
If your Auth0 domain name is not shown above, login to [the dashboard](${manage_url}) to find your **Tenant Name** in the top right corner. Your Auth0 domain is this name (for example `exampleco-enterprises`) plus `.auth0.com`. So for this example the **Valid OAuth redirect URI** would be: `https://exampleco-enterprises.auth0.com/login/callback`.
:::

![Enter OAuth redirect URI](/media/articles/connections/social/facebook/facebook-3b.png)

Click **Save Changes**.

## 4. Make your App Public

Next, click on **App Review** on the left navigation bar. Near the top of the page under **Make (Your App Name) App public?** click to move the slider to **Yes**.

![Make Public](/media/articles/connections/social/facebook/facebook-public.png)

## 5. Get your App ID and App Secret

Click **Settings** in the left nav. On this page you can retrieve your **App ID** and **App Secret**.

![Settings page](/media/articles/connections/social/facebook/facebook-5.png)

Click **Show** to reveal the **App Secret** (you may be required to re-enter your Facebook password).

In a separate tab or window, go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

Click on the box with the **Facebook** logo.

This will bring up the Facebook connection settings.

Copy the **App ID** and **App Secret** from the **Settings** of your app on Facebook:

![Auth0 Facebook Settings](/media/articles/connections/social/facebook/auth0-fb-settings.png)

Select all the **Attributes** and **Permissions** you want to enable.

::: note
Your users will be able to choose which Attributes they wish to share, and by default this selection is only made when they first authorize the application. [Click here to learn more about handling declined permissions.](/connections/social/reprompt-permissions)
:::

Then click the **Applications** tab and select the applications you wish to enable this connection for.

![Enable applications](/media/articles/connections/social/facebook/enable-applications.png)

When finished click **Save**.

## 6. Test the Connection

In the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard a **TRY** icon will now be displayed next to the Facebook logo:

![Click Try](/media/articles/connections/social/facebook/try-connection.png)

Click **TRY**.

The Facebook allow access dialog will appear.

![Continue](/media/articles/connections/social/facebook/allow-access.png)

Click continue and if configured correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/facebook/facebook-8b.png)

## 7. Access Facebook API

<%= include('../_call-api', {
  "idp": "Facebook"
}) %>

## Additional Info

You can find additional information at Facebook docs: [Add Facebook Login to Your App or Website](https://developers.facebook.com/docs/facebook-login).

### Create a Test App

Facebook now allows you to test your application by creating a copy of it to use for testing purposes. If you create a test application it will have it's own separate **App ID** and **App Secret**. Auth0 only allows one Facebook connection to be configured per tenant. One option for testing is that create the connection to the test connection and then change the values when you are ready to connect to the production application.

Another option is to create another Auth0 tenant used for testing purposes. A new tenant can be created in the [Dashboard](${manage_url}) by clicking on your tenant name in the top right corner and selecting **+ Create Tenant** from the dropdown. See the [Setting Up Multiple Environments](/dev-lifecycle/setting-up-env) for more information on multiple environments.

### Deauthorize Callback URL

On the **Facebook Login** Client OAuth Settings page, you can also set a Deauthorize Callback URL to be called when a user deauthorizes your app.

### Facebook Re-Authentication

To force Facebook to prompt the user to [re-authenticate](https://developers.facebook.com/docs/facebook-login/reauthentication), you can set the `prompt='login'` value in Lock's `auth.param` object.

<%= include('../_quickstart-links.md') %>
