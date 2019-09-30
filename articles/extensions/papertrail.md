---
description: How to configure and retrieve information from the Auth0 Logs to Papertrail extension.
topics:
  - extensions
  - papertrail
contentType:
  - how-to
useCase: extensibility-extensions
---

# Auth0 Logs to Papertrail

The Auth0 Logs to Papertrail is a scheduled job that takes all of your Auth0 logs and exports them to [Papertrail](https://papertrailapp.com).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Papertrail_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/papertrail/extension-mgmt-papertrail.png)

At this point, you should set the following configuration variables:

- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **BATCH_SIZE**: The number of logs per batch (up to a maximum of 100). Note that logs are batched before sending, with multiple batches sent each time the extension runs.
- **START_FROM**: The Checkpoint ID of the log from which you want the extension to start sending.
- **SLACK_INCOMING_WEBHOOK_URL**: The Incoming Webhook URL used to report statistics and events to your Slack account/channel.
- **SLACK_SEND_SUCCESS**: If yes, enables verbose notifications to Slack. Useful for troubleshooting.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Papertrail.
- **LOG_TYPES**: The events for which logs should be exported.
- **PAPERTRAIL_HOST**: The destination hostname for your logs.
- **PAPERTRAIL_PORT**: The destination port for your logs.
- **PAPERTRAIL_SYSTEM**: The destination system for your logs.

Once you have provided this information, click the *Install* button to finish installing the extension.

<%= include('./_includes/_batch-size') %>

## Retrieve the required information from Papertrail

To configure a new system for Auth0 logs and acquire the *PAPERTRAIL_HOST* and *PAPERTRAIL_PORT* information:

1. Login to [Papertrail](https://papertrailapp.com). You'll be directed to the **quick start and tour** page. 
2. Click the *Add your first system* button.

You'll get redirected again, and at the top of the page, you will see a message that says something like **Your logs will go to logs4.papertrailapp.com:12345 and appear in Events.**. The log destination displayed is where your logs will go. The log and port information map to the *PAPERTRAIL_HOST* (i.e., `logs4.papertrailapp.com`) and *PAPERTRAIL_PORT* (i.e., `12345`) variables Auth0 asked for, respectively.

Per Papertrail, "no explicit configuration is required...just start sending logs. When Papertrail receives a message from a hostname that is not already present in your account, the system will be automatically added."

## Using Your Installed Extension

 To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the *Installed Extensions* link, and select the *Auth0 Logs to Papertrail* line. There you can see the job you just created, modify its state by toggling the *State* switch, see when the next run is due and what was the result of the last execution.

![](/media/articles/extensions/papertrail/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page, you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/papertrail/view-cron-details.png)

That's it, you are done! You can now navigate to [Papertrail](https://papertrailapp.com) and view your [Auth0 Logs](${manage_url}/#/logs) under **Events**.

::: note
You may have noticed that we didn't set a value for *PAPERTRAIL_SYSTEM*. This variable, when not set by the user, takes the default value of `auth0-logs`. This is how Auth0's logs will be displayed and referred to in the Papertrail dashboard.
:::
