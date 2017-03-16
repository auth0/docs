---
description: How to request tokens for your applications.
---

# Execute a Client Credentials Grant

## Prerequisites

Your client app must be authorized to access your API before you can request tokens.

You can go to the **Non Interactive Clients** tab of your API in the [APIs section](${manage_url}/#/apis) of the dashboard to verify that the app you are using has been authorized to request access tokens from this API.

To add an authorized app, follow the instructions as described in [Set up a Client Credentials Grant using the Dashboard](/api-auth/config/using-the-auth0-dashboard).

## Ask for a Token

To ask Auth0 for tokens for any of your authorized client applications, perform a `POST` operation to the `https://${account.namespace}/oauth/token` endpoint with a payload in the following format:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"client_credentials\",\"client_id\": \"${account.clientId}\",\"client_secret\": \"${account.clientSecret}\",\"audience\": \"YOUR_API_IDENTIFIER\"}"
  }
}
```

The response will be a [signed JWT (JSON Web Token)](/jwt#2-body) containing at least the following claims in the body:

```
{
  "iss": "https://${account.namespace}/",
  "sub": "${account.clientId}@clients",
  "aud": "YOUR_API_IDENTIFIER",
  "exp": // unix timestamp of the token's expiration date,
  "iat": // unix timestamp of the token's creation date,
  "scope": ""
}
```

### Where to Find the IDs

To find the values for the parameters referred to in this sample, go to the [Clients](${manage_url}/#/clients) page in the Dashboard, and select the application you want to use. There you will find these values:

  * `CLIENT_ID`: This is the value of the **Client ID** field.
  * `CLIENT_SECRET`: This is the value of the **Client Secret** field.

Also, go to the [APIs section](${manage_url}/#/apis) of the dashboard and select the API you are working with. There you will find this value:

  * `YOUR_API_IDENTIFIER`: This is the value of the **Id** field on the Settings tab of the API.

## Verify the Token

Once your API receives a request with a Bearer `access_token`, the first thing to do is to validate the token. This consists of a series of steps, and if any of these fails then the request _must_ be rejected.

For details on the validations that should be performed by the API, refer to [Verify Access Tokens](/api-auth/tutorials/verify-access-token).
