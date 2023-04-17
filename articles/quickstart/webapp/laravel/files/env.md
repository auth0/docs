---
name: .env
language: shell
---

```shell
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

# Authentication callback URI, as defined in your Auth0 Application settings.
# (You must configure this in your AUth0 Application's settings page as well!)
AUTH0_REDIRECT_URI=http://localhost:3000/callback
```
