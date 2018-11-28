---
toc: true
description: Explains all the types of Anomaly Detection provided by Auth0 and how to enable them.
url: /anomaly-detection
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - breached-password-detection
contentType: 
    - index
    - reference
    - how-to
useCase: customize-anomaly-detection
---

# Anomaly Detection

Auth0 can detect anomalies and stop malicious attempts to access your application. Anomaly detection can alert you and your users of suspicious activity, as well as block further login attempts. You can set preferences for notifications and decide whether to block a suspicious IP address or not.

Auth0 has two types of **shields** to handle anomalies and attacks.  

* Brute-force protection
* Breached password detection

A **shield** specifies the **action** you wish to take given a specific **trigger**. A **trigger** is a suspicious event that is detected when someone is trying to login to your system, or there may have been a breached password with another third party service.

## Brute-force protection

There are two different triggers for the brute-force protection shield, for two slightly different attack scenarios.

* 10 consecutive failed login attempts for the same user and from the same IP address
* 100 failed login attempts from the same IP address in 24 hours *or* 50 sign up attempts per minute from the same IP address

For example, if a user with *user_id1* signs in from *IP1* and fails to login consecutively for 10 attempts, their log in attempt from this *IP1* will be blocked. Another user, *user_id2*, signing in from *IP1* will not be blocked. 

### Trigger: 10 failed login attempts

This trigger occurs when there are 10 failed login attempts into a single account from the same IP address.

#### Actions

* Send an email to the affected user. (You can [customize](#customize-the-blocked-account-email) the email.)
* Block the suspicious IP address for that user.

::: note
The default trigger amount of 10 cannot be changed.
:::

#### Remove block

If this block is triggered, it can be cleared the following ways:

* An administrator removes the block via the [Dashboard](${manage_url}) (by clicking **unblock for all IPs** under the **ACTIONS** button when viewing the user's details) or by using the [Management API](/api/management/v2#!/User_Blocks/delete_user_blocks).
* The user clicks on the **unblock** link provided in the email sent when the block went into effect.
* The user changes their password.

### Triggers: 100 failed login attempts *or* 50 sign up attempts

A trigger occurs when there are 100 failed login attempts from one IP address using different usernames with incorrect passwords in 24 hours. 

Another trigger occurs if there are 50 sign up attempts per minute from the same IP address.

#### Actions

* Notify dashboard administrator(s).
* Block suspicious addresses for 15 minutes.

If this block is triggered, additional access attempts are released one-at-a-time over the course of 24 hours until 100 attempts are allocated. This results in approximately 1 additional attempt every 15 minutes.

#### Remove block

Auth0 emails the dashboard administrator(s) when this block is triggered. Within this email there's a link the owner can click on to clear the block.

### Restrictions and limitations

Both of these anomaly types depend on the IP address of the user. Because of this, the following use cases are *not* supported:

1. Using the [Resource Owner](/api/authentication#resource-owner) from the backend of the application. Using this call does not get the IP address of the user. See point 2 below as an alternative.
2. Using [Resource Owner Password Grant](/api-auth/grant/password) from the backend of the application. Using this call does not get the IP address of the user, however, you can [configure your application and send the IP address of the user as part of the request](/api-auth/tutorials/using-resource-owner-password-from-server-side) to make brute-force protection work correctly.
3. Authenticating many users from the same IP address. For example, users that are behind a proxy are more likely to reach these limits and trigger the associated protection. It is possible to configure a whitelist for the proxy's IP and CIDR range and avoid erroneously triggering the protection.

### Enable or disable brute-force protection

Brute-force protection is enabled for all connections by default.

We do not recommend setting the `brute_force_protection` flag to `false` (effectively disabling brute-force protection for the connection), but if you do, you will be able to change this in the Dashboard. There is a **Improve brute force protection** toggle under Connection Settings that changes the flag from `false` to `true`.

## Breached password detection

Every day malicious hackers penetrate websites and applications, exposing thousands of email and passwords. Given that it's quite common for users to use the same password to login to multiples sites, this poses a problem, not only for the hacked system, but to any application that shares those credentials.

Auth0 tracks large security breaches that are happening on major third party sites to help keep your users and system secure. By enabling Breached Password Detection, your users can be notified and/or blocked from logging in if we suspect their credentials were part of a published security breach.

### Trigger: Major public security breach

This trigger occurs when Auth0 suspects that a specific user's credentials were included in a major public security breach.

::: panel Video Tutorial
Watch our [Breached Password Detection 101 video tutorial](https://auth0.com/resources/videos/learn-about-breached-password-detection).
:::

#### Actions

* Send an email to the affected user.
* Send an email to dashboard owners immediately, and/or have a daily/weekly/monthly summary.
* Block login attempts for suspected user accounts using that username and password combination.

#### Remove block

This block remains in place until the user changes their password.

## Set anomaly detection preferences

To customize the actions that get taken from the triggers, go to the [Anomaly Detection](${manage_url}/#/anomaly) section on the dashboard.

![](/media/articles/anomaly-detection/anomaly-detection-overview.png)

You can use the toggle to disable all the actions of a certain shield, or you can enable/disable certain actions. Click on the shield that has the action in it that you wish to change. Then you can use the toggle to enable/disable an action.

::: warning
We do not recommend making changes to your anomaly detection features via the Management API.
:::

### Brute-force protection preferences

![](/media/articles/anomaly-detection/brute-force-shield.png)

Here you can also add any IP addresses to the **Whitelist** field to avoid erroneously triggering the protection.

Click **Save** when you are finished.

### Breached password detection preferences

![](/media/articles/anomaly-detection/breached-password-shield.png)

Click **Save** when you are finished.

### Customize blocked account emails

When Auth0 sends an email to a user to notify them of the block, the message contains a link to re-enable the origin of the request. Notice that Auth0 never blocks the user itself, just the attempts from the suspicious origin.

The email sent to the user looks like this:

![Email Example](/media/articles/brute-force-protection/bfp-2015-12-29_1832.png)

The template used for this message can be customized on the [Dashboard](${manage_url}/#/emails) under __Emails > Templates > Blocked Account Email__.

[Learn more about Customizing your Emails](/email/templates)

## FAQs

1. **Is the user notified at every login?**

We send one email every hour, regardless of the number of logins. For example, if a user tries to log in 200 times in 1 hour and 30 minutes, we will send two emails.

2. **Is there a limit to the number of times a user will be notified?**

Users will only be notified once per hour.

3. **How long is the reset password link, included in the breached password email, valid for?**

Password reset links are valid for five days.

4. **Is there a test dataset of breached passwords?**

You can test with **leak-test@example.com** as the email and **Paaf213XXYYZZ** as the password. 

5. **Does the breached password detection work when logging in using the Resource Owner password grant?**

Yes.

6. **Does the breached password detection feature work with a custom database?**

Yes.

7. **What Redirect URL applies to the *Change password* link included in the breached password notification email?**

The **RedirectTo** URL is the URL listed in the Dashboard in [Emails > Templates > Change Password Template](${manage_url}/#/emails).

8. **Is there a way to configure the Redirect URL and length of time the change password link is valid?**

You can configure the **URL Lifetime** and **Redirect To** values in the Dashboard by going to [Emails > Templates > Change Password Template](${manage_url}/#/emails).
