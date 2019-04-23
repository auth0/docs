---
title: Device Authorization Flow
description: Learn how the Device Authorization flow works and why you should use it for input-constrained devices, such as smart TVs, media consoles, and other internet-of-things devices.
topics:
  - input-constrained-devices
  - client-credentials
  - api-authorization
  - grants
  - flows
  - authorization
  - device-apps
  - internet-of-things
contentType: concept
useCase:
  - add-login
  - secure-api
  - call-api
---
# Device Authorization Flow

With devices that connect wirelessly to the internet, rather than authenticate the user directly, the device asks the user to go to a link on their computer or smartphone and authorize the device. This avoids a poor user experience for devices that do not have an easy way to enter text. To do this, device apps use the Device Authorization Flow (drafted in [OAuth 2.0](https://tools.ietf.org/html/draft-ietf-oauth-device-flow-15)), in which they pass along their Client ID to initiate the authorization process and get a token.

## How it works

![Device Authorization Sequence](/media/articles/flows/concepts/device.png)

1. The user starts the app on the device.
2. The device app requests authorization from the Auth0 Authorization Server using its Client ID (**/device/code** endpoint).
3. The Auth0 Authorization Server responds with a device code, user code, verification URL, user code lifetime, and polling interval.
4. The device app displays the verification URL and user code to the user and asks them to activate using their computer or smartphone,
5. The device app begins polling the Auth0 Authorization Server for an Access Token (**/token** endpoint) using the polling interval.
6. The user visits the verification URL on their computer or smartphone and enters the user code.
7. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
8. The user authenticates using one of the configured login options and sees a consent page asking to authorize the device app.



3. Your Auth0 Authorization Server responds with an Access Token.
4. Your application can use the Access Token to call an API on behalf of itself.
5. The API responds with requested data.




1. The user goes to the verification URL within a browser on its computer or smartphone.
3. Auth0's SDK redirects the user to the Auth0 Authorization Server ([**/authorize** endpoint](/api/authentication#authorization-code-grant-pkce-)) along with the `code_challenge`.
4. Your Auth0 Authorization Server redirects the user to the login and authorization prompt.
5. The user authenticates using one of the configured login options and may see a consent page listing the permissions Auth0 will give to the mobile application.
6. Your Auth0 Authorization Server stores the `code_challenge` and redirects the user back to the application with an authorization `code`.
7. Auth0's SDK sends this `code` and the `code_verifier` (created in step 2) to the Auth0 Authorization Server ([**/token** endpoint](/api/authentication?http#authorization-code-pkce-)).
8. Your Auth0 Authorization Server verifies the `code_challenge` and `code_verifier`.
9. Your Auth0 Authorization Server responds with an ID Token and Access Token (and optionally, a Refresh Token).
10. Your application can use the Access Token to call an API to access information about the user.
11. The API responds with requested data.




## How it works

In this scenario, the device code is successfully bound to the authorized session on the browser-based device. Note that after the device receives an `access_token` (and optional refresh and identity token) it should forget about it's `device_code` as it will expire.

### Device flow

![Input-constrained Device Authorization Sequence](/media/articles/flows/concepts/device.png)

1. The end-user starts the application on the smart TV.
2. The application is currently not authorized to access the end user's account (it doesn't even know who the end user is).
3. The application communicates with the OAuth server (Auth0) identifying itself and makes an authorization request (client ID, scope, and potentially a client secret).
4. The server responds with a device code, a user code, a verification url, user code lifetime, a polling interval, and a friendly message for display.
5. The smart TV displays instructions, the user code (above: MMYNTZ) and the verification url (in one form or another) to the user. This could also take the form of a QR code or shortened URL with the user code embedded.
6. The smart TV begins polling the authorization server at the specified interval requesting access and continues polling until either the user completes the device flow process or the lifetime expires.

### Browser flow

![Input-constrained Device Browser Authorization Sequence](/media/articles/flows/concepts/device-browser-flow.png)

1. Using a second device with an Internet browser–such as a laptop or smartphone–the user navigates to the verification url.
2. On the second device, the user enters the code displayed on the smart TV. This step would be skipped if the user code was embedded in the verification url.
3. The browser on the second device then completes the Auth0 authentication flow, either continuing an existing session or prompting the user to log in with username / password.
4. The browser displays a confirmation prompt, informing the user that the smart TV wants to access their account.
5. The browser then displays an accepted or denied prompt, based on the validity of the user code.
6. If the code is verified, the application on the smart TV is authorized to access the protected resources, stops polling, and enables the user to start using it. Auth0 issues an access token and a refresh token; the device remains authenticated by using RT to get new AT.
7. If the code is invalid, the application on the smart TV is not authorized to access the protected resources, stops polling, and should ideally display a helpful message to the end-user.








## How to implement it

The easiest way to implement the Device Authorization Flow is to follow our tutorial: [Add Authorization Using the Device Authorization Flow](/flows/guides/device-auth/add-auth-device-auth).

## Keep reading

- Auth0 offers many ways to customize your tokens using [rules](/rules) and [hooks](/hooks).
- [Tokens used by Auth0](/tokens)

