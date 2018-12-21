---
title: Logs Query Syntax
description: Learn about Auth0's log search query string syntax.
toc: true
topics:
  - logs
  - log-management
  - search
  - query-syntax
contentType:
  - reference
useCase:
  - manage-logs
---

# Log Search Query Syntax

When searching for logs, you can create queries using a subset of [Lucene query syntax](http://www.lucenetutorial.com/lucene-query-syntax.html) to refine your search.

The query string is parsed into a series of terms and operators:

* A term can be a single word such as `jane` or `smith`.
* A term can be a phrase surrounded by double quotes (`"customer log"`), which will match all words in the phrase in the same order.
* A term without a field name will only match [these selected fields](/logs/v3#fields-searchable-against-bare-terms) fields.
* Multiple terms can be grouped together with parentheses to form sub-queries.
* All search fields are case sensitive.
* Operators (`AND`, `OR`, `NOT`) work on all searchable fields.

## Searchable Fields

You can search for logs using [these fields](/logs/v3#searchable-fields).

## Exact match

To find exact matches, use double quotes: `description:"Username invalid"`.

For example, to find logs with the description `Username invalid`, use `q=description:"Username invalid"`:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/logs",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "description:\"Username invalid\""
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

## Wildcards

Wildcard searches can be run on terms using the asterisk character (`*`) to replace zero or more characters: `user_name:john*`. They can be used for prefix matching, for example `user_name:j*`. For other uses of wildcards (e.g. suffix matching), literals must have 3 characters or more. For example, `name:*usa` is allowed, but `name:*sa` is not.

The question mark character (`?`), is currently not supported.

For example, to find all logs for users whose usernames start with `john`, use `q=user_name:john*`:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/logs",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "user_name:john*"
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

## Ranges

You can use ranges in your log search queries. For inclusive ranges use square brackets: `[min TO max]`, and for exclusive ranges use curly brackets: `{min TO max}`.

Curly and square brackets can be combined in the same range expression. You can also use wildcards within ranges.

Ranges for dates have different restrictions than in `v2`. A date will always be converted to a zeroed-out state if all fields are not supported; if `2018-12-18` is provided, it will be converted to `2018-12-18T00:00:00.000Z` internally. Below are some more examples of how various date formats will be converted.

Example | Converted Value
--------|----------------
`2018-12-18` | `2018-12-18T00:00:00.000Z`
`2018-12` | `2018-12-01T00:00:00.000Z`
`2018-12-18T12:22` | `2018-12-18T12:22:00.000Z`
`2018-12-18T15:23:48.123Z` | `2018-12-18T15:23:48.123Z`

This new change may impact how searches are crafted.

For example, to find all logs from December 18, 2018 and December 19, 2018, use `q=date:[2018-12-18 TO 2018-12-20}`. This allows all of the 18th and 19th to be captured, but exclude the 20th.
However, if we tried for the same results, but wrote it as "Get everything after the 17th, until and including the 19th": `q=date:{2018-12-17 TO 2018-12-19]`, this would translate to "Get everything after the first millisecond of the 17th up until and including the first millisecond of the 19th": `q=date:{2018-12-17T00:00:00.000Z TO 2018-12-19T00:00:00Z]`. This would not accomplish the original goal, so it is recommended that first dates in a range should be inclusive, and end dates in a range can optionally be exclusive when using an `END_DATE + 1 DAY` syntax as demonstrated above.

Another example of using date ranges, to find all logs from December 18, 2018 until the present, use `q=date:[2018-12-18 TO *]`.
If you'd like to search logs from the beginning of your retention period until, but not including, December 19, 2018, use `q=date:[* TO 2018-12-19}`.

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/logs",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "q=date:[* TO 2018-12-19}"
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```
