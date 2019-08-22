---
title: API Endpoints for Passwordless Connections
topics:
    - connections
    - passwordless
contentType: reference
useCase: customize-connections
---
# API Endpoints for Passwordless Connections

The following is a list of Management API Endpoints that you will find useful as you create, configure, and manage your Passwordless connections in Auth0.

| Endpoint | Description |
| - | - |
| [Get a Passwordless Code or Link](/api/authentication/reference#get-code-or-link) |  |
| [Get a list of all connections](/api/management/v2#!/Connections/get_connections) |Returns a list of all connections associated with your Auth0 tenant. You can identify your Passwordless connections using the `strategy` parameter (`sms` for Passwordless using SMS messages as the delivery mechanism, `email` for Passwordless using email as the delivery mechanism) |
| [Create a new connection](/api/management/v2#!/Connections/post_connections) | Creates a Passwordless connection. We recommend creating Connections via the Dashboard for ease of use, but you can do so via the API as well. |
| [Get a single connection](/api/management/v2#!/Connections/get_connections_by_id) | Retrieves details for a single connection. You must provide the ID of the connection whose information you want returned. |
| [Delete a connection](/api/management/v2#!/Connections/delete_connections_by_id) | Deletes a single connection based on the connection ID you provided. |
| [Update a connection](/api/management/v2#!/Connections/patch_connections_by_id) | Updates a single connection. |
