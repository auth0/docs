---
url: /apis
toc: true
title: APIs Overview
description: Learn the basics of APIs, their role in OAuth and how to configure an API in Auth0 Dashboard.
crews: crew-2
topics:
  - api-authentication
  - oidc
  - apis
contentType: concept
useCase:
  - secure-api
  - call-api
---
# APIs

<%= include('../_includes/_pipeline2') %>

## Overview

An API is an entity that represents an external resource, capable of accepting and responding to protected resource requests made by applications. At the [OAuth2 spec](https://tools.ietf.org/html/rfc6749) an API maps to the **Resource Server**.

When an application wants to access an API's protected resources it must provide an [Access Token](/tokens/access-token). The same Access Token can be used to access the API's resources without having to authenticate again, until it expires.

Each API has a set of defined permissions. Applications can request a subset of those defined permissions when they execute the authorization flow, and include them in the Access Token as part of the **scope** request parameter.

For example, an API that holds a user's appointments, may accept two different levels of authorization: read only (scope `read:appointments`) or write (scope `write:appointments`). When an application asks the API to list a user's appointments, then the Access Token should contain the `read:appointments` scope. In order to edit an existing appointment or create a new one, the Access Token should contain the `write:appointments` scope.

::: note
For more information on tokens, please see [Tokens used by Auth0](/tokens).
:::

## Keep Reading

::: next-steps
- [API Authorization landing page](/api-auth)
- [Identify the proper OAuth 2.0 flow for your use case](/api-auth/which-oauth-flow-to-use)
- [Why you should always use Access Tokens to secure an API](/api-auth/why-use-access-tokens-to-secure-apis)
- [Configure an API in Auth0](/api-auth/guides/configure-an-api)
:::
