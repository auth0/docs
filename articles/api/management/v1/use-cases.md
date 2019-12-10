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

If your business process or configuration requires these features, you can continue using these endpoints; they won't be affected by the Management API v1 Deprecation.

Features that are not currently being deprecated include:

* [Enterprise Users/Directory Searching](#enterprise-users/directory-searching)

## Enterprise Users/Directory Searching

The following endpoints allow you to search directly for users authenticated using enterprise connections, such as Active Directory or Azure Active Directory. These endpoints are not currently available in the [Management API v2](/api/v2).

* All users from a specific directory:
[`/api/connections/{connection}/users`](/api/v1#get--api-connections--connection--users)

* Specific users from a given directory:
[`/api/connections/{connection}/users?search={criteria}`](/api/v1#get--api-connections--connection--users-search--criteria-)

* All users from all enterprise directories:
GET `/api/enterpriseconnections/users?search={criteria}`
