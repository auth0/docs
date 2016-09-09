---
description: This page lists several examples of users search queries using query string syntax.
section: apis
---

# Users Search

You can search registered users using the [dashboard](${manage_url}/#/users) or the [Management APIv2](/api/v2#!/users/get_users) using [query string syntax](/api/management/v2/query-string-syntax) for the `q` field value.

Only fields in `user_metadata`, `app_metadata` or the [normalized user profile](/user-profile/normalized) are searchable. Note that users have read/write access to the `user_metadata` field but only read-only access to the `app_metadata` field.

## Examples

Here are some example queries:

### Cross-field search

`john`

### Search by specific field

Search all users whose name is exactly "john":

`name:"john"`

### Search by email

Search all users whose email is exactly "john@contoso\.com":

`email:"john@contoso.com"`

### Search by multiple emails

Search all users whose email is exactly "john@contoso\.com" or "mary@contoso\.com" using `OR` or `AND` operators:

`email:("john@contoso.com" OR "mary@contoso.com")`

### Search users without verified email

`email_verified:false OR _missing_:email_verified`

### Filter a specific *user_metadata* field

`user_metadata.blog_url:"www.johnsblog.com"`

(`user_metadata` field names are customizable; "blog_url" is an example field.)

### Filter a specific *app_metadata* field

`app_metadata.firstName:"John"`

(`app_metadata` field names are customizable; "firstName" is an example field.)

### Search users that have a certain *app_metadata* field

`_exists_:app_metadata.plan`

("plan" is an example field.)

### Search users without a certain *app_metadata* field

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
