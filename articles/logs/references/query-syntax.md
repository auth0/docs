---
title: Log Search Query Syntax
description: Describes search query syntax using a subset of the Lucene query syntax to refine Auth0 log searches.
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
* A term without a field name will only match [these selected fields](/logs/query-syntax#fields-searchable-against-bare-terms) fields.
* Multiple terms can be grouped together with parentheses to form sub-queries.
* All search fields are case sensitive.
* Operators (`AND`, `OR`, `NOT`) work on all searchable fields.

## Searchable fields

The following list of fields are searchable and case sensitive:

* `log_id`: the id of the log event
* `date`: The moment when the event occured.
* `connection`: The connection name related to the event.
* `connection_id`: The connection id related to the event.
* `client_id`: The client id related to the event
* `client_name`: The name of the client related to the event.
* `ip`: The IP address from where the request that caused the log entry originated.
* `user_id`: The user id related to the event.
* `user_name`: The user name related to the event.
* `description`: The description of the event.
* `user_agent`: The user agent that is related to the event.
* `type`: One of the [possible event types](/logs#log-data-event-listing).
* `strategy`: The connection strategy related to the event.
* `strategy_type`: The connection strategy type related to the event.
* `hostname`: the hostname that is being used for the authentication flow.

## Fields searchable against bare terms

If a search term is entered without a field name, it will only be searched against the following fields:

* `user_name`
* `connection`
* `client_name`
* `type`
* `ip`
* `log_id`
* `description`

## Exact matching

To find exact matches, use double quotes: `description:"Username invalid"`.

For example, to find logs with the description `Username invalid`, use `q=description:"Username invalid"`:

## Wildcards

Wildcard searches can be run on terms using the asterisk character (`*`) to replace zero or more characters: `user_name:john*`. They can be used for prefix matching, for example `user_name:j*`. For other uses of wildcards (e.g. suffix matching), literals must have 3 characters or more. For example, `name:*usa` is allowed, but `name:*sa` is not.

The question mark character (`?`), is currently not supported.

For example, to find all logs for users whose usernames start with `john`, use `q=user_name:john*`:

## Ranges

You can use ranges in your log search queries. For inclusive ranges use square brackets: `[min TO max]`, and for exclusive ranges use curly brackets: `{min TO max}`.

Curly and square brackets can be combined in the same range expression. You can also use wildcards within ranges.

As an example, to find all logs from December 18, 2018 until the present, use `q=date:[2018-12-18 TO *]`.
If you'd like to search logs from the beginning of your retention period until, but not including, December 19, 2018, use `q=date:[* TO 2018-12-19}`.

## Example queries

Below are some examples to show the kinds of queries you can make with the Management API.

Use Case | Query
---------|------
Search all logs with connections that contains "Pass" | `connection:*pass*`
Search all logs for users with a user name that contains "fred" | `user_name:*fred*`
Search all logs with user id's matching exactly "123" | `user_id:"123"`
Search for all logs with a type starting with "s" | `type:s*`
Search for user names that start with "jane" and end with "smith" | `user_name:jane*smith`
Search for all logs in December 2018 | `date:[2018-12 TO 2018-01-01}`
Search for all logs from December 10, 2018 forward | `date:[2018-12-10 TO *]`
Search for all logs from January 1, 2019 at 1AM, until, but not including January 1, 2019 at 12:23:45 | `date:[2019-01-01T01:00:00 TO 2019-01-01T12:23:45}`

## Limitations

* If you get the error `414 Request-URI Too Large` this means that your query string is larger than the supported length. In this case, refine your search.
* Log fields are not tokenized , so `description:rule` will not match a description with value `Create a rule` nor `Update a rule`. Instead, use `description:*rule`. See [wildcards](#wildcards) and [exact matching](#exact-matching).
* The `.raw` field extension is not supported. Fields match the whole value that is provided and are not tokenized.
* To search for a specific value nested in the `details` field, use the path to the field (i.e., `details.request.channel:"https://manage.auth0.com/"`). Bare searches like `details:"https://manage.auth0.com/"` do not work.

## Pagination

When calling the [GET /api/v2/logs](/api/v2#!/Logs/get_logs) or [GET /api/v2/users/{user_id}/logs](/api/v2#!/Users/get_logs_by_user) endpoints using the `include_totals` parameter, the result is a JSON object containing a summary of the results **and** the requested logs. The JSON object looks something like:

```js
{
  "length": 5,
  "limit": 5,
  "logs": [...],
  "start": 0,
  "total": 5
}
```

When searching for logs, the `totals` field tells you how many logs are returned in the page (similar to what the `length` field returns). 

## Keep reading

* [Administrator and Developer Log Usage Examples](/logs/concepts/logs-admins-devs)
* [View Log Data in the Dashboard](/logs/guides/view-log-data-dashboard)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
* [View Anomaly Detection Events](/anomaly-detection/guides/use-tenant-data-for-anomaly-detection)
* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Event Filters](/logs/references/log-event-filters)
* [Integrate AWS EventBridge with Auth0](/integrations/aws-eventbridge)