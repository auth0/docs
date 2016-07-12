---
connection: Shopify
image: /media/connections/shopify.png
seo_alias: shopify
description: How to connect your Auth0 app to Shopify.
---

# Connect your app to Shopify

To connect your Auth0 app to Shopify, you will need to create an app on the Shopify Partner portal to generate  *API Key* and *Shared Secret*, copy these credentials into your Auth0 settings, and enable the connection.

::: panel-warning User profile not available
Due to Shopify's OAuth implementation, successful user authentication returns the **Shop** profile, not the user profile.
:::

### 1. Create an app on the Shopify Partner portal

Login to the [Shopify Partner](https://app.shopify.com/services/partners) portal. Select **Apps** in the left nav and click **Create a new app**:

![](/media/articles/connections/social/shopify/shopify-devportal-1.png)


### 2. Create your app

Complete the form. 

In the fields below, enter the following:

* **App URL**: `https://YOUR_TENANT.auth0.com`
* **Redirection URL**: `https://YOUR_TENANT.auth0.com/login/callback`

![](/media/articles/connections/social/shopify/shopify-devportal-2.png)

Click **Create app**.

### 3. Get your API Key and Shared Secret

On the page that follows, your `API Key` and `Shared Secret` will be displayed. Save these for use in the next step.

![](/media/articles/connections/social/shopify/shopify-devportal-3.png)

### 4. Enter your API Key and Shared Secret into Auth0

In a separate window, go to the [Connections > Social](${uiURL}/#/connections/social) section of the Auth0 Dashboard.

Select Shopify:

![](/media/articles/connections/social/shopify/shopify-devportal-4.png)

Copy the `API Key` and `Shared Secret` from the Apps page on Shopify into the fields on this page on Auth0.

Enter your **Shop name**. 

Select the **Permissions** you want to enable.

Click **SAVE**.

![](/media/articles/connections/social/shopify/shopify-devportal-5.png)

### 5. Enable the Connection

Go to the **Apps** tab of the Shopify connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/shopify/shopify-devportal-6.png)

### 6. Test the connection

Close the Settings window to return to the **Connections > Social** section of the Auth0 dashboard.

A TRY icon will now be displayed next to the Shopify logo:

![](/media/articles/connections/social/shopify/shopify-devportal-7.png)

Click TRY.

Login to your Shopify store.

Click **Install app** to allow your app access.

![](/media/articles/connections/social/shopify/shopify-devportal-8.png)

If you have configured everything correctly, you will see the It works!!! page:

![](/media/articles/connections/social/shopify/shopify-devportal-9.png)

::: panel-info Shopify Multipass
You can use Shopify's [Multipass](https://help.shopify.com/api/reference/multipass) feature to automatically authenticate users who have already been verified by Auth0 on Shopify.
:::
 


