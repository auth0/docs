---
title: Retrieve Users with the Get Users Endpoint
description: Learn how to retrieve lists of users using the get_users endpoint.
topics:
  - users
  - user-management
  - search
contentType: how-to 
useCase:
  - manage-users
---
# Retrieve Users with the Get Users Endpoint 

The [`GET /api/v2/users` endpoint](/api/management/v2#!/Users/get_users) allows you to retrieve a list of users. Using this endpoint, you can:

* Search based on a variety of criteria
* Select the fields to be returned
* Sort the returned results

This endpoint is **eventually consistent**, and as such, we recommend that you use this endpoint for back office processes such as changing the display name of an existing user.

<%= include('./_valid-access-token') %>

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

### Sample queries

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
Search for all users whose email domain is "exampleco.com" | `email.domain:"exampleco.com"`

### Sample results

Successful calls to the endpoint return a JSON object similar to the following:

```json
[
  {
    "email": "john.doe@gmail.com",
    "email_verified": false,
    "username": "johndoe",
    "phone_number": "+199999999999999",
    "phone_verified": false,
    "user_id": "usr_5457edea1b8f33391a000004",
    "created_at": "",
    "updated_at": "",
    "identities": [
      {
        "connection": "Initial-Connection",
        "user_id": "5457edea1b8f22891a000004",
        "provider": "auth0",
        "isSocial": false
      }
    ],
    "app_metadata": {},
    "user_metadata": {},
    "picture": "",
    "name": "",
    "nickname": "",
    "multifactor": [
      ""
    ],
    "last_ip": "",
    "last_login": "",
    "logins_count": 0,
    "blocked": false,
    "given_name": "",
    "family_name": ""
  }
]
```

## Limitations

This endpoint allows you to retrieve a maximum of 1000 users. If your results exceed this threshold, redefine your search. If you need a complete export of all of your users, instead use the [export job](/api/management/v2#!/Jobs/post_users_exports) or the [User Import / Export](/extensions/user-import-export) extension.

If you get the error `414 Request-URI Too Large` this means that your query string is larger than the supported length. In this case, refine your search.

We do **not** recommend that you use this endpoint for:

* Operations that require immediate consistency. Instead, use the [Get Users by Email endpoint](/users/search/v3/get-users-by-email-endpoint) or the [Get Users by ID endpoint](/users/search/v3/get-users-by-id-endpoint).
* User exports. Instead, use the [User Export endpoint](/users/guides/bulk-user-exports).
* Operations that require user search as part of authentication processes. Instead, use the [Get Users by Email endpoint](/users/search/v3/get-users-by-email-endpoint) or the [Get Users by ID endpoint](/users/search/v3/get-users-by-id-endpoint).
* Searching for Users for [Account Linking](/users/concepts/overview-user-account-linking) by Email. Instead, use the [Get Users by Email endpoint](/users/search/v3/get-users-by-email-endpoint).

## Keep reading

* [Sort Search Results](/users/search/v3/sort-search-results)
* [View Search Results by Page](/users/search/v3/view-search-results-by-page)
* [Bulk User Exports](/users/guides/bulk-user-exports)
* [Migrate from Search V2 to V3](/users/search/v3/migrate-search-v2-v3)
* [User Search Query Syntax](/users/search/v3/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
* [Management API Explorer](/api/management/v2#!/Users/get_users)
