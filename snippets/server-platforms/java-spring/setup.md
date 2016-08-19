```properties
auth0.domain: {DOMAIN}
auth0.issuer: {ISSUER}
auth0.clientId: {CLIENT_ID}
auth0.clientSecret: {CLIENT_SECRET}
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
