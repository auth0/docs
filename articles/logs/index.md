---
url: /logs
---

# Logs

This document lists useful information regarding the Logs from the Auth0 Dashboard.

## How to view Log data

The Auth0 dashboard, in the "Logs" screen, shows all events, including authentication events and administrative events such as adding or updating clients, connections and rules.  Administrative type events will show up as type "API Operation".

## For how long is log file data available?

The amount of data visible in the Logs screen varies by the plan you signed up for.  

The "Logs" screen has a banner which shows you how long log data is kept for your plan.

## How to view or export log file data?

If you wish to keep data for longer than that, we recommend that you use the API feature which allows you to retrieve log data.  You can store it yourself or there is an integration which allows you to transmit log data to external services such as splunk.

### Here are some useful links related to the Splunk integration:

* https://auth0.com/docs/scenarios/splunk
* https://splunkbase.splunk.com/app/1884/
* https://github.com/auth0/splunk-auth0
 

## Tools to process logs 

* https://www.npmjs.com/package/auth0-logs-processor
* https://github.com/auth0/logs-processor
 
## Retrieving logs from the Management API

You can use the Management API v2 to do this, here are the two available endpoints:

* [/api/v2/logs](https://auth0.com/docs/api/v2#!/Logs/get_logs) Retrieves log entries that match the specified search criteria (or list all entries if no criteria is used).

* [/api/v2/logs/{id}](https://auth0.com/docs/api/v2#!/Logs/get_logs_by_id) Retrieves the data related to the log entry identified by id. This returns a single log entry representation as specified in the schema.

