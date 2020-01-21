---
title: Retrieve Users with the Get Users by ID Endpoint 
description: Learn how to retrieve lists of users using the get-users-by-id endpoint.
topics:
  - users
  - user-management
  - search
contentType: how-to 
useCase:
  - manage-users
---
# Retrieve Users with the Get Users by ID Endpoint 

The [`GET /api/v2/users/{id}` endpoint](/api/management/v2#!/Users/get_users_by_id) allows you to retrieve a specific user using their Auth0 user ID.

This endpoint is **immediately consistent**, and as such, we recommend that you use this endpoint for:

* User searches run during the authentication process. 
* User searches run as part of the account linking process.

::: note
The user ID should be URL encoded since it may contain characters that do not work well in a URL.
:::

<%= include('./_valid-access-token') %>

## Syntax

*Required Scopes*: `read:users`

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users/USER_ID",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }]
}
```

### Sample results

```json
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
```

## Keep reading

* [Sort Search Results](/users/search/v3/sort-search-results)
* [View Search Results by Page](/users/search/v3/view-search-results-by-page)
* [Bulk User Exports](/users/guides/bulk-user-exports)
* [Migrate from Search V2 to V3](/users/search/v3/migrate-search-v2-v3)
* [User Search Query Syntax](/users/search/v3/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
* [Management API Explorer](/api/management/v2#!/Users/get_users)
