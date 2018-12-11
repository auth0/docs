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
your Auth0 logs and exports them to
[CloudWatch Logs](https://aws.amazon.com/cloudwatch/).

## Configuring AWS

### Add a Service Account

1. Log in to the [AWS console](https://console.aws.amazon.com) and navigate to the
IAM service.

2. Select "Users" and click the "Add User" button.

3. Give the user an appropriate name such as "auth0\_logs\_to\_cloudwatch" and select the "Programmatic access" option. Click Next.

4. Select "Attach existing policies directly". Search for and select the
`CloudWatchFullAccess` policy. Click Next.

5. Click Next.

6. Click Create User. Download the credentials file which contains the access key and secret.

7. Click Close.

### Configure CloudWatch

1. Still in the AWS console, navigate to CloudWatch.

2. Click Logs. Under Actions, select Create a Log Group. Give the log group an
appropriate name such as `/auth0` and click Create Log Group.

3. Click on the name of your log group. Click Create Log Stream. Give the log
stream an appropriate name such as the name of your tenant and click Create Log
Stream.

## Configuring the Extension

Install and configure the extension by clicking on the _Auth0 Logs to
CloudWatch_ box in the list of provided extensions on the
[Extensions](${manage_url}/#/extensions) page of the [Management
Portal](${manage_url}). The _Install Extension_ window pops open.

At this point you should set the following mandatory configuration variables:

- **Schedule**: The frequency with which logs should be exported. The schedule
  can be customized even further after creation.
- **CLOUDWATCH\_LOG\_GROUP\_NAME**: CloudWatch log group name. [Required]
- **CLOUDWATCH\_LOG\_STREAM\_NAME**: CloudWatch log stream name. [Required]
- **AWS\_ACCESS\_KEY\_ID**: AWS access key providing access to CloudWatch. [Required]
- **AWS\_SECRET\_KEY**: AWS secret key for the access key above. [Required]
- **AWS\_REGION**: The AWS region where the logs will be sent. [Required]

The remaining configuration variables are optional:

- **BATCH\_SIZE**: Logs are batched before sending. Multiple batches are sent
  each time the extension runs. Specify the number of logs per batch. Maximum
  is 100.
- **START\_FROM**: The `log_id` of the log you would like to start sending from.
  Default is to start with the oldest available log.
- **SLACK\_INCOMING\_WEBHOOK\_URL**: Send reports from the extension to the
  specific Slack webhook. [Optional]
- **SLACK\_SEND\_SUCCESS**: Send even more stuff to Slack. Useful for
  troubleshooting. [Optional]
- **LOG\_LEVEL**: The minimal log level of events that you would like sent to
  CloudWatch. [Optional]
- **LOG\_TYPES**: The events for which logs should be exported. [Optional]

Once you have provided this information, click the *Install* button to finish
installing the extension.

Once installed, you can click the name of the extension to open the cron log. Watch for log delivery attempts and check CloudWatch for the logs. Troubleshoot as needed and hit up the [Community](https://community.auth0.com/) for assistance.
