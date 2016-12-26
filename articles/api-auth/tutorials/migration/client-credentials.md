---
title: Client Credentials exchange
---

# Client Credentials exchange

<%= include('./_about.md') %>

The [Client Credentials exchange](/api-auth/grant/client-credentials) allows clients to authenticate as themselves (i.e. not on behalf of any user) to programatically and securely obtain access to an API.
This exchange does not exist in the legacy pipeline, but the [Resource Owner Password Credentials exchange](/api-auth/tutorials/migration/password) can be used to simulate it by creating a "service user".
We strongly discourage this approach in favor of using Client Credentials, since it allows defining fine-grained permissions for each API client.

## Performing a client credentials exchange

[Learn how to exchange a client's credentials for an API access token](/api-auth/grant/client-credentials).

## Further reading

<%= include('./_index.md') %>
