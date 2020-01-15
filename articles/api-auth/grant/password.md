---
title: Call APIs from Highly Trusted Applications
description: Describes how to call APIs from highly trusted applications using the Resource Owner Password Grant.
topics:
  - implicit
  - api-authorization
  - resource-owner-password
contentType: concept
useCase:
  - secure-api
  - call-api
---
# Call APIs from Highly Trusted Applications

<%= include('../_includes/_ropg-warning') %>

You can use the ROPG flow for your highly trusted applications to access APIs. In this flow the end-user is asked to fill in credentials (username/password), typically using an interactive form. This information is sent to the backend and from there to Auth0. 

ROPG (defined in [RFC 6749, section 4.3](https://tools.ietf.org/html/rfc6749#section-4.3)) can be used directly as an authorization grant to store the user credentials for future use, by exchanging the credentials for an <dfn data-key="access-token">Access Token</dfn>, and optionally a <dfn data-key="refresh-token">Refresh Token</dfn>. 

![Resource Owner Password Grant](/media/articles/api-auth/password-grant.png)

 1. The end user enters the credentials into the application.
 1. The application forwards the credentials to Auth0.
 1. Auth0 validates the information and returns an Access Token, and optionally a Refresh Token.
 1. The application can use the Access Token to call the API on behalf of the end user.

::: note
In OAuth 2.0 terms, the web app is the Client, the end user the Resource Owner, the API the Resource Server, the browser the User Agent, and Auth0 the Authorization Server.
:::

## How to implement the flow

For details on how to implement this using Auth0, see [Implement the Resource Owner Password Grant](/api-auth/tutorials/password-grant).

## Realm support

A extension grant that offers similar functionality with the **Resource Owner Password Grant**, including the ability to indicate a specific realm, is the `http://auth0.com/oauth/grant-type/password-realm`.

Realms allow you to keep separate user directories and specify which one to use to the token endpoint. For example, you may have an application where both employees and customers can log in but their credentials are kept in separate user directories. You can present a user interface with a dropdown containing `Employees` or `Customers` as realms (which would be connections in [Auth0 dashboard](${manage_url})). The realm value, along with the username and password credentials, will be submitted to the token endpoint. Auth0 will use the realm value to determine which directory (connection) to use when verifying the password.

For more information on how to implement this extension grant refer to [Executing a Resource Owner Password Grant > Realm Support](/api-auth/tutorials/password-grant#realm-support).

## Scopes

Due to the implied trust in these grants (a user providing his or her password to an application), the Access Token returned will include all of the available <dfn data-key="scope">scopes</dfn> defined for the <dfn data-key="audience">audience</dfn> API. An application can request a restricted set of scopes by using the `scope` parameter, or you can restrict the returned scopes by using a [rule](#customize-the-returned-token).

## Rules

[Rules](/rules) will run for the Password Exchange (including the Password Realm extension grant). There are two key differences in the behavior of rules in these flows:

- Redirect rules won't work. If you try to do a [redirect](/rules/redirect) by specifying `context.redirect` in your rule, the authentication flow will return an error.

If you wish to execute special logic unique to the Password exchange, you can look at the `context.protocol` property in your rule. If the value is `oauth2-password`, then the rule is running during the password exchange.

For details on how to implement this, see [Customize the Tokens](/api-auth/tutorials/password-grant#optional-customize-the-tokens).

## MFA support and anomaly detection

For details on how to implement <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>, refer to [Multi-factor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password).

When using this flow from server-side applications, some anomaly detection features might fail because of the particularities of this scenario. For details on how to implement this, while avoiding some common issues, refer to [Using Resource Owner Password from Server side](/api-auth/tutorials/using-resource-owner-password-from-server-side).

## Keep reading

* [Implement the Resource Owner Password Grant](/api-auth/tutorials/password-grant)
* [Tokens](/tokens)
