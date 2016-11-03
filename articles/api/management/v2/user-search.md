---
description: This page lists several examples of users search queries using query string syntax.
section: apis
---

# Users Search

You can search registered users using the [dashboard](${manage_url}/#/users) or the [Management APIv2](/api/v2#!/users/get_users) using [query string syntax](/api/management/v2/query-string-syntax) for the `q` field value.

Only fields in `user_metadata`, `app_metadata` or the [normalized user profile](/user-profile/normalized) are searchable. Note that users have read/write access to the `user_metadata` field but only read-only access to the `app_metadata` field.

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



## Examples

Below are some example queries to illustrate the kinds of queries that are possible using the dashboard or the APIv2. 

### Cross-field search

`john`

### Search by specific field

Search for all users whose name _contains_ exactly "john":

`name:"john"`

Search all users whose name _is_ exactly "john":

`name.raw:"john"`

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
