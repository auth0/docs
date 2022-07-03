---
title: Connect Apps to SoundCloud
connection: SoundCloud
toc: true
public: false
index: 31
image: /media/connections/soundcloud.png
seo_alias: soundcloud
description: Learn how to add login functionality to your app with SoundCloud. You will need to obtain a Client Id and Client Secret for SoundCloud.
topics:
  - connections
  - social
  - soundcloud
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to SoundCloud

You can add functionality to your web app that allows your users to log in with SoundCloud. 

::: panel-warning Restricted SoundCloud App Registration
SoundCloud's manual application registration process is currently closed, so **new applications cannot be registered**. SoundCloud does **not** have an automated process to register your app. You must apply to SoundCloud and work with them to get your application configured which can take up to 2 weeks. Only after SoundCloud approves your application can you use SoundCloud with Auth0. See [How to Request a SoundCloud API Key](https://support.appmachine.com/hc/en-us/articles/115000057244-How-to-request-a-SoundCloud-API-key) for details.
:::

## Prerequisites

Before connecting your Auth0 app to SoundCloud, you must have a [SoundCloud Developer](http://developers.soundcloud.com/) account.

## Steps

To connect your app to SoundCloud, you will:

1. [Set up your app in SoundCloud](#set-up-your-app-in-soundcloud)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in SoundCloud

1. [Create a new app on your SoundCloud profile](https://soundcloud.com/you/apps/new), and complete your SoundCloud Application Registration by following the steps on the screen.
    * Find your SoundCloud profile URL by [logging into SoundCloud](https://soundcloud.com/) and clicking your profile name in the top-right corner of the screen. Once navigated to your profile, your profile URL is displayed in your browser's address bar.
    * Answer **Will your app authenticate users?** with `No, my app will only use publicly accessible resources`.

    Your app will be in review for a maximum period of two weeks. Once approved, you will be able to use your SoundCloud API key to stream music from SoundCloud within your AppMachine app. 

2. When your request is approved, you will receive your own SoundCloud **Client ID**. Enter it in the **Music** block in the appropriate field under **Settings: Client ID**.

### Create and enable a connection in Auth0

[Set up the SoundCloud social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Client ID** and **Client Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>

