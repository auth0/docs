---
sitemap: false
title: OAuth2-as-a-Service
url: /oauth2-as-a-service
---

# Introduction

By using the OAuth 2.0 authorization framework you can give your own applications or third-party applications limited access to your own APIs, either on behalf of a user (using a consent flow) or on behalf of the application itself. This standard way of handling API authorization has been accepted by large social platforms like Facebook, Google, ... but also by large enterprise platforms like Azure AD.

Using Auth0 you can easily support the different flows in your own APIs without having to worry about the OAuth 2.0 specification, user consent and many other technical aspects of API authorization.

# High Level Overview

When we look at OAuth 2.0 we can identify a few actors:

 - The Authorization Server (Auth0 in this case)
 - The Resource Servers (your APIs)
 - The Clients (the consumers of your APIs, which can be your own or third-party applications)
 - The Resource Owner (the user of your APIs and of the applications)
 - The User Agent (the user's browser or mobile application)

Using different grants (flows) these actors will start interacting with the final goal of giving the Clients limited access to the Resource Servers you are building.

## Authorization Code Grant

The [Authorization Code Grant](https://tools.ietf.org/html/rfc6749#section-4.1) is a redirect-based flow where the **User Agent** receives an `authorization code` from the **Authorization Server** and transfers this to the **Client**. The **Client** will then interact with the **Authorization Server** and exchange the `authorization code` for an `access token` (and optionally also a `refresh token`). The **Client** can now use this `access token` to call the **Resource Server** on behalf of the **Resource Owner**.

The first time this happens the **Resource Owner** will also be presented with a consent page, where the permissions are listed that will be given to the **Client** (eg: post messages, list contacts, ...).

Use case:

 - Allow the Client to make calls to the Resource Server on behalf of the Resource Owner (Delegation)
 - The Client is typically a traditional web application

## Implicit Grant

The [Implicit Grant](https://tools.ietf.org/html/rfc6749#section-4.2) is also a redirect-based flow, similar to the Authorization Code Grant, but the main difference is that all of the interactions with the **Authorization Server** happen through the **User Agent** (this includes receiving the access token). After receiving the `access token` (and optionally also the `refresh token`), the **User Agent** will expose this to the **Client**, allowing it to call the **Resource Server** on behalf of the **Resource Owner**.

The first time this happens the **Resource Owner** will also be presented with a consent page, where the permissions are listed that will be given to the **Client** (eg: post messages, list contacts, ...).

Use case:

- Allow the Client to make calls to the Resource Server on behalf of the Resource Owner (Delegation)
- The Client is typically a Single Page Application or a Mobile Application

## Client Credentials Grant

With [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4) a **Client** can directly request an `access token` to the **Authorization Server** by using its Client Credentials (a Client Id and a Client Secret). Instead of identifying a **Resource Owner**, this token will represent the **Client** itself.

This flow is not redirect based but is an API call made by the **Client** to the **Authorization Server**. And finally the resulting access token can be used by the  **Client** to call the **Resource Server**.

Use case:

- Allow the Client to make calls to the Resource Server on its own behalf (machine to machine)
- APIs and services that are not user centric

# Use Cases

## Delegation

## Server to Server

# Tutorials

See the following tutorials for a step-by-step guide on how to implement the OAuth 2.0 authorization framework within your applications using Auth0:

### Configuration

 - [Configuring the Resource Servers](/oauth2-as-a-service/resource-servers)
 - [Configuring the Clients](/oauth2-as-a-service/clients)

### Resource Server

 - [Creating a Resource Server in Node.js](/oauth2-as-a-service/resource-servers/node-js)
 - [Creating a Resource Server using the ASP.NET Web API](/oauth2-as-a-service/resource-servers/asp-net)

### Authorization Code Grant

 - [Using the Authorization Code Grant from a Node.js application](/oauth2-as-a-service/authorization-code-grant/node-js)
 - [Using the Authorization Code Grant from an ASP.NET MVC application](/oauth2-as-a-service/authorization-code-grant/asp-net)

### Implicit Grant

 - [Using the Implicit Grant from a Node.js application](/oauth2-as-a-service/implicit-grant/node-js)
 - [Using the Implicit Grant from an iOS application](/oauth2-as-a-service/authorization-code-grant/asp-net)

### Client Credentials Grant

 - [Example use case: 'Foo'](/oauth2-as-a-service/client-credentials-grant/use-case-foo)

## Have Questions?

You may find the answers on the [Auth0 OAuth2-as-a-Service FAQ](/oauth2-as-a-service/faq).
