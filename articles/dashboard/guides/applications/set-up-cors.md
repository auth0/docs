---
title: Set Up Cross-Origin Resource Sharing (CORS)
description: Learn how to set up Cross-Origin Resource Sharing (CORS) for an application registered with Auth0 using the Auth0 Management Dashboard.
topics:
    - applications
    - cors
    - dashboard
contentType:
    - how-to
useCase: 
    - build-app
---
# Set Up Cross-Origin Resource Sharing (CORS)

::: warning
Auth0 strongly recommends that authentication transactions be handled via [Universal Login](/universal-login). Doing so offers the easiest and most secure way to authenticate users. However, some situations may require that login be directly embedded in an application. When embedded login is required, an application must be set up for cross-origin resource sharing (CORS).
:::

This guide will show you how to set up cross-origin resource sharing (CORS) for an application using Auth0's Dashboard.

For security purposes, your app's origin URL must be listed as an approved URL. If you have not already added it to the <dfn data-key="callback">**Allowed Callback URLS**</dfn> for your application, you will need to add it to the list of **Allowed Origins (CORS)**. 

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Scroll down and locate **Allowed Origins (CORS)**, enter your app's [origin URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin), and click **Save Changes**.
