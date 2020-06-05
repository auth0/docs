---
title: Connect Apps to Salesforce Community
connection: Salesforce Community
image: /media/connections/salesforce.png
seo_alias: salesforce
index: 6
description: Learn how to add login functionality to your app with Salesforce Community. You will need to generate keys, copy these into your Auth0 settings, and enable the connection.
toc: true
topics:
  - connections
  - social
  - salesforce
  - salesforce-community
contentType: how-to
useCase:
  - customize-connections
  - add-idp
  - add-login
---

# Connect Apps to Salesforce Community


In addition to its production system, Salesforce offers communities, which are branded spaces for employees, customers, and partners to connect. This guide will show you how to add functionality to your web app that allows your users to log in through a Salesforce Community.

To learn more about Salesforce Communities, see Salesforce's [Set Up and Manage Salesforce Communities](https://help.salesforce.com/articleView?id=networks_overview.htm&type=5) docs.

## Prerequisites

Before connecting your Auth0 app to Salesforce Community, you must have already [signed up for and configured your account with Salesforce](https://www.salesforce.com/).

## Steps

To connect your app to Salesforce Community, you will:

1. [Get Salesforce credentials](#get-salesforce-credentials)
2. [Find your Salesforce Community's base path](#find-your-salesforce-communitys-base-path)
3. [Create and enable a connection in Auth0](#create-and-enable-a-connection-in-auth0)
4. [Test the connection](#test-the-connection)

### Get Salesforce credentials

If you have already set up a [Salesforce Sandbox](https://help.salesforce.com/articleView?id=deploy_sandboxes_intro.htm&type=5), set up your app in the Sandbox, and deployed the app to production, then you need to locate the app's production **Consumer Key** and **Consumer Secret**.

Alternatively, if you are setting up a new app in production, you need to create an app in Salesforce and generate credentials for it, using [Salesforce's Create a Connected App](https://help.salesforce.com/articleView?id=connected_app_create.htm&type=0) docs. During this process, Salesforce will generate a **Consumer Key** and **Consumer Secret** for your application; make note of these.

While setting up your app, make sure you use the following settings:

| Field | Value to Provide |
| - | - |
| API (Enable OAuth Settings) | Click `Enable OAuth Settings` |
| Callback URL | `${manage_url}.auth0.com/login/callback` |
| Selected OAuth Scopes | Add `Access your basic information` |

<%= include('../../connections/_find-auth0-domain-redirects') %>

### Find your Salesforce Community's base path

Salesforce Community base paths have the following format:
`https://{communitydomain}.force.com/{communitypath}`

For example, if the community name is `Trailblazers` and the community exists for customers, the base path would be `https://trailblazers.force.com/customers`.

### Create and enable a connection in Auth0

[Set up the Salesforce Community social connection](/dashboard/guides/connections/set-up-connections-social) in Auth0. Make sure you have the **Consumer Key** and the **Consumer Secret** from Step 1, and the Salesforce Community base path from Step 2. 

### Test the connection

You're ready to [test your connection](/dashboard/guides/connections/test-connections-social). After logging in, you'll be prompted to allow your app access. To do so, click **Install unlisted app**.

<%= include('../_quickstart-links.md') %>

## Additional Notes

### Salesforce Community Authorization URL

When you authenticate users in a Salesforce Community, you use different endpoints than the regular Salesforce app. The authorization URL is the base path plus `/oauth2/authorize`. For example, if the community name is `Trailblazers` and the community exists for customers, the authorization URL would be:

```text
https://trailblazers.force.com/customers/oauth2/authorize?
response_type=token&
client_id=your_app_id&
redirect_uri=your_redirect_uri
```

You only need to configure the base path for the social connection because Auth0 automatically passes all required OAuth2 parameters (e.g., `response_type`, `client_id`) and concatenates other elements to the base path (i.e., `oauth2/authorize`).

### Customizing Salesforce Community login pages

It is common to customize the login page for Salesforce Community sites. If you customize your community login page, remember that the login page is part of the login transaction, so you must honor the OAuth2 flow. To learn more about customizing the Salesforce Community login page properly, see the [Sample Pages for Salesforce Login Pages](https://github.com/salesforceidentity/basic-custom-login) Github repo.