---
title: Update the Signing Algorithm for an Application
description: Learn how to update an application's signing algorithm using the Auth0 Dashboard.
toc: true
topics:
  - tokens
  - id-tokens
  - signing-algorithms
  - dashboard
contentType:
  - how-to
useCase:
  - build-an-app
  - invoke-api
---
# Update the Signing Algorithm for an Application

This guide will show you how to change your application's [signing algorithm](/tokens/concepts/signing-algorithms) using Auth0's Dashboard.

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

2. Scroll to the bottom of the page, click **Advanced Settings**, and click the **OAuth** tab.

![View OAuth Advanced Settings](/media/articles/dashboard/guides/applications/app-settings-advanced-oauth.png)

3. Locate **JsonWebToken Signature Algorithm**, and select the appropriate signing algorithm for the application. When finished, click **Save Changes**.
