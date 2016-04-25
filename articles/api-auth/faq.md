
# API Authentication and Authorization FAQ

### Q: Can I use rules in the new pipeline?

**A:** Not at this time, but we aim at having this available in August. 

### Q: If have a Client that needs to talk to different Resource Servers. How would this work?

**A:**  Assuming both Resource Servers have been created and the Client has been linked to both of these you can use the audience=resource_server_client_id parameter to specify the audience of the access token during the authentication request.

* Specification: [https://tools.ietf.org/html/draft-tschofenig-oauth-audience-00#section-3](https://tools.ietf.org/html/draft-tschofenig-oauth-audience-00#section-3)