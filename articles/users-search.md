# Users search

You can search registered users using our [dashboard](${uiURL}/#/users) or [APIv2](/api/v2#!/users/get_users) using [Elastic Search Query string syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.htm).

Here are some examples:

## Cross-field search

```
john
```

## Search by field

```
name:"john"
```

Search all users whose name is exactly john

## Search by email (exact match)

```
email:"john@contoso.com"
```

## Search by multiple emails (specifying OR/AND operators)

```
email:("john@contoso.com" OR "mary@contoso.com")
```

## Search users without verified email

```
email_verified:false OR _missing_:email_verified
```

## Search users with some app_metadata field

```
_exists_:app_metadata.plan
```

## Search users without some app_metadata field

```
_missing_:app_metadata.plan
```

## List all users from a specific connection or provider


```
identities.provider:"google-oauth2"
```

## List all users with more than 100 logins

```
logins_count:>100
```

## List all users that never logged in

```
(_missing_:logins_count OR logins_count:0)
```

## List all users who logged in before 2015

```
last_login:[* TO 2014-12-31]
```

More samples with ranges:

* Logins count >= 100 and <= 200: `logins_count:[100 TO 200]`
* Logins count >= 100: `logins_count:[100 TO *]`
* Logins count > 100 and < 200 `logins_count:{100 TO 200}`
* Curly and square brackets can be combined: `logins_count:[100 TO 200}

## List all users with a specific role

```
app_metadata.roles:"admin"
```

## fuzziness
You can search for terms that are similar to, but not exactly like our search terms.

```
name:jhn~
```
