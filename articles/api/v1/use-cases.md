---
description: This page lists the API features that are only available in API v1.
---

# API v1 Use Cases

Currently, there are API features and functionality that are only available in the [Management API v1](/api/v1). If your business process or configuration requires these features, please continue to use the API v1.

The features only available in API v1 include:

* [Active Directory Connector Monitoring](#active-directory-connector-monitoring)
* [Client Users](#client-users)
* [Email](#email)
* [Enterprise Users/Directory Searching](#enterprise-users/directory-searching)
* [Impersonation](#impersonation)
* [Searching via the Auth0 Appliance](#searching-via-the-auth0-appliance)

## Active Directory Connector Monitoring

In API v1, there is a `GET` endpoint that allows you to monitor the status of your Active Directory Connector:

`/api/connections/{AUTH0_CONNECTION}/socket`

## Client Users

With API v1, after authenticating with the `client_id` and `client_secret` of an application, you can make a `GET` call to the [appropriate Users endpoint](/api/v1#!#get--api-clients--client-id--users) to return only those users that belong to any specified client connection that is enabled for that application.

## Email

With API v1, you can use the `PATCH` email endpoint to update email templates as part of your automation process.

## Enterprise Users/Directory Searching

API v1 allows you to search directly for users authenticated using enterprise connections, such as Active Directory or Azure Active Directory.

## Impersonation

API v1 includes an [Impersonation endpoint](/auth-api#impersonation) that generates a link that can be used only once to log in as a specific user for troubleshooting purposes.

## Searching via the Auth0 Appliance

In API v1, you can perform a ["starts with" search for users by name or email](/api/v1#!#get--api-users-search--criteria-). This functionality works for both cloud instances and the Auth0 appliance.

In API v2, the search operates with reduced functionality and does not currently support Lucene syntax.
