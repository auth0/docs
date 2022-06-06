---
name: .env
language: shell
---

```shell
# This tells the Auth0 Laravel SDK about your use case to customize its behavior.
# The 'api' strategy is used for backend API applications like we're building here.
AUTH0_STRATEGY=api

# The URL of your Auth0 tenant domain
# You'll find this in your Auth0 Application's settings page.
AUTH0_DOMAIN=${account.namespace}

# Your Auth0 application's Client ID
# You'll find this in your Auth0 Application's settings page.
AUTH0_CLIENT_ID=${account.clientId}

# Your Auth0 Custom API identifier/audience.
# You'll find this in your Custom API's settings page.
AUTH0_AUDIENCE=${apiIdentifier}
```