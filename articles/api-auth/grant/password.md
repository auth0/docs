---
description: Describes how to call APIs from highly trusted clients using the Resource Owner Password Grant.
---

# Calling APIs from Highly Trusted Clients
<%=include('../_region-support') %>

Highly trusted mobile apps and Client-side web apps can use the **Resource Owner Password Grant** to access an API. In this flow the end-user is asked to fill in credentials (username/password) typically using an interactive form. This information is later on sent to the Client and the Authorization Server. It is therefore imperative that the Client is absolutely trusted with this information.

## Overview

The **Resource Owner Password Grant** (defined in [RFC 6749, section 4.3](https://tools.ietf.org/html/rfc6749#section-4.3)) can be used directly as an authorization grant to obtain an access token and optionally a refresh token. This grant should only be used when there is a high degree of trust between the user and the client and when other authorization flows are not available.

This grant type can eliminate the need for the client to store the user credentials for future use, by exchanging the credentials with a long-lived access token or refresh token.

![Resource Owner Password Grant](/media/articles/api-auth/password-grant.png)

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
 - [Using Rules with Resource Owner Password Grant](/api-auth/using-rules/password)
