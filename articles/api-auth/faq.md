---
description: API Authentication and Authorization FAQ
---

# API Authentication and Authorization FAQ

### Q: How can I get access to preview features?

**A:** If you ever want to kick the wheels to any preview feature listed on the documentation you can submit a ticket in our [Support Center](https://support.auth0.com) requesting access.

Keep in mind that preview features may change prior to launch. You are advised to contact support before using this feature in a production application as future changes could be breaking.

### Q: Can I execute a user consent flow?

**A:** Yes! You can ask for access to this preview feature by creating a ticket in our [Support Center](https://support.auth0.com).

### Q: I have a Client that needs to talk to different Resource Servers.

**A:**  If both Resource Servers have been created and the Client has been linked to each, you can use the `audience=resource_server_client_identifier` parameter to specify the audience of the access token during the authentication request.

For more information, see the [OAuth 2.0: Audience Information Specification](https://tools.ietf.org/html/draft-tschofenig-oauth-audience-00#section-3).
