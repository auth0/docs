---
description: Describes the deprecation of the Logs Search v2.
topics: deprecation-notice
contentType: reference
useCase:
  - migrate
---
# Deprecation Notice: Management API v1

Auth0’s Management API v1 was deprecated in 2016 and replaced with the [Auth0 Management API v2](/api/management/v2/). Management API v1 will reach its End Of Life in the Public Cloud on **July 13th, 2020**. Requests will begin failing with a `410` HTTP status code on or after that date. Private Cloud releases will continue to support Management API v1 until the November 2020 monthly release.

## Are you affected?

Affected tenants are those who meet all of the following criteria:

* Created before January 2, 2020
* Actively making requests to Auth0 endpoints directly under the `/api/` path.

The following tenants are NOT affected:

* Created after January 2, 2020
* Exclusively using the Auth0 Management API v2 endpoints 
* Using the Authentication API exclusively. (The Authentication API is not affected by this deprecation.)
 
## Migration

See [Migration Guide: Management API v1 to v2](/product-lifecycle/migration/guides/management-api-v1-v2) for details. 