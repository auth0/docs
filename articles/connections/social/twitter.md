---
title: Connect Your App to Twitter
connection: Twitter
image: /media/connections/twitter.png
description: This page shows you how to connect your Auth0 application to Twitter. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
seo_alias: twitter
index: 8
toc: true
topics:
  - connections
  - social
  - twitter
contentType: how-to
useCase: customize-connections
---

# Connect Your App to Twitter

To connect your Auth0 application to Twitter, you will need to generate **Consumer** and **Secret** Keys in a Twitter application, copy these into your Auth0 settings, and enable the connection.

If you're using a [custom domain](/custom-domains), you'll need to add that domain to the callback URLs list of your [Twitter application](https://apps.twitter.com/app/new). For more information on this change, see this [Twitter developer forum post](https://twittercommunity.com/t/action-required-sign-in-with-twitter-users-must-whitelist-callback-urls/105342).

## 1. Create a Twitter application

1. Login to [Twitter Application Management](https://apps.twitter.com/).

2. Click **Create New App**:

    ![Create new Twitter app](/media/articles/connections/social/twitter/twitter-api-1.png)

3. Provide the required information. For the **Callback URL**, enter `https://${account.namespace}/login/callback`. If you're using a [custom domain](/custom-domains), add that domain as another callback URL.

    ![Callback URL](/media/articles/connections/social/twitter/twitter-api-2.png)

4. Agree to the *Developer Agreement* and click **Create your Twitter Application**.

5. Once the app is created, go to the **Settings** tab and verify that the **Allow this application to be used to Sign in with Twitter** option is selected.

    ![Allow this application to be used to Sign in with Twitter](/media/articles/connections/social/twitter/twitter-api-3.png)

## 2. Get your Consumer Key and Consumer Secret

1. Your **Consumer Key** and **Consumer Secret** will be displayed in the **Keys and Access Tokens** tab of your app on Twitter:

    ![Consumer Key and Consumer Secret](/media/articles/connections/social/twitter/twitter-api-4.png)

2. Leave this window open.

## 3. Copy your Consumer Key and Consumer Secret in Auth0

1. In a separate window, login to the [Auth0 Dashboard](${manage_url}) and select **Connections > Social** in the left navigation.

2. Select the connection with the Twitter logo to access this connection's **Settings** page.

3. Copy the **Consumer Key** and **Consumer Secret** from your app's **Keys and Access Tokens** tab on Twitter into the fields on this page on Auth0.

    ![Update Auth0 connection settings](/media/articles/connections/social/twitter/twitter-api-5.png)

4. Click **Save**.

::: panel Twitter Profile Attribute Permissions
Unlike many social identity providers, Twitter manages profile attribute permissions at the application level. By default, your application will be granted *Read* and *Write* permissions. You can customize these in the **Permissions** section of the [Twitter Application Management](https://apps.twitter.com) page. For more information, see: [Application Permission Model](https://dev.twitter.com/oauth/overview/application-permission-model).
:::

## 4. Enable the connection

1. Go to the **Applications** tab of the Twitter connection on Auth0 and select each of your existing Auth0 applications for which you want to enable this connection:

    ![Enable connection for applications](/media/articles/connections/social/twitter/twitter-api-6.png)

2. Click **Save**.

## 5. Test your connection

1. Go back to the [Connections > Social](${manage_url}/#/connections/social) section of the Auth0 dashboard. If you have configured your app correctly, you will see a **Try** icon next to the Twitter logo:

    ![Try connection](/media/articles/connections/social/twitter/twitter-api-7.png)

2. Click the Twitter logo to return to the **Settings** page of this connection and click **Try**:

    ![Try connection](/media/articles/connections/social/twitter/twitter-api-8.png)

3. You will be asked to sign-in to Twitter to authorize your new app to access your Twitter account:

    ![Authorize the new app](/media/articles/connections/social/twitter/twitter-api-9.png)

4. If you have configured everything correctly, you will see the **It works!!!** page:

    ![Test results](/media/articles/connections/social/twitter/twitter-api-10.png)

## 6. Access Twitter API

<%= include('../_call-api', {"idp": "Twitter"}) %>


::: panel Application-Specific Access Tokens
Unlike many social identity providers, Twitter allows you to use application-specific Access Tokens for many API calls without requiring user Access Tokens. You can generate these tokens in [Twitter Application Management](https://apps.twitter.com). Using application-specific Access Tokens will limit your app to requests that do not require user context. For more information, see [Twitter Developer Documentation: Application-Only Authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/application-only.html).
:::

## Troubleshooting

If you are seeing errors, refer to the following troubleshooting steps.

### User's email address is missing from retrieved user profile

If you are using Auth0 developer keys, this functionality will not work; you will need to use your Twitter Consumer Key and Consumer Secret.

Otherwise, you must explicitly request permission to retrieve user email addresses for your Twitter app:

1. Login to [Twitter Application Management](https://apps.twitter.com).
1. Choose your app.
1. Go to the **Settings** tab, and enter the appropriate links in the **Terms of Service URL** and **Privacy Policy URL** fields.
1. Click **Update Settings**.
1. Go to the **Permissions** tab, and select the **Request email addresses from users** option.
1. Click **Update Settings**.


### Users are presented with the Twitter authorization screen each time they log in

You must configure your Twitter app to let users sign in with Twitter:

1. Login to [Twitter Application Management](https://apps.twitter.com).
1. Choose your app.
1. Go to the **Settings** tab, and select the **Allow this application to be used to Sign in with Twitter** option.
1. Click **Update Settings**.


### Login fails with message “Error retrieving email from Twitter”

You are using the Login by Auth0 WordPress plugin and have enabled the **Requires Verified Email** setting, but have not explicitly requested permission to retrieve user email addresses for your Twitter app. You will need to either configure your Twitter app to request email addresses from users or disable the **Requires Verified Email** setting in the Login by Auth0 WordPress plugin.

To configure your Twitter app to request email addresses from users:

1. Login to [Twitter Application Management](https://apps.twitter.com).
1. Choose your app.
1. Go to the **Settings** tab, and enter the appropriate links in the **Terms of Service URL** and **Privacy Policy URL** fields.
1. Click **Update Settings**.
1. Go to the **Permissions** tab, and select the **Request email addresses from users** option.
1. Click **Update Settings**.

To disable the **Requires Verified Email** setting in the Login by Auth0 WordPress plugin:

1. Login to your WordPress site's admin area (example: http://www.yoursite.com/wp-admin/).
1. Choose your site, and go to **Auth0** > **Settings**.
1. Go to the **Advanced** tab, and deselect the **Requires Verified Email** option.
1. Click **Save Changes**.



<%= include('../_quickstart-links.md') %>
