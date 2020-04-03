---
title: Add API Permissions
description: Learn how to add permissions to APIs using the Auth0 Management Dashboard.
topics:
  - authorization
  - dashboard
  - RBAC
  - scopes
  - permissions
contentType:
  - how-to
useCase:
  - build-an-app
  - call-api
  - secure-api
---
# Add API Permissions

This guide will show you how to add permissions to an API using Auth0's Dashboard. This task can also be performed [using the Management API](/api/management/guides/apis/update-permissions-apis). 

::: warning
By default, any user of any application can ask for any permission defined here. You can implement access policies to limit this behavior via [Rules](/rules).
:::

1. Navigate to the [APIs](${manage_url}/#/apis) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the API to view.

![View APIs](/media/articles/authorization/api-list.png)

2. Click the **Permissions** tab, enter a permission name and description for the permission you want to add, and click **Add**.

![Delete Permissions](/media/articles/authorization/api-def-permissions.png)

## Reserved names

The following permission names are reserved and cannot be set as custom API permissions:

* address
* created_at
* email
* email_verified
* family_name
* given_name
* identities
* name
* nickname
* offline_access
* openid
* phone
* picture
* profile

## Keep reading

- [Customize the Consent Prompt](/scopes/current/guides/customize-consent-prompt)
- [Represent Multiple APIs Using a Single Logical API in Auth0](/api-auth/tutorials/represent-multiple-apis)
- [Role-Based Access Control (RBAC)](/authorization/concepts/rbac)
- [Enable Role-Based Access Control for APIs](/dashboard/guides/apis/enable-rbac)
