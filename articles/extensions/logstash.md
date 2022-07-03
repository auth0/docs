---
description: How to install and configure the Auth0 Logs to Logstash extension.
topics:
  - extensions
  - logstash
contentType:
  - how-to
useCase: extensibility-extensions
---

# Auth0 Logs to Logstash

The **Auth0 Logs to Logstash** is a scheduled job that takes all of your Auth0 logs and exports them to [Logstash](https://www.elastic.co/products/logstash). Logstash is an open source log management tool that is most often used as part of the ELK stack along with ElasticSearch and Kibana.

## Configure the Extension

To install and configure this extension, click on the **Auth0 Logs to Logstash** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The **Install Extension** window pops open.

![Dashboard > Logstash Extension](/media/articles/extensions/logstash/extension-mgmt-logstash.png)

At this point you should set the following configuration variables:

| Parameter        | Description |
|:-----------------|:------------|
| **Schedule** | The frequency with which logs should be exported. The schedule can be customized even further after creation. |
| **BATCH_SIZE** | The amount of logs to be read on each execution. Maximun, and default, is `100`. |
| **LOGSTASH_URL** <br/><span class="label label-danger">Required</span> | Your Logstash URL as defined for use with `logstash-input-http` plugin. |
| **LOGSTASH_INDEX** <br/><span class="label label-danger">Required</span> | Your Logstash Index to which the logs will be routed. |
| **LOGSTASH_TOKEN** | The token required for your Logstash deployments that will be included in the querystring. |
| **LOGSTASH_USER** | The Logstash user. |
| **LOGSTASH_PASSWORD** | The password associated with your Logstash user. |
| **START_FROM** | The checkpoint ID of the log from where you want to start. |
| **SLACK_INCOMING_WEBHOOK** | The Slack incoming webhook URL used to send relevant updates. |
| **SLACK_SEND_SUCCESS** | Toggle for sending verbose notifications to Slack. |
| **LOG_LEVEL** | The minimal log level of events that you would like sent to Logstash. |
| **LOG_TYPES** | The events for which logs should be exported. |

Once you have provided this information, click the _Install_ button to finish installing the extension.

<%= include('./_includes/_batch-size') %>

### Using extension with ElasticSearch

The extension is sending logs to the logstash instance as they are, including `_id`, which cannot be accepted by ElasticSearch. To fix that, you need rename `_id` to something else. You can do that by adding pipeline with `filter { mutate { rename => { "_id" => "log_id" } } }`.

## Use the Extension

To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the **Installed Extensions** link, and select the **Auth0 Logs to Logstash** line. 

There you can see the job you just created, modify its state by toggling the **State** switch, see when the next run is due and what was the result of the last execution. 

![View Cron Jobs](/media/articles/extensions/logstash/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![View Cron Job Details](/media/articles/extensions/logstash/view-cron-details.png)

## Replay Logs

In the event of a Logstash failure or service interruption you can replay the logs starting from the failed log.

To replay logs: 

1. Get the checkpoint ID of the failed log.
2. Go to the Auth0 Logs to Logstash extension settings.
3. Enter the checkpoint in the **START_FROM** field.
4. Click the **Save** button to replay the failed logs.

## Slack Integration

To set up [Slack](https://slack.com/) integration, provide an [Incoming Webhook URL](https://api.slack.com/incoming-webhooks) to the **SLACK_INCOMING_WEBHOOK** field in the Auth0 Logs to Logstash [extension settings](${manage_url}/#/extensions).

![Slack Settings](/media/articles/extensions/logstash/slack-settings.png)

The extension sends failed transaction notifications to Slack with the checkpoint code displayed in the message. You can also enable verbose notifications by turning on the `SLACK_SEND_SUCCESS` setting.

![Slack Message](/media/articles/extensions/logstash/slack-message.png)
