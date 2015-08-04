Add the following keys to your `application.conf`

```properties
# Auth0 Information
# ~~~~~~~~~~~~~~~~~~~~~~~

auth0.clientSecret="${account.clientSecret}"
auth0.clientId="${account.clientId}"
auth0.domain="${account.namespace}"
auth0.callbackURL="http://localhost:9000/callback"
```
