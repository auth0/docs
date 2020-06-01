

There are two ways of getting a token for the MFA API;

* Requesting an Access Token with the `https://${account.namespace}/mfa` audience and the scopes you may need (`enroll`, `read:authenticators`, `delete:authenticators`)
  - You can do this using by redirecting to `/authorize` while using [Universal Login](/universal-login) or the using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant). 
  - If you are already including an `audience` parameter when authenticating with those flows, you'll need to make an additional request including the `https://${account.namespace}/mfa` audience.
  - If you want to use the MFA Access Token at any moment during the application lifetime, you can request the `offline_access` scope and use a Refresh Token to renew it.

* As part of the [Resource Owner Password Grant](/api-auth/tutorials/password-grant) flow:
  - You'll get a token that can only be used while authenticating, and cannot be refreshed. 
  - When users try to authenticate without an active authenticator associated with their account, or if they already have an MFA factor enrolled, Auth0 will return an `mfa_required` code, together with an `mfa_token` you can use to call other MFA API endpoints:

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