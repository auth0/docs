# Users Search

You can search registered users using our [dashboard](${uiURL}/#/users) or [APIv2](/api/v2#!/users/get_users) using [query string syntax](/api/v2/query-string-syntax) in the "q" field.

Only fields in `user_metadata`, `app_metadata` or the [normalized user profile](/user-profile/normalized) are searchable. Keep in mind that users have both read/write access to the `user_metadata` field and read-only access to `app_metadata`.

Here are some examples of queries you can use:

## Cross-field search

```
john
```

## Search by specific field 
Search all users whose name is exactly john

```
name:"john"
```

## Search by email 
Search all users whose email is exactly john@contoso.com

```
email:"john@contoso.com"
```

## Search by multiple emails 
Search all users whose email is exactly john@contoso.com or mary@contoso.com (specifying OR/AND operators)

```
email:("john@contoso.com" OR "mary@contoso.com")
```

## Search users without verified email

```
email_verified:false OR _missing_:email_verified
```

## Filtering a specific user_metadata field
Here we use "blog_url" as an example field, field names of user_metadata are customizable 

```
user_metadata.blog_url:"www.johnsblog.com"
```

## Filtering a specific app_metadata field
Here we use "firstName" as an example field, field names of app_metadata are customizable 

```
app_metadata.firstName:"John"
```

## Search users that have a certain app_metadata field
Here we use "plan" as an example field, field names of app_metadata are customizable 

```
_exists_:app_metadata.plan
```

## Search users without a certain app_metadata field

```
_missing_:app_metadata.plan
```

## List all users with a specific role

```
app_metadata.roles:"admin"
```

## List all users from a specific connection or provider

```
identities.provider:"google-oauth2"
```

## Searching using ranges:
Inclusive ranges are specified with square brackets `[min TO max]` and exclusive ranges with curly brackets `{min TO max}` and curly and square brackets can be combined: `logins_count:[100 TO 200}`

* All users with more than 100 logins: `logins_count:>100`
* Logins count >= 100 and <= 200: `logins_count:[100 TO 200]`
* Logins count >= 100: `logins_count:[100 TO *]`
* Logins count > 100 and < 200 `logins_count:{100 TO 200}`


## List all users that never logged in

```
(_missing_:logins_count OR logins_count:0)
```

## List all users who logged in before 2015

```
last_login:[* TO 2014-12-31]
```

## Fuzziness
You can search for terms that are similar to, but not exactly like our search terms.

```
name:jhn~
```
