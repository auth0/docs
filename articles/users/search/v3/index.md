---
title: User Search
description: Learn about Auth0's user search query string syntax and how to search for users then sort the results.
toc: true
topics:
  - users
  - user-management
  - search
contentType:
  - index
  - how-to
  - reference
useCase:
  - manage-users
---

# User Search

Looking for someone? You can search for users matching a custom query with the [list or search users](/api/management/v2#!/Users/get_users) endpoint.

In this article you'll learn how to search for users and sort the results.

## Before you start

* Review the [User Search Query Syntax](/users/search/query-syntax).
* If you are using [user search engine v2](/api/management/v2/user-search), check out the [section on migrating from v2 to v3](#migrate-from-search-engine-v2-to-v3) below.
* You'll need a token to make requests to the Management API. Check out [Access Tokens for the Management API](/api/management/v2/tokens) for more information.
* To perform user search requests the `read:users` [scope](/scopes/) is required.
* Note that the user search engine v3 is not available in Management API v1, which is deprecated. If you are using the Management API v1, you will need to upgrade to [Management API v2](/api/management/v2) before being able to use the user search engine v3. See [Management API v1 vs v2](/api/management/v2/changes) for more information.

## Limitations

When you query for users with the [list or search users](/api/management/v2#!/Users/get_users) endpoint, you can retrieve maximum 1000 users. If you exceed this threshold, redefine your search. If you need a full export of your users, use instead the [export job](/api/management/v2#!/Jobs/post_users_exports) or the [User Import / Export](/extensions/user-import-export) extension.

If you get the error `414 Request-URI Too Large` this means that your query string is larger than the supported length. In this case, refine your search.

## Search for users

To search for users, make a `GET` request to the [/api/v2/users endpoint](/api/management/v2#!/Users/get_users). Pass your search query to the `q` parameter and set the `search_engine` parameter to `v3`.

### Example request

For example, to search for a user whose email is exactly `jane@exampleco.com`, use `q=email:"jane@exampleco.com"`:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "email:\"jane@exampleco.com\""
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

For more information on other available parameters, check out the [Management API Explorer documentation](/api/management/v2#!/Users/get_users).

### Example queries

Below are some examples to show the kinds of queries you can make with the Management API.

Use case | Query
---------|------
Search for all users whose name contains "john" | `name:*john*`
Search all users whose name is exactly "jane" | `name:"jane"`
Search for all user names starting with "john" | `name:john*`
Search for user names that start with "jane" and end with "smith" | `name:jane*smith`
Search for all users whose email is exactly "john@exampleco.com" | `email:"john@exampleco.com"`
Search for all users whose email is exactly "john@exampleco.com" or "jane@exampleco.com" using `OR` | `email:("john@exampleco.com" OR "jane@exampleco.com")`
Search for users without verified email | `email_verified:false OR NOT _exists_:email_verified`
Search for users who have the `user_metadata` field named `full_name` with the value of "John Smith" | `user_metadata.full_name:"John Smith"`
Search for users from a specific connection | `identities.connection:"google-oauth2"`
Search for all users that have never logged in | `(NOT _exists_:logins_count OR logins_count:0)`
Search for all users who logged in before 2018 | `last_login:[* TO 2017-12-31]`
Search for all users whose last login was in December 2017 | `last_login:{2017-11 TO 2017-12]`, `last_login:[2017-12-01 TO 2017-12-31]`
Search for all users with logins count >= 100 and <= 200 | `logins_count:[100 TO 200]`
Search for all users with logins count >= 100 | `logins_count:[100 TO *]`
Search for all users with logins count > 100 and < 200 | `logins_count:{100 TO 200}`

## Sort results

To sort user search results, pass a `field:order` value to the `sort` parameter when making your request. The `field` is the name of the field to sort by, while order can be set to `1` for ascending order and `-1` for descending. Sorting by `app_metadata` or `user_metadata` is not supported.

For example, to sort users in ascending order by the `created_at` field you can pass the value `created_at:1` to the `sort` parameter:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "logins_count:[100 TO 200]"
        },
        {
          "name": "sort",
          "value": "created_at:1"
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

For more information on `sort` and other parameters, see the [Management API Explorer documentation](/api/management/v2#!/users/get_users).

## Page results

To page the user search results, use the `page`, `per_page`, and `include_totals` parameters at your request.

Parameter | Description
----------|------------
`page` | The page number, zero based.
`per_page` | The amount of users per page.
`include_totals` | Set to `true` to include a query summary as part of the result.

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "logins_count:[100 TO 200]"
        },
        {
          "name": "page",
          "value": "2"
        },
        {
          "name": "per_page",
          "value": "10"
        },
        {
          "name": "include_totals",
          "value": "true"
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

Note that Auth0 limits the total number of users you can retrieve to 1000 (see [Limitations](#limitations)). So this means, for example, 100 users per page for 10 pages.

For more information on the `page`, `per_page` and other parameters, see the [Management API Explorer documentation](/api/management/v2#!/users/get_users).

## Migrate from search engine v2 to v3

The user search engine v2 has been deprecated as of **June 6th 2018** and will be removed from service on **November 13th 2018**. We recommend migrating user search functionality to search engine v3 (`search_engine=v3`) as soon as possible. Before you start migrating, there are a few things you should know:

* You must update all your calls to the `GET /api/v2/users` endpoint to include the `search_engine=v3` parameter. This will ensure you are running the latest version of the search engine and that you will not experience downtime when search v2 is fully removed.
* If you are performing user search operations through any of the [impacted SDKs](#impacted-sdks), you must also pass the `search_engine=v3` parameter.
* Search values for the normalized user fields (`email`, `name`, `given_name`, `family_name`, and `nickname`) are case insensitive. All other fields (including all `app_metadata`/`user_metadata` fields) are case sensitive.
* v3 limits the number of users you can retrieve to 1000 (see [page results](#page-results)). If you are reaching this limit, we recommend that you redefine your search query to obtain more granular results. If you need a list of more than 1000 users at a given time, we recommend that you use the [export job](/api/management/v2#!/Jobs/post_users_exports) API endpoint or [User Import / Export extension](/extensions/user-import-export) instead.
* Range and wildcard searches are not available on `app_metadata`/`user_metadata` fields. See [searchable fields](/users/search/v3/query-syntax#searchable-fields).
* User fields are not tokenized like in v2, so `user_id:auth0` will not match a `user_id` with value `auth0|12345`, instead, use `user_id:auth0*`. See [wildcards](/users/search/v3/query-syntax#wildcards) and [exact matching](/users/search/v3/query-syntax#exact-match).
* Wildcards can be used for prefix matching, for example `name:j*`. For other uses of wildcards (e.g. suffix matching), literals must have 3 characters or more. For example, `name:*usa` is allowed, but `name:*sa` is not.
* The `.raw` field extension is no longer supported and must be removed. In v3, fields match the whole value that is provided and are not tokenized as they were in v2 without the `.raw` suffix.

### Queries to migrate

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

### Impacted SDKs

The following SDKs make use of the User Search engine. If you are using them, make sure you are using the versions listed below (or a later version), and pass the `search_engine=v3` parameter when performing user search operations.

SDK | Version with support for v3 | Impacted methods | Considerations
----|-----------------------------|------------------|---------------
[Auth0 Java](https://github.com/auth0/auth0-java) | 1.8.0 | com.auth0.client.mgmt.UsersEntity.list | Provide a `UserFilter` with `withSearchEngine("v3")`
[Auth0 Python](https://github.com/auth0/auth0-python) | 3.0.0 | management.Users.list | Provide the parameter `search_engine='v3'`
[Auth0 Node](https://github.com/auth0/node-auth0) | 2.0.0 | UsersManager.getAll, ManagementClient.getUsers | Provide the parameter `search_engine:'v3'`
[Auth0 .NET](https://github.com/auth0/auth0.net) | 3.0.0 or 4.0.0 | Auth0.ManagementApi.IUsersClient.GetAllAsync | Provide a `GetUsersRequest` object with `SearchEngine` = `"v3"`
[Auth0 PHP](https://github.com/auth0/auth0-php) | 5.2.0 | Auth0.SDK.API.Management.Users.getAll | Provide the parameter `'search_engine' => 'v3'`
[Auth0 Ruby](https://github.com/auth0/ruby-auth0) | 4.5.0 | Auth0.Api.V2.Users.users | Provide the parameter `search_engine: 'v3'`

### Impacted Extensions

The following Extensions make use of the User Search engine. If you have them installed, make sure you are using the versions listed below (or a later version).

Extension | Version with support for v3 | Considerations
----------|-----------------------------|---------------
[Authorization Extension](/extensions/authorization-extension/v2) | 2.5.0 | If you are using an earlier version, you need to manually update the extension from the [Extensions](https://manage.auth0.com/#/extensions) page.
[Delegated Administration](/extensions/delegated-admin/v3) | 3.1 | If you are using an earlier version, you need to manually update the extension from the [Extensions](https://manage.auth0.com/#/extensions) page. The `SEARCH_ENGINE` configuration setting no longer exists in 3.1, because only User Search v3 is available.

### Leverage your tenant logs to find usage of User Search v2

You can leverage the [logs](/logs) in the [Dashboard](${manage_url}/#/logs) to find calls to the `/api/v2/users` endpoint that use the User Search v2 engine, including calls performed by SDKs. Those logs will help you identify where code changes might be needed in your applications.

Use the following query to retrieve all the logs related to User Search v2: `type:w AND description:"The User Search v2 engine is deprecated"`. The logs will provide additional information in the description field, in the following cases:

- Queries that might produce different results in v3
- Queries with syntax incompatible with v3
- Queries that do not meet the paging requirements of v3

If no additional details are specified in the log entries, it's likely that your queries are compatible with v3. Our recommendation, however, is still that you test the queries before deploying your changes to production.

Please note that only one log of the same type will generated within 60 minutes. This means that even though you may be doing multiple calls to the User Search endpoint, you will only see one log of each type per hour.

## Keep reading

* [Query Syntax](/users/search/v3/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
