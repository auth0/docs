---
title: User Search Query Syntax
description: Learn about Auth0's user search query string syntax.
toc: true
---

# User Search Query Syntax

When searching for users, you can create queries using [Lucene query syntax](http://www.lucenetutorial.com/lucene-query-syntax.html) to refine your search.

The query string is parsed into a series of terms and operators:

* A term can be a single word such as `jane` or `smith`.
* A term can be a phrase surrounded by double quotes (`"green apple"`), which will match all words in the phrase in the same order.
* A term without a field name will not match text in the [user metadata](/metadata) fields.
* Multiple terms can be grouped together with parentheses to form sub-queries.
* Search values for the normalized user fields (`email`, `name`, `given_name`, `family_name`, and `nickname`) are case insensitive. All other fields (including all `app_metadata`/`user_metadata` fields) are case sensitive.
* Operators (`AND`, `OR`, `NOT`) work on all normalized user fields and root metadata fields.

## Searchable fields

You can search for users using the following fields:

* All the [normalized user profile](/user-profile/normalized/auth0) fields.
* User metadata fields may be used with:
    * Booleans
    * Numeric (integer or double)
    * Text
    * Objects. In order to search a scalar value nested in another object, use the path to the field. For example, `app_metadata.subscription.plan:"gold"`
    * Arrays. In order to search fields in objects nested arrays, use the path to the field and ignore the array level. For example, `user_metadata.addresses.city:"Paris"`

Range and wildcard searches are not available on [user metadata](/metadata) fields.

## Exact match

To find exact matches, use double quotes: `name:"jane smith"`.

For example, to find users with the name `jane smith`, use `q=name:"jane smith"`:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "name:\"jane smith\""
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

## Wildcards

Wildcard searches can be run on terms using the asterisk character (`*`) to replace zero or more characters: `name:john*`.

The question mark character (`?`), is currently not supported.

For example, to find all users whose names start with `john`, use `q=name:john*`:

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "name:john*"
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```

## Ranges

You can use ranges in your user search queries. For inclusive ranges use square brackets: `[min TO max]`, and for exclusive ranges use curly brackets: `{min TO max}`.

Curly and square brackets can be combined in the same range expression: `logins_count:[100 TO 200}`. You can also use wildcards within ranges.

For example, to find all users with more than 100 logins, use `q=logins_count:{100 TO *]`.

```har
{
    "method": "GET",
    "url": "https://${account.namespace}/api/v2/users",
    "httpVersion": "HTTP/1.1",
    "headers": [{
        "name": "Authorization",
        "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
    }],
    "queryString":  [
        {
          "name": "q",
          "value": "logins_count:{100 TO *]"
        },
        {
          "name": "search_engine",
          "value": "v3"
        }
    ]
}
```
