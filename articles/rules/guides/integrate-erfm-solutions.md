---
title: Integrate with eCommerce and Retail Fraud Management Solutions
description: Learn how to integrate eCommerce and Retail Fraud Management solutions using rules. The given example uses Signifyd, but can be modified to use any ERFM service. 
toc: true
topics:
  - rules
  - extensibility
  - integration
contentType: how-to
useCase: extensibility-rules
---
# Integrate with eCommerce and Retail Fraud Management Solutions


To more effectively contain fraud and counter fast-changing fraud patterns, you may want to integrate with an eCommerce and Retail Fraud Management (ERFM) service, such as Signifyd, Cybersource, or Forter. Although this example shows how to configure an integration with Signifyd, you may modify it to use any ERFM service.

In this example, we will use a rule to make a call to Signifyd to detect whether or not the user who is authenticating is fraudulent, based on their transaction history.

## Prerequisites

Before connecting your Auth0 app to an ERFM service, you must have configured an account with the chosen service. For this example, you will need to [sign up for and configure your account with Signifyd](https://www.signifyd.com/).

## Steps

To connect your app to your ERFM service, you will:

1. [Get your ERFM service's credentials](#get-your-erfm-services-credentials)
2. [Create and activate a rule in Auth0](#create-and-activate-a-rule-in-auth0)

### Get your ERFM service's credentials

First, you will need to retrieve the URL of your ERFM's API and your API Key. To learn how to do this for Signifyd, see Signifyd's [API Reference: Get Case](https://developer.signifyd.com/api/#/reference/cases/get-case) and [Create a Team](https://www.signifyd.com/resources/faq/working-with-teams/how-do-i-create-a-team/) docs.

Once you have retrieved the ERFM API's URL and your API Key, keep these values on hand because we will use them in the next step.

::: note
This rule template also passes the API a `caseId` that you should have already saved in the authenticating user's `app_metadata` profile field. To learn how to modify metadata in the Auth0 user profile, see [Metadata](/users/concepts/overview-user-metadata).
:::

### Create and activate a rule in Auth0

[Set up a rule](/dashboard/guides/rules/create-rules) in Auth0. While setting up your rule, select the **Detect eCommerce Fraud Users** template from the **Enrich Profile** section, then use the following settings:

| Variable | Value |
| -------- | ----- |
| url | URL of the ERFM's API |
| headers | Replace the example API Key with the API Key you retrieved in Step 1. |

::: note
Although in this example we configure a rule to integrate with Signifyd, you may modify this rule to use any ERFM service.
:::

By default, your rule will be activated upon save.