---
connection: Twitter
image: /media/connections/twitter.png
description: This page shows you how to connect your Auth0 app to Twitter. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
seo_alias: twitter
index: 8
---

# Connect your app to Twitter.

To connect your Auth0 app to Twitter, you will need to generate *Consumer* and *Secret* Keys in a Twitter application, copy these into your Auth0 settings, and enable the connection.

## 1. Create a Twitter application

1. Login to [Twitter Application Management](https://apps.twitter.com/).

2. Click **Create New App**:

  ![](/media/articles/connections/social/twitter/twitter-api-1.png)

3. Provide the required information. For **Callback URL**, enter `https://${account.namespace}/login/callback`

  ![](/media/articles/connections/social/twitter/twitter-api-2.png)

4. Agree to the *Developer Agreement* and click **Create your Twitter Application**.

5. Once the app is created, go to the **Settings** tab and verify that the **Allow this application to be used to Sign in with Twitter** option is selected.

  ![](/media/articles/connections/social/twitter/twitter-api-3.png)

## 2. Get your *Consumer Key* and *Consumer Secret*

1. Your *Consumer Key* and *Consumer Secret* will be displayed in the **Keys and Access Tokens** tab of your app on Twitter:

  ![](/media/articles/connections/social/twitter/twitter-api-4.png)

2. Leave this window open.

## 3. Copy your *Consumer Key* and *Consumer Secret* into Auth0

1. In a separate window, login to the [Auth0 Dashboard](${uiURL}) and select **Connections > Social** in the left navigation.

2. Select the connection with the Twitter logo to access this connection's **Settings** page.

3. Copy the *Consumer Key* and *Consumer Secret* from your app's **Keys and Access Tokens** tab on Twitter into the fields on this page on Auth0.

  ![](/media/articles/connections/social/twitter/twitter-api-5.png)

Unlike some other social connections, Twitter manages the permissions of attributes at an application level. By default, your application will request Read and Write permissions of the Twitter provided attributes, this can only be changed in the [Twitter Application Management page](https://apps.twitter.com) in the **Permissions** section. [Click here](https://dev.twitter.com/oauth/overview/application-permission-model) to learn more about Twitter's Application Permission Model.

4. Click **Save**.

## 4. Enable the Connection

1. Go to the **Apps** tab of the Twitter connection on Auth0 and select each of your existing Auth0 apps for which you want to enable this connection:

  ![](/media/articles/connections/social/twitter/twitter-api-6.png)

2. Click **Save**.

## 5. Test your app

1. Go back to the [Connections > Social](${uiURL}/#/conncetions/social) section of the Auth0 dashboard. If you have configured your app correctly, you will see a **Try** icon next to the Twitter logo:

  ![](/media/articles/connections/social/twitter/twitter-api-7.png)

2. Click the Twitter logo to return to the **Settings** page of this connection and click **Try**:

  ![](/media/articles/connections/social/twitter/twitter-api-8.png)

3. You will be asked to sign-in to Twitter to authorize your new app to access your Twitter account:

  ![](/media/articles/connections/social/twitter/twitter-api-9.png)

4. If you have configured everything correctly, you will see the **It works!!!** page:

  ![](/media/articles/connections/social/twitter/twitter-api-10.png)

## 6. *Optional* Getting an Access Token from Twitter

Twitter allows the ability to generate an OAuth access token for the owner of an application. This can be used to make API requests on your own account's behalf. 

To generate an Access Token and Access Secret:  

1. Visit Twitter's [Application Management](https://apps.twitter.com) page and select your application.

2. Click on the link to **Keys and Access Tokens**.

3. Near the bottom of the page you will see a button **Create my access token** click this to generate an authorized access token and secret. Remember, do not share your Access Token Secret.

  ![](/media/articles/connections/social/twitter/twitter-api-11.png)

4. On this page you can also regenerate or revoke your Access Token and Secret if you think they may have been compromised.
