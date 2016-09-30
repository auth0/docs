---
description: Describes the Authentication API Client Credentials Grant.
---

# API Auth: Client Credentials Grant

With Client Credentials Grant (defined in [RFC 6749, section 4.4](https://tools.ietf.org/html/rfc6749#section-4.4)) a Client can directly request an `access_token` to the Authorization Server by using its Client Credentials (a Client Id and a Client Secret). Instead of identifying a Resource Owner, this token will represent the Client itself.

![](/media/articles/api-auth/client-credentials-grant.png)

 1. The Client authenticates with the Authorization Server using its Client Id and Client Secret
 2. The Authorization Server validates this information and returns an `access_token`
 3. The Client can use the `access_token` to call the Resource Server on behalf of itself

This flow is not redirect based but is an API call made by the Client to the Authorization Server. And finally the resulting access token can be used by the Client to call the Resource Server.

## Use Case

 - Allow the Client to make calls to the Resource Server on its own behalf (machine to machine)
 - APIs and services that are not user centric

## Tutorials

- [Setting up a Client Credentials Grant using Auth0's Management Dashboard](/api-auth/config/using-the-auth0-dashboard)
- [Using Rules with Client Credential Grants](/api-auth/grant/using-rules).
- [How to ask the Auth0 for an access token for a Resource Server in a Client Credentials Grant](/api-auth/config/asking-for-access-tokens)
- [Using Auth0's Management API for setting up Resource Servers and Client Grants](/api-auth/config/using-the-management-api)
