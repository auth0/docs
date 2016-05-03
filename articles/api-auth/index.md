---
title: API Authentication and Authorization
url: /api-auth
description: Auth0's API authentication and authorization features allow you to manage the authorization requirements for various scenarios, including user consent, and server-to-server applications.
---

# API Authentication and Authorization

<%=include('./_preview-warning') %>

At some point, your APIs will need to allow limited access to users, servers, or servers on behalf of users. 

Auth0's API authentication and authorization features allow you to manage the authorization requirements for various scenarios, including user consent, and server-to-server applications.

## Example Scenarios

### User Consent

**Organizer** is a company that allows users to manage their appointments, contacts and tasks. They are planning to allow third-party applications to integrate with their API.

The following applications have already integrated Organizer:

- **CalendarApp**: This application allows users to manage appointments from different sources, including appointments from a user's Organizer account. It can also invite contacts when new appointments are created.
- **MyTodos.io**: This application allows users to manage their tasks in different platforms including Organizer.
- **TextApp.io**: This is a next generation messaging platform that allows easy communication with friends (including contacts in Organizer).

![](/media/articles/api-auth/user-delegation.png)

Organizer has chosen to use a standards-based approach instead of developing their own authentication for their API. Using OAuth 2.0, their services are represented as Resource Servers and their consumers are the Clients.

Their design will require Users to grant explicit consent before Clients can do anything. After consent is obtained, Clients will be allowed to interact with Auth0 (the Authorization Server) to get an `access_token` that can be used to interact with the Organizer API on behalf of Users.

### Server-to-Server Applications

World Mappers is a company that has been collecting geo-spatial data for many years. They are building a new API to offer geo-coding and route planning.

For example, their customers will be able to use these services to find a taxi or the closest restaurant to their current location, or for route planning in a drivers and deliveries management application.

World Mappers has chosen to use a standards-based approach instead of developing their own authentication for their API. Using OAuth 2.0, their services are represented as Resource Owners and their consumers are the Clients. These Clients will interact with Auth0 (the Authorization Server) to get an `access_token` that can be used to interact with the World Mapper API.

![](/media/articles/api-auth/server-to-server.png)

## API Authorization

By using the OAuth 2.0 authorization framework, you can give your own applications or third-party applications limited access to your APIs, either on behalf of a user (using a consent flow) or on behalf of the application itself. This standard way of handling API authorization has been accepted by social platforms like Facebook and Google, and also by enterprise platforms like Azure AD.

Using Auth0, you can easily support different flows in your own APIs without worrying about user consent, the OAuth 2.0/OpenID Connect specification, or the many other technical aspects of API authorization.

### Participants

Several participants in the OAuth 2.0 specification can be identified:

 - **Authorization Server**: Auth0, in this case
 - **Resource Servers**: your APIs
 - **Clients**: the consumers of your APIs, which can include third-party applications or your own customers
 - **Resource Owner**: the user of your APIs and of the applications
 - **User Agent**: the user's browser or mobile app

Using different grants (or flows), these participants will interact to grant Clients limited access to the Resource Servers you are building. As a result, the Client will obtain an `access_token` that can be used to call the Resource Server on behalf of the user or of the Client itself.

#### Supported flows

 - Tradition Web Applications: [Authorization Code Grant](/api-auth/grant/authorization-code)
 - Single Page Applications/Mobile Applications: [Implicit Grant](/api-auth/grant/implicit)
 - Server to Server Applications: [Client Credentials Grant](/api-auth/grant/client-credentials)

## API Authentication Resources

- [Using the Auth0 Dashboard](/api-auth/using-the-auth0-dashboard)
- [Using Auth0's Management API](/api-auth/using-the-management-api)
- [How to ask for an access token](/api-auth/asking-for-access-tokens)
- [How to define custom scopes](/api-auth/adding-scopes)


## Tutorials

See the following tutorials for a step-by-step guides on using Auth0 to implement the OAuth 2.0 authorization framework within your applications.

### Configuration

 - [Configuring the Resource Servers](/api-auth/config/resource-servers)
 - [Configuring the Clients](/api-auth/config/clients)

### Resource Server

 - [Creating a Resource Server in Node.js](/api-auth/resource-servers/node-js)
 - [Creating a Resource Server using the ASP.NET Web API](/api-auth/resource-servers/asp-net)

### Authorization Code Grant

 - [Using the Authorization Code Grant from a Node.js application](/api-auth/authorization-code-grant/node-js)

### Implicit Grant

 - [Using the Implicit Grant from a Single Page application](/api-auth/implicit-grant/single-page)

## Additional Information
 
See the [API Auth FAQ](/api-auth/faq).