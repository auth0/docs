---
title: Integrate with MixPanel Product Analytics
description: Learn how to integrate MixPanel Product Analytics using rules.
toc: true
topics:
  - rules
  - extensibility
  - integration
contentType: how-to
useCase: extensibility-rules
---
# Integrate with MixPanel Product Analytics

To help convert, engage, and retain users, you may want to integrate with MixPanel Product Analytics. You can do this using a specialized rule template.

In this example, we will use a rule to send a sign-in event to MixPanel and will include the application to which the user is logging in as a property.

## Prerequisites

Before connecting your Auth0 app to MixPanel, you must [sign up for and configure your account with MixPanel](https://mixpanel.com/).

## Steps

To connect your app to MixPanel, you will:

1. [Get your MixPanel credentials](#get-your-mixpanel-credentials)
2. [Create and activate a rule in Auth0](#create-and-activate-a-rule-in-auth0)

### Get your MixPanel credentials

First, you will need to retrieve the URL of MixPanel's API and your API Token. To learn how to do this, see [MixPanel's Ingestion API HTTP spec](https://developer.mixpanel.com/docs/http).

Once you have retrieved the MixPanel API's URL and your API Token, keep these values on hand because we will use them in the next step.

### Create and activate a rule in Auth0

[Set up a rule](/dashboard/guides/rules/create-rules) in Auth0. While setting up your rule, select the **Tracks Logins in Mixpanel** template from the **Webhook** section, then use the following settings:

| Variable | Value |
| -------- | ----- |
| url | MixPanel API URL |
| token | MixPanel API Token. You may use global variables to configure this in your rule. If so, be sure to [configure your rules variables](/dashboard/guides/rules/configure-variables) first. |

By default, your rule will be activated upon save.