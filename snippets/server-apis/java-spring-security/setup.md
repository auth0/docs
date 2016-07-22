```properties
auth0.domain=${account.namespace}
auth0.issuer: https://${account.tenant}.auth0.com/
auth0.clientId=${account.clientId}
auth0.clientSecret=${account.clientSecret}
auth0.securedRoute=/api/v1/**
auth0.base64EncodedSecret: true
auth0.authorityStrategy: ROLES
auth0.defaultAuth0ApiSecurityEnabled: false
```