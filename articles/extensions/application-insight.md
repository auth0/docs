---
description: This page explains how to configure and install Auth0's Logs to Application Insights extension.
topics:
  - extensions
  - application-insights
contentType:
  - how-to
useCase: extensibility-extensions
---
# Auth0 Logs to Application Insights

The *Auth0 Logs to Application Insights* is a scheduled job takes all of your Auth0 logs and exports them to [Application Insights](https://azure.microsoft.com/en-us/services/application-insights/).

## Configure the Extension

To install and configure this extension, click on the __Auth0 Logs to Application Insights__ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Dashboard](${manage_url}).

The __Install Extension__ window pops open, and you will be asked to set the following configuration variables:

- __Schedule__: The frequency with which logs should be exported.
- __Batch_Size__: The amount of logs to be read on each execution. Maximum is 100.
- __Start_From__: The ID of the log that you want to start sending from
- __Slack_Incoming_Webhook_URL__: The Slack webhook URL that you want to use to receive notifications regarding your log-sending process
- __Slack_Send_Success__: If yes, Auth0 will send verbose notifications to Slack
- __Log_Level__: The log level of events to be sent; Auth0 will send all logs at the selected above and higher
- __Log_Types__: The types of logs you want send; leave blank to send all log events
- __AppInsights_Instrumentation_Key__: The Application Insights instrumentation key (see the following section for information on obtaining the instrumentation key if you do not already have it)

 When done, click __Install__ to proceed.

 <%= include('./_includes/_batch-size') %>

## Retrieve the required information from Application Insights

When configuring the extension, you'll be asked by Auth0 to provide the [instrumentation key](https://docs.microsoft.com/en-us/azure/azure-monitor/app/create-new-resource#copy-the-instrumentation-key) for Application Insights. You will need to have [created an Application Insights resource](https://docs.microsoft.com/en-us/azure/azure-monitor/app/create-new-resource#copy-the-instrumentation-key) with Azure before you can obtain this value. 

## Use Your Installed Extension

To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Dashboard](${manage_url}). Click on the __Installed Extensions__ link, and select the __Auth0 Logs to Application Insights__ line.

There, you can see the job you just created, modify its state by toggling the __State__ switch, and see when the next run is due and what was the result of the last execution.

You can view more details by clicking on the job you created. On this page you can view details for each execution, reschedule, access real-time logs, and more.

At this point, you can navigate to your [Azure Portal](https://portal.azure.com/#) to view your [Auth0 Logs](${manage_url}/#/logs).
