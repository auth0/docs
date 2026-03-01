---
title: Relevant API Endpoints for Single Sign-On
description: Learn about Auth0 Authentication API and Management API endpoints that are relevant when implementing Single Sign-on (SSO).
topics:
    - sso
    - api
contentType: reference
useCase: sso
---
# Relevant API Endpoints for Single Sign-On

When implementing [Single Sign-on (SS0)](/sso) and configuring its settings, the following API endpoints will be helpful to you.

## Authentication API

### POST /login/callback

For SSO flows initiated by an [Identity Provider (IdP)](/identityproviders), the [POST /login/callback](/api/authentication#idp-initiated-single-sign-on-sso-flow) endpoint can accept a sign-on SAML request from the IdP.

## Management API

The Management API features several endpoints designed to help you manage SSO.

To call any of the Management API endpoints, you will need to [obtain an Access Token](/api/management/v2/tokens).

### Clients

All of your client applications/SSO integrations feature information relevant to your SSO implementation. You can retrieve or change this information by calling one of the Clients endpoints. 

Of-interest parameters for each client include:

* `sso`: Flag applicable only for clients created via SSO integrations. If `true`, Auth0 handles SSO; if `false`, the IdP handles SSO.

* `sso_disabled`: Flag used to enable/disable SSO. If `true`, then SSO is disabled; if `false`, SSO is enabled. This option can only be set via the Management API.

* `app_type`: Application type. If the client was created using one of Auth0's built-in SSO integrations, the name of the SSO integration would be listed (e.g., `box` or `concur` instead of `native` or `spa`)

#### Get all clients

The [GET /api/v2/clients](/api/management/v2#!/Clients/get_clients) endpoint can be used to return information about the client applications you have configured for your tenant.

#### Create a client

The [POST /api/v2/clients](/api/management/v2#!/Clients/post_clients) endpoint can be used to create a new client application.

#### Get a client

The [GET /api/v2/clients/{id}](/api/management/v2#!/Clients/get_clients_by_id) endpoint can be used to return information about a specific client you have configured for your tenant.

#### Update a client

The [PATCH /api/v2/clients/{id}](/api/management/v2#!/Clients/patch_clients_by_id) endpoint can be used to update a specific client, including its SSO-related parameters.

### Tenants

Auth0 allows you to control the following tenant-level parameters that may affect your SSO implementation:

* `session_lifetime`: Length of time for which the user's Auth0 session will stay valid.
* `idle_session_lifetime`: Amount of time that may elapse before the user must sign in again due to inactivity.

### Get tenant settings

The [GET /api/v2/tenants/settings](/api/management/v2#!/Tenants/get_settings) endpoint retrieves the settings for your tenant.

### Update tenant settings

The [POST /api/v2/connections](/api/management/v2#!/Tenants/patch_settings) endpoint allows you to update your tenant settings.