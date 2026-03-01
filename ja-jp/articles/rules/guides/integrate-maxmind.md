---
title: Integrate with MaxMind minFraud
description: Learn how to integrate MaxMind minFraud using rules.
toc: true
topics:
  - rules
  - extensibility
  - integration
contentType: how-to
useCase: extensibility-rules
---
# Integrate with MaxMind minFraud

To assess the risk profile of a user before authenticating them, you may want to integrate with MaxMind minFraud services, a risk-based authentication solution. You can do this using a specialized rule template.

In this example, we will use a rule to call MaxMind and determine whether or not the user is fraudulent based on their device fingerprint.

## Prerequisites

Before connecting your Auth0 app to MaxMind, you must [sign up for and configure your account with MaxMind](https://www.maxmind.com/en/solutions/minfraud-services).

## Steps

To connect your app to MaxMind, you will:

1. [Get your MaxMind credentials](#get-your-maxmind-credentials)
2. [Create and activate a rule in Auth0](#create-and-activate-a-rule-in-auth0)

### Get your MaxMind credentials

First, you will need to retrieve your MaxMind Account ID and generate a License Key. To locate your Account ID, see [MaxMind Support](https://support.maxmind.com/). To learn how to generate a License Key, see [MaxMind's Generating License Keys for Your Account](https://www.maxmind.com/en/accounts/current/license-key).

Once you have retrieved your MaxMind Account ID and License Key, keep these values on hand because we will use them in the next step. In particular, keep track of your License Key because MaxMind will display it to you only once--at the time of generation.

### Create and activate a rule in Auth0

[Set up a rule](/dashboard/guides/rules/create-rules) in Auth0. While setting up your rule, select the **Alternate Risk Score** template from the **Enrich Profile** section, then use the following settings:

::: warning
You may use global variables to configure these in your rule. If so, be sure to [configure your rules variables](/dashboard/guides/rules/configure-variables) first.
:::

| Variable | Value |
| -------- | ----- |
| MINFRAUD_ACCOUNT_ID | MaxMind minFraud Account ID. |
| MINFRAUD_LICENSE_KEY | MaxMind minFraud License Key. |

By default, your rule will be activated upon save.