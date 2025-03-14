---
description: Learn how to view log data in the Auth0 Dashboard for all events that occur including user authentication and administrative actions such as adding and updating applications, connections, and rules.
topics:
  - logs
contentType: how-to
useCase:
  - analyze-logs
  - integrate-analytics
---
# View Log Data in the Dashboard

The **Logs** page of the [Dashboard](${manage_url}/#/logs) displays all events that occur, including user authentication and administrative actions such as adding/updating Applications, Connections, and Rules.

![Log Search](/media/articles/logs/dashboard-logs.png)

Please note that administrative actions will show up in the logs as `API Operation` events.

## Event type filters

You can choose a [filter](/logs/references/log-event-filters) for log error, warning, and success events. For example, you can choose the **Deprecation Notice** warning to filter logs related to deprecation warnings.

![Log Event Filter](/media/articles/logs/log-event-filter.png)

## Keep reading

* [Administrator and Developer Log Usage Examples](/logs/concepts/logs-admins-devs)
* [Log Data Retention](/logs/references/log-data-retention)
* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
* [Integrate AWS EventBridge with Auth0](/integrations/aws-eventbridge)
* [GDPR: Data Minimization](/compliance/gdpr/features-aiding-compliance/data-minimization)