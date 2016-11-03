---
description: Describes the Resource Owner Password Grant.
---

# API Auth: Resource Owner Password Grant
<%=include('../_region-support') %>

The Resource Owner Password Grant (defined in [RFC 6749, section 1.3.3](https://tools.ietf.org/html/rfc6749#section-1.3.3)) can be used directly as an authorization grant to obtain an access token an optionally a refresh token. This grant should only be used when there is a high degree of trust between the user and the client and when other authorization flows are not available.

This grant type can eliminate the need for the client to store the user credentials for future use, by exchanging the credentials with a long-lived access token or refresh token.

![](/media/articles/api-auth/password-grant.png)

 1. The Resource Owner enters the credentials into the client application
 2. The client forwards the Resource Owner's credentials to the Authorization Server
 3. The Authorization server validates the information and returns an `access_token` and optionally a `refresh_token`
 4. The Client can use the `access_token` to call the Resource Server on behalf of the Resource Owner

## Use Case

- Allow the Client to make calls to the Resource Server on behalf of the Resource Owner
- The Client is a highly trusted application and other authorization flows are not available

## Tutorials

 - [Configuring your tenant for API Authorization](/api-auth/tutorials/configuring-tenant-for-api-auth)
 - [Executing a Resource Owner Password Grant](/api-auth/tutorials/password-grant)
