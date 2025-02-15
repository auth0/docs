---
title: Breached Password Detection Triggers and Actions
description: Breached password detection triggers and actions taken upon anomaly detection and how blocks are cleared.
topics:
    - security
    - anomaly-detection
    - breached-password-detection
contentType: reference
useCase: customize-anomaly-detection
v2: true
---
# Breached Password Detection Triggers and Actions

## Trigger

A trigger occurs when Auth0 suspects that a specific user's credentials were included in a major public security breach.

::: panel Video Tutorial
Watch our [Breached Password Detection 101 video tutorial](https://auth0.com/resources/videos/learn-about-breached-password-detection).
:::

## Actions

* Send an email to the affected user.
* Send an email to dashboard owners immediately, and/or have a daily/weekly/monthly summary.
* Block login attempts for suspected user accounts using that username and password combination.

## Remove block

This block remains in place until the user changes their password.

## Keep reading

* [Anomaly Detection](/anomaly-detection)
* [Breached Password Security](/anomaly-detection/concepts/breached-passwords)