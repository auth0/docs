---
title: Auth0 Dashboard Application Views
description: Learn about the Application Views available through the Auth0 Dashboard.
topics:
  - authentication
  - oidc
  - applications
  - dashboard
contentType: reference
useCase:
  - add-login
---

# Dashboard Views for Applications

Available views for your API include:

- **Quick Start**: Info to help you get started quickly. Contains detailed steps and code samples.

- **Settings**: Lists the settings for your Application, some of which are editable. In this section, you can change the token expiration time and rotate client secrets. For details, see [Application Settings](/references/dashboard/settings-application).

Available for all but M2M Apps:

- **AddOns**: Lists the available [Addons]() for your application. Usually, these are third-party APIs used by your application.

- **Connections**: Lists the available [Connections]() for your application. Connections can be configured via the **Connections** menu in the left nav and once configured, will appear on this view.


For M2M Apps Only:

- **APIs**: Lists all APIs for which the **Client Credentials** grant is **enabled**. (By default, this grant is **enabled* for [Regular Web Applications](/applications/webapps) and [Machine to Machine Applications](/applications/machine-to-machine)). You can authorize your application to request tokens for any listed API. 
