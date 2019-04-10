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

Auth0 determines this based on the **Token Endpoint Authentication Method** setting, which defines how an application authenticates against the [token endpoint](/api/authentication#get-token).

1. Navigate to the [Applications](${manage_url}/#/applications) page in the [Auth0 Dashboard](${manage_url}/). 

2. Click the name of your application to see its settings.

3. Locate the **Token Endpoint Authentication Method**.

Its valid values are:

* `None`, for a public application without a client secret
* `Post`, for an application using HTTP POST parameters
* `Basic`, for an application using HTTP Basic parameters 

These values map to confidential and public applications as follows:

|Application Type|Token Endpoint Authentication Method|
|-|-|
|Public|**None**|
|Confidential|**Basic**, **Post**, unspecified|
