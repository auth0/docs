---
connection: SoundCloud
index: 5
image: /media/connections/soundcloud.png
seo_alias: soundcloud
description: How to obtain a Client Id and Client Secret for SoundCloud.
---

# Configuring an OAuth 2.0 Connection with SoundCloud

To configure an OAuth 2.0 connection with SoundCloud, you will need to register your Auth0 Client with SoundCloud using their [Developer Portal](http://developers.soundcloud.com/).

This doc refers to the client steps to connect your client. If you are looking to manage authentication in your application, see [Next Steps](#next-steps) below.

## 1. Register Your App and Obtain API Credentials with SoundCloud

::: panel-warning SoundCloud Registration Process
As noted below, SoundCloud does **not** have an automated process to register your app. Auth0 does not have any control over this process, you must apply to SoundCloud and work with them to get your application configuration. Only after SoundCloud approves your application can you use SoundCloud with Auth0.
:::

Navigate to the [SoundCloud Developer Portal](http://developers.soundcloud.com/). Using the navigation menu on the right side, click on **Register a new app**:

![](/media/articles/connections/social/soundcloud/soundcloud-devportal-1.png)

You will be asked to fill out a Developer Application (which is a Google Forms document) that provides SoundCloud information about your Auth0 Client.

Once you have completed and submitted your application, you will be contacted by the SoundCloud team with further instructions on how to proceed. Only at this point will you be given the appropriate API credentials to complete the integration.

## 2. Set Up a SoundCloud Social Connection in Auth0

Once your Auth0 Client has been added to your SoundCloud account, you can get the `Client ID` and `Client Secret` necessary for the Auth0 Connection Settings.

![](/media/articles/connections/social/soundcloud/soundcloud-devportal-2.png)

Be sure to provide the following as your `Redirect URI for Authentication` on the SoundCloud dashboard: `https://${account.namespace}/login/callback`

Go to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard and enable **SoundCloud**.

![](/media/articles/connections/social/soundcloud/social.png)

You will be prompted to provide your SoundCloud `Client ID` and `Client Secret`.

![](/media/articles/connections/social/soundcloud/auth0-settings.png)

**Save** your settings. Switch to the *Clients* tab, and select the Client(s) you want to use the SoundCloud integration. **Save** again.

![](/media/articles/connections/social/soundcloud/clients.png)

<%= include('../_quickstart-links.md') %>

