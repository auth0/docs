---
title: Register Machine-to-Machine Applications
description: Learn how to register and configure a machine-to-machine (M2M) application using the Auth0 Management Dashboard. These may include non-interactive applications, such as command-line tools, daemons, IoT devices, or services running on your back-end.
topics:
  - applications
  - m2m
  - dashboard
contentType: 
  - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register Machine-to-Machine Applications

To integrate Auth0 with a [machine-to-machine (M2M) application](/applications), you must first register your app with Auth0. This guide will show you how to register an M2M application using Auth0's Dashboard.

::: note
M2M applications are linked to an API and its [scopes](/scopes/current/api-scopes), which are selected from pre-defined values. Make sure you have already [registered the associated API](/apis#how-to-configure-an-api-in-auth0) with Auth0 and [defined scopes for the API](scopes/current#define-scopes-using-the-dashboard) before beginning this guide. 

If you want to authorize your application to access only Auth0's [Management API](/api/info#management-api-v2), you do not need to do anything; the Management API is pre-populated for you.
:::

<%= include('./_includes/_register-app-part1', { application_type: 'M2M', application_type_create: 'Machine-to-Machine App' }) %> 

3. Select the API you want to be able to call from your Application.

![Select API](/media/articles/applications/m2m-select-api.png)

4. Select the [scopes](/scopes/current/api-scopes) you want to be issued as part of your Application's Access Token, and click **Authorize**.

![Select Scopes](/media/articles/applications/m2m-select-scopes.png)

<%= include('./_includes/_register-app-part2-m2m', { application_type: 'M2M', application_type_create: 'Machine-to-Machine App' }) %> 

<%= include('./_includes/_register-app-next-steps') %>