---
title: API Authentication and Authorization
url: /api-auth
description: Auth0's API authentication and authorization features allow you to manage the authorization requirements for various scenarios, including user consent, and server-to-server applications.
---

# API Authentication and Authorization

<%=include('./_preview-warning') %>

At some point, your APIs will need to allow limited access to users, servers, or servers on behalf of users.

Auth0's API authentication and authorization features allow you to manage the authorization requirements for server-to-server applications.

## Example Scenarios

### Server-to-Server Applications

World Mappers is a company that has been collecting geo-spatial data for many years. They are building a new API to offer geo-coding and route planning.

For example, their customers will be able to use these services to find a taxi or the closest restaurant to their current location, or for route planning in a drivers and deliveries management application.

World Mappers has chosen to use a standards-based approach instead of developing their own authentication for their API. Using OAuth 2.0, their services are represented as Resource Owners and their consumers are the Clients. These Clients will interact with Auth0 (the Authorization Server) to get an `access_token` that can be used to interact with the World Mapper API.

![](/media/articles/api-auth/server-to-server.png)

## API Authorization

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

## Tutorials

See the following tutorials for a step-by-step guides on using Auth0 to implement the OAuth 2.0 authorization framework within your applications.

### Configuration

- [Using the Auth0 Dashboard](/api-auth/config/using-the-auth0-dashboard)
- [Using Auth0's Management API](/api-auth/config/using-the-management-api)
- [How to ask for an access token](/api-auth/config/asking-for-access-tokens)
- [How to define custom scopes](/api-auth/config/adding-scopes)

### Resource Server

 - [Creating a Resource Server in Node.js](/api-auth/resource-servers/node-js)
 - [Creating a Resource Server using the ASP.NET Web API](/api-auth/resource-servers/asp-net)

## Additional Information

See the [API Auth FAQ](/api-auth/faq).
