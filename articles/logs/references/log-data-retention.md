---
title: Log Data Retention
description: Describes how long log data is stored depending on your Auth0 plan.
topics:
  - logs
  - log-data
contentType:
  - reference
useCase:
  - manage-logs
---
# Log Data Retention

Auth0 provides event logging capability and you can scan logs to identify event anomalies. Standard log retention period for Auth0 logs is determined by subscription level with the shortest period being 2 days and the longest period being only 30 days. Leveraging Auth0 support for integrating with external logging services allows you to retain logs outside of this timeframe, and will also provide for log aggregation across your organization.

To understand how you will use the Auth0 logs in your situation, review the log data retention period for your subscription level.

Plan | Log Retention
-----|--------------
Free | 2 days
Developer | 2 days
Developer Pro | 10 days
Enterprise | 30 days

You can implement an Auth0 log data export extension to send log data to an external log analytics service. For example, you can use log files for troubleshooting and detecting intermittent errors that may be hard to find with quality assurance testing. You may also want log data in case forensic data is ever needed for security purposes. Log data can also provide comprehensive analytics to help you see patterns in usage trends and anomaly detection triggers.

Auth0 extensions support following third-party services:

- [Application Insights](/extensions/application-insight)
- [AWS Cloudwatch](/extensions/cloudwatch)
- [Azure Blob Storage](/extensions/azure-blob-storage)
- [Logentries](/extensions/logentries)
- [Loggly](/extensions/loggly)
- [Logstash](/extensions/logstash)
- [Mixpanel](/extensions/mixpanel)
- [Papertrail](/extensions/papertrail)
- [Sumo Logic](/extensions/sumologic)
- [Splunk](/extensions/splunk)

You can also export logs to the following services using Auth0 Rules:

* [Keen](/monitoring/guides/send-events-to-keenio)
* [Segment](/monitoring/guides/send-events-to-segment)
* [Splunk](/monitoring/guides/send-events-to-splunk)

## Rate limits exceeded and other errors

Auth0 provides a unique error code for errors reported when the [rate limit is exceeded](/policies/rate-limits#exceeding-the-rate-limit). You can set up automatic scanning of logs to check for rate limit errors so you can proactively address activity that hits rate limits before it causes too much trouble for your users. Auth0 also publishes error codes for other types of errors, and you can scan logs for [authentication errors](/libraries/error-messages) as well as errors from Auth0 Management API calls. (Management API error codes are shown below each call in the [Management API Explorer](/api/management/v2)).

## Keep reading

* [Administrator and Developer Log Usage Examples](/logs/concepts/logs-admins-devs)
* [View Log Data in the Dashboard](/logs/guides/view-log-data-dashboard)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [Log Event Filters](/logs/references/log-event-filters)
* [Integrate AWS EventBridge with Auth0](/integrations/aws-eventbridge)