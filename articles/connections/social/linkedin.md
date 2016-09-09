---
connection: LinkedIn
index: 3
image: /media/connections/linkedin.png
seo_alias: linkedin
description: This page shows you how to connect your Auth0 app to LinkedIn. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
---

# Connect your app to LinkedIn

To connect your Auth0 app to LinkedIn, you will need to generate a *Client ID* and *Client Secret* in a LinkedIn app, copy these keys into your Auth0 settings, and enable the connection.

## 1. Log into the developer portal

Login to the [LinkedIn Developer portal](http://developer.linkedin.com/) and click **My Apps**:

![](/media/articles/connections/social/linkedin/linkedin-devportal-1.png)

## 2. Create your app

Click **Create Application**:

![](/media/articles/connections/social/linkedin/linkedin-devportal-2.png)

## 3. Complete information about your app

Complete the form.

Enter the following URL in the **Website URL** field:

`https://${account.namespace}`

Click **Submit**.

![](/media/articles/connections/social/linkedin/linkedin-devportal-3.png)

## 4. Enter your callback URL

Enter the following URL in the **Authorized Redirect URLs** field and click **Add**:

`https://${account.namespace}/login/callback`

Click **Update**.

![](/media/articles/connections/social/linkedin/linkedin-devportal-4.png)

## 5. Get your *Client ID* and *Client Secret*

On the same page, your `Client ID` and `Client Secret` will be displayed:

![](/media/articles/connections/social/linkedin/linkedin-devportal-5.png)

## 6. Copy your *Client Id* and *Client Secret* into Auth0

Login to the Auth0 [Dashboard](${manage_url}) and select **Connections > Social** in the left navigation.

Select the LinkedIn connection to access its **Settings** page.

Copy the `Client Id` and `Client Secret` from the **Authentication** page of your app on LinkedIn into the fields on this page on Auth0:

![](/media/articles/connections/social/linkedin/linkedin-devportal-6.png)

## 7. Enable the Connection

Go to the **Apps** tab of the LinkedIn connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/linkedin/linkedin-devportal-7.png)

## 8. Test your app

Go back to the [Connections > Social](${manage_url}/#/conncetions/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the LinkedIn logo:

![](/media/articles/connections/social/linkedin/linkedin-devportal-8.png)

Click **TRY**.

Provide your LinkedIn credentials and click **Allow access**.

![](/media/articles/connections/social/linkedin/linkedin-devportal-8a.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/linkedin/linkedin-devportal-8b.png)

