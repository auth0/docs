---
title: Call Your API from an Input-Constrained Device
description: Everything you need to know to call your API from your input-constrained device. For use with native apps.
public: false
template: microsite
topics:
  - authorization
  - oauth2
  - device
  - mobile-apps
  - desktop-apps
  - native-apps
useCase:
  - call-api
---

Using Auth0 in your applications means that you will be "outsourcing" the authentication process to a centralized login page in the same way that Gmail, YouTube, and any other Google property redirects to accounts.google.com whenever a user signs in.

With input-constrained devices, however, rather than immediately authenticating the user, the device asks the user to go to a link on their computer or smartphone to authenticate. This avoids a poor user experience for devices that do not have an easy way to enter text. If you’ve ever signed in to your Netflix account on a device like a Roku, you’ve already encountered this workflow.

Your user will authenticate on their computer or smartphone, and Auth0 will generate an Access Token that will be passed back to your device application. The Access Token can then be used to call your API.

This flow can be used with native applications only.

## How it works

When your app needs to fetch user data from your API:

1. If the device is not already authorized, your device app calls your Auth0 Authorization Server to retrieve a device code.
2. Auth0 responds with a URL and user code that your device app can use when asking the user to visit a specific URL on their laptop or smartphone and provide an activation code.
3. Your device app begins to poll your Auth0 Authorization Server for an Access Token.
4. The user authenticates with Auth0 on its computer or smartphone using one of your configured login options (e.g., username/password, social identity provider, SAML).
5. Auth0 responds to your device app with an Access Token.
6. The Access Token can be used to call your API and retrieve requested data.

For devices, Auth0 uses the [Device Authorization Flow](/flows/concepts/device-auth).

<img src="/media/articles/microsites/overview-flow-call-api-device-app.png" alt="Flow Overview for Device Apps" width="100%">

## Implementation overview

::: steps
  1. <h4>Configure your API</h4>Once you have created your API, you will need to authorize your device's application and configure any scopes that applications can request during authorization.

  2. <h4>Get an Access Token</h4>Your device requests an Access Token from your Auth0 Authorization Server using the <a href="/flows/concepts/device-auth">Device Authorization Flow</a>.

  3. <h4>Call your API</h4>When your device calls your API, it includes the retrieved Access Token in the HTTP Authorization header.
:::


To implement the Device Authorization Flow, you can follow our tutorial: [Call Your API Using the Device Authorization Flow](/flows/guides/device-auth/call-api-device-auth).

:::: further-reading

::: guides
  * [Auth0 Backend/API Quickstarts](/quickstart/backend)
  * [Call Your API Using the Device Authorization Flow](/flows/guides/device-auth/call-api-device-auth)
  * [Change scopes and add custom claims to tokens using hooks](/api-auth/tutorials/client-credentials/customize-with-hooks)
  * [Token Storage](/tokens/concepts/token-storage)
:::

::: references
  * [SDKs](/libraries)
  * [Auth0 Authentication API](/api/authentication)
  * [OAuth 2.0](/protocols/oauth2)
:::

::: concepts  
  * [Access Tokens](/tokens/concepts/access-tokens)
:::

::::

::: whats-next
  * The device authorization flow works for native apps. Learn how to [Add Login to Your Native/Mobile App](/microsites/add-login/add-login-native-mobile-app)
  * Auth0 offers many ways to personalize your user's login experience and customize tokens using [rules](/rules) and [hooks](/hooks).[;]
  "
  * If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
  * Learn more about the ways Auth0 can help you [manage user profiles](/microsites/manage-users/manage-users-and-user-profiles) and [maintain custom user data](/microsites/manage-users/define-maintain-custom-user-data).
:::
