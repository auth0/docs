---
description: This page lists several examples of user search queries using query string syntax.
section: apis
crews: crew-2
toc: true
---
# User Search

Auth0 allows you, as an administrator, to search for users using [Lucene Query Syntax](http://www.lucenetutorial.com/lucene-query-syntax.html). This syntax can be used either in the [Users section of the Auth0 Dashboard](${manage_url}/#/users) or with the [`GET /api/v2/users` endpoint](/api/management/v2#!/Users/get_users) of the [Management API](/api/v2)  

This document will demonstrate the various ways in which you can search for users, as well as give some example queries. It is however suggested that you also reference the [Query String Syntax document](/api/management/v2/query-string-syntax) for more examples of the query string syntax.

All the [normalized user profile](/user-profile/normalized) fields, as well as the `user_metadata` and `app_metadata` are searchable.

::: note
For more information on working with `user_metadata` and `app_metadata`, please read the [Metadata documentation](https://auth0.com/docs/metadata).
:::

## Search for Users in the Dashboard

You can search for users in the [Users section of the Auth0 Dashboard](${manage_url}/#/users). To use the [Lucene Query Syntax](/api/management/v2/query-string-syntax), go to the **Search By** drop down and select **Lucene Syntax (advanced)**.

![Select Lucene Syntax](/media/articles/api/user-search-lucene.png)

## Search for Users Using the Management API

You can also search for users using the [Management API](/api/v2). Two of the easiest ways to do this is by either making use of the **API Explorer** or by using **Postman**. These 2 techniques are discussed briefly below, but please note that the Auth0 Management API is a REST API, so you can make API calls using anything that can make HTTP requests, or by using one of the [Auth0 SDKs](/support/matrix#sdks).

In order to make requests to the Management API, you will need a token. Please refer to [The Auth0 Management APIv2 Token](/api/management/v2/tokens) for more information.

### Search using the API Explorer

To search users using the [Management API Explorer](/api/v2#!/users/get_users), go to the **Users** section and then select **List or search users**. Scroll down to the `q` parameter. You can use any query string which uses the [query string syntax](/api/management/v2/query-string-syntax) in this field.

![Searching users in API Explorer](/media/articles/api/search-users-api.png)

### Search using Postman

You can also search users using the Postman Collection for the Management API. Make sure you read [Using the Auth0 API with our Postman Collections](https://auth0.com/docs/api/postman) for more information on how to install the collection and also configure your Postman environment correctly.

Once you have downloaded the collection, and configured your environment, select the **Management API** collection. Navigate to the **Users** folder and select **List or search users**. You can enter your query in the `q` parameter of the URL:

![Searching users in Postman](/media/articles/api/postman/get-users-postman.png)

::: note
For general information on making Postman request, please refer to the [Postman documentation](https://www.getpostman.com/docs/requests).
:::

### Sorting Search Results 

To sort the list of users returned from the Management API, you can make use of the `sort` parameter.  Use the format `field:order` for the value of the `sort` field, where `field` is the name of the field you want to sort by, and `order` can be `1` for ascending and `-1` for descending. For example, to sort users in ascending order by the `created_at` field you can pass the value of `created_at:1` for the `sort` parameter. 

For more information on the `sort` and other parameters, please refer to the [Management API Explorer documentation](/api/v2#!/users/get_users).

::: note
If there is no default sort field specified, some users that have never logged in, may not appear. No default sort field may also result in duplicate records returned and the order of list of users may appear random.
:::

## Exact Matching and Tokenization

Because of the manner in which ElasticSearch handles tokenization on `+` and `-`, unexpected results can occur when searching by some fields. For example, when searching for a user whose `name` is `jane` (`name:"jane"`), the results will be both for `jane` and `jane-doe`, because both of these _contain_ the exact search term that you used. The difference may not affect some searches, but it will affect others, and provide unanticipated results.

You can solve this problem either by using structured JSON in your metadata, or by using the raw subfield.

### Structured JSON vs Delimited Strings

Using structured JSON in your metadata is the ideal. Using delimited strings can result in security risks and exposure to problems. Here is an example of structured JSON which can be stored in the `user_metadata` (or `app_metadata`) field:

```json
{
  "preference": {
    "color": "pink",
    "displayTitleBar": true
  }
}
```

::: note
For further information on metadata and how it should be structured can be found in the [metadata documentaton](/metadata).
:::

### Using the `raw` Subfield

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

## Example Queries

Below are some example queries to illustrate the kinds of queries that are possible using the dashboard or the Management API V2.

Use Case | Query
---------|----------
Search across all fields for "john" | `john`
Search for all users whose name _contains_ "john" | `name:"john"`
Search all users whose name _is_ exactly "john" | `name.raw:"john"`
Search for all user names starting with "john" | `name:john*`
Search for user names that start with "john" and end with "smith" | `name:john*smith`
Search for all users whose email _is_ exactly "john@contoso\.com" | `email.raw:"john@contoso.com"`
Search for all users whose email is exactly "john@contoso\.com" or "mary@contoso\.com" using `OR` | `email.raw:("john@contoso.com" OR "mary@contoso.com")`
Search for users without verified email | `email_verified:false OR _missing_:email_verified`
Search for user users who has the `user_metadata` field named `blog_url` with the value of "www.johnsblog.com" | `user_metadata.blog_url:"www.johnsblog.com"`
Search for users where the _nested_ `user_metadata` field named `preference.color` has the value of "pink" | `user_metadata.preference.color:"pink"`
Search for users where the `app_metadata` field named `firstName` has a value of "John" | `app_metadata.firstName:"John"`
Search for users that have an `app_metadata` field named `plan` | `_exists_:app_metadata.plan`
Search for users without the `app_metadata` field named `plan` | `_missing_:app_metadata.plan`
Search for users how have the role of "admin" | `app_metadata.roles:"admin"`
Search for users from a specific connection or provider | `identities.provider:"google-oauth2"`
Search for all users that have never logged in | `(_missing_:logins_count OR logins_count:0)`
Search for all users who logged in before 2015 | `last_login:[* TO 2014-12-31]`
Fuzziness: Search for terms that are similar to, but not exactly like, `jhn` | `name:jhn~`

### Example Request

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

### Search using ranges

Inclusive ranges are specified with square brackets: `[min TO max]` and exclusive ranges with curly brackets: `{min TO max}`. Curly and square brackets can be combined in the same range expression: `logins_count:[100 TO 200}`.

Use Case | Query
---------|----------
All users with more than 100 logins | `logins_count:>100`
Logins count >= 100 and <= 200 | `logins_count:[100 TO 200]`
Logins count >= 100 | `logins_count:[100 TO *]`
Logins count > 100 and < 200 | `logins_count:{100 TO 200}`
