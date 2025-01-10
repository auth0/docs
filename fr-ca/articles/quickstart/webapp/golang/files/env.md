---
name: .env
language: shell
---

```shell
# Save this file in ./.env

# The URL of our Auth0 Tenant Domain.
# If you're using a Custom Domain, be sure to set this to that value instead.
AUTH0_DOMAIN='${account.namespace}'

# Our Auth0 application's Client ID.
AUTH0_CLIENT_ID='${account.clientId}'

# Our Auth0 application's Client Secret.
AUTH0_CLIENT_SECRET='${account.clientSecret}'

# The Callback URL of our application.
AUTH0_CALLBACK_URL='http://localhost:3000/callback'
```
