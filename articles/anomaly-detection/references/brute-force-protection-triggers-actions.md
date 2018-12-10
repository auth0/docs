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

* Send an email to the affected user. (You can [customize](#customize-the-blocked-account-email) the email.)
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

Auth0 emails the dashboard administrator(s) when this block is triggered. Within this email there's a link the owner can click on to clear the block.

## Keep reading

* Understand [how Auth0 detects anomalies](/anomaly-detection).
* Learn how to [set anomaly detection preferences](/anomaly-detection/guides/set-anomaly-detection-preferences) in the Dashboard.
* Learn how to [disable and enable brute-force protection](/anomaly-detection/guides/enable-disable-brute-force-protection).
* [Restrictions and limitations](/anomaly-detection/references/anomaly-detection-restrictions-limitations) of Auth0 anomaly detection.
* [Frequently asked questions](/anomaly-detection/references/anomaly-detection-faqs) about anomaly detection.
