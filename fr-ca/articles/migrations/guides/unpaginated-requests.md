---
title: Migrate to Management API v2 Endpoint Paginated Queries
description: Query requests to specific Management API endpoints will return up to 50 results instead of all available items. You must now specify `page` and `per_page` parameters.
topics:
  - pagination
  - migrations
contentType:
  - concept
  - how-to
useCase:
  - paginated-results
---
# Migrate to Management API v2 Endpoint Paginated Queries

After **26 January 2021**, requests to Management API v2 endpoints will return a maximum of 50 items for tenants in the Public Cloud. To retrieve more items, you must include the `page` and `per_page` parameters. Beginning on **21 July 2020**, Auth0 will display tenant logs and a migration toggle to help you prepare for this change. 

Affected tenants are those that meet the following criteria:

* Auth0 Public Cloud (currently)
* Created **before 21 July 2020**
* Actively making calls to the affected endpoints without passing the `per_page` parameter for queries that can return more than 1 result.

The following tenants are not affected:

* Created **on or after 21 July 2020**
* Not using any of the affected endpoints
* Using the affected endpoints and passing the `per_page` parameter, or making queries that will always return a single result.

## Endpoints affected

Calls to the following Management API v2 endpoints are affected:

* [`GET /api/v2/clients`](/api/management/v2#!/Clients/get_clients)
* [`GET /api/v2/client_grants`](/api/management/v2#!/Clients/client_grants)
* [`GET /api/v2/grants`](/api/management/v2#!/Clients/grants)
* [`GET /api/v2/connections`](/api/management/v2#!/Clients/connections)
* [`GET /api/v2/device-credentials`](/api/management/v2#!/Clients/device_credentials) (when `type` query parameter is provided)
* [`GET /api/v2/resource-servers`](/api/management/v2#!/Clients/resource_servers)
* [`GET /api/v2/rules`](/api/management/v2#!/Clients/rules)

Deprecation notices will be recorded in your tenant logs for all requests without pagination options that are currently returning more than 1 item, once per hour, for each different client and endpoint.

## Actions

1. Replace all calls to the affected endpoints by providing the `page` and `per_page` parameters.

| Parameter | Type | Description |
| -- | -- | -- |
| `page` | Integer | Page index of the results to return. First page is 0. If `page` is not specified, it will default to 0.  |
| `per_page` | Integer | Number of results per page. Paging is disabled if the parameter is not sent. `per_page` has a maximum value of 100. |

2. Confirm that you are no longer seeing deprecation notices in your tenant logs. Check if a request returned more than 50 items. Look at the `details.size_exceeded` field and check if it’s `true`.
    - Use the following log query to return all calls without pagination options with more than 1 result: `type:depnote AND description:*Unpaginated*`
    - Use the following log query to return all calls without pagination options with more than 50 results: `type:depnote AND description:*Unpaginated* AND details.size_exceeded:true`

    To identify the application making request, logs will include the `client_id` used to make the request. You can also find the endpoint being used in the logs `details.path` field.

3. Disable Management API unpaginated requests for your tenant. Go to [**Dashboard > Tenant Settings > Advanced > Migration**](${manage_url}/#/tenant/advanced). This will simulate the expected behavior after the migration window closes, causing calls to affected endpoints to return up to 50 results.

    You will be able to re-enable unpaginated requests any time before that date.

### Update extensions

You may need to update from previous versions of [Auth0 Extensions](/extensions) and custom extensions may need to be updated to their latest versions to make sure they are only performing paginated queries.

1. Check your tenant logs for deprecation notices for clients with an ID matching an extension URL. It means you will need to update that extension.
2. Go to [**Dashboard > Extensions**](${manage_url}/#/extensions), select **Installed Extensions**, and click on the extension's **Update** link if present.
