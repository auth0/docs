---
connection: Yammer
image: /media/connections/yammer.png
description: How to obtain the credentials required to configure your Auth0 connection to Yammer.
seo_alias: yammer
---

# Obtain an *App ID* and *App Secret* for Yammer

To configure Yammer for OAuth connections, you will need to register your Auth0 namespace on the Yammer Developer Center.

## 1. Login to Yammer Developer Center

Go to [Yammer Developer Center](https://developer.yammer.com/) and login with your account. Click on **Apps** in the top menu:

![](/media/articles/connections/social/yammer/yammer-connect-1.png)

Click on **Register an App**:

![](/media/articles/connections/social/yammer/yammer-connect-2.png)

Then click **Register New App**:

![](/media/articles/connections/social/yammer/yammer-connect-3.png)

## 2. Name your application

Name your app and complete the form.
For the **Redirect URI**, enter `https://${account.namespace}/login/callback`.
Click **Continue**.

![](/media/articles/connections/social/yammer/yammer-connect-4.png)

## 3. Get your *Client ID* and *Client Secret*

Once your app is created, your `Client ID` and `Client Secret` will be displayed:

![](/media/articles/connections/social/yammer/yammer-connect-5.png)

## 4. Copy the *Client ID* and *Client Secret* into Auth0

Go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard and select **Yammer**.
Copy the `Client ID` and `Client Secret` from the **Basic Info** page of your app on Yammer into the fields on this page on Auth0.
Click **Save**:

![](/media/articles/connections/social/yammer/yammer-connect-6.png)

## 5. Test your app

Go back to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

If you have configured your app correctly, you will see a Try icon next to the Yammer logo.
Toggle on the switch to enable Yammer authentication:

![](/media/articles/connections/social/yammer/yammer-connect-7.png)

Select the apps you would like to use Yammer authentication with.
Click **Continue**:

![](/media/articles/connections/social/yammer/yammer-connect-8.png)

Now you can test your new app by clicking **Try**:

![](/media/articles/connections/social/yammer/yammer-connect-9.png)

![](/media/articles/connections/social/yammer/yammer-connect-10.png)
