---
title: Troubleshoot Sign in With Apple
description: Describes troubleshooting steps for web and native apps using the Apple connection.
topics:
  - troubleshooting
  - errors
  - authentication
  - connections
  - social
  - apple
contentType:
  - reference
useCase: 
  - troubleshooting
---

# Troubleshoot Sign in with Apple

## Configuration elements

Ensure that the correct configuration elements are in place, both in the Auth0 Management Dashboard and in the Apple Developer Settings Console. Common configuration problems include:

- **Using the wrong identifier**: Remember that Apple App IDs (also known as App Bundle Identifiers) need to be [configured in Auth0's advanced application settings](/connections/apple-siwa/add-siwa-to-native-app).  Service IDs, which are used to configure web apps, need to be [configured in connection settings](/connections/apple-siwa/add-siwa-to-native-app).  Switching these identifiers will result in failures.
- **Missing return URLS for Web Apps**: When using Sign In with Apple for web apps, the Auth0 callback endpoint must be added to the list of Return URLs in the Apple Developer Settings Console.  When not using custom domains, this will take the format: `https://TENANT.auth0.com/login/callback`.

::: warning
Remember that it's not possible to test native apps from the Auth0 Management Dashboard.  The **Try** button in the Apple connection settings only tests the web app flow.  This is due to the fact that real devices are required for interaction with the Apple IdP using an App ID.
:::

## Tenant logs

If your application successfully initiated the login flow with Auth0, the results will be reflected in the tenant logs.  Native social exchanges will use the `sens` and `fens` event types to indicate success and failure (respectively), while web flows will use the standard `s` and `f` event types.  All tenant logs interacting with the Apple IdP will use the connection value of `apple`.

## Types of errors

The following errors may be returned from the Apple IdP.  Auth0 will relay both status codes and error messages from Apple should a request fail.

| Error | Status Code | Description |
| - | - | - |
| `invalid_request` | 400 | The request parameters were incomplete or incorrect |
| `invalid_grant` | 400 | The authorization code or refresh token presented to the Apple IdP is not valid |
| `invalid_client` | 400 | Apple was unable to successfully authenticate the client with the provided credentials |
| `server_error` | 500 | Other server-side issue inhibiting its ability to issue tokens |

## Apple nuances
Many identity providers have their own unique idiosyncrasies, and Apple is no exception.  When integrating, be mindful of a few of its particular choices in implementation.

- **Users are Unique Per Apple Development Account**: User identifiers in the Apple world are guaranteed to be both unique and persistent _per Apple Development Account_.  If Apple user identifiers are sourced from more than one development account, know that the same user will be represented by different identifiers.
- **Users can Choose Which Email to Share**: When users have multiple email addresses, they may choose which one is shared.  Additionally, in the case of re-authentication, users may not pick the same email address.  This means that the User ID should be used exclusively as the identifier, and account linking operations should use care.

## Keep reading
* [Register Apps in the Apple Developer Portal](/connections/apple-siwa/set-up-apple)
* [Add Sign In with Apple to Native iOS Apps](/connections/apple-siwa/add-siwa-to-native-app)
* [Add Sign In with Apple to Web or Other Apps](/connections/apple-siwa/add-siwa-to-web-app)
* [Test Sign In with Apple Configuration](/connections/apple-siwa/test-siwa-connection)
* [iOS Swift - Sign In with Apple Quickstart](/quickstart/native/ios-swift-siwa)
* [Rate Limits on Native Social Logins](/policies/rate-limits#limits-on-native-social-logins)
