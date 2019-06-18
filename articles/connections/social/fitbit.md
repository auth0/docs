---
title: Connect your app to Fitbit
connection: Fitbit
image: /media/connections/fitbit.png
seo_alias: fitbit
index: 14
description: How to obtain a Client Id and Client Secret for Fitbit.
toc: true
topics:
  - connections
  - social
  - fitbit
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to Fitbit

::: panel-warning Fitbit has ended support for OAuth 1.0
New connections with Fitbit will use OAuth 2.0. Please see the following documentation on [Using OAuth 2.0](https://dev.fitbit.com/docs/oauth2/) with Fitbit.
:::

To configure a Fitbit OAuth 2.0 connection, you will need to register a new application in Fitbit.

## 1. Register a New Fitbit App

Log in to the [Fitbit's Developer site](https://dev.fitbit.com), then select **REGISTER AN APP**:

![](/media/articles/connections/social/fitbit/register-an-app.png)

## 2. Complete the _Register an application_ form

![](/media/articles/connections/social/fitbit/registration-form.png)

- **Application Name**- what you want to call your application
- **Description**- describe what your application will be used for
- **Application Website**- the URL of your application
- **Organization**- the name of the associated organization
- **Organization Website**- the URL of the associated organization
- **OAuth 2.0 Application Type**- select **Application**, applications (clients) authenticate using either the Authorization Code Grant Flow or the Implicit Grant Flow
- **Callback URL**- this is the URL called after a request, in this field, enter: `https://${account.namespace}/login/callback`
- **Default Access Type**- the type of access granted to the application

<%= include('../_find-auth0-domain-redirects') %>

When finished, click **Register**.

## 3. Copy Your New App's *Client ID* and *Client Secret*

From the **Edit Application** page, copy the **Client ID** and **Client Secret**:

![](/media/articles/connections/social/fitbit/fitbit-manage-oauth2.png)

## 4. Enter Your Client ID and Client Secret

Go to your Auth0 Dashboard and select **Connections > Social**, then choose **Fitbit**. Copy the **Client ID** and **Client Secret** from the **Manage My Apps** page of your app on Fitbit into the fields on this page on Auth0:

![](/media/articles/connections/social/fitbit/fitbit-auth0-dashboard.png)

## 5. Enable the Connection

Go to the **Apps** tab of the Fitbit connection on your Auth0 Dashboard and select each of your existing Auth0 applications for which you want to enable this connection:

![](/media/articles/connections/social/fitbit/fitbit-apps.png)

## 6. Test the Connection

Close the Settings window to return to the Connections > Social section of your Auth0 dashboard. A **TRY** icon will now be displayed next to the Fitbit logo; click "TRY".

![](/media/articles/connections/social/fitbit/try-button.png)

This will bring you to the authorization page. Click the **Allow** button to grant access.

![](/media/articles/connections/social/fitbit/auth-page.png)

If you have configured everything correctly, you will see the "It works" page!

::: note
Fitbit is a registered trademark and service mark of Fitbit, Inc. Auth0 is designed for use with the Fitbit platform. This product is not part of Fitbit, and Fitbit does not service or warrant the functionality of this product.
:::

<%= include('../_quickstart-links.md') %>
