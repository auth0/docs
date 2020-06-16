---
title: Connect Apps to Twitter
connection: Twitter
image: /media/connections/twitter.png
description: Learn how to add login functionality to your app with Twitter. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
seo_alias: twitter
index: 32
toc: true
topics:
  - connections
  - social
  - twitter
contentType: how-to
useCase:
    - customize-connections
    - add-idp
---

# Connect Apps to Twitter

You can add functionality to your web app that allows your users to log in with Twitter. 

## Prerequisites

Before connecting your Auth0 app to Twitter, you must be have a [Twitter Developer](https://developer.twitter.com/) account.

## Steps

To connect your app to Twitter, you will:

1. [Set up your app in Twitter](#set-up-your-app-in-twitter)
2. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
3. [Test the connection](#test-the-connection)

### Set up your app in Twitter

Set up an app in Twitter. During this process, Twitter will generate a **Consumer Key** and **Consumer Secret** for your application; make note of these.

1. Log in to [Twitter Developer App Management](https://developer.twitter.com/en/apps), and click **Create an app**.

2. Complete information about your app including the following values:

| Field | Value to Provide |
| - | - |
| App URL | `https://${account.namespace}` |
| Redirect URL | `https://${account.namespace}/login/callback` |

<%= include('../_find-auth0-domain-redirects') %>

::: note
If you're using a [custom domain](/custom-domains), you'll need to add that domain to a <dfn data-key="callback">callback URLs</dfn> whitelist for your [Twitter application](https://developer.twitter.com/en/apps/create). For more information on this change, see this [Twitter developer forum post](https://twittercommunity.com/t/action-required-sign-in-with-twitter-users-must-whitelist-callback-urls/105342).
:::

4. Ensure the **Enabled Sign in with Twitter** option is selected. 

5. Click **Create**, review the developer terms then **Create** again. Your **Consumer Key** and **Consumer Secret** are displayed in the **Keys and tokens** tab of your app on Twitter.

::: panel Twitter Profile Attribute Permissions
Unlike many social identity providers, Twitter manages profile attribute permissions at the application level. By default, your application will be granted *Read* and *Write* permissions. You can customize these in the **Permissions** section of the [Twitter Developer App Management](https://developer.twitter.com/en/apps) page. For more information, see: [Application Permission Model](https://dev.twitter.com/oauth/overview/application-permission-model).
:::

### Create and enable a connection in Auth0

[Set up the Twitter social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the generated **Consumer Key** and **Consumer Secret**.

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

## Access Twitter API

<%= include('../_call-api', {"idp": "Twitter"}) %>

::: note
Twitter allows you to use application-specific Access Tokens for many API calls without requiring user Access Tokens. You can generate these tokens in [Twitter Developer App Management](https://developer.twitter.com/en/apps). Using application-specific Access Tokens will limit your app to requests that do not require user context. For more information, see [Twitter Developer Documentation: Application-Only Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only.html).
:::

## Troubleshooting

If you are seeing errors, refer to the following troubleshooting steps.

### User's email address is missing from retrieved user profile

Twitter connections do not retrieve the user's email address by default. But you can add a rule to request the email using the Access Token returned from Twitter *providing you supply a privacy policy and terms & conditions*.

Auth0 provides a rule template to get email addresses from Twitter. To use it, [create a new rule](${manage_url}/#/rules/create) with the **Get Email Address from Twitter** template under the **Enrich Profile** section.

If you are using Auth0 developer keys, this functionality will not work; you will need to use your Twitter Consumer Key and Consumer Secret.

You must also explicitly request permission to retrieve user email addresses for your Twitter app:

1. Login to [Twitter Developer App Management](https://developer.twitter.com/en/apps).
1. Choose your app.
1. Click **Edit**, then **Edit details** and enter the appropriate links in the **Terms of Service URL** and **Privacy Policy URL** fields.
1. Click **Save**.
1. Go to the **Permissions** tab and click **Edit**.
1. Select the **Request email address from users** option.
1. Click **Save**.

### Users are presented with the Twitter authorization screen each time they log in

You must configure your Twitter app to let users sign in with Twitter:

1. Login to [Twitter Developer App Management](https://developer.twitter.com/en/apps).
1. Choose your app.
1. Click **Edit**, then **Edit details** and select the **Enable Sign in with Twitter** option.
1. Click **Save**.

### Login fails with message “Error retrieving email from Twitter”

You are using the Login by Auth0 WordPress plugin and have enabled the **Requires Verified Email** setting, but have not explicitly requested permission to retrieve user email addresses for your Twitter app. You will need to either configure your Twitter app to request email addresses from users or disable the **Requires Verified Email** setting in the Login by Auth0 WordPress plugin.

To configure your Twitter app to request email addresses from users:

1. Login to [Twitter Developer App Management](https://developer.twitter.com/en/apps).
1. Choose your app.
1. Click **Edit**, then **Edit details**.
1. Enter the appropriate links in the **Terms of Service URL** and **Privacy Policy URL** fields.
1. Click **Save**.
1. Go to the **Permissions** tab, click **Edit** and select the **Request email address from users** option.
1. Click **Save**.

To disable the **Requires Verified Email** setting in the Login by Auth0 WordPress plugin:

1. Login to your WordPress site's admin area (example: http://www.yoursite.com/wp-admin/).
1. Choose your site, and go to **Auth0** > **Settings**.
1. Go to the **Advanced** tab, and deselect the **Requires Verified Email** option.
1. Click **Save Changes**.

<%= include('../_quickstart-links.md') %>
