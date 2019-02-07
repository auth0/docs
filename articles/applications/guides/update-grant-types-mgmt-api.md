---
title: Update an Application's Grant Types using the Auth0's Management API
description: Learn how to update an application's grant types using Auth0's Management API.
topics:
  - applications
  - grant-types
contentType: how-to
useCase:
  - build-an-app
---
# Update an Application's Grant Types using Auth0's Management API

This guide will show you how to change your application's grant types using Auth0's Management API.

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add *any* of the legacy grant types to their Applications. Only customers as of 8 June 2017 can add legacy grant types to their existing Applications.
:::






### Use the Management API

In addition to setting the `grant_types` value using the Dashboard, you can make a [`PATCH` call to the Update an Application endpoint](/api/management/v2#!/Clients/patch_applications_by_id) of the Management API to update the `grant_types` field.

### Errors

Attempting to use any flow with a Application lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```
