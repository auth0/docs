---
title: Which OAuth 2.0 Flow Should I Use?
toc: true
description: Learn how to identify the proper OAuth 2.0 grant for your use case.
topics:
  - api-authentication
  - oidc
  - application-grants
  - flows
contentType:
  - concept
useCase:
  - secure-api
  - call-api
---

# Which OAuth 2.0 Flow Should I Use?

OAuth 2.0 supports several different **grants**. Grants are ways of retrieving an <dfn data-key="access-token">Access Token</dfn>. Deciding which one is suited for your case depends mostly on your Client's type, but other parameters weigh in as well, like the level of trust for the Client, or the experience you want your users to have.

## OAuth 2.0 terminology

- **Resource Owner**: the entity that can grant access to a protected resource. Typically this is the end-user.
- **Client**: an application requesting access to a protected resource on behalf of the Resource Owner.
- **Resource Server**: the server hosting the protected resources. This is the API you want to access.
- **Authorization Server**: the server that authenticates the Resource Owner and issues Access Tokens after getting proper authorization. In this case, Auth0.
- **User Agent**: the agent used by the Resource Owner to interact with the Client, for example a browser or a native application.

## Is the Client the Resource Owner?

The first decision point is about whether the party that requires access to resources is a machine. In the case of machine-to-machine authorization, the Client is also the Resource Owner, so no end-user authorization is needed. An example is a cron job that uses an API to import information to a database. In this example, the cron job is the Client and the Resource Owner since it holds the Client ID and Client Secret and uses them to get an Access Token from the Authorization Server.

If this case matches your needs, then for more information on how this flow works and how to implement it, refer to [Client Credentials Flow (Client Credentials Grant)](/flows/concepts/client-credentials).

## Is the Client a web app executing on the server?

If the Client is a regular web app executing on a server, then the **Authorization Code Flow (Authorization Code grant)** is the flow you should use. Using this the Client can retrieve an Access Token and, optionally, a <dfn data-key="refresh-token">Refresh Token</dfn>. It's considered the safest choice since the Access Token is passed directly to the web server hosting the Client, without going through the user's web browser and risk exposure.

If this case matches your needs, then for more information on how this flow works and how to implement it, refer to [Authorization Code Flow](/flows/concepts/auth-code).

## Is the Client absolutely trusted with user credentials?

This decision point may result in the **Resource Owner Password Credentials Grant**. In this flow, the end-user is asked to fill in credentials (username/password), typically using an interactive form. This information is sent to the backend and from there to Auth0. It is therefore imperative that the Client is absolutely trusted with this information.

This grant should **only** be used when redirect-based flows (like the [Authorization Code Flow](/flows/concepts/auth-code)) are not possible. If this is your case, then for more information on how this flow works and how to implement it, refer to [Call APIs from Highly Trusted Applications](/api-auth/grant/password).

## Is the Client a Single Page App?

If the Client is a Single Page App, an application running in a browser using a scripting language like JavaScript, there are two grant options: the **Authorization Code Grant using Proof Key for Code Exchange (PKCE)** and the **Implicit Grant**. For most cases, we recommend using the Authorization Code Grant with PKCE.

### Authorization Code Grant with PKCE

This grant adds the concept of a `code_verifier` to the Authorization Code Grant. When the Client asks for an **Authorization Code** it generates a `code_verifier` and its transformed value called `code_challenge`. The `code_challenge` and a `code_challenge_method` are sent along with the request. When the Client wants to exchange the Authorization Code for an Access Token, it also sends along the `code_verifier`. The Authorization Server transforms this and if it matches the originally sent `code_challenge`, it returns an Access Token.

The [Auth0 Single Page App SDK](/libraries/auth0-spa-js) provides high-level API for implementing Authorization Code Grant with PKCE in single page applications.

For more information on how this flow works and how to implement it, refer to [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce).

### Implicit Grant

In this case, instead of getting an authorization code that needs to be exchanged for an Access Token, the Application directly retrieves an Access Token. On the plus side, this is more efficient since it reduces the number of round trips required to get an Access Token. However, a security consideration is that **the Access Token is exposed on the client side**. Also, note that this flow does not return a Refresh Token because the browser cannot keep it private. 

For more information on how this flow works and how to implement it, refer to [Implicit Flow](/flows/concepts/implicit).

## Is the Client a Native/Mobile App?

If the Application is a native app, then the **Authorization Code Flow with PKCE (Authorization Code Grant using Proof Key for Code Exchange)** should be used.

For more information on how this flow works and how to implement it, refer to [Authorization Code Flow with Proof Key for Code Exchange (PKCE)](/flows/concepts/auth-code-pkce).
