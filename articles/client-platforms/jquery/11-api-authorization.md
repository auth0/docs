---
title: OAuth2 API Authorization
description: This tutorial demonstrates how to use Auth0 to make authorized API calls from your web app.
budicon: 500
---

<%= include('../../_includes/_api_auth_intro') %>

<%= include('../../api-auth/_preview-warning') %>
<%= include('../../_includes/_compat_warning') %>

### Before Starting

## 1. Enable OAuth2 as a Service

<%= include('../../_includes/_configure_oauth2aas') %>

## 2. Create an Application

<%= include('../../_includes/_new_app') %>

![App Dashboard](/media/articles/angularjs/app_dashboard.png)

Be sure to register the URL of your app in the Allowed Callback URLs in your Application Settings.

## 3. Create a Resource Server (API)

<%= include('../../_includes/_new_api') %>

![Create API](/media/articles/api-auth/api-5.png)
![Update Scopes](/media/articles/api-auth/api-6.png)

Take note of the API Identifier and Scopes you defined in the Dashboard, as they will be used later.

<%= include('./_includes/_api_authz') %>