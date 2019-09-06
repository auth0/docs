---
title: Auth0 and Sign In with Apple Overview
description: Understand how native login functionality works with Auth0 and your applications. 
topics:
  - authentication
  - connections
  - social
  - native-social
contentType: concept
useCase:
  - add-login
  - customize-connections
  - add-idp
  - add-native-social
---
# Auth0 and Sign In with Apple Overview

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

## Grant types

*Intro text*

### Native apps using token exchange 

*TBD*

### Web apps using OAuth flow

*TBD*

## Application types that use Sign In with Apple and Auth0

*Intro text*

* [Add Sign In with Apple to Your Native App](/connections/social/apple/native-app-siwa)
* [Add Sign In with Apple to Your Web App](/connections/social/apple/web-app-siwa)

## Keep reading

* [Auth0 Blog: What is Sign In with Apple](https://auth0.com/blog/what-is-sign-in-with-apple-a-new-identity-provider/)
* See [Sign In with Apple](https://developer.apple.com/sign-in-with-apple/) for information about Apple's Sign In with Apple capabilities.
* [Sign In with Apple and Auth0 Connection Use Cases](/connections/social/apple/references/siwa-use-cases)
* [Sign In with Apple and Auth0 Logging](/connections/social/apple/references/siwa-logging)
* [Sign In with Apple and Auth0 Rate Limits](/connections/social/apple/references/siwa-rate-limits)
* [Sign In with Apple and Auth0 Troubleshooting](/connections/social/apple/references/siwa-troubleshooting)
