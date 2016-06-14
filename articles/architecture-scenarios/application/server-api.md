---
order: 03
title: Server Client + API
image: /docs/media/articles/architecture-scenarios/server-api.png
extract: Server to server communication where a server “Client” needs to make secure calls to an API (“Resource Server”), but on behalf of the client vs. a user.
---

# Server + API

![](/media/articles/architecture-scenarios/server-api.png)

In this scenario you have server to server communication where a server “Client” needs to make secure calls to an API (“Resource Server”), but on behalf of the client vs. a user.

The Client will request an access_token from Auth0 using the Client Credentials Flow. The server client will then use that access_token to securely call the API.

Since there is no user involved, no id_token will be returned, nor is their any sort of user store (connection) involved.

## Read More

The following is a list of articles on this website which will help you to implement this scenario:

* [API Authentication and Authorization](https://auth0.com/docs/api-auth)
* [API Auth: Client Credentials Grant](https://auth0.com/docs/api-auth/grant/client-credentials)
* [Auth0 access_token](https://auth0.com/docs/tokens/access_token)
