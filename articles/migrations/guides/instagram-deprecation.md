---
title: Instagram Connection Deprecation
description: Instagram is deprecating their Authentication API
toc: true
contentType:
  - how-to
useCase:
  - add-login
  - migrate
---
# Instagram Connection Deprecation

Facebook [announced](https://developers.facebook.com/blog/post/2019/10/15/launch-instagram-basic-display-api/) that on March 31th, 2020, they will turn off the Instagram legacy APIs in favor of a new set of APIs:

- The [Instagram Graph API](https://developers.facebook.com/docs/instagram-api) which is designed for Instagram Professional Accounts, not for end-user authentication.
- The [The Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api), which is an OAuth2 API, and enables you to grant access to your basic Instagram account data to a third-party app.

Even if it is a common industry practice to use OAuth2 as an authentication API, Facebook is explicitly forbidding using it as such, requiring applications to implement Facebook Login for authentication. Facebook will not approve applications that use the Instagram Basic Display API for authentication.

In order to let existing users continue to access your application, you will need to ask users that are authenticating using Instagram to authenticate in a different way, and use [Account Linking](/link-accounts) to link the new identity with the old one. 

An example flow would be:

- The user authenticates with Instagram.
- The application tells the user that they won't be able to authenticate with Instagram anymore, and that they should do it in a different way.
- The application lists the options the user has for authentication, for example:
    - Facebook
    - Username and Password
- After the user authenticates in a different way, you link the accounts using [Account Linking](/link-accounts).

## Why can't Auth0 use the Instagram Basic Display OAuth endpoint

While we could replace our current implementation and use the [Instagram Basic Display OAuth flow](https://developers.facebook.com/docs/instagram-basic-display-api/guides/getting-access-tokens-and-permissions), this would not be accepted by Facebook's policies. You would need to create an Instagram application in Facebook and, in that app, there's a notification saying:

> Note that Basic Display is not an authentication tool. Data returned by the API cannot be used to authenticate your app users or log them into your app. If your app uses API data to authenticate users, it will be rejected during App Review. If you need an authentication solution, use Facebook Login instead.

This means that even if Auth0 implemented this flow, your Instagram application would not be approved by Facebook.

If you need to access Instagram data, you will need to authenticate your user in other way (for example, using Facebook Login or username/password), and implement the Instagram OAuth flow in your application.

