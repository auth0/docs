---
title: Integrate with Salesforce
description: Learn how to integrate Salesforce using rules. 
toc: true
topics:
  - rules
  - extensibility
  - integration
contentType: how-to
useCase: extensibility-rules
---
# Integrate with Salesforce

To automate and manage your customer life cycle, you may want to integrate with Salesforce's customer relationship management solution. You can do this using a specialized rule template.

In this example, we will use a rule to record a new Salesforce Lead when a new user first authenticates. The rule will also send a notification for the new Lead to a specified Slack channel.

## Prerequisites

Before connecting your Auth0 app to Salesforce, you must [sign up for and configure your account with Salesforce](https://www.salesforce.com/).

## Steps

To connect your app to Salesforce, you will:

1. [Set up your app in Salesforce](#set-up-your-app-in-salesforce)
2. [Get your Salesforce credentials](#get-your-salesforce-credentials)
3. [Get your Slack channel hook URL](#get-your-slack-channel-hook-url)
4. [Create and activate a rule in Auth0](#create-and-activate-a-rule-in-auth0)

### Set up your app in Salesforce

Create an app in Salesforce and generate credentials for it, using [Salesforce's Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm&type=0) docs. During this process, Salesforce will generate a **Consumer Key** and **Consumer Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| App URL | `https://${account.namespace}` |
| Callback URL | `https://${account.namespace}/login/callback` |

<%= include('../../connections/_find-auth0-domain-redirects') %>

### Get your Salesforce credentials

You will also need to get your Salesforce username and password that you use to authenticate with the Salesforce API. This username will appear as the creator of the Lead.

Once you have retrieved your Salesforce username and password, keep these values on hand because we will use them in a future step.

### Get your Slack channel hook URL

To send a notification for the new Lead to a specified Slack channel, you will need to get the Slack channel's hook URL from your [Slack Workspace's Integrations](https://slack.com/services/10525858050).

Make note of the Slack channel's hook URL because we will use it in the next step.

### Create and activate a rule in Auth0

[Set up a rule](/dashboard/guides/rules/create-rules) in Auth0. While setting up your rule, select the **Create a New Lead in Salesforce on First Login** template from the **Webhook** section, then use the following settings:

::: warning
You may use global variables to configure these in your rule. If so, be sure to [configure your rules variables](/dashboard/guides/rules/configure-variables) first.
:::

| Variable | Value |
| -------- | ----- |
| SFCOM_CLIENT_ID | Consumer Key for the application you previously set up in Salesforce. |
| SFCOM_CLIENT_SECRET | Consumer Secret for the application you previously set up in Salesforce. |
| USERNAME | Username you use to authenticate with Salesforce's API. |
| PASSWORD | Password you use to authenticate with Salesforce's API. |
| MY_SLACK_WEBHOOK_URL | Hook URL for the Slack channel to which you want to send a notification of a new Salesforce Lead. |

By default, your rule will be activated upon save.
