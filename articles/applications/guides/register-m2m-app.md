---
description: Learn to register and configure machine-to-machine (M2M) apps using the Auth0 Dashboard.
toc: true
topics:
  - applications
  - m2m
contentType: 
    - how-to
useCase:
  - build-an-app
  - add-login
  - call-api
---
# Register a Machine-to-Machine Application

To integrate Auth0 with an machine-to-machine (M2M) application, you must first register your app as an M2M App.

<%= include('./_configure', { application_type: 'M2M App', application_type_create: 'Machine to Machine Applications' }) %>

## Settings

By default, most of the settings will be created for you. However, for an M2M application, you must:

- For **Application Type**, choose Machine-to-Machine Application.

You can explore all available settings at [Dashboard Reference: Application Settings](/reference/dashboard/settings-applications). 

### Advanced Settings

By default, most of the settings will be created for you. However, for an M2M application, you must:

- Be sure that **Trust Token Endpoint IP Header** is enabled to protect against brute-force attacks on the token endpoint.

You can explore all available settings at [Dashboard Reference: Advanced Application Settings](/reference/dashboard/settings-applications-advanced). 
