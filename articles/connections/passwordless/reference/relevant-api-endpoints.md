---
title: Relevant API Endpoints for Passwordless Connections
topics:
    - connections
    - passwordless
    - api
contentType: reference
useCase: customize-connections
---
# Relevant API Endpoints for Passwordless Connections

When working with Passwordless Connections, the following API endpoints will be helpful to you.

## POST /passwordless/start

The [POST /passwordless/start](/api/authentication#get-code-or-link) endpoint can be called to begin the Passwordless authentication process. Depending on the parameters provided to the endpoint, Auth0 begins the user verification process by sending one of the following:

* A single-use code via email or SMS message
* A single-use link via email

## /oauth/token

An alternative option is to call the passwordless endpoints yourself. This is **not an option for Single-Page Applications**, which should use Universal Login, but is available for Native Apps or for Regular Web Apps. First, you must turn on the **Passwordless OTP** grant in your [Dashboard > Applications > (YOUR APPLICATION) > Settings > Advanced Settings > Grant Types](${manage_url}). Once this is done, you call the `passwordless/start` endpoint:

```json
POST https://YOUR_AUTH0_DOMAIN/passwordless/start
Content-Type: application/json
{
"client_id": "${account.clientid}",
“client_secret”: “YOUR_CLIENT_SECRET”, // only required for Web Apps as Native apps don’t have a client secret
"connection": "email", // accepts "email" or "sms"
"email": "EMAIL", // Value should be the user's email for connection=email; for sms, use "phone_number": "PHONE_NUMBER"
"send": "code",
"authParams": { // any authentication parameters that you would like to add
   "scope": "openid",
   "state": "YOUR_STATE" // Fill in your unique state here
   }
}
```

The user will then receive the OTP code (either by email or sms, whichever you chose). Your application will prompt the user for that code to complete the authentication flow. When the user enters the code, you can complete the authentication flow by calling the `/oauth/token` endpoint with the following parameters:

```json
POST https://YOUR_AUTH0_DOMAIN/oauth/token
Content-Type: application/json
{
  “grant_type” : “http://auth0.com/oauth/grant-type/passwordless/otp”
  "client_id": "${manage_url}",
  "client_secret": "YOUR_CLIENT_SECRET", // only for web apps, native apps don’t have a client secret
  "otp": "CODE",
  “audience” : “api-audience”,
  "realm": "email", // or "sms" 
  “username”:”<email address>”, // or "<phone number>"
  "scopes": "openid profile email"
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