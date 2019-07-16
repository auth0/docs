---
title: Connect your app to SoundCloud
connection: SoundCloud
index: 5
image: /media/connections/soundcloud.png
seo_alias: soundcloud
description: How to obtain a Client Id and Client Secret for SoundCloud.
toc: true
topics:
  - connections
  - social
  - soundcloud
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect your app to SoundCloud

To configure an OAuth 2.0 connection with SoundCloud, you will need to register your Auth0 Application with SoundCloud using their [Developer Portal](http://developers.soundcloud.com/).

## 1. Register Your App and Obtain API Credentials with SoundCloud

::: panel-warning SoundCloud App Registration
SoundCloud's manual application registration process is currently closed, so **new applications cannot be registered**. Furthermore, as noted below, SoundCloud does **not** have an automated process to register your app. Auth0 does not have any control over this process, you must apply to SoundCloud and work with them to get your application configured. Only after SoundCloud approves your application can you use SoundCloud with Auth0.
:::

Navigate to the [SoundCloud Developer Portal](http://developers.soundcloud.com/). Using the navigation menu on the right side, click on **Register a new app**:

![](/media/articles/connections/social/soundcloud/soundcloud-devportal-1.png)

You will be asked to fill out a Developer Application (which is a Google Forms document):

![](/media/articles/connections/social/soundcloud/soundcloud-google-doc.png)

This provides SoundCloud information about your Auth0 Application.

Once you have completed and submitted your application, you will be contacted by the SoundCloud team with further instructions on how to proceed. Only at this point will you be given the appropriate API credentials to complete the integration.

## 2. Set Up a SoundCloud Social Connection in Auth0

Once your Auth0 Application has been added to your SoundCloud account, you can get the `Client ID` and `Client Secret` necessary for the Auth0 Connection Settings.

![](/media/articles/connections/social/soundcloud/soundcloud-devportal-2.png)

Be sure to provide your <dfn data-key="callback">callback URL</dfn> as your `Redirect URI for Authentication` on the SoundCloud dashboard: `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

Go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard and enable **SoundCloud**.

![](/media/articles/connections/social/soundcloud/social.png)

You will be prompted to provide your SoundCloud `Client ID` and `Client Secret`.

![](/media/articles/connections/social/soundcloud/auth0-settings.png)

**Save** your settings. Switch to the *Applications* tab, and select the Application(s) you want to use the SoundCloud integration. **Save** again.

![](/media/articles/connections/social/soundcloud/clients.png)

<%= include('../_quickstart-links.md') %>

