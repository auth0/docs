---
title: User Search Query Syntax
description: Describes Auth0's user search query string syntax.
toc: true
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

When searching for users, you can create queries using [Lucene query syntax](http://www.lucenetutorial.com/lucene-query-syntax.html) to refine your search.

The query string is parsed into a series of terms and operators:

* A term can be a single word such as `jane` or `smith`.
* A term can be a phrase surrounded by double quotes (`"green apple"`), which will match all words in the phrase in the same order.
* A term without a field name will not match text in the [user metadata](/users/concepts/overview-user-metadata) fields.
* Multiple terms can be grouped together with parentheses to form sub-queries.
* Search values for the normalized user fields (`email`, `name`, `given_name`, `family_name`, and `nickname`) are case insensitive. All other fields (including all `app_metadata`/`user_metadata` fields) are case sensitive.
* Operators (`AND`, `OR`, `NOT`) work on all normalized user fields and root metadata fields.

## Searchable fields

You can search for users using all the [normalized user profile fields](/users/normalized/auth0/normalized-user-profile-schema) and the fields below:

Search&nbsp;Field | Data&nbsp;Type | Description
------|------|-----
`phone_number` | text | The user's phone number. Only valid for users with SMS connections.
`phone_verified` | boolean | The `true/false` value indicating whether the user's phone number has been verified. Only valid for users with SMS connections.
`logins_count` | integer | The number of times the user has logged in. If a user is blocked and logs in, the blocked session is counted in `logins_count` and updates the `last_login` value.
`created_at` | date&nbsp;time | The timestamp of when the user profile was first created.
`updated_at` | date&nbsp;time | The timestamp of when the user's profile was last updated/modified.
`last_login` | date&nbsp;time | The timestamp of when the user last logged in. In case you are this property from inside a [Rule](/rules) using the `user` object, its value will be the one associated with the login that triggered the rule (since rules execute after the actual login).
`last_ip` | text (valid IP&nbsp;address) | The IP address associated with the user's last login.
`blocked` | boolean | The `true` or `false` value indicating if the user has been blocked. Note: `true` *only* brings back users who are blocked via the Admin Dashboard and Management API; it does not bring back users blocked by brute force anomaly detection.
`email.domain` | text | The domain part of the user's email.

[Metadata](/users/concepts/overview-user-metadata) fields may be used with:
    
* Boolean
* Numeric: (integer or double)
* Text
* Objects: In order to search a scalar value nested in another object, use the path to the field. For example, `app_metadata.subscription.plan:"gold"`
* Arrays: In order to search fields in objects nested arrays, use the path to the field and ignore the array level. For example, `user_metadata.addresses.city:"Paris"`

Range and wildcard searches are not available on user metadata fields.

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

Wildcard searches can be run on terms using the asterisk character (`*`) to replace zero or more characters. 

Here are some examples: 

* `name:john*` returns all users with `john` at the beginning of their names. 

* `name:j*` returns all users with `j` at the beginning of their names.

* `q=name:john*` returns all users whose names start with `john`.

* For suffix matching, literals must have 3 characters or more. For example, `name:*usa` is allowed, but `name:*sa` is not.

### Sample query with wildcards

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

You can use ranges in your user search queries. 

* For inclusive ranges use square brackets: `[min TO max]`.

* For exclusive ranges use curly brackets: `{min TO max}`.

* Curly and square brackets can be combined in the same range expression: `logins_count:[100 TO 200}`. 

* Use ranges in combination with wildcards. For example, to find all users with more than 100 logins, use `q=logins_count:{100 TO *]`.

### Sample query with ranges

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

## Limitation

Range and wildcard searches are not available on user metadata fields.

## Keep reading

* [Sort Search Results](/users/search/v3/sort-search-results)
* [View Search Results by Page](/users/search/v3/view-search-results-by-page)
* [Bulk User Exports](/users/guides/bulk-user-exports)
* [Search Best Practices](/best-practices/search-best-practices)
