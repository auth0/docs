---
name: config/auth0.yml
language: yml
---

```yaml
development:
  auth0_domain: ${account.namespace}
  auth0_client_id: ${account.clientId}
  auth0_client_secret: <YOUR AUTH0 CLIENT SECRET>
```