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
  - social
  - apple
contentType: how-to
useCase:
  - add-login
  - customize-connections
  - add-idp
---
# Auth0 and Sign In with Apple

Apple requires the adoption of Sign In with Apple (SIWA) capabilities if you have a native app published on the App Store and you support different third-party sign-in options (such as Facebook, Google, or Twitter). 

Auth0 integration with Sign In with Apple is built on the [OAuth 2.0 Token Exchange specification](https://tools.ietf.org/html/draft-ietf-oauth-token-exchange-16). Auth0 created a profile and performs a token exchange to provide a way to hook into the Auth0 context.

The flow works as follows:

*placeholder for new flow diagram from Sonny*

1. User authenticates via the identity provider's SDK on their iPhone/iPad. They receive an authorization code. The user does not have to leave the app and use a browser to log in.
2. The application calls Auth0's `/oauth/token` endpoint with the following parameters:
    - `subject_token`: the authorization code they received above
    - `subject_token_type`: `http://auth0.com/oauth/token-type/apple-authz-code`
    - `grant_type`: `urn:ietf:params:oath:grant-type:token-exchange`
    - `client_id`: their Auth0 Client ID
    - `audience` and `scope` as needed (optional)
3. Auth0 exchanges the `code` with the identity provider for a set of Auth0 ID, access, and refresh tokens.
4. Auth0 saves the user profile, executes rules and authorization, then issues Apple access tokens (refresh tokens and ID tokens) as requested. These tokens are used to protect your APIs and users managed by Auth0.

For information about specific use cases, see [Sign In with Apple and Auth0 Connection Use Cases](/connections/references/apple-native/references/siwa-use-cases).

## Grant types

*Intro text*

### Native apps using token exchange 

*TBD*

### Web apps using OAuth flow

*TBD*

## Using Sign In with Apple with Auth0

*Intro text*

* [Add Sign In with Apple to Your Native App](/connections/references/apple-native/guides/add-siwa-to-native-app)
* [Add Sign In with Apple to Your Web App](/connections/references/apple-native/guides/add-siwa-to-web-app)

## References and resources

* [Logging](/connections/references/apple-native/references/siwa-logging)
* [Rate Limits](/connections/references/apple-native/references/siwa-rate-limits)
* [Troubleshooting](/connections/references/apple-native/references/siwa-troubleshooting)

## Keep reading

* [Auth0 Blog: What is Sign In with Apple](https://auth0.com/blog/what-is-sign-in-with-apple-a-new-identity-provider/)
* See [Sign In with Apple](https://developer.apple.com/sign-in-with-apple/) for information about Apple's Sign In with Apple capabilities.
