---
title: Integrate with Enterprise Fraud Management Solutions
description: Learn how to integrate Enterprise Fraud Management solutions using rules. The given example uses Socure, but can be modified to use any EFM service. 
toc: true
topics:
  - rules
  - extensibility
  - integration
contentType: how-to
useCase: extensibility-rules
---
# Integrate with Enterprise Fraud Management Solutions

To create trust with consumers, you may want to integrate with an Enterprise Fraud Management (EFM) service, such as Socure, Maxmind, or SAS. Although this example shows how to configure an integration with Socure, you may modify it to use any EFM service.

In this example, we will use a rule to make a call to Socure to request that they return a user fraud score for the user who is authenticating, based on their email address and IP address. If a user has a high fraud score, you may choose to put them on a watch list or require them to provide additional information before they can make any transactions. 

## Prerequisites

Before connecting your Auth0 app to an EFM service, you must have configured an account with the chosen service. For this example, you will need to [sign up for and configure your account with Socure](https://developer.socure.com/guide/start).

## Steps

To connect your app to your EFM service, you will:

1. [Get your EFM service's credentials](#get-your-efm-services-credentials)
2. [Create and activate a rule in Auth0](#create-and-activate-a-rule-in-auth0)

### Get your EFM service's credentials

First, you will need to retrieve the URL of your EFM's API and your API Key. To learn how to do this for Socure, see [Socure's Developer docs](https://developer.socure.com/guide/overview). To access all content, you will need to log in to your Socure account.

Once you have retrieved the EFM API's URL and your API Key, keep these values on hand because we will use them in the next step.

### Create and activate a rule in Auth0

[Set up a rule](/dashboard/guides/rules/create-rules) in Auth0. While setting up your rule, select the **Detect Fraud Users** template from the **Enrich Profile** section, then use the following settings:

| Variable | Value |
| -------- | ----- |
| url | URL of the EFM's API |
| socurekey | Key for the EFM's API. You may use global variables to configure this in your rule. If so, be sure to [configure your rules variables](/dashboard/guides/rules/configure-variables) first. |

::: note
Although in this example we configure a rule to integrate with Socure, you may modify this rule to use any EFM service.
:::

By default, your rule will be activated upon save.