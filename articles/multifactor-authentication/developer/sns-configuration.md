---
description: Describes how to configure Amazon SNS with Guardian Multifactor
tags:
  - mfa
  - guardian
  - amazon-sns
---
# Configuring Amazon SNS

In order to receive push notifications from Guardian, it's necessary to override Guardian's default SNS settings.

To do this, go to the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard and click on the **Push Notifications** box.

![Push Notifications](/media/articles/mfa/push-notification-config.png)

Enable the switch to use a custom app and provide the following values for your configuration:

Name | Description
-----|------------
AWS Access Key Id | Your AWS access key id.
AWS Secret Access Key | Your AWS secret access key.
AWS Region | Your AWS application's region.
APNS ARN | The Amazon Resource Name for your [Apple Push Notification Service](http://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html).
GCM ARN | The Amazon Resource Name for your [Google Cloud Messaging Service](http://docs.aws.amazon.com/sns/latest/dg/mobile-push-gcm.html).

Then click **SAVE**.

## Keep reading

::: next-steps
* [Auth0 Management API](/api/management/v2)
* [Getting Started with Apple Push Notification Service](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html)
* [Getting Started with Google Cloud Messaging for Android](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-gcm.html)
:::
