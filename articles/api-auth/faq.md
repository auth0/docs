---
description: API Authentication and Authorization FAQ
---

# API Authentication and Authorization FAQ

### Q: Can I execute a user consent flow?

**A:** Yes! We are working on creating documentation and tutorials for implementing this flow. In the meantime, if you need assistance or more information please contact our [Support Center](${env.DOMAIN_URL_SUPPORT}).

### Q: I have a Client that needs to talk to different Resource Servers.

**A:** If a single Client needs access tokens for different resource servers, then multiple calls to `/authorize` (that is, multiple executions of the same or different Authorization Flow) needs to be performed. Each authorization will use a different value for `audience`, which will result in a different access token at the end of the flow.

For more information, see the [OAuth 2.0: Audience Information Specification](https://tools.ietf.org/html/draft-tschofenig-oauth-audience-00#section-3).

### Q: Can I try the endpoints before I implement my application?

**A** Sure! You have two options:
- [Download our Postman collection](https://app.getpostman.com/run-collection/608670c820cda215594c). For more information on how to use our Postman collection refer to [Using the Auth0 API with our Postman Collections](/api/postman).

- Use our [Authentication API Debugger Extension](/extensions/authentication-api-debugger). You can find detailed instructions per endpoint/grant at our [Authentication API Reference](/api/authentication).
  - For the Authorize endpoint, go to [Authorize Client](/api/authentication#authorize-client) and read the _Test this endpoint_ paragraph for the grant you want to test.
  - For the Token endpoint, go to [Get Token](/api/authentication#get-token) and read the _Test this endpoint_ paragraph for the grant you want to test.
