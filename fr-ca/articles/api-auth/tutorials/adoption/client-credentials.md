---
title: Client Credentials exchange
topics:
  - api-authentication
  - oidc
  - client-credentials
contentType: concept
useCase:
  - secure-api
  - call-api
---

# Client Credentials Exchange

<%= include('./_about.md') %>

The [Client Credentials exchange](/flows/concepts/client-credentials) allows apps to authenticate as themselves (that is, not on behalf of any user) to programmatically and securely obtain access to an API.

This exchange does not exist in the legacy pipeline, but the [Resource Owner Password Credentials exchange](/api-auth/tutorials/adoption/password) can be used to simulate it by creating a "service user".

We strongly discourage the latter approach in favor of using Client Credentials, since it allows defining fine-grained permissions for each API app.

::: note
  For more information on how to execute a Client Credentials exchange, refer to <a href="/flows/guides/client-credentials/call-api-client-credentials">Call API Using the Client Credentials Flow</a>.
:::

## Keep reading

<%= include('./_index.md') %>
