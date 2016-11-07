---
description: This page lists several examples of users search queries using query string syntax.
section: apis
---

# Users Search

As an Auth0 admin you can search different fields of your users using [query string syntax](/api/management/v2/query-string-syntax) with the Users section of the Management API.

The `user_metadata`, `app_metadata` or the [normalized user profile](/user-profile/normalized) fields are searchable. Note that users have read/write access to the `user_metadata` field but only read-only access to the `app_metadata` field.

Auth0 User Search uses [Lucene Query Syntax](http://www.lucenetutorial.com/lucene-query-syntax.html).

## In the Dashboard

To search user fields in the [dashboard](${manage_url}/#/users), use the **Search By** drop down to select the field for the search. To use [Lucene Query Syntax](/api/management/v2/query-string-syntax) as shown in the [queries below](#example-queries) select **Lucene Syntax (Advanced)**.

![Select Lucene Syntax](/media/articles/api/user-search-lucene.png)

## Using the Management API

### API Explorer

To search users using the [Management APIv2](/api/v2#!/users/get_users) explorer go to the **Users** section and then select **List or search users**. Click on the scopes for your search. Scroll down to the `q` parameter, this field uses [query string syntax](/api/management/v2/query-string-syntax). 

![q parameter](/media/articles/api/search-users-api.png)

In this field enter your query string to search users. [See below](#example-queries) for examples of queries you can run from this field.

### Postman 

To search users in [Postman](https://auth0.com/docs/api/postman). First make sure your [enviroment is configured](https://auth0.com/docs/api/postman#configuring-the-postman-environment). Then select the **Management API** as the enviroment you want to work in. For searching users, the API method is `GET ${account.namespace}/api/v2/users` which is under **Users** -> **List or search users**.

![Select GET users](/media/articles/api/postman/get-users-postman.png)

Then you can run your queries in the **Body** section and click **Send**. 

[Click here for more information on Postman requests](https://www.getpostman.com/docs/requests)

## Exact Matching and Tokenization

Because of the manner in which ElasticSearch handles tokenization on `+` and `-`, unexpected results can occur when searching by some fields. For example, when searching for a user whose `name` is "jane".

`name:"jane"`

However, this will return results for both `jane` and `jane-doe` because both of these _contain_ the exact search term that you used. The difference may not affect some searches, but it will affect others, and provide unanticipated results.

### Structured JSON vs Delimited Strings

Using structured JSON in your metadata is the ideal. Using delimited strings can result in security risks and exposure to problems. More information on metadata and how it should be structured can be found in the [metadata documentaton](/metadata).

### Using the 'raw' Subfield

If you wish to avoid the potential pitfalls of analyzed data and search for an exact match to your term - an exact string comparison - then for some fields you can use the `raw` subfield, which will be `not_analyzed`.

So, in the example

`name.raw:"jane"`

The user data for `jane` would match, but `jane-doe` would not.

The fields which support `raw` subfield queries are as follow:

* `identities.connection﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`identities.provider﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`identities.user_id ﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`email﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`phone_number﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`family_name﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`given_name﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`username﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`name﻿⁠⁠⁠⁠`
* ﻿⁠⁠⁠⁠`nickname﻿⁠⁠⁠⁠`


## Example Queries

Below are some example queries to illustrate the kinds of queries that are possible using the dashboard or the APIv2. 

### Cross-field search

`john`

### Search by specific field

Search for all users whose name _contains_ exactly "john":

`name:"john"`

Search all users whose name _is_ exactly "john":

`name.raw:"john"`

### Wildcard Matching

Search for all user names starting with "john"

`name:"john*"`

Search for user names that start with "john" and end with "smith"

`name:"john*smith"`

### Search by email

Search for all users whose email _is_ exactly "john@contoso\.com":

`email.raw:"john@contoso.com"`

### Search by multiple emails

Search for all users whose email is exactly "john@contoso\.com" or "mary@contoso\.com" using `OR` or `AND` operators:

`email.raw:("john@contoso.com" OR "mary@contoso.com")`

### Search for users without verified email

`email_verified:false OR _missing_:email_verified`

### Filter a specific *user_metadata* field

`user_metadata.blog_url:"www.johnsblog.com"`

(`user_metadata` field names are customizable; "blog_url" is an example field.)

### Filter a specific *app_metadata* field

`app_metadata.firstName:"John"`

(`app_metadata` field names are customizable; "firstName" is an example field.)

### Search for users that have a certain *app_metadata* field

`_exists_:app_metadata.plan`

("plan" is an example field.)

### Search for users without a certain *app_metadata* field

`_missing_:app_metadata.plan`

### List all users with a specific role

`app_metadata.roles:"admin"`

### List all users from a specific connection or provider

`identities.provider:"google-oauth2"`

### Search using ranges

Inclusive ranges are specified with square brackets: `[min TO max]` and exclusive ranges with curly brackets: `{min TO max}`. Curly and square brackets can be combined in the same range expression: `logins_count:[100 TO 200}`.

* All users with more than 100 logins:

    `logins_count:>100`
* Logins count >= 100 and <= 200:

    `logins_count:[100 TO 200]`

* Logins count >= 100:

    `logins_count:[100 TO *]`

* Logins count > 100 and < 200

    `logins_count:{100 TO 200}`


### List all users that have never logged in

`(_missing_:logins_count OR logins_count:0)`

### List all users who logged in before 2015

`last_login:[* TO 2014-12-31]`

### Fuzziness

You can search for terms that are similar to, but not exactly like, your search terms:

`name:jhn~`
