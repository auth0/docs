---
title: Get a Management APIv2 Token
description: Learn how to retrieve a token that can be used by third-party applications to access AuthO's Management API.
toc: true
topics:
  - applications
  - application-types
  - dashboard
contentType: how-to
useCase:
  - build-an-app
---
# Get a Management APIv2 Token

To make calls to the Management API, you must [get and use a valid Access Token](/api/management/v2/tokens).

To do this, an application can use any of the [API Authorization Flows](/api-auth) with the following request parameters:

- `audience=https://${account.namespace}/api/v2/`
- `scope=read:current_user update:current_user_metadata`
