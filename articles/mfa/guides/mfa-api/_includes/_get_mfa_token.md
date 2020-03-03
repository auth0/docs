
When using Universal Login, users get prompted to enroll an MFA factor the first time they authenticate. If you want to provide end users a way to enroll an additional factor, you need to obtain an Access Token for the `https://${account.namespace}/mfa` audience and the `enroll` scope. You can do it by specifying that audience as part the initial authentication request, or in a different one.

When using the Resource Owner Password Grant, when users try to authenticate without an active authenticator associated with their account, Auth0 will return an `mfa_required` error when calling the `/oauth/token` endpoint. The request might look something like this:

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

The response will include the `mfa_required` error and a `mfa_token` that you can use when calling the `/mfa/associate` endpoint to enroll your first authenticator.

```json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "Fe26...Ha"
}
```