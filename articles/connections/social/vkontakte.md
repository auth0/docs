---
connection: vKontakte
image: /media/connections/vkontakte.png
seo_alias: vkontakte
description: How to connect your Auth0 app to vKontakte.
---

# Connect your app to vKontakte

To connect your Auth0 app to vKontakte, you will need to generate an `Application ID` and `Secure Key` in a vKontakte app, copy these keys into your Auth0 settings, and enable the connection.


## 1. Create a new vKontakte application

Log in into [vKontakte Developers](https://new.vk.com/dev). 

Go to **My Apps** and click **Create an Application**:

![](/media/articles/connections/social/vkontakte/vkontakte-login.png)

Select **Website** as the **Category**. 

Provide a name for your app.

In the **Site address** field, enter the following:

`https://${account.tenant}.auth0.com`

In the **Base domain** field, enter the following:

`${account.tenant}.auth0.com`

![](/media/articles/connections/social/vkontakte/vkontakte-create-app.png)

Click **Connect Site** to create the app.

You will be required to confirm your request with a code send via SMS:

![](/media/articles/connections/social/vkontakte/vkontakte-validate-create-app.png)


## 2. Enter your *redirect URL*

Once the application is created, select **Settings** in the left nav.

In the **Authorized redirect URI** field, enter the following:

`https://${account.tenant}.auth0.com/login/callback`

Click **Save**.

![](/media/articles/connections/social/vkontakte/vkontakte-redirect.png)

## 3. Get your *Application ID* and *Secure Key*

From the top of the same page, copy the `Application ID` and `Secure Key` for use in the next step.

![](/media/articles/connections/social/vkontakte/vkontakte-keys.png)

## 4. Enter your *Application ID* and *Secure Key* into Auth0

In a separate window, go to the [Connections > Social](${uiURL}/#/connections/social) section of the Auth0 dashboard.

Select **vKontakte**:

![](/media/articles/connections/social/vkontakte/vkontakte-logo.png)

Copy the `Application ID` and `Secure Key` from the **Settings** page of your app on vKontakte into the fields on this page on Auth0.

Select the Permissions you want to enable.

Click **SAVE**.

![](/media/articles/connections/social/vkontakte/vkontakte-add-connection.png)

## 5. Enable the Connection

Go to the **Apps** tab of the vKontakte connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection and click **Save**:

![](/media/articles/connections/social/vkontakte/vkontakte-add-apps.png)

## 6. Test the connection

Close the **Settings** window to return to the **Connections > Social** section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the vKontakte logo:

![](/media/articles/connections/social/vkontakte/vkontakte-try.png)

Click **TRY**.

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/vkontakte/vkontakte-works.png)
