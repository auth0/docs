---
description: This page lists several examples of user search queries using query string syntax.
crews: crew-2
toc: true
topics:
  - users
  - user-management
  - search
contentType:
  - reference
  - how-to
  - index
useCase:
  - manage-users
---
# User Search

::: version-warning
For all deployment models except Private Cloud, user search v2 has reached its end of life as of **June 30, 2019**. For information on migrating from user search v2 to v3, see [Migrate from search engine v2 to v3](/users/search/v3/migrate-search-v2-v3).
:::

Auth0 allows you, as an administrator, to search for users using [Lucene Query Syntax](http://www.lucenetutorial.com/lucene-query-syntax.html).

This document provides sample queries and demonstrates how you can search for users. We also suggest that you refer to [Query String Syntax](/api/management/v2/query-string-syntax) for more examples of query string syntax.

::: warning
The user search endpoint allows you to return a maximum of **10,000** users. For additional results, please use either the [User Export Job endpoint](/api/management/v2#!/Jobs/post_users_exports) or the [User Export Extension](/extensions/user-import-export).
:::

## Search for users using the Management API

You can also search for users using the [Management API](/api/v2). Two of the easiest ways to do this is by either making use of the **API Explorer** or by using **Postman**. These two techniques are discussed briefly below, but please note that the Auth0 Management API is a REST API, so you can make API calls using anything that can make HTTP requests, or by using one of the [Auth0 SDKs](/support/matrix#sdks).

In order to make requests to the Management API, you will need a token. Please refer to [Access Tokens for the Management API](/api/management/v2/tokens) for more information.

### Search using the API Explorer

To search users using the [Management API Explorer](/api/management/v2#!/Users/get_users), go to the **Users** section and then select **List or search users**. Scroll down to the `q` parameter. You can use any query string which uses the [query string syntax](/api/management/v2/query-string-syntax) in this field.

![Searching users in API Explorer](/media/articles/api/search-users-api.png)

### Search using Postman

You can also search users using the Postman Collection for the Management API. Make sure you read [Using the Auth0 API with our Postman Collections](/api/postman) for more information on how to install the collection and also configure your Postman environment correctly.

Once you have downloaded the collection, and configured your environment, select the **Management API** collection. Navigate to the **Users** folder and select **List or search users**. You can enter your query in the `q` parameter of the URL:

![Searching users in Postman](/media/articles/api/postman/get-users-postman.png)

::: note
For general information on making Postman request, please refer to the [Postman documentation](https://www.getpostman.com/docs/requests).
:::

## Sorting search results 

To sort the list of users returned from the Management API, you can make use of the `sort` parameter.  Use the format `field:order` for the value of the `sort` field, where `field` is the name of the field you want to sort by, and `order` can be `1` for ascending and `-1` for descending. For example, to sort users in ascending order by the `created_at` field you can pass the value of `created_at:1` for the `sort` parameter. Sorting by `app_metadata` or `user_metadata` is not supported.

For more information on the `sort` and other parameters, please refer to the [Management API Explorer documentation](/api/v2#!/Users/get_users).

::: note
If there is no default sort field specified, some users that have never logged in, may not appear. No default sort field may also result in duplicate records returned and the order of list of users may appear random.
:::

## Exact matching and tokenization

Because of the manner in which ElasticSearch handles tokenization on `+` and `-`, unexpected results can occur when searching by some fields. For example, when searching for a user whose `name` is `jane` (`name:"jane"`), the results will be both for `jane` and `jane-doe`, because both of these _contain_ the exact search term that you used. The difference may not affect some searches, but it will affect others, and provide unanticipated results.

You can solve this problem either by using structured JSON in your metadata, or by using the raw subfield.

## Using the `raw` subfield

If you wish to avoid the potential pitfalls of analyzed data and search for an exact match to your term - an exact string comparison - then for some fields you can use the `raw` subfield, which will be `not_analyzed`.

So, in the example `name.raw:"jane"`, the user data for `jane` would match, but `jane-doe` would not.

The fields that support `raw` subfield queries are:

* `identities.connection⁠⁠⁠⁠`
* ⁠⁠⁠⁠`identities.provider⁠⁠⁠⁠`
* ⁠⁠⁠⁠`identities.user_id⁠⁠⁠⁠`
* ⁠⁠⁠⁠`email⁠`
* ⁠⁠⁠⁠`phone_number⁠⁠`
* ⁠⁠⁠⁠`family_name⁠⁠⁠⁠`
* ⁠⁠⁠⁠`given_name⁠⁠⁠⁠`
* ⁠⁠⁠⁠`username⁠⁠⁠⁠`
* ⁠⁠⁠⁠`name⁠⁠`
* ⁠⁠⁠⁠`nickname`

## Example queries

Below are some example queries to illustrate the kinds of queries that are possible using the Management API V2.

Use Case | Query
---------|----------
Search for all users whose name _contains_ "john" | `name:"john"`
Search all users whose name _is_ exactly "john" | `name.raw:"john"`
Search for all user names starting with "john" | `name:john*`
Search for user names that start with "john" and end with "smith" | `name:john*smith`
Search for all users whose email _is_ exactly "john@contoso\.com" | `email.raw:"john@contoso.com"`
Search for all users whose email is exactly "john@contoso\.com" or "mary@contoso\.com" using `OR` | `email.raw:("john@contoso.com" OR "mary@contoso.com")`
Search for users without verified email | `email_verified:false OR NOT _exists_:email_verified`
Search for users who have the `user_metadata` field named `name` with the value of "John Doe" | `user_metadata.name:"John Doe"`
Search for users from a specific connection or provider | `identities.provider:"google-oauth2"`
Search for all users that have never logged in | `(NOT _exists_:logins_count OR logins_count:0)` 
Search for all users who logged in before 2015 | `last_login:[* TO 2014-12-31]`
Fuzziness: Search for terms that are similar to, but not exactly like, `jhn` | `name:jhn~`
All users with more than 100 logins | `logins_count:>100`
Logins count >= 100 and <= 200 | `logins_count:[100 TO 200]`
Logins count >= 100 | `logins_count:[100 TO *]`
Logins count > 100 and < 200 | `logins_count:{100 TO 200}`

### Example request

Below is an example request for searching all users whose email is exactly "john@contoso.com".

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/api/v2/users",
  "headers": [
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" }
  ],
  "queryString": [
    {
      "name": "q",
      "value": "email.raw:\"john@contoso.com\"",
      "comment": "Query in Lucene query string syntax"
    },
    {
      "name": "search_engine",
      "value": "v2",
      "comment": "Use 'v2' if you want to try our new search engine"
    }
  ]
}
```

## Keep reading

* [Query Syntax](/users/search/v2/query-syntax)
* [Search Best Practices](/best-practices/search-best-practices)
