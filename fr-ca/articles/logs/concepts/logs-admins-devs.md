---
description: Examples of how logs are used if you are an administrator or a developer. 
topics:
  - logs
contentType: concept
useCase:
  - analyze-logs
  - integrate-analytics
---
# Administrator and Developer Log Usage Examples

## Administrator

If you are an administrator, there are many helpful metrics and bits of information you can gather from the Logs. If a customer has raised a support ticket that they are unable to sign in to your service or application, you can verify in the logs that they have indeed tried, and are attempting in the manner they say they are. They may think it's a password issue, but you may discover they never completed setting up their <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>. Additionally, Logs can help expose some business metrics you may not have had available before. These could include:

- Finding prime times of usage for different regions
- Identifying a target audience
- Detecting patterns in user behavior that can be optimized
- Identifying problematic actors by IP address
- Calculating frequency and type of Anomaly Detection triggers

 The deeper the analysis, the more you can learn about your customers and your business.

## Developer

When debugging an issue, or setting up an integrations, logs are as good as gold. You can utilize the logs as a history of events to see where a flow may be broken, or where customers are getting confused. You can also detect nefarious behavior, or verify that Auth0 anomaly detection is being triggered during questionable behavior. We support searching the logs for specific events using our Dashboard or Management API directly, but also support exporting logs to your existing log processing systems, like Splunk or Sumo Logic, for deeper analysis over time. See [Export Auth0 logs to an external service](/extensions#export-auth0-logs-to-an-external-service) for more information. 

## Keep reading

* [Log Data Retention](/logs/references/log-data-retention)
* [View Log Data in the Dashboard](/logs/guides/view-log-data-dashboard)
* [Retrieve Logs Using the Management API](/logs/guides/retrieve-logs-mgmt-api)
* [View Anomaly Detection Events](/anomaly-detection/guides/use-tenant-data-for-anomaly-detection)
* [Log Event Type Codes](/logs/references/log-event-type-codes)
* [Log Search Query Syntax](/logs/references/query-syntax)
* [Log Event Filters](/logs/references/log-event-filters)
* [Integrate AWS EventBridge with Auth0](/integrations/aws-eventbridge)