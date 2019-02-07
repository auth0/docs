---
title: View Application Type - Confidential vs. Public
description: Learn how to check whether an application is registered with Auth0 as a confidential or public app.
topics:
  - applications
  - application-types
  - dashboard
contentType: how-to
useCase:
  - build-an-app
---
# View Application Type: Confidential or Public

This guide will show you how to use Auth0's Management API to check whether an application is registered with Auth0 as a confidential or public application.

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/). 

2. Click the name of your application to see its settings.

3. Locate the **Token Endpoint Authentication Method**.


Auth0 determines the **Application Type** based on the **Token Endpoint Authentication Method** setting on the application's settings page in the Dashboard.

|Application Type|Token Endpoint Authentication Method|
|-|-|
|Public|**None**|
|Confidential|**Basic**, **Post**, unspecified|

::: panel Token Endpoint Authentication Method
The `Token Endpoint Authentication Method` defines how a Confidential Application authenticates against the [token endpoint](/api/authentication#authorization-code). Its valid values are:

* `None`, for a public application without a client secret
* `Post`, for an application using HTTP POST parameters
* `Basic`, for an application using HTTP Basic parameters 

Additionally, any Application where the Token Endpoint Authentication Method is unspecified is confidential.
:::
