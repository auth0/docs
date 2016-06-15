```properties
auth0.domain: ${account.namespace}
auth0.clientId: ${account.clientId}
auth0.clientSecret: ${account.clientSecret}
auth0.onLogoutRedirectTo: /login
auth0.securedRoute: /portal/*
auth0.loginCallback: /callback
auth0.loginRedirectOnSuccess: /portal/home
auth0.loginRedirectOnFail: /login
auth0.servletFilterEnabled: true
```
