---
description: Describes how to determine if a user has done multifactor authentication using their id_token and JWT
---

## Determine if a user has performed multifactor authentication

At times, it's necessary to determine if a particular user has had the additional security of multifactor authentication applied to their session. For instance, a user may be allowed access to sensitive data or allowed to reset their password only after further confirming their identity using MFA.

For a particular user session, developers can check the claims information available on the `id_token`, a [JSON Web Token](/jwt) provided by Auth0 that contains claims information relevant to the user's session. After [retrieving the id_token](/tokens/id_token), the value of the `amr` field can be evaluated to see if it contains `mfa` as a claim.

Note that `amr` can contain claims other than `mfa`, so its existence is not a sufficient test. Its contents must be examined for the `mfa` claim.

This example is built on top of the [JSON Web Token Sample Code](https://github.com/auth0/node-jsonwebtoken).

```js
const AUTH0_CLIENT_SECRET = '${account.clientSecret}';
const jwt = require('jsonwebtoken')

jwt.verify(id_token, AUTH0_CLIENT_SECRET, { algorithms: ['HS256'] }, function(err, decoded) {
   if (err) {
     console.log('invalid token');
     return;
   }

   if (Array.isArray(decoded.amr) && decoded.amr.indexOf('mfa') >= 0) {
     console.log('You used mfa');
     return;
   }

   console.log('you are not using mfa');
 });
```
## Further reading

* [Auth0 id_token](/tokens/id_token)
* [Overview of JSON Web Tokens](/jwt)
* [OpenID and amr](http://openid.net/specs/openid-connect-core-1_0.html)
* [JSON Web Token Example](https://github.com/auth0/node-jsonwebtoken)
