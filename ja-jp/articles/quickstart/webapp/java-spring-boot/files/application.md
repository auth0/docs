---
name: application.yml
language: javascript
---
    
```javascript
okta:
  oauth2:
    issuer: https://${account.namespace}/
    client-id: ${account.clientId}
    client-secret: ${account.clientSecret}
```
