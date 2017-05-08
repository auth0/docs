---
title: Getting Started
description: This tutorial demonstrates how to verify JSON Web Tokens and protect endpoints in a Golang API
---

<%= include('../../../_includes/_api_auth_intro') %>

## 1. Enable OAuth 2.0 API Authorization

<%= include('../../../_includes/_configure_oauth2aas') %>

## 2. Create a Resource Server (API)

In the [APIs section](${manage_url}/#/apis) of the Auth0 Dashboard, click the **Create API** button. Provide a **Name** and **Identifier** for your API. Be sure to choose the RS256 signing algorithm.

![Create API](/media/articles/server-apis/aspnet-core-webapi/create-api-rs256.png)