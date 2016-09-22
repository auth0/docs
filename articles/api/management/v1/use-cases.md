---
description: This page lists the API features that are only available in Management API v1.
section: apis
---

# Management API v1 Use Cases

Currently, there are API features and functionality that are only available in the [Management API v1](/api/v1). If your business process or configuration requires these features, please continue to use the API v1.

The features only available in Management API v1 include:

* [Active Directory Connector Monitoring](#active-directory-connector-monitoring)
* [Client Users](#client-users)
* [Email](#email)
* [Enterprise Users/Directory Searching](#enterprise-users/directory-searching)
* [Impersonation](#impersonation)
* [Searching via the Auth0 Appliance](#searching-via-the-auth0-appliance)

## Active Directory Connector Monitoring

In Management API v1, there is a `GET` endpoint that allows you to monitor the status of your Active Directory Connector:

GET `/api/connections/{AUTH0_CONNECTION}/socket`

## Client Users

With Management API v1, after authenticating with the `client_id` and `client_secret` of an application, you can make a `GET` call to the appropriate Users endpoint to return only those users that belong to any specified client connection that is enabled for that application.

[`/api/clients/{client-id}/users`](/api/v1#!#get--api-clients--client-id--users)

## Email

With Management API v1, you can use the `PATCH` email endpoint to update email templates as part of your automation process.

[`/api/emails/{email-template-name}`](/api/v1#put--api-emails--email-template-name-)

## Enterprise Users/Directory Searching

Management API v1 allows you to search directly for users authenticated using enterprise connections, such as Active Directory or Azure Active Directory.

* All users from a specific directory:
[`/api/connections/{connection}/users`](/api/v1#get--api-connections--connection--users)

* Specific users from a given directory:
[`/api/connections/{connection}/users?search={criteria}`](/api/v1#get--api-connections--connection--users-search--criteria-)

* All users from all enterprise directories:
GET `/api/enterpriseconnections/users?search={criteria}`

## Impersonation

Management API v1 includes an impersonation endpoint that generates a link that can be used only once to log in as a specific user for troubleshooting purposes.

[`/users/{user_id}/impersonate`](/auth-api#impersonation)

## Searching via the Auth0 Appliance

In Management API v1, you can perform a "starts with" search for users by name or email:

[`/api/users?search={criteria}`](/api/v1#!#get--api-users-search--criteria-).

This functionality works for both cloud instances and the Auth0 appliance.

In Management API v2, the search operates with reduced functionality and does not currently support the Lucene query syntax.
