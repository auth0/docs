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

This trigger occurs when there are 10 failed login attempts into a single account from the same IP address.

::: note
The default trigger amount of 10 cannot be changed.
:::

### Actions

* Send an email to the affected user.  (You can [customize the email](/anomaly-detection/guides/customize-blocked-account-emails).)
* Block the suspicious IP address for that user.

### Remove block

If this block is triggered, it can be cleared the following ways:

* An administrator removes the block via the [Dashboard](${manage_url}) (by clicking **unblock for all IPs** under the **ACTIONS** button when viewing the user's details) or by using the [Management API](/api/management/v2#!/User_Blocks/delete_user_blocks).
* The user clicks on the **unblock** link provided in the email sent when the block went into effect.
* The user changes their password.

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
```
type:limit_mu
```
Blocks can then be removed using the [Management API](/api/management/v2#!/Anomaly/delete_ips_by_id).

## Keep reading

* [Anomaly Detection](/anomaly-detection)
* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)
* [Enable and Disable Brute-Force Protection](/anomaly-detection/guides/enable-disable-brute-force-protection)
