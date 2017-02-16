---
title: Multifactor Authentication
description: This tutorial will show you how to configure Multifactor Authentication (MFA) via Guardian app.
budicon: 243
---

## Before Starting

Be sure that you have completed the [Login](01-login.md) quickstart.

## Enable Multifactor Authentication In Your Account

Multifactor authentication can be enabled with the flip of a switch with Auth0. Go to the [MFA section](${manage_url}/#/guardian) of your dashboard and flip the switch on for **Push Notifications**.

You must specify which clients you want to enable MFA for. To do so, select from the `Templates` dropdown on the right of the page the "Multifactor with Auth0 Guardian" item. This template enables MFA for **all** your clients. You can specify which clients to enable MFA for by editing the snippet so that the if clause for the `CLIENTS_WITH_MFA` array contents is considered instead:

![MFA Rule Screenshot](/media/articles/mfa/mfa-native/mfa-native-guardian.png)

The first time the user tries to log in with a MFA protected client he'll be prompted to enroll by downloading the Guardian Android or iOS application and scanning a QR code. From that moment and after each log in attempt, a push notification will be sent to the Guardian app in the user's mobile device, and he will be able to approve or deny the request with just the press of a button.


> You can read more about Guardian in the [Guardian docs](https://auth0.com/docs/multifactor-authentication/guardian/user-guide).
