---
description: Learn about the best practices when using tokens in authentication and authorization.
topics:
  - tokens
  - jwt
contentType:
  - references
useCase:
  - invoke-api
  - secure-api
  - add-login
---

# Token Best Practices

* **Keep it secret. Keep it safe.** The signing key should be treated like any other credential and revealed only to services that need it.

* **Do not add sensitive data to the payload.** Tokens are signed to protect against manipulation and are easily decoded. Add the bare minimum number of claims to the payload for best performance and security.

* **Give tokens an expiration.** Technically, once a token is signed, it is valid forever&mdash;unless the signing key is changed or expiration explicitly set. This could pose potential issues so have a strategy for expiring and/or revoking tokens.

* **Embrace HTTPS.** Do not send tokens over non-HTTPS connections as those requests can be intercepted and tokens compromised.

* **Consider all of your authorization use cases.** Adding a secondary token verification system that ensures tokens were generated from your server, for example, may not be common practice, but may be necessary to meet your requirements.

* **Store and reuse.** Reduce unnecessary roundtrips that extend your application's attack surface, and optimize plan token limits (where applicable) by storing access tokens obtained from the authorization server. Rather than requesting a new token, use the stored token during future calls until it expires. How you store tokens will depend on the characteristics of your application: typical solutions include databases (for apps that need to perform API calls regardless of the presence of a session) and HTTP sessions (for apps that have an activity window limited to an interactive session). For an example of server-side storage and token reuse, see [Obtaining and Storing Access Tokens to Call External APIs](https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md#4-obtaining-access-tokens-to-call-external-apis) in our Github repo.
