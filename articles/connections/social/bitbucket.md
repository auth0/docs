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

Set up an app in Bitbucket using Atlassian's [OAuth on Bitbucket Cloud: Create a consumer](https://confluence.atlassian.com/bitbucket/oauth-on-bitbucket-cloud-238027431.html#OAuthonBitbucketCloud-Createaconsumer) doc. During this process, Bitbucket will generate a **Key** and **Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| Callback URL | `https://${account.namespace}/login/callback` |
| Permissions | Select the permissions you want to enable for this connection. At minimum, you need `account:email` and `account:read`. |

<%= include('../_find-auth0-domain-redirects') %>

### Create and enable a connection in Auth0

[Set up the Bitbucket social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Key** and the **Secret** generated.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>
