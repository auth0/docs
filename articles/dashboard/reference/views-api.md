---
title: Auth0 Dashboard API Views
description: Learn about the API Views available through the Auth0 Dashboard.
topics:
  - api-authentication
  - oidc
  - apis
  - dashboard
contentType: reference
useCase:
  - secure-api
  - call-api
---

# Dashboard Views for APIs

Available views for your API include:

- **Settings**: lists the settings for your API, some of which are editable. In this section, you can change the token expiration time and enable offline access (so that Auth0 will allow applications to ask for <dfn data-key="refresh-token">Refresh Tokens</dfn> for this API). For details, see [API Settings](/api-auth/references/dashboard/api-settings).

- **Scopes**: allows you to [define the scopes](/scopes/current/guides/define-scopes-using-dashboard) for your API by setting scope names and descriptions. For more details, see [API Scopes](/scopes/current/api-scopes).

- **Machine to Machine Applications**: lists all applications for which the **Client Credentials** grant is **enabled**. (By default, this grant is **enabled** for [Regular Web Applications and Machine to Machine Applications](/applications). You can authorize any listed application to request Access Tokens for your API. Optionally, you can select a subset of the defined scopes to limit an authorized application's access to your API. 

- **Test**: allows you to execute a sample Client Credentials flow with any of the authorized applications so you can check that everything is working as expected.
