---
title: Step-up Authentication with ID Tokens
description: Describes how to check if a user has logged in with Multifactor Authentication by examining their ID Token
---
# Step-up Authentication with ID Tokens

With Step-up Authentication, applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive information or perform certain transactions.

For instance, a user may be allowed to access views with sensitive data or reset their password only after confirming their identity using Multifactor Authentication (MFA).

When a user logs in you can get an [ID Token](/tokens/id-token) which is a [JSON Web Token](/jwt) that contains information relevant to the user's session, in the form of claims.

The claim that is relevant to this scenario is `amr`. If it contains the value `mfa` then you know that the user has authenticated using MFA. Note the following:
- `amr` **must** be present in the ID Token's payload (if you log in with username/password the claim will not be included in the payload)
- `amr` **must** contain the value `mfa` (`amr` can contain claims other than `mfa`, so its existence is not a sufficient test, its contents must be examined for the value `mfa`)

For a particular user session, developers can check the claims information available on the ID Token, a  provided by Auth0 . After [retrieving the id_token](/tokens/id_token), the value of the `amr` field can be evaluated to see if it contains `mfa` as a claim.

1. Retrieve the ID Token
1. Verify the token's signature. The signature is used to verify that the sender of the token is who it says it is and to ensure that the message wasn't changed along the way.
1. Validate the standard claims: `exp` (when the token expires), `iss` (who issued the token), `aud` (who is the intented recipient of the token)
1. Verify that the token contains the `amr` claim.
  - If `amr` **is not** in the payload or it does not contain the value `mfa`, the user did not log in with MFA
  - If `amr` **is** in the payload and it contains the value `mfa`, then the user logged in with MFA

## Example

This example is built on top of the [JSON Web Token Sample Code](https://github.com/auth0/node-jsonwebtoken).

The code verifies the token's signature (`jwt.verify`), decodes the token, and checks whether the payload contains `amr` and if it does whether it contains the value `mfa`. The results are logged in the console.

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

## Keep reading

::: next-steps
* [Overview of ID Tokens](/tokens/id-token)
* [Overview of JSON Web Tokens](/jwt)
* [OpenID specification](http://openid.net/specs/openid-connect-core-1_0.html)
:::
