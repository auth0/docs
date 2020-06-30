---
title: Monitor Auth0 Implementations
description: Understand how to monitor your Auth0 implementation and track your Auth0 usage, as well as how to send events and logs to external tools.
topics:
  - monitoring
contentType:
  - concept
  - index
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - integrate-analytics
---
# Monitor Auth0 Implementations

You can monitor your Auth0 implementation and Auth0 status and services, as well as send logging event data to third-party tools.

<%= include('./_includes/_monitor-private-cloud.md') %>

## Check availability and status

* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Check Auth0 Authentication and Supporting Services](/monitoring/guides/test-testall-endpoints)
* [Monitor Auth0 Using System Center Operations Manager](/monitoring/guides/monitor-using-SCOM)
* [Monitor Applications](/monitoring/guides/monitor-applications)

## Log events

Need to analyze logs or store them long-term? Auth0 provides extensions to [export logs to external tools](/logs) for analysis and retention. You can also retrieve log data with the Management API. Auth0 only retains logs for a limited period of time, governed by the type of subscription purchased. If your required data retention period is longer than the retention period for your subscription,export logs so you can keep them as long as you wish.

* [Administrator and Developer Log Usage Examples](/logs/concepts/logs-admins-devs)
* [Log Data Retention](/logs/references/log-data-retention)
* [View Log Data in the Dashboard](/logs/guides/view-log-data-dashboard)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [Send Logging Events to Keen](/monitoring/guides/send-events-to-keenio)
* [Send Logging Events to Segment](/monitoring/guides/send-events-to-segmentio)
* [Send Logging Events to Splunk](/monitoring/guides/send-events-to-splunk)
* [Send Logging Events to Loggly](/extensions/loggly)
* [Send Logging Events to Mixpanel](/extensions/mixpanel)
* [Get Realtime Authentication Events with Realtime and Pusher](https://auth0.com/blog/get-realtime-auth-events-with-auth0-and-pusher/)

## Track new signups and leads

* [Track New Sign-Ups in Salesforce](/monitoring/guides/track-signups-salesforce)
* [Track New Leads in Salesforce](/monitoring/guides/track-leads-salesforce)
