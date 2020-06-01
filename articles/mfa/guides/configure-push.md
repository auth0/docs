---
description: Learn how to configure push notification using Guardian SDKs for multi-factor authentication.
topics:
  - mfa
  - guardian-sdk
  - push
contentType:
  - how-to
useCase:
  - configure-push-notifications
---
# Configure Push Notifications for MFA

Use a custom app built using the Guardian SDKs for [iOS](/mfa/guides/guardian/guardian-ios-sdk) and [Android](/mfa/guides/guardian/guardian-android-sdk) that relies on vendor-specific push notification services. 

1. [Create an SNS Platform Application](https://console.aws.amazon.com/sns/v3/home?region=us-east-1#/mobile/push-notifications/platform-applications) using AWS Management console and note it’s ARN.

2. Create an AWS Access Key authorized to create Platform application endpoints. Guardian automatically creates a platform application endpoint with appropriate device token as part of a successful enrollment. 

3. To receive push notifications from Guardian, it's necessary to override Guardian's default SNS settings.

    Go to the [Multi-factor Authentication](${manage_url}/#/guardian) section of the Dashboard.

4. Toggle **Custom App** option in the **Push via Auth0 Guardian** section and set your AWS Access Key and ARN from the AWS Management Console. 

    Name | Description
    -----|------------
    AWS Access Key Id | Your AWS Access Key ID.
    AWS Secret Access Key | Your AWS Secret Access Key.
    AWS Region | Your AWS application's region.
    APNS ARN | The Amazon Resource Name for your [Apple Push Notification Service](http://docs.aws.amazon.com/sns/latest/dg/mobile-push-apns.html).
    GCM ARN | The Amazon Resource Name for your [Firebase Cloud Messaging Service](https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html).

5. Click **SAVE**. 

## Keep reading

* [Guardian iOS SDK](/mfa/guides/guardian/guardian-ios-sdk)
* [Guardian Android SDK](/mfa/guides/guardian/guardian-android-sdk)
* [Create Custom Enrollment Tickets](/mfa/guides/guardian/create-enrollment-ticket)
* [Guardian Error Code Reference](/mfa/references/guardian-error-code-reference)
* [Enroll and Challenge Push Authenticators using the MFA API](/mfa/guides/mfa-api/push)
