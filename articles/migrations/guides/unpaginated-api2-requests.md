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

**Deprecation**: 14 July 2020
**End of Life**: 14 January 2021

After the End of Life date, specific Management API v2 endpoints will return up to 50 items instead of all the available items. To retrieve more items, you must include the `page` and `per_page` parameters. If `page` is not specified, it will default to 0. `per_page` has a maximum value of 100.

Affected tenants are those who meet the following criteria:

* Created **before 14 July 2020**
* Actively making calls to the affected endpoints without passing the `per_page` parameter for queries that can return more than 1 result.

The following tenants are not affected:

* Created **after 14 July 2020**
* Not using any of the affected endpoints
* Using the affected endpoints and passing the `per_page` parameter, or making queries that will always return a single result.

## Affected queries

Calls to the following Management API v2 endpoints are affected:

* `GET /api/v2/clients`
* `GET /api/v2/client_grants`
* `GET /api/v2/grants`
* `GET /api/v2/connections`
* `GET /api/v2/device-credentials` (when `type` query parameter is provided)
* `GET /api/v2/resource-servers`
* `GET /api/v2/rules`

Deprecation Notices will be recorded in your Tenant Logs for all requests without pagination options that are currently returning more than 1 item, once per hour, for each different client and endpoint.

## Check logs for calls without pagination parameters

To check if a request returned more than 50 items, you can check the `details.size_exceeded` field and check if it’s `true`. 

The following log query will return all calls without pagination options with more than 1 result:

`type:depnote AND description:*Unpaginated*`

The following log query will return all calls without pagination options with more than 50 results:

`type:depnote AND description:*Unpaginated* AND details.size_exceeded:true`

To identify the application making request, logs will include the `client_id` used to make the request. You can also find the endpoint being used in the logs `details.path` field.

## Migration steps

1. After replacing all calls to the affected endpoints by providing the `per_page` and `page` parameters, confirm you are no longer seeing Deprecation Notices in your Tenant Logs.
2. Disable Management API Unpaginated Requests for your tenant. Go to **Dashboard > Tenant Settings > Advanced > Migration**. This will simulate the expected behavior after the End of Life date, causing calls to affected endpoints to return up to 50 results. 

You will be able to re-enable unpaginated requests any time before the End of Life date.
