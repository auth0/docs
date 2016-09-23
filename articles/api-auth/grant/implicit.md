# API Auth: Implicit Grant
<%=include('../_preview-warning') %>

The Implicit Grant (defined in [RFC 6749, section 4.1](https://tools.ietf.org/html/rfc6749#section-4.2)) is also a redirect-based flow, similar to the Authorization Code Grant, but the main difference is that all of the interactions with the Authorization Server happen through the User Agent (this includes receiving the access token). After receiving the `access_token`, the User Agent will expose this to the Client, allowing it to call the Resource Server on behalf of the Resource Owner.

![](/media/articles/api-auth/implicit-grant.png)

 1. The Client initiates the flow and redirects the user to the Authorization Server
 2. The user authenticates
 3. The Authorization Server redirects the user to the Client with an `access_token` (and optionally a `refresh_token`) in the hash fragment
 4. The Client can now extract the tokens from the hash fragment. In a Single Page Application this would be done using Javascript and in a Mobile Application this is typically handled by interacting with a Web View
 5. The Client can use the `access_token` to call the Resource Server on behalf of the user

The first time the user goes through this flow a consent page will be shown where the permissions are listed that will be given to the Client (eg: post messages, list contacts, ...).

## Use Case

- Allow the Client to make calls to the Resource Server on behalf of the Resource Owner (Delegation)
- The Client is typically a Single Page Application or a Mobile Application

## Tutorials

<%=include('../_pending-tutorials-notice') %>
