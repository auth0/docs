## Before you start

The MFA endpoints require an [Access Token](/tokens/access-token) with:

* `audience`: Set to `https://${account.namespace}/mfa`
* `scope`: Include `enroll` for enrollment, `read:authenticators` to list authenticators, and `remove:authenticators` to delete authenticators.

For example:

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/token",
  "headers": [{
    "name": "Content-Type", "value": "application/json"
  }],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"grant_type\":\"password\",\"username\": \"user@example.com\",\"password\": \"pwd\",\"audience\": \"https://${account.namespace}/mfa\", \"scope\": \"enroll read:authenticators remove:authenticators\", \"client_id\": \"${account.clientId}\", \"client_secret\": \"YOUR_CLIENT_SECRET\"}"
  }
}
```

[Resource Owner Password Grant & MFA: Ask for a Token](/api-auth/tutorials/password-grant#ask-for-a-token)