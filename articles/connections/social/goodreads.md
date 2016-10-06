---
connection: Goodreads
image: /media/connections/goodreads.png
seo_alias: goodreads
description: How to obtain a Consumer Key and Consumer Secret for Goodreads.
---

# Obtain a Consumer Key and Consumer Secret for Goodreads

To configure a Goodreads connection with Auth0, you will need to register your app on the Goodreads developers site.

## 1. Apply for a developer key

Log into the [Goodreads developer site](https://www.goodreads.com/api), and select *developer key*:

![](/media/articles/connections/social/goodreads/goodreads-register-1.png)

## 2. Enter information about your app

Complete the form then click **Apply for a Developer Key**. Enter this in the `Callback URL` field:

  https://${account.namespace}/login/callback

![](/media/articles/connections/social/goodreads/goodreads-register-2.png)

## 3. Get your *Consumer Key* and *Consumer Secret*

Once the application is registered, the `Key` and `Secret` for your new app will be displayed on the following page:

![](/media/articles/connections/social/goodreads/goodreads-register-3.png)

### 4. Copy your *Consumer Key* and *Consumer Secret*

Go to your Auth0 Dashboard and select **Connections > Social**, then choose [custom OAuth2 connections](/connections/social/oauth2) and add Goodreads (OAuth1) as a provider, you can check Bitbucket's [example](/oauth2-examples) since it also uses OAuth1. Copy the `Consumer Key` and `Consumer Secret` from the **Api Key** page of your app on Goodreads into the fields `client_id` and `client_secret`. The `requestTokenURL` would be http://www.goodreads.com/oauth/request_token, the `accessTokenURL` would be http://www.goodreads.com/oauth/access_token and the `userAuthorizationURL` would be http://www.goodreads.com/oauth/authorize.
