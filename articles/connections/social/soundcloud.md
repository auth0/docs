---
title: Connect Apps to SoundCloud
connection: SoundCloud
index: 31
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

1. Navigate to https://soundcloud.com/you/apps/new.
2. Follow the steps on the screen to complete your SoundCloud Application Registration. The SoundCloud application will provide the required keys to stream music from SoundCloud within your AppMachine app.
3. You will be able to find your SoundCloud profile URL by logging into SoundCloud on https://soundcloud.com/.
4. After logging in, navigate to your own profile by clicking your profile name in the top-right corner of the screen. Once navigated to your profile, your profile URL is equal to the page you are currently on.
5. The question “Will your app authenticate users?” can be answered “No, my app will only use publicly accessible resources”.
6. After filling out the form, your app will be in review for a maximum period of two weeks. Once reviewed, you will be able to use your SoundCloud API key to stream music from SoundCloud within your AppMachine app. When your request is approved and you received your own SoundCloud **API key** you'll be able to enter it in the Music block. You'll find the appropriate field in the **Settings: Client ID**.

### Create and enable a connection in Auth0

[Set up the SoundCloud social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>

