---
description: Describes how to configure Amazon SNS with Guardian Multifactor
---

## Configuring Amazon SNS 

In order to receive push notifications from Guardian, it's necessary to override Guardian's default SNS settings.

To do this, go to the [Multifactor Auth](${manage_url}/#/guardian) section of the dashboard and click on the **Push Notifications** box.

![](/media/articles/mfa/push-notification-config.png)

Enable the switch to use a custom app and substitute all the appropriate values for your particular configuration.

Then click **SAVE**.

## Further reading

* [Auth0 Management API](/api/management/v2)
* [Getting Started with Apple Push Notification Service](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html)
* [Getting Started with Google Cloud Messaging for Android](https://docs.aws.amazon.com/sns/latest/dg/mobile-push-gcm.html)
