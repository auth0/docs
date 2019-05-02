---
title: View Application Type - Confidential or Public
description: Learn how to check whether an application is registered with Auth0 as a confidential or public app using the Auth0 Management Dashboard.
topics:
  - applications
  - application-types
  - dashboard
contentType: how-to
useCase:
  - build-an-app
---
# View Application Type: Confidential or Public

This guide will show you how to use Auth0's Dashboard to check whether an application is registered with Auth0 as a [confidential or public application](/applications/concepts/app-types-confidential-public).

Auth0 determines this based on the **Token Endpoint Authentication Method** setting, which defines how an application authenticates against the [token endpoint](/api/authentication#get-token).

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/), and click the name of the Application to view.

![View Applications](/media/articles/dashboard/guides/app-list.png)

3. Locate the **Token Endpoint Authentication Method**.

Its valid values are:

* `None`, for a public application without a client secret
* `Post`, for an application using HTTP POST parameters
* `Basic`, for an application using HTTP Basic parameters 

These values map to confidential and public applications as follows:

| Application Type | Token Endpoint Authentication Method |
| - | - |
| Public | **None** |
| Confidential | **Basic**, **Post**, unspecified |
