```properties
auth0.domain: ${account.namespace}
auth0.issuer: https://${account.namespace}/
auth0.clientId: ${account.clientId}
auth0.clientSecret: ${account.clientSecret}
auth0.onLogoutRedirectTo: /login
auth0.securedRoute: /portal/*
auth0.loginCallback: /callback
auth0.loginRedirectOnSuccess: /portal/home
auth0.loginRedirectOnFail: /login
auth0.servletFilterEnabled: true
auth0.signingAlgorithm: HS256
#auth0.signingAlgorithm: RS256
#auth0.publicKeyPath: /WEB-INF/certificate/cert.pem
```
