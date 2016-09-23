# API Auth: Authorization Code Grant
<%=include('../_preview-warning') %>

The Authorization Code Grant (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.1)) is a redirect-based flow where the User Agent receives an `authorization_code` from the Authorization Server and transfers this to the Client. The Client will then interact with the Authorization Server and exchange the `authorization_code` for an `access_token` (and optionally also a `refresh_token`). The Client can now use this `access_token` to call the Resource Server on behalf of the Resource Owner.

![](/media/articles/api-auth/authorization-code-grant.png)

 1. The Client initiates the flow and redirects the user to the Authorization Server
 2. The user authenticates
 3. The Authorization Server redirects the user to the Client with an `authorization_code` in the querystring
 4. The Client sends the `authorization_code` together with the Redirect Uri and the Client Id/Client Secret to the Authorization Server
 5. The Authorization Server validates this information and returns an `access_token` (and optionally a `refresh_token`)
 6. The Client can use the `access_token` to call the Resource Server on behalf of the user

The first time the user goes through this flow a consent page will be shown where the permissions are listed that will be given to the Client*(eg: post messages, list contacts, ...).

## Use Case

 - Allow the Client to make calls to the Resource Server on behalf of the Resource Owner (Delegation)
 - The Client is typically a traditional web application
