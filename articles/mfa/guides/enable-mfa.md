---
description: Learn how to enable MFA in the Dashboard.
topics:
  - mfa
contentType:
  - how-to
useCase:
  - enable-mfa-dashboard
---
# Enable Multi-Factor Authentication

To enable MFA, you toggle on the factors (such as push notifications or SMS) you choose to enable in the Dashboard on your tenant. Next, you perform any further setup required to configure that factor, and last, you choose whether you wish to force MFA for all users or not. 

You can also customize your MFA flow with Auth0 [Rules](/rules/references/use-cases#multi-factor-authentication), to allow MFA to only be required in specific circumstances or force a particular factor to be used.

1. To enable the factors you require, go to [Dashboard > Multifactor Auth](${manage_url}/#/mfa). Here you will find a series of toggles for the MFA factors supported by Auth0. 

![MFA Dashboard Page](/media/articles/mfa/mfa-dashboard.png)

Any or all of these factors can be enabled simultaneously. When logging in the first time, the user will be shown the most secure factor available, but will be allowed to choose another factor to use if you have more than one factor enabled in the Dashboard. The Phone messaging and the Duo factors require further setup. You will have to click on the factor and fill in a few further settings before continuing.

::: note
Duo will only be available to end-users as a factor if it is the only factor that is enabled.
:::

2. Under **Policies**, next to **Require Multi-factor Auth**, choose **Always** or **Never**. If set to **Always**, users will be able to use any of the factors enabled in the Dashboard.

3. Click **Save**.

4. Configure your [factors](/mfa/concepts/mfa-factors). 

## Keep reading

* [Configure Push Notifications for MFA](/mfa/guides/configure-push)
* [Configure One Time Passwords for MFA](/mfa/guides/configure-otp)
* [Configure SMS or Voice Notifications for MFA](/mfa/guides/configure-phone)
* [Configure Email Notifications for MFA](/mfa/guides/configure-email)
* [Configure Cisco Duo](/mfa/guides/configure-cisco-duo)
* [Customize SMS or Voice Messages](/mfa/guides/customize-phone-messages)
* [Customize Multi-factor Authentication](/mfa/guides/customize-mfa-universal-login)
