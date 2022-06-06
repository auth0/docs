---
name: application.yml
language: yaml
---
```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          auth0:
            client-id: ${account.clientId}
            client-secret: YOUR_CLIENT_SECRET
            scope:
              - openid
              - profile
              - email
        provider:
          auth0:
            # trailing slash is important!
            issuer-uri: https://${account.namespace}/
```