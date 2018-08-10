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
* You'll need a token to make requests to the Management API. Check out [How to Get an Access Token for the Management API](/api/management/v2/tokens) for more information.
* To perform user search requests the `read:users` [scope](/scopes/) is required.

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

The user search engine v2 has been deprecated as of **June 6th 2018** and will be removed from service on **November 13th 2018**. We recommend migrating user search functionality to search engine v3 (`search_engine=v3`) as soon as possible. Before you start migrating, there's a few things you should know:

* Search values for the normalized user fields (`email`, `name`, `given_name`, `family_name`, and `nickname`) are case insensitive. All other fields (including all `app_metadata`/`user_metadata` fields) are case sensitive.
* v3 limits the number of users you can retrieve to 1000. See [page results](#page-results).
* Range and wildcard searches are not available on `app_metadata`/`user_metadata` fields. See [searchable fields](/users/search/v3/query-syntax#searchable-fields).
* User fields are not tokenized like in v2, so `user_id:auth0` will not match a `user_id` with value `auth0|12345`, instead, use `user_id:auth0*`. See [wildcards](/users/search/v3/query-syntax#wildcards) and [exact matching](/users/search/v3/query-syntax#exact-match).
* Wildcards may only be used for prefix matching against the field value with literal strings, or for more than three contiguous characters. For example, `name:j*`, `name:*joh`, and `name:*joh*` are allowed, but `name:*j`, and `name:*jo*` are not.
* The `.raw` field extension is no longer supported and must be removed. In v3, fields match the whole value that is provided and are not tokenized as they were in v2 without the `.raw` suffix.
* The `_missing_` filter is not supported, consider using `NOT _exists_:...` instead.

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

## Next steps

::: next-steps
* [Learn how you can use the query string syntax to build custom queries](/users/search/v3/query-syntax)
* [Learn about the Auth0 best practices for user search](/users/search/best-practices)
:::
