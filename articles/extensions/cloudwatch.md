---
description: How to configure and retrieve information using the Auth0 Logs to CloudWatch extension.
topics:
  - extensions
  - cloudwatch
contentType:
  - how-to
useCase: extensibility-extensions
---

# Auth0 Logs to CloudWatch

The _Auth0 Logs to CloudWatch_ extension is a scheduled job that takes all of
your Auth0 logs and exports them to [CloudWatch](https://aws.amazon.com/cloudwatch/).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to
CloudWatch_ box in the list of provided extensions on the
[Extensions](${manage_url}/#/extensions) page of the [Management
Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/sumologic/extension-mgmt-sumologic.png)

At this point you should set the following configuration variables:

- **Schedule**: The frequency with which logs should be exported. The schedule
  can be customized even further after creation.
- **CLOUDWATCH_LOG_GROUP_NAME**: 
- **CLOUDWATCH_LOG_STREAM_NAME**: 
- **AWS_ACCESS_KEY_ID**: AWS access key providing access to CloudWatch.
- **AWS_SECRET_KEY**: AWS secret key for the access key above.
- **AWS_REGION**: The AWS region where the logs will be sent.
- **BATCH_SIZE**: Logs are batched before sending. Multiple batches are sent
  each time the extension runs. Specify the number of logs per batch. Maximum
  is 100.
- **START_FROM**: The `log_id` of the log you would like to start sending from.
  Default is to start with the oldest available log.
- **SLACK_INCOMING_WEBHOOK_URL**: Send reports from the extension to the
  specific Slack webhook.
- **SLACK_SEND_SUCCESS**: Send even more stuff to Slack. Useful for
  troubleshooting.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to
  CloudWatch.
- **LOG_TYPES**: The events for which logs should be exported.

Once you have provided this information, click the *Install* button to finish
installing the extension.

