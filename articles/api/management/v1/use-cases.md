---
description: This page lists the API features that are not affected by the Management API v1 Deprecation.
section: apis
topics:
  - apis
  - management-api
contentType: reference
useCase: invoke-api
---

# Features not affected by the Management API v1 Deprecation

If your business process or configuration requires these features, you can continue using these endpoints as they won't be affected by the Management API v1 Deprecation.

The features that are not being deprecated at the moment are:

* [Active Directory Connector Monitoring](#active-directory-connector-monitoring)
* [Enterprise Users/Directory Searching](#enterprise-users/directory-searching)

## Active Directory Connector Monitoring

The following endpoint allows you to monitor the status of your Active Directory Connector. It is not currently available on the [Management API v2](/api/v2).

GET `/api/connections/{AUTH0_CONNECTION}/socket`

## Enterprise Users/Directory Searching

The following endpoints allows you to search directly for users authenticated using enterprise connections, such as Active Directory or Azure Active Directory. These endpoints are not currently available in the [Management API v2](/api/v2).

* All users from a specific directory:
[`/api/connections/{connection}/users`](/api/v1#get--api-connections--connection--users)

* Specific users from a given directory:
[`/api/connections/{connection}/users?search={criteria}`](/api/v1#get--api-connections--connection--users-search--criteria-)

* All users from all enterprise directories:
GET `/api/enterpriseconnections/users?search={criteria}`