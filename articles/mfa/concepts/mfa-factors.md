---
description: Understand how MFA works in Auth0, the authentication factors, policies and use cases.
toc: true 
topics:
    - mfa
contentType:
  - concept
useCase:
  - customize-mfa
---
# Multi-factor Authentication Factors

Auth0 supports a number of different options when it comes to enabling MFA for protecting user account access. An MFA workflow is typically provided via a separate application that runs on a mobile or tablet device. 

If you don’t want your customers to have to download a separate application, Auth0 also provides an [SDK](/mfa/guides/guardian/install-guardian-sdk) that you can use to build a second factor workflow in your existing mobile device app.

On the [Dashboard > Multifactor Auth](${manage_url}/#/mfa) page, you can select the factors to use for MFA for your tenant. 

![MFA Dashboard Page](/media/articles/multifactor-authentication/mfa-dashboard.png)

Auth0 supports the following factors for implementing MFA. You must enable at least one to use MFA, but you can choose to enable and make available more than one factor if you wish. Available factors are dependent on your subscription plan.

## Push notifications

Send users push notifications to a their pre-registered devices - typically a mobile phone or tablet - from which a user can immediately allow or deny account access via the simple press of a button. Push factor is offered with the [Guardian](/mfa/concepts/guardian) mobile app, available for both [iOS](/mfa/guides/guardian/guardian-ios-sdk) and [Android](/mfa/guides/guardian/guardian-android-sdk). 

## SMS notifications

[Send users a one-time code over SMS](/mfa/guides/configure-sms) which the user is then prompted to enter before they can finish authenticating.

## One-Time passwords

[One-Time Password (OTP)](/mfa/guides/configure-otp) allows you to use an Authenticator application in your personal device - such as Google Authenticator - that will generate a one-time password which changes over time and which can be entered as the second factor to validate a user’s account.

## Email notifications

You can [use email](/mfa/guides/configure-email-universal-login) when you want to provide users a way to perform MFA when they don't have their phone to receive an SMS or push notification.

## Duo Security

[Duo](/mfa/guides/configure-cisco-duo) is a multi-faceted provider and can only be used if it's the only factor available for the user. Use your Duo account to manage MFA with Auth0. 

## Policies

Policies determine when a user will be prompted to complete additional steps to prove they own a particular account. Use policies to define your own level of acceptable risk. You can choose between **Never** and **Always**. 

You can achieve more refined multifactor configurations (such as per application, per user, etc.) by using [Rules](/rules/references/use-cases#multi-factor-authentication). 

::: note
Rules affecting MFA take precedence over the policy configuration in the Dashboard.
:::

## MFA use cases

There are different ways to manage MFA depending on your environment: 

* B2B: Your customers manage MFA factors for their users.
* B2C: End users manage their own MFA factors via the My MFA Settings Page.
* B2E: You manage MFA factors for your users.

Applications that allow access to different types of resources can require users to authenticate with a stronger authentication mechanism to access sensitive resources. See [Step-Up Authentication](/mfa/concepts/step-up-authentication) for details. 

You can configure a rule in **Dashboard > Rules** to define the conditions that will trigger additional authentication challenges. Use rules to force MFA for users of certain applications, or for users with particular user metadata or IP ranges, among other triggers.

Add contextual MFA which allows you to define arbitrary conditions that will trigger additional authentication challenges to your customers for increased security, for example, geographic location (geo-fencing), address or type of network used (IP filtering), time of day, day of the week or change in the location or device being used to log in.

## Keep reading

* [Enable MFA](/mfa/guides/enable-mfa)
* [Configure Push Notifications for MFA](/mfa/guides/configure-push)
* [Developer Resources for Multi-factor Authentication](/mfa/concepts/mfa-developer-resources)
