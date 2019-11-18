---
title: Using Passwordless APIs
topics:
    - connections
    - passwordless
    - api
contentType: reference
useCase: customize-connections
---
# Implementing Passwordless using APIs

Passwordless APIs can be used in two scenarios:

- When implementing Universal Login, and you want to build your own user interface, using auth0.js to interact with Auth0. 
- When you want to embed the login flow in your application. 

If you decide to embed login, please make sure you understand the [security implications](/guides/login/universal-vs-embedded).

## POST /passwordless/start

The [POST /passwordless/start](/api/authentication#get-code-or-link) endpoint can be called to begin the Passwordless authentication process, for both Universal Login or Embedded Login.

Depending on the parameters provided to the endpoint, Auth0 begins the user verification process by sending one of the following:

* A single-use code via email or SMS message
* A single-use link via email

The API call needs to have the following structure:

```json
POST https://YOUR_DOMAIN/passwordless/start
Content-Type: application/json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET", // For Regular Web Applications
  "connection": "email|sms",
  "email": "EMAIL", //set for connection=email
  "phone_number": "PHONE_NUMBER", //set for connection=sms
  "send": "link|code", //if left null defaults to link
  "authParams": { // any authentication parameters that you would like to add
    "scope": "openid",
    "state": "YOUR_STATE"
  }
}
```

If you use a magic link, Auth0 will redirect the user to the application after the link is clicked, and the user will be logged-in.

If you use a code, your application will need to prompt for that code, and then you should use `oauth/token` or Auth0.js' `passwordlessLogin` method to exchange that code for authentication tokens.

## /oauth/token

If you are implementing passwordless for Native applications or Regular Web Applications, you need to use `/oauth/token` to exchange the OTP code for authentication tokens. You can't use this endpoint from Single Page Applications.

To achieve this you first need to enable the **Passwordless OTP** grant for your application in [Dashboard > Applications > (YOUR APPLICATION) > Settings > Advanced Settings > Grant Types](${manage_url}). 

The user will receive the OTP code and your Native or Web application will prompt the user for it. When the user enters the code, you can complete the authentication flow by calling the `/oauth/token` endpoint with the following parameters:

```json
POST https://YOUR_AUTH0_DOMAIN/oauth/token
Content-Type: application/json
{
  "grant_type" : "http://auth0.com/oauth/grant-type/passwordless/otp",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET", // only for web apps, native apps don’t have a client secret
  "otp": "CODE",
  "audience" : "your-api-audience", // in case you need an access token for a specific API
  "realm": "email", // or "sms" 
  "username":"<email address>", // or "<phone number>"
  "scopes": "openid profile email" // whatever scopes you need
}
```

If all went well, Auth0 will return a response similar to the following:

```json
HTTP/1.1 200 OK
Content-Type: application/json
{
"access_token":"eyJz93a...k4laUWw",
"refresh_token":"GEbRxBN...edjnXbL",
"id_token":"eyJ0XAi...4faeEoQ",
"token_type":"Bearer",
"expires_in":86400
}
```

You can then decode the ID Token to get information about the user, or use the Access Token to call your API as normal.

## Using Auth0.js

When implementing Passwordless Authentication in Single Page Applications or in a custom login page, you should use Auth0.js [`passwordlessLogin`](/https://auth0.com/docs/libraries/auth0js/v9#verify-passwordless) method. The implementation is complex, so we recommend that you use the library instead of calling the APIs directly.

## Rate Limiting in Passwordless Endpoints

Auth0 rate limits and anomaly detection features consider the IP from the machine that is making the API call. When the API call is made from a backend server, you usually want Auth0 to consider the IP from the end user, not the one from the server.

Auth0 supports specifying an `auth0-forwarded-for` header in API calls, but it's only considered when:

- The call is made for a confidential application
- The API call includes the client secret
- The 'Trust Token Endpoint IP Header' toggle is ON

For a complete explanation check [this document](/api-auth/tutorials/using-resource-owner-password-from-server-side#configuring-the-auth0-application-to-receive-and-trust-the-ip-sent-by-your-server).
