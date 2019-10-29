---
title: Relevant API Endpoints for Passwordless Connections
topics:
    - connections
    - passwordless
    - api
contentType: reference
useCase: customize-connections
---
# Relevant API Endpoints for Passwordless Connections

When working with Passwordless Connections, the following API endpoints will be helpful to you.

## Authentication API

### POST /passwordless/start

The [POST /passwordless/start](/api/authentication#get-code-or-link) endpoint can be called to begin the Passwordless authentication process. Depending on the parameters provided to the endpoint, Auth0 begins the user verification process by sending one of the following:

* A single-use code via email or SMS message
* A single-use link via email

## Management API

The Management API features several endpoints designed to help you manage your connections, including your Passwordless ones.

To call any of the Management API endpoints, you will need to [obtain an Access Token](/api/management/v2/tokens).

### Get all connections

The [GET /api/v2/connections](/api/management/v2#!/Connections/get_connections) endpoint retrieves all connections for your tenant that match the parameters you provide. You can use this endpoint to obtain the connection ID for your Passwordless connection (indicated by the `strategy = sms` parameter), which you'll need to make changes to the connection.

### Create a connection

The [POST /api/v2/connections](/api/management/v2#!/Connections/post_connections) endpoint allows you to create new Passwordless connections.

### Get a connection

The [GET /api/v2/connections/{id}](/api/management/v2#!/Connections/get_connections_by_id) endpoint allows you to return information about a connection based on the connection ID you provided.

### Delete a connection

The [DELETE /api/v2/connections/{id}](/api/management/v2#!/Connections/delete_connections_by_id) endpoint  allows you to delete the connection associated with the ID you provided.

### Update a connection

The [PATCH /api/v2/connections/{id}](/api/management/v2#!/Connections/patch_connections_by_id) endpoint allows you to update the connection associated with the ID you provide.

### Delete a user from a connection

The [DELETE /api/v2/connections/{id}/users](/api/management/v2#!/Connections/delete_users_by_email) endpoint allows you to delete a user (identified using the email address you provide) from the connection associated with the ID you include with your call.