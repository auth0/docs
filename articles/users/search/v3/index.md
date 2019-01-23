---
title: User Search
description: Understand how the Auth0 Management API search endpoints allow you to search for and retrieve users.
topics:
  - users
  - user-management
  - search
contentType:
  - index
  - concept
useCase:
  - manage-users
---
# User Search

When searching for users in Auth0, there are three different API endpoints you can use. Here's a summary of when you should use each endpoint:

| Requirement | Endpoint to Use |
| - | - |
| Searches involving user attributes | [Get Users](/users/search/v3/get-users-endpoint) |
| Searches returning multiple users | [Get Users](/users/search/v3/get-users-endpoint) or [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |
| Operations requiring immediate consistency | [Get Users by ID](/users/search/v3/get-users-by-id-endpoint) or [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |
| Actions requiring user search as part of authentication processes | [Get Users by ID](/users/search/v3/get-users-by-id-endpoint) or [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |
| Searching for users for account linking by email | [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |

You can sort, view, and export your search results. 

In discussing user search, we use the following terms related to the search results:

* **Eventually consistent**: The search results may not reflect the results of a recently-completed write operation. However, if you repeat your request after a short period of time, the response will return up-to-date data.

* **Immediately consistent**: The search results will reflect the results of all successful write operations, including those that occurred shortly prior to your request.

::: note
User Search v3 is not available for the PSaaS Appliance.
:::

## Keep reading

* [Sort Search Results](/users/search/v3/sort-search-results)
* [View Search Results by Page](/users/search/v3/view-search-results-by-page)
* [Bulk User Exports](/users/guides/bulk-user-exports)
* [Migrate from Search V2 to V3](/users/search/v3/migrate-search-v2-v3)
* [User Search Query Syntax](/users/search/v3/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
* [Management API Explorer](/api/management/v2#!/users/get_users)
