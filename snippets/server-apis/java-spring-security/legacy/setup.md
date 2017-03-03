```properties
auth0.domain:${account.namespace}
auth0.issuer:https://${account.namespace}/
auth0.clientId:${account.clientId}
auth0.clientSecret:${account.clientSecret}
auth0.securedRoute: NOT_USED
auth0.base64EncodedSecret: false
auth0.authorityStrategy: ROLES
auth0.defaultAuth0ApiSecurityEnabled: false
auth0.signingAlgorithm: HS256
#auth0.signingAlgorithm: RS256
#auth0.publicKeyPath: certificate/cert.pem
```
