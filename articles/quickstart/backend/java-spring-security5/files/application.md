---
name: application.yml
language: yaml
---
```yaml
auth0:
  audience: ${apiIdentifier}
spring:
  security:
    oauth2:
        resourceserver:
            jwt:
                issuer-uri: https://${account.namespace}/
```