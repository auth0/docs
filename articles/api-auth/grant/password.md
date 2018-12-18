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

<%= include('../../_includes/_pipeline2') %>

Highly trusted applications can use this flow to access APIs. In this flow the end-user is asked to fill in credentials (username/password), typically using an interactive form. This information is sent to the backend and from there to Auth0.

You should use this flow **only if** the following apply:
- The application is absolutely trusted with the user's credentials. For [Single-Page Applications](/flows/concepts/single-page-login-flow) and [Native/Mobile Apps](/flows/concepts/mobile-login-flow) we recommend using web flows instead.
- Using a redirect-based flow is not possible. If this is not the case and redirects are possible in your application, you should use the [Regular Web App Login Flow](/flows/concepts/regular-web-app-login-flow) instead.

::: note
If you need a refresher on the OAuth 2.0 protocol, you can go through our [OAuth 2.0](/protocols/oauth2) article.
:::

## Overview

The **Resource Owner Password Grant** (defined in [RFC 6749, section 4.3](https://tools.ietf.org/html/rfc6749#section-4.3)) can be used directly as an authorization grant to obtain an Access Token, and optionally a Refresh Token. This grant should only be used when there is a high degree of trust between the user and the application and when other authorization flows are not available.

This grant type can eliminate the need for the application to store the user credentials for future use, by exchanging the credentials with a long-lived Access Token or Refresh Token.

![Resource Owner Password Grant](/media/articles/api-auth/password-grant.png)

 1. The end user enters the credentials into the application.
 1. The application forwards the credentials to Auth0.
 1. Auth0 validates the information and returns an Access Token, and optionally a Refresh Token.
 1. The application can use the Access Token to call the API on behalf of the end user.

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

Due to the implied trust in these grants (a user providing his or her password to an application), the Access Token returned will include all of the available scopes defined for the audience API. An application can request a restricted set of scopes by using the `scope` parameter, or you can restrict the returned scopes by using a [rule](#customize-the-returned-token).

## Rules

[Rules](/rules) will run for the Password Exchange (including the Password Realm extension grant). There are two key differences in the behavior of rules in these flows:

- Redirect rules won't work. If you try to do a [redirect](/rules/redirect) by specifying `context.redirect` in your rule, the authentication flow will return an error.

If you wish to execute special logic unique to the Password exchange, you can look at the `context.protocol` property in your rule. If the value is `oauth2-password`, then the rule is running during the password exchange.

For details on how to implement this, refer to [Execute the Resource Owner Password Grant: Customize the Tokens](/api-auth/tutorials/password-grant#optional-customize-the-tokens).

## MFA Support

For details on how to implement multi-factor authentication, refer to [Multi-factor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password).

## Keep reading

::: next-steps
* [How to Execute a Resource Owner Password Grant](/api-auth/tutorials/password-grant)
* [How to use MFA with Resource Owner Password Grant](/api-auth/tutorials/multifactor-resource-owner-password)
* [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
* [How to use Resource Owner Password Grant from the server side together with Anomaly Detection](/api-auth/tutorials/using-resource-owner-password-from-server-side)
:::
