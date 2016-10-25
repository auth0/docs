---
title: OAuth 2.0 API Authorization
description: This tutorial demonstrates how to use Auth0 to make authorized API calls from your web app.
budicon: 500
---

At some point, your APIs may need to allow limited access to users, servers, or servers on behalf of users. This tutorial demonstrates how to use the [Authorization Code Flow with PKCE](https://auth0.com/docs/api-auth/tutorials/authorization-code-grant-pkce) to give your applications (or third-party applications) limited access to your APIs on behalf of users. For more information, check out [our documentation](https://auth0.com/docs/api-auth).

<%= include('../../api-auth/_region-support') %>
<%= include('../../_includes/_compat_warning') %>

### Before Starting

## Enable OAuth 2.0 API Authorization

<%= include('../../_includes/_configure_oauth2aas') %>

## Create an Application

<%= include('./_includes/_new_app_no_sample') %>

<!-- ![App Dashboard](/media/articles/native-platforms/native-app-client.png) -->

Be sure to register the URL of your app in the Allowed Callback URLs in your Client Settings.

## Create a Resource Server (API)

<%= include('../../_includes/_new_api') %>

![Create API](/media/articles/api-auth/api-5.png)
![Update Scopes](/media/articles/api-auth/api-6.png)

Take note of the API Identifier and Scopes you defined in the Dashboard, as they will be used later.

<%= include('./_includes/_api_authz') %>