Auth0 provides extensive capability when it comes to the logging of events, and also in the scanning of logs in order to identify event anomalies (see [logs documentation](/logs) for further details). Standard log retention period for Auth0 logs is determined by subscription level with the shortest period being 2 days and the longest period being only 30 days. Leveraging Auth0 support for integrating with external logging services will allow you to retain logs outside of this, and will also provide for log aggregation across your organization.

::: panel Best Practice
You should leverage one of the Auth0 logs extensions to send log data to an external log analytics service. This will enable keeping data for longer periods of time and provide advanced analytics on the log data.
:::

You should review the log data [retention period](/logs/references/log-data-retention) for your subscription level, and implement a log data export extension to send log data to an external log analytics service. Development teams can use log files for troubleshooting and detecting intermittent errors that may be hard to find via QA tests. Security teams will probably want log data in case forensic data is ever needed. Exporting log files to services that provide comprehensive analytics can help you see patterns such as usage trends and anomaly detection triggers. 

### Rate limits and other errors

Auth0 provides a unique error code for errors reported when the [rate limit is exceeded](/policies/rate-limits#exceeding-the-rate-limit). You should set up automatic scanning of logs to check for rate limit errors so you can proactively address activity that hits rate limits before it causes too much trouble for your users. Auth0 also publishes error codes for other types of errors, and you will find it helpful to scan logs for [authentication errors](/libraries/error-messages) as well as errors from Auth0 Management API calls (Management API error codes are shown below each call in the [Management API Explorer](/api/management/v2)).

::: panel Best Practice
Calling the Management API to retrieve user profile information from within a Rule is a common cause of rate limit errors because such API calls can execute for every login as well as periodic session checks.
:::
