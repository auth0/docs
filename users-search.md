# Users search

At the [dashboard user' section](https://manage.auth0.com/#/users) you can search throught your registered users
using [Elastic Search Query string syntax](http://www.elastic.co/guide/en/elasticsearch/reference/1.x/query-dsl-query-string-query.html#query-string-syntax).

We provide some examples below:

## Cross-fields search

```
jhon
```

## Search by field

```
name:john
```

Search all users which its name is 'jhon'

## Search by email (exact match)

```
email:john@contoso.com
```

## Search by multiple emails (specifying OR/AND operators)

```
email:("john@contoso.com 0OR mary@contoso.com")
```

## Search users without verified email

```
-email_verified:true
```

## Search users with some app_metadata field

```
_exists_:app_metadata.plan
```

## Search users without some app_metadata field

```
_missing_:app_metadata.plan
```

## List all users from specific connection/provider

```
identities.provider:"google-oauth2"
```

## List all users with more than 100 logins

```
loginsCount:>100
```

## List all users who logged in last year

```
lastLogin:[2014-01-01 TO 2014-12-31)]
```

## List all users who logged in before 2015

```
lastLogin:[* TO 202014-12-31]
```

More samples with ranges:

* Logins count from 100 to 200: `loginsCount:[100 TO 200]`
* Logins count from 100 upwards: `loginsCount:[100 TO *]`
* Curly and square brackets can be combined: `loginsCount:[100 TO 200}

## List all users with a specific role

```
app_metadata.roles:"admin"
```

## fuzziness
We can search for terms that are similar to, but not exactly like our search terms.

```
name:jhn~
```
