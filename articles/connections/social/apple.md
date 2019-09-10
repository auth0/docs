---
title: Add Sign in with Apple to Your App
connection: Apple
index: 3
image: /media/connections/apple.svg
seo_alias: apple
description: Learn how to add login functionality to your app with Apple. 
topics:
  - authentication
  - connections
  - native-social
  - apple
contentType: concept
useCase:
  - add-login
  - connections
  - add-siwa
---
# Auth0 and Sign In with Apple

Apple provides the Sign In with Apple capability to help you authenticate your users' identities. You can enable Sign In with Apple with the apps that you use with Auth0 using [custom social connections](/connections/social/oauth2). 

Apple requires (with apps that run on iOS 13+) that you adopt Sign In with Apple (SIWA) for all apps published on the App Store that support  third-party sign-in options (such as Facebook, Google, or Twitter). 

As with other identify providers supported by Auth0, when your users login, they can click the “Sign In with Apple” button, and they'll be taken to the Apple sign-in screen. They will see the name of your app and a placeholder icon. They will enter their Apple ID and password. If their Apple ID has two-factor auth enabled, they'll be prompted for that as well.

Auth0 integration with Sign In with Apple is built on the [OAuth 2.0 Token Exchange specification](https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-16) and OIDC. 

Auth0 creates a profile and performs a token exchange to provide a way to hook into the Auth0 context. You will register your app in the Apple Developer Portal and create an App ID which you'll use to create a `client_id` (that Apple calls a **Service ID**) which is a private key that you download as a file. This may seem redundant, but it makes sense if you have a native app and a web app that you want to link together using a single Auth0 login experience. 

For a native app, the Sign in with Apple login flow works as follows:

![Native Sign In with Apple Flow](/media/articles/connections/social/apple/sign-in-with-apple-flow.png)

1. User authenticates via Apple's SDK on their iPhone or iPad. They receive an authorization code. The user does not have to leave the app and use a browser to log in.
2. The application calls Auth0's `/oauth/token` endpoint with the following parameters:
    - `subject_token`: the authorization code they received above
    - `subject_token_type`: `http://auth0.com/oauth/token-type/apple-authz-code`
    - `grant_type`: `urn:ietf:params:oauth:grant-type:token-exchange`
    - `client_id`: their Auth0 Client ID
    - `audience` and `scope` as needed (optional)

    Auth0 exchanges the `subject_token` (authorization code) with Apple for an ID token, access token, and refresh token from Apple.
3. Auth0 saves the user profile, executes rules and authorization, then issues Auth0 access tokens (refresh tokens and ID tokens) as requested. These tokens are used to protect your APIs and users managed by Auth0.

For information about specific use cases, see [Sign In with Apple and Auth0 Connection Use Cases](/connections/references/apple-native/references/siwa-use-cases).

## Grant types

*Intro text*

### Native apps using token exchange 

*TBD*

### Web apps using OAuth flow

*TBD*

## Using Sign In with Apple with Auth0

There are two methods for configuring Sign In with Apple that vary slightly depending on they type of app your are using:

* [Add Sign In with Apple to Your Native App](/connections/references/apple-native/guides/add-siwa-to-native-app)
* [Add Sign In with Apple to Your Web App](/connections/references/apple-native/guides/add-siwa-to-web-app)

## References and resources

Refer to the following information about limitations and troubleshooting:

* [Logging](/connections/references/apple-native/references/siwa-logging)
* [Rate Limits](/policies/rate-limits/#limits-on-sign-in-with-apple)
* [Troubleshooting](/connections/references/apple-native/references/siwa-troubleshooting)

## Keep reading

* [Auth0 Blog: What is Sign In with Apple](https://auth0.com/blog/what-is-sign-in-with-apple-a-new-identity-provider/)
* See [Sign In with Apple](https://developer.apple.com/sign-in-with-apple/) for information about Apple's Sign In with Apple capabilities.
