---
title: Integrate with HubSpot Marketing Software
description: Learn how to integrate HubSpot Marketing Software using rules. 
toc: true
topics:
  - rules
  - extensibility
  - integration
contentType: how-to
useCase: extensibility-rules
---
# Integrate with HubSpot Marketing Software

To help increase traffic and leads, you may want to integrate with HubSpot Marketing Software. You can do this using a specialized rule template.

In this example, we will use a rule to add a new contact to a specified list in HubSpot.

## Prerequisites

Before connecting your Auth0 app to HubSpot, you must [sign up for and configure your account with HubSpot](https://www.hubspot.com/).

## Steps

To connect your app to HubSpot, you will:

1. [Get your HubSpot credentials](#get-your-hubspot-credentials)
2. [Create and activate a rule in Auth0](#create-and-activate-a-rule-in-auth0)

### Get your HubSpot credentials

First, you will need to retrieve your HubSpot API Key and the list ID of the HubSpot list to which you want to add a new member.

To learn how to get your HubSpot API Key, see [HubSpot's Access your HubSpot API Key doc](https://knowledge.HubSpot.com/integrations/how-do-i-get-my-HubSpot-api-key).

You can find the ID of any list in HubSpot by navigating to the list in your portal and inspecting the URL. The format of the URL is:
`https://app.hubspot.com/contacts/{portal id}/lists/{list id}`

Once you have retrieved your HubSpot API Key and HubSpot List ID, keep these values on hand because we will use them in the next step.

### Create and activate a rule in Auth0

[Set up a rule](/dashboard/guides/rules/create-rules) in Auth0. While setting up your rule, select the **Add New Contact to HubSpot for Marketing** template from the **Webhook** section, then use the following settings:

::: warning
You may use global variables to configure these in your rule. If so, be sure to [configure your rules variables](/dashboard/guides/rules/configure-variables) first.
:::

| Variable | Value |
| -------- | ----- |
| HUBSPOT_API_KEY | Your HubSpot API Key. |
| HUBSPOT_NEW_MEMBER_LIST_ID | ID of the HubSpot list to which you want to add a new member. |

By default, your rule will be activated upon save. Upon authentication, users will now show up as Contacts and be added to the specified list in HubSpot.