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

On March 30th, 2020, Facebook is going to turn off the Instagram legacy APIs in favor of a new set of APIs:

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

