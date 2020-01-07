---
description: Learn how to retrieve logs using the Auth0 Management API get_logs endpoint by checkpoint or by search criteria. 
topics:
  - logs
contentType: how-to
useCase:
  - analyze-logs
  - integrate-analytics
---

# Retrieve Logs Using the Management API

You can use the Management API v2 to retrieve your logs using the [/api/v2/logs](/api/v2#!/Logs/get_logs) endpoint, which suports two types of consumption: [by checkpoint](/logs#get-logs-by-checkpoint) or [by search criteria](#get-logs-by-search-criteria).

::: note
We highly recommend using [the checkpoint approach](#get-logs-by-checkpoint) to export logs to the external system of your choice and perform any search or analysis there, as logs stored in our system are subject to the [retention period](/logs/references/log-data-retention). You can use any of the [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service) extensions to export the logs to the system of your choice (like Sumo Logic, Splunk or Loggly).
:::

If you would like to perform a search for specific events you can also use the [search criteria approach](#get-logs-by-search-criteria), which is also the one used by the Management Dashboard.

::: note
When you query for logs with the [list or search logs](/api/v2#!/Logs/get_logs) endpoint, you can retrieve a maximium of 100 logs per request.
:::

## Get logs by checkpoint

This method allows to retrieve logs from a particular `log_id`. For searching by checkpoint use the following parameters:

| Parameter | Description |
| -- | -- |
| `from` | Log Event Id to start retrieving logs. You can limit the amount of logs using the take parameter. |
| `take` | The total amount of entries to retrieve when using the from parameter. |

::: note
When fetching logs by checkpoint, the `q` or any parameter other than `from` and `take` will be ignored. Also the order by date is not guaranteed.
:::

## Get logs by search criteria

This method retrieves log entries that match the specified search criteria (or list all entries if no criteria is used). To search by criteria use the following parameters:

| Parameter | Description |
| -- | -- |
| `q` | Search Criteria using Query String Syntax. See [Query Syntax](/logs/references/query-syntax) for information of how to build the queries. |
| `page` | The zero-based page number. |
| `per_page` | The number of entries per page. |
| `sort` | The field to use for sorting. Use `field:order`, where `order` is `1` for ascending and `-1` for descending. For example `date:-1`. |
| `fields:` | A comma-separated field list to include or exclude (depending on `include_fields`) from the result. Leave empty to retrieve all fields. |
| `include_fields` | `true` if the fields specified are to be included in the result, `false` otherwise. Defaults to `true`. |

For the list of fields that can be used in the search query and the `fields` and `sort` parameters, see [Query Syntax: Searcheable fields](logs/references/query-syntax#searchable-fields).

## Limitations

Besides the limitation of 100 logs per request to retrieve logs, you may only paginate through up to 1,000 search results.

If you get the error `414 Request-URI Too Large` this means that your query string is larger than the supported length. In this case, refine your search.

::: panel Private Cloud Users
For Private Cloud users searching tenant logs, note that only the following fields are searchable at this time: 

* `user`
* `connection`
* `application`
* `type`
* `ip`

Use double quotes for exact searches (e.g., `application:"test"` will search for all log entries specific to the application named `test`, but `application:test` will search log entries for applications with test in their name.
:::

## Other log endpoints

As an alternative or complement to retrieving logs by checkpoint or search criteria using the [/api/v2/logs](/api/v2#!/Logs/get_logs) endpoint, you can also use the following endpoints to look for logs:

* [/api/v2/logs/{id}](/api/v2#!/Logs/get_logs_by_id): Retrieves the single log entry associated with the provided log id.
* [/api/v2/users/{user_id}/logs](/api/v2#!/Users/get_logs_by_user): Retrieves log events for a specific user id.

## Keep reading

* [Administrator and Developer Log Usage Examples](/logs/concepts/logs-admins-devs)
* [Log Data Retention](/logs/references/log-data-retention)
* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [View Log Data in the Dashboard](/logs/guides/view-log-data-dashboard)
* [View Anomaly Detection Events](/anomaly-detection/guides/use-tenant-data-for-anomaly-detection)
* [Log Event Filters](/logs/references/log-event-filters)
* [Integrate AWS EventBridge with Auth0](/integrations/aws-eventbridge)
* [GDPR: Data Minimization](/compliance/gdpr/features-aiding-compliance/data-minimization)