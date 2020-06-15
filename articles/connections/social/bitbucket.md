---
connection: Bitbucket
image: /media/connections/bitbucket.png
seo_alias: bitbucket
description: Learn how to connect your Auth0 app to Bitbucket. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
index: 5
topics:
  - connections
  - social
  - bitbucket
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---
# Connect Apps to Bitbucket

You can add functionality to your app that allows your users to log in with Bitbucket.

::: note
This connection will only work with <dfn data-key="lock">Lock</dfn> version 9.2 or higher.
:::

## Prerequisites

Before connecting your Auth0 app to Bitbucket, you will need to have a [Bitbucket](https://bitbucket.org/) account.

## Steps

To connect your app to Bitbucket, you will:

1. [Set up your app in Bitbucket](#set-up-your-app-in-bitbucket)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Bitbucket

1. Login to [Bitbucket](https://bitbucket.org/) and click on your account icon in the lower left and select **Bitbucket settings**. Select **OAuth**  in the left nav.
2. Click **Add consumer**. 
3. Provide a name for your app. In the <dfn data-key="callback">**Callback URL**</dfn> field, enter the following:

  `https://${account.namespace}/login/callback`

<%= include('../_find-auth0-domain-redirects') %>

4. Select the Permissions you want to enable for this connection. At the very least you will need to select the `Account:Email` and `Account:Read` permissions.

5. Click **Save**.

6. On the page that follows, click the name of your app under **OAuth consumers** to reveal your keys.

### Create and enable a connection in Auth0

[Set up the Bitbucket social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **API key** and the **API secret key** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
