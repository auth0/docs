---
description: API Authentication and Authorization FAQ
---

# API Authentication and Authorization FAQ

### Q: Can I execute a user consent flow?

**A:** Not at this time, but this feature is planned for release in August 2016.

### Q: I have a Client that needs to talk to different Resource Servers.

**A:**  If both Resource Servers have been created and the Client has been linked to each, you can use the `audience=resource_server_client_id` parameter to specify the audience of the access token during the authentication request.

For more information, see the [OAuth 2.0: Audience Information Specification](https://tools.ietf.org/html/draft-tschofenig-oauth-audience-00#section-3).
