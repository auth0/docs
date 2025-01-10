---
title: Migrate from Search v2 to v3
description: Learn how to migrate from Auth0 Search v2 to v3.
topics:
  - users
  - user-management
  - search
contentType: how-to 
useCase:
  - manage-users
---
# Migrate from Search v2 to v3

User search v2 has reached its end of life as of **June 30, 2019**. We highly recommend migrating user search functionality to search engine v3 (`search_engine=v3`) as soon as possible.

## Migration considerations

Before you start migrating, there are a few things you should know:

* To ensure that your queries are using search engine v3 prior to v2 becoming unavailable, you must update all your calls to the `GET /api/v2/users` endpoint to include the `search_engine=v3` parameter. This will enable you to see whether any queries need to be updated, so that you will not experience downtime when v2 becomes unavailable.
* If you are performing user search operations through any of the [impacted SDKs](#impacted-sdks), you must also pass the `search_engine=v3` parameter as outlined above.
* Search values for the normalized user fields (`email`, `name`, `given_name`, `family_name`, and `nickname`) are case insensitive. All other fields (including all `app_metadata`/`user_metadata` fields) are case sensitive.
* v3 limits the number of users you can retrieve to 1000. If you are reaching this limit, we recommend that you redefine your search query to obtain more granular results. If you need a list of more than 1000 users at a given time, we recommend that you use the [export job](/api/management/v2#!/Jobs/post_users_exports) API endpoint or [User Import / Export extension](/extensions/user-import-export) instead.
* Range and wildcard searches are not available on `app_metadata`/`user_metadata` fields. See [searchable fields](/users/search/v3/query-syntax#searchable-fields).
* User fields are not tokenized like in v2, so `user_id:auth0` will not match a `user_id` with value `auth0|12345`, instead, use `user_id:auth0*`. See [wildcards](/users/search/v3/query-syntax#wildcards) and [exact matching](/users/search/v3/query-syntax#exact-match).
* Wildcards can be used for prefix matching, for example `name:j*`. For other uses of wildcards (e.g. suffix matching), literals must have 3 characters or more. For example, `name:*usa` is allowed, but `name:*sa` is not.
* The `.raw` field extension is no longer supported and must be removed. In v3, fields match the whole value that is provided and are not tokenized as they were in v2 without the `.raw` suffix.
* The `connection` field is not supported in v3. You should use its alias `identities.connection` instead. 

## Queries to migrate

Use case | v2 | v3
---------|----|---
Search by date | `updated_at:>=2018-01-15` | `updated_at:[2018-01-15 TO *]`
Search by date | `updated_at:>2018-01-15` | `updated_at:{2018-01-15 TO *]`
Search by date | `updated_at:<=2018-01-15` | `updated_at:[* TO 2018-01-15]`
Search by date | `updated_at:<2018-01-15` | `updated_at:[* TO 2018-01-15}`
Search by date | `last_login:<=2017-12` | `last_login:[* TO 2017-12]`
String exact match | `name.raw:"john richard doe"` | `name:"john richard doe"`
Phrase contains a word | `name:"richard"`, `name:richard` | `name:*richard*`
Phrase contains a word (with less than 3 characters) | `name:*ri`,`name:*a`, `name:*ab*` | _(not supported)_

## Impacted SDKs

The following SDKs make use of the User Search engine. If you are using them, make sure you are using the versions listed below (or a later version), and pass the `search_engine=v3` parameter when performing user search operations.

SDK | Version with support for v3 | Impacted methods | Considerations
----|-----------------------------|------------------|---------------
[Auth0 Java](https://github.com/auth0/auth0-java) | 1.8.0 | com.auth0.client.mgmt.UsersEntity.list | Provide a `UserFilter` with `withSearchEngine("v3")`
[Auth0 Python](https://github.com/auth0/auth0-python) | 3.0.0 | management.Users.list | Provide the parameter `search_engine='v3'`
[Auth0 Node](https://github.com/auth0/node-auth0) | 2.0.0 | UsersManager.getAll, ManagementClient.getUsers | Provide the parameter `search_engine:'v3'`
[Auth0 .NET](https://github.com/auth0/auth0.net) | 3.0.0 or 4.0.0 | Auth0.ManagementApi.IUsersClient.GetAllAsync | Provide a `GetUsersRequest` object with `SearchEngine` = `"v3"`
[Auth0 PHP](https://github.com/auth0/auth0-php) | 5.2.0 | Auth0.SDK.API.Management.Users.getAll | Provide the parameter `'search_engine' => 'v3'`
[Auth0 Ruby](https://github.com/auth0/ruby-auth0) | 4.5.0 | Auth0.Api.V2.Users.users | Provide the parameter `search_engine: 'v3'`

## Impacted Extensions

The following Extensions make use of the User Search engine. If you have them installed, make sure you are using the versions listed below (or a later version).

Extension | Version with support for v3 | Considerations
----------|-----------------------------|---------------
[Authorization Extension](/extensions/authorization-extension/v2) | 2.5.0 | If you are using an earlier version, you need to manually update the extension from the [Extensions](https://manage.auth0.com/#/extensions) page.
[Delegated Administration](/extensions/delegated-admin/v3) | 3.1 | If you are using an earlier version, you need to manually update the extension from the [Extensions](https://manage.auth0.com/#/extensions) page. The `SEARCH_ENGINE` configuration setting no longer exists in 3.1, because only User Search v3 is available.

## Leverage your tenant logs to find usage of User Search v2

You can leverage the [logs](/logs) in the [Dashboard](${manage_url}/#/logs) to find calls to the `/api/v2/users` endpoint that use the User Search v2 engine, including calls performed by SDKs. Those logs will help you identify where code changes might be needed in your applications.

Use the following query to retrieve all the logs related to User Search v2: `type:w AND description:*search_engine*`. The logs will provide additional information in the description field, in the following cases:

- Queries that might produce different results in v3
- Queries with syntax incompatible with v3
- Queries that do not meet the paging requirements of v3

If no additional details are specified in the log entries, it's likely that your queries are compatible with v3. Our recommendation, however, is still that you test the queries before deploying your changes to production.

::: note
Please note that only one log of the same type will be generated within 60 minutes. This means that even though you may be doing multiple calls to the User Search endpoint, you will only see one log of each type per hour.
:::

## Keep reading

* [User Search Overview](/users/search)
* [Authorization Extension](/extensions/authorization-extension/v2)
* [Delegated Administration](/extensions/delegated-admin/v3)
* [User Import/Export Extension](/extensions/user-import-export)
* [Management API Explorer](/api/management/v2#!/Users/get_users)
