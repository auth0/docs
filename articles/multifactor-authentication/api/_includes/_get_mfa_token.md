When a user begins the authorization process without an active authenticator associated with their account, they will trigger the an `mfa_required` error when calling the `/oauth/token` endpoint. The request might look something like this:

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

However, if MFA is required for this user, the `mfa_required` error will look like this:

```json
{
  "error": "mfa_required",
  "error_description": "Multifactor authentication required",
  "mfa_token": "Fe26...Ha"
}
```

In the next step, use the MFA token (`mfa_token`) received in this response instead of the standard <dfn data-key="access-token">Access Token</dfn> to request association of a new authenticator.