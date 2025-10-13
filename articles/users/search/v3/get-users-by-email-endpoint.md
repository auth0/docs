---
title: Retrieve Users with the Get Users by Email Endpoint 
description: Learn how to retrieve lists of users using the get-users-by-email endpoint. 
topics:
  - users
  - user-management
  - search
contentType: how-to 
useCase:
  - manage-users
---
# Retrieve Users with the Get Users by Email Endpoint 

With the [`GET /api/v2/users-by-email` endpoint](/api/management/v2#!/Users_By_Email/get_users_by_email) you can search for users by their email address. The search looks for an exact match of the provided email address and both case-sensitive and case-insensitive searches are supported.

This endpoint is **immediately consistent**, and as such, we recommend that you use this endpoint for:

* User searches run during the authentication process. 
* User searches run as part of the account linking process.

<%= include('./_valid-access-token') %>

## Syntax

*Required Scopes*: `read:users`

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users-by-email?email=USER_EMAIL_ADDRESS",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }]
}
```

Searches are case-sensitive by default. For case-insensitive searches, include the `case_sensitive` query parameter and set it to `false`.

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users-by-emailemail=USER_EMAIL_ADDRESS",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString" : [
        { "name": "email", "value": "USER_EMAIL_ADDRESS" },
        { "name": "case_sensitive", "value": "false"}
    ]
}
```

### Sample results 

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

## Keep reading

* [Sort Search Results](/users/search/v3/sort-search-results)
* [View Search Results by Page](/users/search/v3/view-search-results-by-page)
* [Bulk User Exports](/users/guides/bulk-user-exports)
* [Migrate from Search V2 to V3](/users/search/v3/migrate-search-v2-v3)
* [User Search Query Syntax](/users/search/v3/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
* [Management API Explorer](/api/management/v2#!/Users/get_users)
