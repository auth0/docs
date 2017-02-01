---
connection: Facebook
index: 2
image: /media/connections/facebook.png
seo_alias: facebook
description: This page shows you how to connect your Auth0 app to Facebook. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
---

# Connect your app to Facebook

To connect your Auth0 app to Facebook, you will need an **App ID** and **App Secret** from your Facebook app, then copy these keys into your Auth0 settings and enable the connection.

This doc refers to the client steps to connect your client. If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

## 1. Login to Facebook Developers

Go to [Facebook Developers](https://developers.facebook.com) and login with your account. Select **Add a New App** from the dropdown in the upper right:

![Add a New App](/media/articles/connections/social/facebook/facebook-1.png)

## 2. Name your application

Provide a **Display Name** and **Contact Email**.

Select a **Category** and click **Create App ID**:

![Create a New App](/media/articles/connections/social/facebook/facebook-2.png)

Complete the **Security Check**.

## 3. Setup Facebook Login

On the **Product Setup** page that follows, click **Get Started** next to **Facebook Login**:

![Click Get Started](/media/articles/connections/social/facebook/facebook-3.png)

This will bring up **Client OAuth Settings** for **Facebook Login**.

![Client OAuth Settings](/media/articles/connections/social/facebook/oauth-settings.png)

Enter the following URL in the **Valid OAuth redirect URIs** field:

`https://${account.namespace}/login/callback`

![Enter OAuth redirect URI](/media/articles/connections/social/facebook/facebook-3b.png)

Click **Save Changes**.

## 4. Make your App Public

Next, click on **App Review** on the left navigation bar. Near the top of the page under **Make (Your App Name) App public?** click to move the slider to **Yes**.

![Make Public](/media/articles/connections/social/facebook/facebook-public.png)

## 5. Get your **App ID** and **App Secret**

Click **Settings** in the left nav. On this page you can retrieve your **App ID** and **App Secret**.

![Settings page](/media/articles/connections/social/facebook/facebook-4.png)

Click **Show** to reveal the **App Secret** (you may be required to re-enter your Facebook password).

In a seperate tab or window, go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard. 

Click on the box with the **Facebook** logo.

This will bring up the Facebook connection settings.

Copy the **App ID** and **App Secret** from the **Settings** of your app on Facebook:

![Auth0 Facebook Settings](/media/articles/connections/social/facebook/auth0-fb-settings.png)

Select all the **Attributes** and **Permissions** you want to enable. 

**Note:** Your users will be able to choose which Attributes they wish to share, and by default this selection is only made when they first authorize the application. [Click here to learn more about handling declined permissions.](/connections/social/reprompt-permissions)

Then click the **Clients** tab and select the applications you wish to enable this connection for.

![Enable clients](/media/articles/connections/social/facebook/enable-clients.png)

When finished click **Save**.

## 6. Test the Connection

In the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard a **TRY** icon will now be displayed next to the Facebook logo:

![Click Try](/media/articles/connections/social/facebook/try-connection.png)

Click **TRY**.

The Facebook allow access dialog will appear.

![Continue](/media/articles/connections/social/facebook/allow-access.png)

Click continue and if configured correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/facebook/facebook-8b.png)

## Additional Info

### Create a Test App

Facebook now allows you to test your application by creating a copy of it to use for testing purposes. If you create a test application it will have it's own separate **App ID** and **App Secret**. Auth0 only allows one Facebook connection to be configured per account. One option for testing is that create the connection to the test connection and then change the values when you are ready to connect to the production application. 

Another option is to create another Auth0 account used for testing purposes. A new account can be created in the [Dashboard](${manage_url}) by clicking on your account name in the top right corner and selecting **New Account** from the dropdown. See the [Setting Up Multiple Environments](/dev-lifecycle/setting-up-env) for more information on multiple environments.

### Deauthorize Callback URL

On the **Facebook Login** Client OAuth Settings page, you can also set a Deauthorize Callback URL to be called when a user deauthorizes your app.

[Facebook Docs for Facebook Login](https://developers.facebook.com/docs/facebook-login)

<%= include('../_quickstart-links.md') %>
