---
description: How to install and configure the Auth0 Logs to Segment Extension.
topics:
  - extensions
  - segment
contentType:
  - how-to
useCase: extensibility-extensions
---
# Auth0 Logs to Segment

The *Auth0 Logs to Segment* is a scheduled job that takes all of your Auth0 logs and exports them to [Segment](https://www.segment.com/).

## Configure the Extension

To install and configure this extension, click on the __Auth0 Logs to Segment__ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [dashboard](${manage_url}). The __Install Extension__ window pops open.

At this point you should set the following configuration variables:

| Parameter        | Description |
|:-----------------|:------------|
| **Schedule** | The frequency with which logs should be exported. The schedule can be customized even further after creation. |
| **BATCH_SIZE** | The amount of logs to be read on each execution. Maximun, and default, is `100`. |
| **START_FROM** | The checkpoint ID of the log from where you want to start. |
| **SLACK_INCOMING_WEBHOOK** | The Slack incoming webhook URL used to send relevant updates. |
| **SLACK_SEND_SUCCESS** | Toggle for sending verbose notifications to Slack. |
| **SEGMENT_KEY** | Your segment key. |

Once you have provided this information, click the _Install_ button to finish installing the extension.

<%= include('./_includes/_batch-size') %>

## Use the Extension

You can monitor activity by logging into the extension. There you can find reports on most recent runs. Reports contains amount of logs processed and errors, if any.

## Replay Logs

In the event of a Segment failure or service interruption you can replay the logs starting from the failed log.

To replay logs:

1. Get the checkpoint ID of the failed log.
2. Go to the Auth0 Logs to Segment extension settings.
3. Enter the checkpoint in the **START_FROM** field.
4. Click the **Save** button to replay the failed logs.

## Slack Integration

To set up [Slack](https://slack.com/) integration, provide an [Incoming Webhook URL](https://api.slack.com/incoming-webhooks) to the **SLACK_INCOMING_WEBHOOK** field in the Auth0 Logs to Segment [extension settings](${manage_url}/#/extensions).

The extension sends failed transaction notifications to Slack with the checkpoint code displayed in the message. You can also enable verbose notifications by turning on the `SLACK_SEND_SUCCESS` setting.

![Slack Message](/media/articles/extensions/logstash/slack-message.png)
