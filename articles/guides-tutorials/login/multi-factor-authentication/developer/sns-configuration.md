---
description: Describes how to configure Amazon SNS with Guardian Multi-factor
topics:
  - mfa
  - guardian
  - amazon-sns
contentType:
  - how-to
  - concept
useCase:
  - customize-mfa
---
# Configuring Amazon SNS

To receive push notifications from Guardian, it's necessary to override Guardian's default SNS settings.

To do this, go to the [Multi-factor Authentication](${manage_url}/#/guardian) section of the dashboard and click on the **Push Notifications** box.

![Push Notifications](/media/articles/mfa/push-notification-config.png)

Enable the switch to use a custom app and provide the following values for your configuration:

Name | Description
-----|------------
AWS Access Key Id | Your AWS access key id.
AWS Secret Access Key | Your AWS secret access key.
AWS Region | Your AWS application's region.
APNS ARN | The Amazon Resource Name for your [Apple Push Notification Service](http://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html).
GCM ARN | The Amazon Resource Name for your [Firebase Cloud Messaging Service](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html).

Then click **SAVE**.

## Keep reading

::: next-steps
* [Auth0 Management API](/api/management/v2)
* [Getting Started with Apple Push Notification Service](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html)
* [Getting Started with Firebase Cloud Messaging for Android](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html)
:::
