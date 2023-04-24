---
name: .env
language: shell
---

```shell
APP_URL=http://localhost:8000

# The URL of your Auth0 tenant domain
# You'll find this in your Auth0 Application's settings page.
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's Client ID
# You'll find this in your Auth0 Application's settings page.
AUTH0_CLIENT_ID=${account.clientId}

# Your Auth0 application's Client Secret
# You'll find this in your Auth0 Application's settings page.
AUTH0_CLIENT_SECRET=${account.clientSecret}

# Your Auth0 Custom API identifier/audience.
# You'll find this in your Custom API's settings page.
AUTH0_AUDIENCE=${apiIdentifier}

# Used for encrypting session cookies. This should be a long, secret value.
# You can generate a suitable string using `openssl rand -hex 32`.
AUTH0_COOKIE_SECRET=
```
