---
title: Getting Started
name: Introduction to the Quickstart, and configuring environment
description: Getting started with authentication for a Ruby on Rails API
budicon: 715
---

<%= include('../../../_includes/_api_auth_intro') %>

## Create a Resource Server (API)

In the [APIs section](${manage_url}/#/apis) of the Auth0 Dashboard, click the **Create API** button. Provide a **Name** and **Identifier** for your API.

Configure your API with a name and identifier. The identifier you set will later be used as the `audience` when configuring `access_token` verification. Be sure to choose the RS256 signing algorithm.

![Create API](/media/articles/api-auth/create-api.png)