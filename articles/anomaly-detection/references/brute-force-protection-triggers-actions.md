---
title: Brute-Force Protection Triggers and Actions
description: Brute-force protection triggers and actions taken upon anomaly detection and how blocks are cleared.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
contentType: reference
useCase: customize-anomaly-detection
v2: true
---
# Brute-Force Protection Triggers and Actions

## 10 failed login attempts

### Trigger

This trigger occurs when there are 10 failed login attempts into a single account from the same IP address, both from email addresses that are associated with users who exist in Auth0 and email addresses that are not.

::: note
You cannot change the default trigger amount of 10.
:::

### Actions

* Send an email to the affected user.  (You can [customize the email](/anomaly-detection/guides/customize-blocked-account-emails).)
* Block the suspicious IP address for that user.

::: panel Attempts from Emails not in Auth0
If there are 10 attempted logins from an email address that is not associated with an existing user in Auth0, brute-force protection will still be triggered. However, there are some differences in how brute-force protection behaves. No brute-force notification email is sent to the email address that is attempting the access. This is so that bad actors can't generate notifications which would be confusing to the actual email address owner.
:::

### Remove block

If this block is triggered, it can be cleared the following ways:

* An administrator removes the block via the [Dashboard](${manage_url}) (by clicking **unblock for all IPs** under the **ACTIONS** button when viewing the user's details) or by using the [Management API](/api/management/v2#!/User_Blocks/delete_user_blocks).
* The user clicks on the **unblock** link provided in the email sent when the block went into effect.
* The user changes their password.

If the attempts come from an email address that does not exist in Auth0, the block cannot be removed via the Dashboard by navigating to the user record since it does not exist. The only way to remove this type of block is:

* Make a Management API call to `DELETE /api/v2/user-blocks?identifier=EMAIL`.
* If you know the IP address, make a Management API call to `DELETE /api/v2/anomaly/blocks/ips/IP`.
* If the user does a sign-up with the blocked email address. 

## 100 failed login attempts *or* 50 sign up attempts

### Triggers

A trigger occurs when there are 100 failed login attempts from one IP address using different usernames with incorrect passwords in 24 hours. 

Another trigger occurs if there are 50 sign up attempts per minute from the same IP address.

### Actions

* Notify dashboard administrator(s).
* Block suspicious addresses for 15 minutes.

If this block is triggered, additional access attempts are released one-at-a-time over the course of 24 hours until 100 attempts are allocated. This results in approximately 1 additional attempt every 15 minutes.

### Remove block

Auth0 emails the dashboard administrator(s) when this block is triggered. The email contains a link that the owner can click to navigate to tenant logs to examine which IPs have been blocked. Recent blocks can be found using this query:

```text
type:limit_mu
```

Blocks can then be removed using the [Management API](/api/management/v2#!/Anomaly/delete_ips_by_id).

## Keep reading

* [Anomaly Detection](/anomaly-detection)
* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)
* [Enable and Disable Brute-Force Protection](/anomaly-detection/guides/enable-disable-brute-force-protection)
