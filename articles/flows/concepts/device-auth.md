---
title: Device Authorization Flow
description: Learn how the Device Authorization flow works and why you should use it for input-constrained devices, such as smart TVs and media consoles. For use with native apps.
topics:
  - input-constrained-devices
  - client-credentials
  - api-authorization
  - grants
  - flows
  - authorization
  - mobile-apps
  - desktop-apps
  - native-apps
contentType: concept
useCase:
  - add-login
  - secure-api
  - call-api
---
# Device Authorization Flow

With devices that connect wirelessly to the internet, rather than authenticate the user directly, the device asks the user to go to a link on their computer or smartphone and authorize the device. This avoids a poor user experience for devices that do not have an easy way to enter text. To do this, device apps use the Device Authorization Flow (drafted in [OAuth 2.0](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15)), in which they pass along their Client ID to initiate the authorization process and get a token.

## How it works

The Device Authorization Flow contains two different paths; one occurs on the device requesting authorization and the other occurs in a browser. The browser flow path, wherein a device code is bound to the session in the browser, occurs in parallel to part of the device flow path.

![Device Authorization Sequence](/media/articles/flows/concepts/auth-sequence-device-auth.png)

### Device Flow

1. The user starts the app on the device.
2. The device app requests authorization from the Auth0 Authorization Server using its Client ID (**/device/code** endpoint).
3. The Auth0 Authorization Server responds with a `device_code`, `user_code`, `verification_uri`, `expires_in` (lifetime in seconds for `device_code` and `user_code`), and polling `interval`.
4.  The device app asks the user to activate using their computer or smartphone and displays the `verification_uri` and `user_code`. (Instead of the user code, the app could also display a QR code or shortened URL with embedded user code.)
5. The device app begins polling your Auth0 Authorization Server for an Access Token (**/token** endpoint) using the time period specified by `interval`. The device app continues polling until either the user completes the browser flow path or the user code expires.
6. When the user successfully completes the browser flow path, your Auth0 Authorization Server responds with an Access Token (and optionally, a Refresh Token). The device app should now forget its `device_code` because it will expire.
7. Your device app can use the Access Token to call an API to access information about the user.
8. The API responds with requested data.

### Browser Flow

1. The user visits the `verification_URL` on their computer. If the `user_code` is not embedded in the `verification_URL`, then the user enters the `user_code`.
2. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
3. The user authenticates using one of the configured login options and may see a consent page asking to authorize the device app.
4. If the `user_code` is valid, when the user consents, your device app is authorized to access the API.

## How to implement it

The easiest way to implement the Device Authorization Flow is to follow our tutorial: [Add Authorization Using the Device Authorization Flow](/flows/guides/device-auth/add-auth-device-auth).

## Revoking Device Authorizations

To revoke a device authorization, you must revoke the [Refresh Token](/tokens/refresh-token/current#revoke-a-refresh-token) assigned to the device. To learn how, see [Remove Devices from Users](/dashboard/guides/users/remove-devices-users).

## Keep reading

- Auth0 offers many ways to customize your tokens using [rules](/rules) and [hooks](/hooks).
- [Tokens used by Auth0](/tokens)

