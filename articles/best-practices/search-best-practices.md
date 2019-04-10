---
name: User Search Best Practices
description: Best practices when searching for users in Auth0
topics:
  - users
  - user-management
  - search
contentType: reference
useCase:
  - manage-users
---

# User Search Best Practices

When running user searches:

* You'll need a token to make requests to the Management API. Check out [Access Tokens for the Management API](/api/management/v2/tokens) for more information.
* To perform user search requests, the `read:users` [scope](/scopes/) is required.
* To get the latest search results, use an **immediately consistent** endpoint during authentication processes such as [Get Users by ID](/users/search/v3/get-users-by-id-endpoint) and [Get Users by Email](/users/search/v3/get-users-by-email-endpoint). Searches using these endpoints will reflect the results of all successful write operations, including those that occurred shortly prior to your request. 
* Use a well-known schema for metadata:
  * Use consistent data types for properties.
  * Avoid dynamic property names.
  * Avoid large schema sizes and deep structures.
  * Avoid storing data you do not need for authentication and authorization purposes.
* Don't use existence queries (for example, "give me all users with a property regardless of its value").
* Don't use full text search or partial searches.
* Don't poll the search APIs.
* Don't use large metadata fields (try to keep metadata fields to 2 KB or less).
* If you are using [user search engine v2](/api/management/v2/user-search), check out the section on [migrating from v2 to v3](/users/search/v3/migrate-search-v2-v3).

::: note
The user search engine v3 is not available in Management API v1, which is deprecated. If you are using the Management API v1, you will need to upgrade to [Management API v2](/api/management/v2) before being able to use the user search engine v3. See [Management API v1 vs v2](/api/management/v2/changes) for more information.
:::
