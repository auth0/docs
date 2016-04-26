# Query String Syntax

This page will help you to learn query string syntax, the "mini-language" used by the Query String Query. This will help to form your own queries in the `q` query string parameter when searching using Auth0's [API](/api/v2).

The following information is adapted from [Elastic's](elastic.co) Elasticsearch Reference.

The query string is parsed into a series of *terms* and *operators*. A term can be a single word — `john` or `smith` — or a phrase, surrounded by double quotes — `"john smith"` — which searches for all the words in the phrase, in the same order.

### Field Names

* where the `date` field contains `2016`

`date:2016`

* where the `user_name` field contains `john` or `smith`. If you omit the OR operator the default operator will be used. 

`user_name: (john OR smith)`
`user_name: (john smith)`

* where the `user_name` filed contains the exact phrase `"john smith"`

`user_name: "john smith"`
* where any of the fields of `app_metadata` contain `john` or `smith` (note how we need to escape the * with a backslash)

`app_metadata.\*: (john smith)`

* where the field `description` has no value (or is missing)

`_missing_: description`

* where the field `description` has any non-null value

`_exists_: description`

### Wildcards
Wildcard searches can be run on individual terms, using `?` to replace a single character, and `*` to replace zero or more characters:

`2016-0?-*`

Be aware that wildcard queries can use an enormous amount of memory and perform very badly — just think how many terms need to be queried to match the query string `"a* b* c*"`.

::: panel-warning Warning

Allowing a wildcard at the beginning of a word (eg "\*ing") is particularly heavy, because all terms in the index need to be examined, just in case they match. Leading wildcards can be disabled by setting allow_leading_wildcard to false.
:::

### Regular expressions

Regular expression patterns can be embedded in the query string by wrapping them in forward-slashes ("/"):

`name:/joh?n(ath[oa]n)/`

The supported regular expression syntax is explained [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-regexp-query.html#regexp-syntax).

::: panel-warning Warning
The `allow_leading_wildcard` parameter does not have any control over regular expressions. A query string such as the following would force Elasticsearch to visit every term in the index:

`/.*n/`
Use with caution!
:::

### Fuzziness
We can search for terms that are similar to, but not exactly like our search terms, using the “fuzzy” operator:

`oauth~`

This is useful for commonly misspelled fields.

### Proximity searches
While a phrase query (eg `"john smith"`) expects all of the terms in exactly the same order, a proximity query allows the specified words to be further apart or in a different order. In the same way that fuzzy queries can specify a maximum edit distance for characters in a word, a proximity search allows us to specify a maximum edit distance of words in a phrase:

`"fox quick"~5`
The closer the text in a field is to the original order specified in the query string, the more relevant that document is considered to be. When compared to the above example query, the phrase `"quick fox"` would be considered more relevant than `"quick brown fox"`.

### Ranges
Ranges can be specified for date, numeric or string fields. Inclusive ranges are specified with square brackets `[min TO max]` and exclusive ranges with curly brackets `{min TO max}`.

* Last login date of 2015:

`last_login:[2015-01-01 TO 2015-12-31]

* Users who have logged in between 1-5 times

`logins_count:[1 TO 5]`

* Last login between two dates, excluding the first and last day:

`last_login:{2012-01-01 TO 2012-12-31}`

* Users that have logged on over 10 times

`logins_count:[10 TO *]`

* Logins before 2015

`last_login{* TO 2015-01-01}`

Curly and square brackets can be combined:

* Logins count > 100 and < 200 

`logins_count:[100 TO 200}`

Ranges with one side unbounded can use the following syntax:

`logins_count:>10`
`logins_count:>=10`
`logins_count:<10`
`logins_count:<=10`

To combine an upper and lower bound with the simplified syntax, you would need to join two clauses with an AND operator:

`logins_count:(>=10 AND <20)`
`logins_count:(+>=10 +<20)`

The parsing of ranges in query strings can be complex and error prone. It is much more reliable to use an explicit [range query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-range-query.html).

### Boosting
Use the boost operator ^ to make one term more relevant than another. For instance, if we want to find all documents about foxes, but we are especially interested in quick foxes:
`quick^2 fox`

The default *boost* value is 1, but can be any positive floating point number. Boosts between 0 and 1 reduce relevance.

Boosts can also be applied to phrases or to groups:

`"john smith"^2   (foo bar)^4`

### Boolean operators
By default, all terms are optional, as long as one term matches. A search for `foo bar baz` will find any document that contains one or more of `foo` or `bar` or `baz`. We have already discussed the `default_operator` above which allows you to force all terms to be required, but there are also boolean operators which can be used in the query string itself to provide more control.

The preferred operators are `+` (this term **must** be present) and `-` (this term **must not** be present). All other terms are optional. For example, this query:

`quick brown +fox -news`
states that:

* `fox` must be present
* `news` must not be present
* `quick` and `brown` are optional — their presence increases the relevance

The familiar operators `AND`,` OR` and `NOT `(also written `&&`,`||` and `!`) are also supported. However, the effects of these operators can be more complicated than is obvious at first glance. `NOT` takes precedence over `AND`, which takes precedence over `OR`. While the `+` and `-` only affect the term to the right of the operator, `AND` and `OR` can affect the terms to the left and right.

### Grouping

Multiple terms or clauses can be grouped together with parentheses, to form sub-queries:

`(quick OR brown) AND fox`

Groups can be used to target a particular field, or to boost the result of a sub-query:

`status:(active OR pending) title:(full text search)^2`

### Reserved characters

If you need to use any of the characters which function as operators in your query itself (and not as operators), then you should escape them with a leading backslash. For instance, to search for (1+1)=2, you would need to write your query as `\(1\+1\)\=2`.

The reserved characters are: `+ - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /`

Failing to escape these special characters correctly could lead to a syntax error which prevents your query from running.

### Empty Query

If the query string is empty or only contains whitespaces the query will yield an empty result set.

[Click here for example queries for searching users](/api/v2/user-search)