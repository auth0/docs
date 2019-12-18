---
title: Embedded Passwordless Login in Native Applications
description: Embedded Passwordless Login in Native Applications
toc: true
topics:
    - connections
    - passwordless
    - authentication
---

# Embedded Passwordless Login in Native Applications

To use the Embedded Passwordless APIs in Native applications, make sure you enable the **Passwordless OTP** grant in [Dashboard > Applications > (YOUR APPLICATION) > Settings > Advanced Settings > Grant Types](${manage_url}).

Passwordless authentication for Native applications consists of two steps:

- Capture the user identifier in your application (the user's email or phone number) and invoke the `/passwordless/start` endpoint to initiate the passwordless flow. The user will get an email or an SMS with a one-time password.

- Prompt the user for the one-time-use code, and call the `/oauth/token` endpoint to get authentication tokens.

Below we list a few code snippets that can be used to call these API endpoints for different scenarios.

- [Lock Android Passwordless](/libraries/lock-android/passwordless)
- [Lock iOS Passwordless](/libraries/lock-ios/passwordless)
- [Auth0.Swift Passwordless](/libraries/auth0-swift/passwordless)
- [Auth0.Android Passwordless](/libraries/auth0-android/passwordless)

**Send a one-time-use password via Email**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/passwordless/start",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"${account.clientId}\",  \"connection\": \"email\",   \"email\": \"USER_EMAIL\",  \"send\": \"code\"}"
  }
}
```

**Send a Magic via Email**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/passwordless/start",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"client_id\": \"${account.clientId}\", \"connection\": \"email\", \"email\": \"USER_EMAIL\", \"send\": \"link\"}"}
}
```

**Send a one-time-use password via SMS**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/passwordless/start",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"client_id\": \"${account.clientId}\",  \"connection\": \"sms\",  \"phone_number\": \"USER_PHONE_NUMBER\", \"send\": \"code\"}"
  }
}
```

**Authenticate an SMS user**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth-token",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{ \"grant_type\": \"http://auth0.com/oauth/grant-type/passwordless/otp\",  \"client_id\": \"${account.clientId}\",  \"username\": \"USER_PHONE_NUMBER\",  \"otp\": \"code\",  \"realm\": \"sms\", \"audience\": \"your-api-audience\", \"scope\": \"opend profile email\"}"
  }
}
```

**Authenticate an Email user**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth-token",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\": \"http://auth0.com/oauth/grant-type/passwordless/otp\", \"client_id\": \"${account.clientId}\", \"username\": \"USER_EMAIL\", \"otp\": \"code\", \"realm\": \"email\", \"audience\": \"your-api-audience\", \"scope\": \"opend profile email\"}"
  }
}
```
Auth0's SDKs for mobile platforms (Android, iOS) have been updated to support these endpoints:
