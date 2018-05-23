---
title: Connect Your App to LinkedIn
connection: LinkedIn
index: 3
image: /media/connections/linkedin.png
seo_alias: linkedin
description: This page shows you how to connect your Auth0 app to LinkedIn. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
tags:
  - connections
  - social
  - linkedin
---

# Connect Your App to LinkedIn

To connect your Auth0 app to LinkedIn, you will need to generate a **Client ID** and **Client Secret** in a LinkedIn app, copy these keys into your Auth0 settings, and enable the connection.

## 1. Log in to the developer portal

Log in to the [LinkedIn Developer portal](http://developer.linkedin.com/), and click **My Apps**:

![](/media/articles/connections/social/linkedin/linkedin-devportal-1.png)

## 2. Create your app

Click the **Create Application** button:

![](/media/articles/connections/social/linkedin/linkedin-devportal-2.png)

## 3. Enter details about your app

For the **Website URL** field, enter the following URL:

`https://${account.namespace}`

Then complete all the required fields on the form. 

Click **Submit**.

![](/media/articles/connections/social/linkedin/linkedin-devportal-3.png)

## 4. Enter the redirect URL

Enter the following URL in the **Authorized Redirect URLs** field, and click **Add**:

`https://${account.namespace}/login/callback`

Next, click **Update**.

![](/media/articles/connections/social/linkedin/linkedin-devportal-4.png)

## 5. Get your Client ID and Client Secret

On the same page, you will be able to see your **Client ID** and **Client Secret** under the **Authentication Keys** section:

![](/media/articles/connections/social/linkedin/linkedin-devportal-5.png)

## 6. Copy your Client ID and Client Secret into Auth0

Login to the [Connections > Social section of the Auth0 Dashboard](${manage_url}/#/connections/social).

Select the LinkedIn connection to access its **Settings** page.

Copy the **Client ID** into the **API Key** section and **Client Secret** into the **Secret Key** section. Enable any desired permissions and attributes, then click **SAVE**.

![](/media/articles/connections/social/linkedin/linkedin-devportal-6.png)

## 7. Enable the connection

Go to the **Apps** tab of the LinkedIn connection on Auth0, and select each of your existing Auth0 apps for which you want to enable this connection:

![](/media/articles/connections/social/linkedin/linkedin-devportal-7.png)

## 8. Test your app

Go back to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard.

A **TRY** icon will now be displayed next to the LinkedIn logo:

![](/media/articles/connections/social/linkedin/linkedin-devportal-8.png)

Click **TRY**.

You will see the LinkedIn Authorize screen. Click **Allow** to finish creating the connection.

![](/media/articles/connections/social/linkedin/linkedin-devportal-8a.png)

If you have configured everything correctly, you will see the **It works!!!** page:

![](/media/articles/connections/social/linkedin/linkedin-devportal-8b.png)

## 9. Access LinkedIn API

<%= include('../_call-api', {
  "idp": "LinkedIn"
}) %>

<%= include('../_quickstart-links.md') %>
