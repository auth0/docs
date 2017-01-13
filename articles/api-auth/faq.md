---
description: API Authentication and Authorization FAQ
---

# API Authentication and Authorization FAQ

### Q: Can I execute a user consent flow?

**A:** Yes! We are working on creating documentation and tutorials for implementing this flow. In the meantime, if you need assistance or more information please contact our [Support Center](https://support.auth0.com).

### Q: I have a Client that needs to talk to different Resource Servers.

**A:** If a single Client needs access tokens for different resource servers, then multiple calls to `/authorize` (that is, multiple executions of the same or different Authorization Flow) needs to be performed. Each authorization will use a different value for `audience`, which will result in a different access token at the end of the flow.

For more information, see the [OAuth 2.0: Audience Information Specification](https://tools.ietf.org/html/draft-tschofenig-oauth-audience-00#section-3).
