---
title: Attack Protection Triggers and Actions
description: Attack protection triggers and actions taken upon anomaly detection and how blocks are cleared.
topics:
    - security
    - anomaly-detection
    - brute-force-protection
    - credential-stuffing
    - breached-password-protection
contentType: reference
useCase: anomaly-detection
v2: true
---
# Attack Protection Triggers and Actions

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

Auth0 emails the Dashboard administrator(s) when this block is triggered. The email contains a link that the owner can click to navigate to tenant logs to examine which IPs have been blocked. 

Recent blocks can be found using this query:

```text
type:limit_mu
```

Blocks can then be removed using the [Management API](/api/management/v2#!/Anomaly/delete_ips_by_id).

## Credential stuffing attacks

### Trigger

A single host (IP) which attempts more than 100 distinct username/password combos over a sliding 24 hour window with less than 1% of successful logins. This is considered a credential stuffing attack. 

### Actions

A CAPTCHA step is shown during the sign in or sign up flows. This CAPTCHA step helps prevent bad actors from continuing to send credential stuffing attack traffic to your tenant.

### Remove block

*TBD*

## Breached password detection

### Trigger

A trigger occurs when Auth0 suspects that a specific user's credentials were included in a major public security breach.

::: panel Video Tutorial
Watch our [Breached Password Detection 101 video tutorial](https://auth0.com/resources/videos/learn-about-breached-password-detection).
:::

### Actions

* Send an email to the affected user.
* Send an email to dashboard owners immediately, and/or have a daily/weekly/monthly summary.
* Block login attempts for suspected user accounts using that username and password combination.

### Remove block

This block remains in place until the user changes their password.

## Keep reading

* [Anomaly Detection](/anomaly-detection)
* [Set Anomaly Detection Preferences](/anomaly-detection/guides/set-anomaly-detection-preferences)
* [Enable and Disable Brute-Force Protection](/anomaly-detection/guides/enable-disable-brute-force-protection)
