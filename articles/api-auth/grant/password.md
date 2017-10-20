---
title: Call APIs from Highly Trusted Clients
description: Describes how to call APIs from highly trusted clients using the Resource Owner Password Grant.
---
# Call APIs from Highly Trusted Clients

<%= include('../../_includes/_pipeline2') %>

Highly trusted applications can use this flow to access APIs. In this case, the end-user is asked to fill in credentials (username/password), typically using an interactive form. This information is sent to the backend and from there to Auth0. 

It is imperative that the client is absolutely trusted with this information. For [client side](/api-auth/grant/implicit) applications and [mobile apps](/api-auth/grant/authorization-code-pkce) we recommend using web flows instead. 

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our <a href="/protocols/oauth2">OAuth 2.0</a> article.
:::

## Overview

The **Resource Owner Password Grant** (defined in [RFC 6749, section 4.3](https://tools.ietf.org/html/rfc6749#section-4.3)) can be used directly as an authorization grant to obtain an access token, and optionally a refresh token. This grant should only be used when there is a high degree of trust between the user and the client and when other authorization flows are not available.

This grant type can eliminate the need for the client to store the user credentials for future use, by exchanging the credentials with a long-lived access token or refresh token.

![Resource Owner Password Grant](/media/articles/api-auth/password-grant.png)

 1. The end user enters the credentials into the client application.
 1. The client forwards the credentials to Auth0.
 1. Auth0 validates the information and returns an `access_token`, and optionally a `refresh_token`.
 1. The client can use the `access_token` to call the API on behalf of the end user.

::: note
In OAuth 2.0 terms, the web app is the Client, the end user the Resource Owner, the API the Resource Server, the browser the User Agent, and Auth0 the Authorization Server.
:::

## How to implement the flow

For details on how to implement this using Auth0, refer to [Execute the Resource Owner Password Grant](/api-auth/tutorials/password-grant).

## Realm Support

A extension grant that offers similar functionality with the **Resource Owner Password Grant**, including the ability to indicate a specific realm, is the `http://auth0.com/oauth/grant-type/password-realm`.

Realms allow you to keep separate user directories and specify which one to use to the token endpoint. For example, you may have an application where both employees and customers can log in but their credentials are kept in separate user directories. You can present a user interface with a dropdown containing `Employees` or `Customers` as realms (which would be connections in [Auth0 dashboard](${manage_url})). The realm value, along with the username and password credentials, will be submitted to the token endpoint. Auth0 will use the realm value to determine which directory (connection) to use when verifying the password.

For more information on how to implement this extension grant refer to [Executing a Resource Owner Password Grant > Realm Support](/api-auth/tutorials/password-grant#realm-support).

## Scopes

Due to the implied trust in these grants (a user providing his or her password to a client), the `access_token` returned will include all of the available scopes defined for the audience API. A client can request a restricted set of scopes by using the `scope` parameter, or you can restrict the returned scopes by using a [rule](#customize-the-returned-token).

## Rules

[Rules](/rules) will run for the Password Exchange (including the Password Realm extension grant). There are two key differences in the behavior of rules in these flows:

- Redirect rules won't work. If you try to do a [redirect](/rules/redirect) by specifying `context.redirect` in your rule, the authentication flow will return an error.

If you wish to execute special logic unique to the Password exchange, you can look at the `context.protocol` property in your rule. If the value is `oauth2-password`, then the rule is running during the password exchange.

For details on how to implement this, refer to [Execute the Resource Owner Password Grant: Customize the Tokens](/api-auth/tutorials/password-grant#optional-customize-the-tokens).

## MFA Support

For details on how to implement multifactor authentication, refer to [Multifactor Αuthentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password).

## Keep reading

::: next-steps
* [How to Execute a Resource Owner Password Grant](/api-auth/tutorials/password-grant)
* [How to use MFA with Resource Owner Password Grant](/api-auth/tutorials/multifactor-resource-owner-password)
* [Why you should always use access tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
* [How to use Resource Owner Password Grant from the server side together with Anomaly Detection](/api-auth/tutorials/using-resource-owner-password-from-server-side)
:::
