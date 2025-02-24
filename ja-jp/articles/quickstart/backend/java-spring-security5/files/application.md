---
name: application.yml
language: yaml
---
```yaml
okta:
  oauth2:
    # Replace with the domain of your Auth0 tenant.
    issuer: https://${account.namespace}/
    # Replace with the API Identifier for your Auth0 API.
    audience: ${apiIdentifier}
```