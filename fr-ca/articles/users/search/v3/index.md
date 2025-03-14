---
title: User Search
description: Understand how the Auth0 Management API search endpoints allow you to search for and retrieve user profiles.
topics:
  - users
  - user-management
  - user-profile
  - normalized-user-profile
  - auth0-user-profiles
  - search
contentType:
  - index
  - concept
useCase:
  - manage-users
---
# User Search

User search allows you to retrieve user profile details using Auth0's [Management API](/api/management/v2). Search results can be [viewed](/users/search/v3/view-search-results-by-page), [sorted](/users/search/v3/sort-search-results), and [exported](/users/guides/bulk-user-exports).

::: note
Most user profile fields are not returned as part of an [ID Token](/tokens/concepts/id-tokens), nor are they included in the response from the [/userinfo endpoint](/api/authentication#get-user-info) of the Authentication API. 
:::

When searching for users in Auth0, you can use multiple endpoints to search for ID, email, or other criteria:

| Requirement | Endpoint to Use |
| - | - |
| Searches involving user attributes | [Get Users](/users/search/v3/get-users-endpoint) |
| Searches returning multiple users | [Get Users](/users/search/v3/get-users-endpoint) or [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |
| Operations requiring [immediate consistency](#search-result-terminology) | [Get Users by ID](/users/search/v3/get-users-by-id-endpoint) or [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |
| Actions requiring user search as part of authentication processes | [Get Users by ID](/users/search/v3/get-users-by-id-endpoint) or [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |
| Searching for users for account linking by email | [Get Users by Email](/users/search/v3/get-users-by-email-endpoint) |

## Search Result Terminology

We use the following terms to describe the user search results:

* **Eventually consistent**: Search results may not reflect a recently-completed write operation. However, if you repeat your request after a short period of time, the response will return up-to-date data.

* **Immediately consistent**: Search results will reflect the results of all successful write operations, including those that occurred shortly prior to your request.

## Search Best Practices

For info on best practices, see [User Search Best Practices](/best-practices/search-best-practices).

## Keep reading

* [Migrate from Search V2 to V3](/users/search/v3/migrate-search-v2-v3)
* [User Search Query Syntax](/users/search/v3/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
* [Normalized User Profiles Overview](/users/normalized)
* [Identify Users](/users/normalized/auth0/identify-users)
* [Normalized User Profile Schema](/users/normalized/auth0/normalized-user-profile-schema) 
* [Sample User Profiles](/users/normalized/auth0/sample-user-profiles)

