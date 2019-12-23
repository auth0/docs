---
title: Check Error Messages
description: Learn how to check for error message to troublshoot issues. 
topics:
  - error-messages
contentType: how-to
useCase: troubleshooting
---

# Check Error Messages

Check for error messages displayed in any of the following locations:

* Browsers
* Developer tools network tabs
* Developer tools console tabs
* HTML page responses
* Authorization Server responses

## Check login screen

The Lock login widget shows error messages for certain types of issues, such as an incorrect username or password. Check the **More Information** link if you're using Auth0's standard error page.

## Check logs

Auth0 stores [log data](/logs) including Dashboard administrator actions, successful and failed user authentications, and password change requests. You can view the logs in the [Dashboard](${manage_url}/#/logs).

Auth0 provides extensive capability when it comes to the logging of events, and also in the scanning of logs in order to identify event anomalies. The standard log retention period for is determined by subscription level with the shortest period is 2 days and the longest period is 30 days. 

::: note
Some types of errors do not appear in the logs. For example, if an error occurs at a remote Identity Provider, where authentication doesn’t complete and the user is never returned to Auth0, there won’t be any entry in logs. 
:::

You can export [Auth0 logs](/logs) and either store them yourself or automatically push them to external log services. This functionality can help you with data retention requirements, as well as log analysis requirements. You can install and configure an Auth0 Extension to export logs automatically to another provider like Sumo Logic or Loggly. For a list of available providers and detailed steps to configure each, see [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service).

<%= include('../_includes/_log_events_link') %>

You can also use the Management API to export logs and store them. There are the two available endpoints, each providing slightly different information.

### Search all logs endpoint

The [Search log events endpoint](/api/management/v2#!/Logs/get_logs) retrieves log entries that match the search criteria you provided. If you do not provide any search criteria, you will get a list of all available entries. 

You can provide search criteria using the **q** parameter and retrieve specific fields using the **fields** parameter. 

To access the API, you need a [Management APIv2 token](/api/management/v2/tokens).

This sample request retrieves all logs for successful logins (the event acronym for successful login is `s`). The list of fields we will retrieve per log entry is: **date**, **description**, **client_id**, and **log_id**.

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
      "name": "fields",
      "value": "date,description,client_id,log_id"
    },
    {
      "name": "type",
      "value": "s"
    }
]
}
```

For details on the search criteria you can use and a list with the event acronyms, see the [Search log events endpoint](/api/management/v2#!/Logs/get_logs).

### Get a single log entry endpoint

The [Get a log event by ID endpoint](/api/management/v2#!/Logs/get_logs_by_id) retrieves the log entry associated with the provided ID.

This sample request retrieves a single log entry with the ID `90020180129170850881585554625888895190928456277777449010`.

```har
{
"method": "GET",
"url": "https://${account.namespace}/api/v2/logs/90020180129170850881585554625888895190928456277777449010",
"httpVersion": "HTTP/1.1",
"headers": [{
    "name": "Authorization",
    "value": "Bearer YOUR_MGMT_API_ACCESS_TOKEN"
}]
}
```

## Rate limits and other errors

Auth0 provides a unique error code for errors reported when the [rate limit is exceeded](/policies/rate-limits#exceeding-the-rate-limit). You should set up automatic scanning of logs to check for rate limit errors so you can proactively address activity that hits rate limits before it causes too much trouble for your users. Auth0 also publishes error codes for other types of errors, and you will find it helpful to scan logs for [authentication errors](/libraries/error-messages) as well as errors from Auth0 Management API calls (Management API error codes are shown below each call in the [Management API Explorer](/api/management/v2)).

::: panel Best Practice
Calling the Management API to retrieve user profile information from within a Rule is a common cause of rate limit errors because such API calls can execute for every login as well as periodic session checks.
:::

## Check real-time webtask logs error console

You can put `console.log()` statements into Rules, Hooks, Custom DB scripts, and Webtasks. The output from those statements is viewable in the Realtime Web Log. If you install the Real-time Webtask Logs extension, you can initiate a view of this log console from the **Debug** buttons underneath the Rules, Hooks, and custom DB script editor windows, or from the webtask console for webtasks.

## Check for common errors

* Are your client application’s callback URL(s) registered in Auth0 client settings?
* If you are making cross-origin calls, is the origin in client settings? 
* In a callback URL, only the subdomain can contain a wildcard.
* In the Allowed Origin field no wildcards are allowed at all.
* Check if you are getting a message on the list of common authentication errors

## Keep reading

* [Standard Error Responses](/api/authentication#standard-error-responses)
* [Auth0.js Error Codes and Descriptions](/libraries/auth0js/v9#error-codes-and-descriptions)
* [Errors with Code `invalid_token`](/troubleshoot/references/invalid-token)
* [Deprecation Error Reference](/troubleshoot/references/deprecation-errors)