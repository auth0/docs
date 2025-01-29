---
title: Sort Search Results
description: Learn how to sort search results by passing a field:order value to the sort parameter.
topics:
  - users
  - user-management
  - search
contentType: how-to 
useCase:
  - manage-users
---
# Sort Search Results

To sort user search results, pass a `field:order` value to the `sort` parameter when making your request. The `field` is the name of the field to sort by, while order can be set to `1` for ascending order and `-1` for descending. 

::: note
Sorting by `app_metadata` or `user_metadata` is not supported.
:::

## Sample request

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

## Keep reading

For more information on `sort` and other parameters, see the [Management API Explorer](/api/management/v2#!/Users/get_users) documentation.
