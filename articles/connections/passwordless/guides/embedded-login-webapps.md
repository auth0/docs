---
title: Embedded Passwordless Login in Regular Web Applications
description: Embedded Passwordless Login in Regular Web Applications
toc: true
topics:
    - connections
    - passwordless
    - authentication
---

# Embedded Passwordless Login in Regular Web Applications

To use the Embedded Passwordless APIs in Regular Web Applications, make sure you enable the **Passwordless OTP** grant in [Dashboard > Applications > (YOUR APPLICATION) > Settings > Advanced Settings > Grant Types](${manage_url}).

Passwordless authentication for Regular Web Applications consists of two steps:

- Capture the user identifier in your application (the user's email or phone number) and invoke the `/passwordless/start` endpoint to initiate the passwordless flow. The user will get an email, an SMS with a one-time-use code or a magic link.

- If you did not send a magic link, you need to prompt the user for the one-time-use code, and call the `/oauth/token` endpoint to get authentication tokens.

Note that when using magic links, you don't need to call `/oauth/token`. The user will click the magic link and it will be redirected to the application's callback URL.

Below we list a few code snippets that can be used to call these API endpoints for different scenarios. Auth0 SDKs for backend technologies (Java, .NET, Ruby, PHP, Python, Node JS) haven't been updated yet to support these endpoints, so you will need to invoke them directly.

**Send a one-time-use code via Email**

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
    "text": "{\"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"connection\": \"email\", \"email\": \"USER_EMAIL\",\"send\": \"code\"}"
  }
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
    "text": "{\"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"connection\": \"sms\", \"phone_number\": \"USER_PHONE_NUMBER\",\"send\": \"code\"}"
  }
}
```

**Authenticate an SMS user**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\": \"http://auth0.com/oauth/grant-type/passwordless/otp\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"username\": \"USER_PHONE_NUMBER\", \"otp\": \"code\", \"realm\": \"sms\", \"audience\": \"your-api-audience\",\"scope\": \"opend profile email\"}"
  }
}
```

**Authenticate an Email user**

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [{
    "name": "Content-Type",
    "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\": \"http://auth0.com/oauth/grant-type/passwordless/otp\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\", \"username\": \"USER_EMAIL\", \"otp\": \"code\", \"realm\": \"email\", \"audience\": \"your-api-audience\", \"scope\": \"opend profile email\"}"}
}
```

<%= include('../_includes/_rate_limit_server_side') %>

## Migrating from Legacy Implementations

In the past, you could implement this scenario by using features that we now deprecated:

- Unauthenticated calls to `/passwordless/start`. Check the [migration guide](/migrations/guides/passwordless-start).
- Use the `/oauth/ro` endpoint to exchange the one-time-use code for authentication tokens. Check the [migration guide](/migrations/guides/migration-oauthro-oauthtoken-pwdless).
