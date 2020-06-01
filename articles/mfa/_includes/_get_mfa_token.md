

There are two ways of getting a token for the MFA API;

* Requesting an Access Token with the `https://${account.namespace}/mfa` audience and the scopes you need (`enroll`, `read:authenticators`, `delete:authenticators`).
  - You can do this using by redirecting to `/authorize` while using [Universal Login](/universal-login) or the using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant). 
  - If you are already including an `audience` parameter when authenticating with those flows, you'll need to make an additional request, specifying the `https://${account.namespace}/mfa` audience.
  - If you want to use an MFA Access Token at any moment during the application lifetime, you can request the `offline_access` scope and get a [Refresh Token](/tokens/concepts/refresh-tokens) to renew it.

* As part of the [Resource Owner Password Grant](/api-auth/tutorials/password-grant) flow:
  - When users authenticate using the `/oauth/token` endpoint while MFA is enabled, Auth0 will return an `mfa_required` error together with an `mfa_token` you can use to call other MFA API endpoints. This token can't be refreshed, so you can only use it during the authentication flow. 

  ```har
  {
    "method": "POST",
    "url": "https://${account.namespace}/oauth/token",
    "headers": [
      { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
    ],
    "postData": {
      "mimeType": "application/x-www-form-urlencoded",
      "params": [
        {
          "name": "grant_type",
          "value": "password"
        },
        {
          "name": "username",
          "value": "user@example.com"
        },
        {
          "name": "password",
          "value": "pwd"
        },
        {
          "name": "client_id",
          "value": "${account.clientId}"
        },
        {
          "name": "client_secret",
          "value": "YOUR_CLIENT_SECRET"
        },
        {
          "name": "audience",
          "value": "https://someapi.com/api"
        },
        {
          "name": "scope",
          "value": "read:sample"
        }
      ]
    }
  }
  ```

  The response will include the `mfa_required` error and a `mfa_token`:

  ```json
  {
    "error": "mfa_required",
    "error_description": "Multifactor authentication required",
    "mfa_token": "Fe26...Ha"
  }
  ```