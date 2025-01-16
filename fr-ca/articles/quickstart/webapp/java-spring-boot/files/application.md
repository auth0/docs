---
name: application.yml
language: yaml
---
```yaml
okta:
  oauth2:
    issuer: https://${account.namespace}/
    client-id: ${account.clientId}
    client-secret: YOUR_CLIENT_SECRET
```