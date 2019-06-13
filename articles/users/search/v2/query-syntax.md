---
toc: true
description: This page explains query string syntax, which you can use to construct custom queries when searching using Auth0's Management API.
crews: crew-2
topics:
  - users
  - user-management
  - search
  - query-syntax
contentType:
  - reference
useCase:
  - manage-users
---

# User Search Query Syntax

::: version-warning
This document covers a previous version of user search. We recommend you use [user search v3](/users/search/v3).
:::

This page explains query string syntax, the mini-language used by the Query String Query.

When searching using Auth0's [List or search users](/api/v2/#!/Users/get_users) endpoint, you can construct custom queries using this syntax for the value of the `q` field.

The query string is parsed into a series of *terms* and *operators*. A term can be a single word  (`john` or `smith`) or a phrase surrounded by double quotes (`"john smith"`) which will match all the words in the phrase in the same order.

## Searchable fields

You can search for users using the following fields:

* All the [normalized user profile](/users/normalized/auth0/normalized-user-profile-schema) fields

* __Only__ the profile information under the `user_metadata` object:
  - `name`
  - `nickname`
  - `given_name`
  - `family_name`

::: warning
New tenants, starting September 1st 2017, cannot search any of the `app_metadata` fields. Paid tenants (that is, tenants that have a credit card associated in the [Dashboard](${manage_url}/#/tenant/billing/payment)), that were created up to August 31st 2017, can search using the `app_metadata` fields.
Note that [Search v3](/users/search/v3/query-syntax) does not have this restriction.
:::
For more information, see the [Metadata Overview](/users/concepts/overview-user-metadata).

### Field name examples

Some examples of query string syntax are:

* Where the `created_at` field contains `2016`: `created_at:2016`

* Where the `user_name` field contains `john` or `smith`. If you omit the OR operator the default operator will be used.

    `user_name: (john OR smith)`
    `user_name: (john smith)`

* Where the `user_name` field contains the exact phrase `"john smith"`: `user_name: "john smith"`

* Where the field `nickname` has no value or is missing: `NOT _exists_: nickname`

* Where the field `nickname` has any non-null value: `_exists_: nickname`

* Your query can search across more than one field by using the `AND` & `OR` condition. Where the username field is exactly `"john"` AND the field `nickname` has any non-null value: `username: "john" AND _exists_: nickname`

## Wildcards

Wildcard searches can be run on individual terms, using `?` to replace a single character, and `*` to replace zero or more characters: `2016-0?-*`

Note that certain wildcard queries will require an enormous amount of memory and perform poorly. (For example, imagine how many terms need to be queried to match the query string `"a* b* c*"`.)

## Regular expressions

Regular expression patterns can be embedded in the query string by wrapping them in forward-slashes ("/"): `name:/joh?n(ath[oa]n)/`

::: note
A detailed explanation of the supported regular expression syntax is explained on the Elastic's site at [Regular Expression Syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html#regexp-syntax).
:::

## Fuzziness

You can search for terms that are similar to, but not exactly like, your search terms using the `~` as a "fuzzy" operator: `oauth~`

This is useful for commonly misspelled fields.

## Proximity searches

While a phrase query (eg `"john smith"`) matches all of the terms in  the exact same order, a proximity query allows the specified words to be further apart or in a different order. In the same way that a fuzzy query can specify a maximum edit distance between characters in a word, a proximity search allows you to specify a maximum distance between words in a phrase: `"fox quick"~5`

The closer the text in a field is to the original order specified in the query string, the more relevant that result is ranked. When compared to the above example query, the phrase `"quick fox"` would be considered more relevant than `"quick brown fox"`.

## Ranges

Inclusive ranges are specified with square brackets: `[min TO max]` and exclusive ranges with curly brackets: `{min TO max}`. Curly and square brackets can be combined in the same range expression: `logins_count:[100 TO 200}`.

Ranges can be specified for date, numeric or string fields.

Some examples of range queries are:

* Last login date of 2015:

    `last_login:[2015-01-01 TO 2015-12-31]`

* Users who have logged in between 1-5 times:

    `logins_count:[1 TO 5]`

* Last login between two dates, excluding the first and last day:

    `last_login:{2012-01-01 TO 2012-12-31}`

* Users that have logged on over 10 times:

    `logins_count:[10 TO *]`

* Logins before 2015:

    `last_login{* TO 2015-01-01}`

Curly and square brackets can be combined in the same range expression:

* Logins count > 100 and < 200:

    `logins_count:[100 TO 200}`

For ranges with one side unbounded, you can use the following syntax:

`logins_count:>10`
`logins_count:>=10`
`logins_count:<10`
`logins_count:<=10`

To combine an upper and lower bound with the simplified syntax, you need to join two clauses with an `AND` operator:

`logins_count:(>=10 AND <20)`
`logins_count:(+>=10 +<20)`

The parsing of ranges in query strings can be complex and error prone. It is more reliable to use an explicit [range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html).

## Boosting

Use the boost operator ^ to make one term more relevant than another. For instance, if you want to find all documents about foxes, but are especially interested in quick foxes:

`quick^2 fox`

The default *boost* value is 1, but it can be any positive floating-point number. Boost values between 0 and 1 reduce relevance of the matching result.

Boosts can also be applied to phrases or groups:

`"john smith"^2   (foo bar)^4`

## Boolean operators

By default, all terms are optional as long as one term matches. A search for `foo bar baz` will find any document that contains one or more of `foo` or `bar` or `baz`.

Use of the `default_operator`, which allows you to force all terms to be required, is [discussed above](#field-name-examples). However, there are Boolean operators that can be used in the query string itself for more control.

The preferred operators are `+` (this term *must* be present) and `-` (this term *must not* be present). All other terms are optional. For example, this query:

`quick brown +fox -news`

states that:

* `fox` must be present
* `news` must not be present
* `quick` and `brown` are optional but their presence will increase the relevance of the result.

The familiar operators `AND`,` OR` and `NOT `(also written `&&`,`||` and `!`) are also supported. However, the effects of these operators can be more complicated than is obvious at first. `NOT` takes precedence over `AND`, which takes precedence over `OR`. While the `+` and `-` only affect the term to the right of the operator, `AND` and `OR` can affect both the terms to the left and to the right.

## Grouping

Multiple terms or clauses can be grouped together with parentheses to form sub-queries:

`(quick OR brown) AND fox`

Groups can be used to target a particular field, or to boost the result of a sub-query:

`status:(active OR pending) title:(full text search)^2`

## Reserved characters

If you need to use any of the characters which function as operators in the query itself as literal text (not as operators), then you must escape them with a leading backslash. For instance, to search for "(1+1)=2", you would need to write your query as `\(1\+1\)\=2`.

The reserved characters are: `+ - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /`

Failing to escape these special characters correctly could lead to a syntax error which will prevent your query from executing correctly.

## Empty query

If the query string is empty or contains only whitespaces, the query will yield an empty result set.

## Additional Information

For example queries for searching users, see [Users Search](/api/v2/user-search).

::: note
The preceding information is adapted from Elastic's [Elasticsearch Reference](http://elastic.co).
:::
