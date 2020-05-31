
When using Universal Login, users usually get prompted to enroll an MFA factor the first time they authenticate. 

If you want to call the MFA API after the user is logged in, to retrieve the enrolled factors, enroll an additional one, or remove an existing one, you need to obtain an Access Token for the `https://${account.namespace}/mfa` audience and the `enroll` scope. You can do it by specifying that audience as part the initial authentication request, or in a different one. In the latter case you need to redirect twice to `/authorize` part of the login flow. To be able to call MFA API endpoints make sure you request for the `enroll read:authenticators remove:authenticators` scopes.

When using the Resource Owner Password Grant, when users try to authenticate without an active authenticator associated with their account, or if they already have an MFA factor enrolled, Auth0 will return an `mfa_required` error when calling the `/oauth/token` endpoint. 

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

The response will include the `mfa_required` error and a `mfa_token` that you can use for any other call to the MFA API:

```json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "Fe26...Ha"
}
```