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

* **Keep it secret. Keep it safe.** The signing key should be treated like any other credentials and revealed only to services that need it.

* **Do not add sensitive data to the payload.** Tokens are signed to protect against manipulation and are easily decoded. Add the bare minimum number of claims to the payload for best performance and security.

* **Give tokens an expiration.** Technically, once a token is signed – it is valid forever – unless the signing key is changed or expiration explicitly set. This could pose potential issues so have a strategy for expiring and/or revoking tokens.

* **Embrace HTTPS.** Do not send tokens over non-HTTPS connections as those requests can be intercepted and tokens compromised.

* **Consider all of your authorization use cases.** Adding a secondary token verification system that ensures tokens were generated from your server, for example, may not be common practice, but may be necessary to meet your requirements.
