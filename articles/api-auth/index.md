---
title: API Authentication and Authorization
url: /api-auth
description: Auth0's API authentication and authorization features allow you to manage the authorization requirements for various scenarios, including user consent, and server-to-server applications.
---

# API Authentication and Authorization

At some point, your APIs will need to allow limited access to users, servers, or servers on behalf of users.

Auth0's API authorization features allow you to manage the authorization requirements for server-to-server and client-to-server applications.

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs on behalf of the application itself.

Using Auth0, you can easily support different flows in your own APIs without worrying about the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

### Participants

Several participants in the OAuth 2.0 specification can be identified:

 - **Authorization Server**: Auth0, in this case
 - **Resource Servers**: your APIs
 - **Clients**: the consumers of your APIs, which can include third-party applications or your own customers
 - **Resource Owner**: the user of your APIs and of the applications
 - **User Agent**: the user's browser or mobile app

Using different grants (or flows), these participants will interact to grant Clients limited access to the Resource Servers you are building. As a result, the Client will obtain an `access_token` that can be used to call the Resource Server on behalf of the user or of the Client itself.

#### Supported flows

 - Server to Server Applications: [Client Credentials Grant](/api-auth/grant/client-credentials)
 - Client to Server Applications: [Implicit Grant](/api-auth/grant/implicit)
 - Client to Server Applications: [Authorization Code Grant](/api-auth/grant/authorization-code)
 - Public Client to Server Applications: [Authorization Code Grant with PKCE](/api-auth/grant/authorization-code-pkce)

## Tutorials

See the following tutorial for a step-by-step guide on using Auth0 to implement the OAuth 2.0 authorization framework within your applications to enable the API Authorization scenarios.

<%=include('./_pending-tutorials-notice') %>

#### Dependencies

 - [Configuring your tenant for API Authorization](/api-auth/tutorials/configuring-tenant-for-api-auth)

#### Implicit Grant

- [Executing an Implicit Grant flow](/api-auth/tutorials/implicit-grant)

#### Authorization Code

- [Executing an Authorization Code Grant flow](/api-auth/tutorials/authorization-code-grant)

#### Authorization Code (with PKCE)

- [Executing an Authorization Code Grant with PKCE flow](/api-auth/tutorials/authorization-code-grant-pkce)

#### Client Credentials

 - [Setting up a Client Credentials Grant using the Auth0's Management Dashboard](/api-auth/config/using-the-auth0-dashboard)
 - [How to ask the Auth0 for an access token for a Resource Server in a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)
 - [Using Auth0's Management API for setting up Resource Servers and Client Grants](/api-auth/config/using-the-management-api)

## Additional Information

- [API Auth FAQ](/api-auth/faq).
