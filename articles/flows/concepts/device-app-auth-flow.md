---
description: Learn how the Device Authorization flow works and why you should use it for input-constrained device apps.
topics:
  - input-constrained-devices
  - client-credentials
  - api-authorization
  - grants
  - authentication
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Input-constrained Device Authorization Flow

Device flow enables end-users to authorize devices with input constraints or applications running on devices with input constraints (such as a smart TV or smart thermostat).

## How it works

### Part 1: Device browser flow

![Input-constrained Device Browser Authorization Sequence](/media/articles/flows/concepts/device-browser-flow.png)

1. The end-user starts the application on the smart TV.
2. The application is currently not authorized to access the end-user's account (it doesn't even know who the end-user is).
3. The application communicates with the OAuth server (Auth0) identifying itself and makes an authorization request (client ID, scope, and potentially a client secret).
4. The server responds with a device code, a user code, a verification url, user code lifetime, a polling interval, and a friendly message for display.
5. The smart TV displays instructions, the user code (above: MMYNTZ) and the verification url (in one form or another) to the user. This could also take the form of a QR code or shortened URL with the user code embedded.
6. The smart TV begins polling the authorization server at the specified interval requesting access and continues polling until either the user completes the device flow process or the lifetime expires.

### Part 2: Secondary device flow

![Input-constrained Device Authorization Sequence](/media/articles/flows/concepts/device.png)

1. Using a second device with an Internet browser–such as a laptop or smartphone–the user navigates to the verification url.
2. On the second device, the user enters the code displayed on the smart TV. This step would be skipped if the user code was embedded in the verification url.
3. The browser on the second device then completes the Auth0 authentication flow, either continuing an existing session or prompting the user to log in with username / password.
4. The browser displays a confirmation prompt, informing the user that the smart TV wants to access their account.
5. The browser then displays an accepted or denied prompt, based on the validity of the user code.
6. If the code is verified, the application on the smart TV is authorized to access the protected resources, stops polling, and enables the user to start using it. Auth0 issues an access token and a refresh token; the device remains authenticated by using RT to get new AT.
7. If the code is invalid, the application on the smart TV is not authorized to access the protected resources, stops polling, and should ideally display a helpful message to the end-user.
8. ?

## How to implement it

You can also follow our tutorial to [Add Authorization Using OAuth2 Device Authorization Grant Flow](/flows/guides/device-flow/add-auth-using-device-app-grant-flow).

## Keep reading

* 