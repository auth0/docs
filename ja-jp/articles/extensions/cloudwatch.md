---
description: How to install and configure the Auth0 Logs to CloudWatch extension.
topics:
  - extensions
  - cloudwatch
contentType:
  - how-to
useCase: extensibility-extensions
---

# Auth0 Logs to CloudWatch

The **Auth0 Logs to CloudWatch** extension is a scheduled job that exports your Auth0 logs to [CloudWatch](https://aws.amazon.com/cloudwatch/). Amazon CloudWatch is a monitoring and management service built for developers, system operators, site reliability engineers (SRE), and IT managers.

## Configure the Extension

To install and configure this extension, click on the **Auth0 Logs to CloudWatch** box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The **Install Extension** window pops open.

At this point you should set the following configuration variables:

| Parameter        | Description |
|:-----------------|:------------|
| **Schedule** | The frequency with which logs should be exported. The schedule can be customized even further after creation. |
| **BATCH_SIZE** | The amount of logs to be read on each execution. Maximun, and default, is `100`. |
| **START_FROM** | The checkpoint ID of the log from where you want to start. |
| **SLACK_INCOMING_WEBHOOK** | The Slack incoming webhook URL used to send relevant updates. |
| **SLACK_SEND_SUCCESS** | Toggle for sending verbose notifications to Slack. |
| **LOG_LEVEL** | The minimal log level of events that you would like sent to CloudWatch. |
| **LOG_TYPES** | The events for which logs should be exported. |
| **CLOUDWATCH_LOG_GROUP_NAME** <br/><span class="label label-danger">Required</span> | CloudWatch log group name, created in CloudWatch. |
| **CLOUDWATCH_LOG_STREAM_NAME** <br/><span class="label label-danger">Required</span> | CloudWatch log stream name. |
| **AWS_ACCESS_KEY_ID** <br/><span class="label label-danger">Required</span> | AWS access key ID |
| **AWS_SECRET_KEY** <br/><span class="label label-danger">Required</span> | AWS secret key |
| **AWS_REGION** <br/><span class="label label-danger">Required</span> | Your AWS region |

### Required permissions

Extension requires these AWS permissions in order to send logs to CloudWatch:
- `logs:PutLogEvents`
- `logs:DescribeLogStreams`

Once you have provided this information, click the _Install_ button to finish installing the extension.

<%= include('./_includes/_batch-size') %>

## Use the Extension

You can monitor activity by logging into the extension. There you can find reports on most recent runs. Reports contains amount of logs processed and errors, if any.

## Replay Logs

In the event of a CloudWatch failure or service interruption you can replay the logs starting from the failed log.

To replay logs:

1. Get the checkpoint ID of the failed log.
2. Go to the Auth0 Logs to CloudWatch extension settings.
3. Enter the checkpoint in the **START_FROM** field.
4. Click the **Save** button to replay the failed logs.

## Slack Integration

To set up [Slack](https://slack.com/) integration, provide an [Incoming Webhook URL](https://api.slack.com/incoming-webhooks) to the **SLACK_INCOMING_WEBHOOK** field in the Auth0 Logs to CloudWatch [extension settings](${manage_url}/#/extensions).

![Slack Settings](/media/articles/extensions/logstash/slack-settings.png)

The extension sends failed transaction notifications to Slack with the checkpoint code displayed in the message. You can also enable verbose notifications by turning on the `SLACK_SEND_SUCCESS` setting.

![Slack Message](/media/articles/extensions/logstash/slack-message.png)
