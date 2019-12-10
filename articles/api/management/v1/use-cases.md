---
description: This page lists the API features that are only available in Management API v1.
section: apis
topics:
  - apis
  - management-api
contentType: reference
useCase: invoke-api
---

# Management API v1 Use Cases

Currently, there are API features and functionality that are only available in the [Management API v1](/api/v1). If your business process or configuration requires these features, please continue to use the API v1. Otherwise, we recommend that you use the [new version](/api/v2) instead.

The features only available in Management API v1 include:

* [Active Directory Connector Monitoring](#active-directory-connector-monitoring)
* [Application Users](#application-users)
* [Email](#email)
* [Enterprise Users/Directory Searching](#enterprise-users/directory-searching)
* [Rules Configuration](#rules-configuration)
* [Searching via the PSaaS Appliance](#searching-via-the-auth0-appliance)

## Active Directory Connector Monitoring

In Management API v1, there is a `GET` endpoint that allows you to monitor the status of your Active Directory Connector:

GET `/api/connections/{AUTH0_CONNECTION}/socket`

## Enterprise Users/Directory Searching

Management API v1 allows you to search directly for users authenticated using enterprise connections, such as Active Directory or Azure Active Directory.

* All users from a specific directory:
[`/api/connections/{connection}/users`](/api/v1#get--api-connections--connection--users)

* Specific users from a given directory:
[`/api/connections/{connection}/users?search={criteria}`](/api/v1#get--api-connections--connection--users-search--criteria-)

* All users from all enterprise directories:
GET `/api/enterpriseconnections/users?search={criteria}`