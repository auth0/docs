---
order: 04
title: Mobile + API
image: /media/articles/architecture-scenarios/mobile-api.png
extract: Mobile application which talks to an API. The application will use OpenID Connect with the Authorization Code Grant using Proof Key for Code Exchange (PKCE) to authenticate users.
description: Explains the architecture scenario with a mobile application communicating with an API.
toc: true
---

# Mobile + API

In this scenario we will build a Timesheet API for a fictitious company named ExampleCo. The API will allow management of timesheet entries for an employee or a contractor.

We will also be building a mobile application which will be used to view and log timesheet entries in the centralized timesheet database using the API.


::: panel TL;DR
* Auth0 provides API Authentication and Authorization as a means to secure access to API endpoints (see [API Authentication and Authorization](/architecture-scenarios/application/mobile-api/part-1#api-authentication-and-authorization))
* For authorizing a mobile app user and granting access to the API, Auth0 supports the Authorization Code Grant Flow with PKCE (see [Proof Key for Code Exchange](/architecture-scenarios/application/mobile-api/part-1#proof-key-for-code-exchange-pkce-))
* Both the mobile app and the API must be configured in the Auth0 Dashboard (see [Auth0 Configuration](/architecture-scenarios/application/mobile-api/part-2))
* User Permissions can be enforced using the Authorization Extension (see [Configure the Authorization Extension](/architecture-scenarios/application/mobile-api/part-2#configure-the-authorization-extension))
* The API is secured by ensuring that a valid [Access Token](/tokens/access-token) is passed in the HTTP Authorization header when calls are made to the API (see [Implement the API](/architecture-scenarios/application/mobile-api/part-3#secure-the-endpoints))
* The Auth0.Android SDK can be used to authorize the user of the mobile app and obtain a valid Access Token which can be used to call the API (see [Authorize the User](/architecture-scenarios/application/mobile-api/part-3#authorize-the-user))
* The mobile app can retrieve the user's profile information by decoding the ID Token (see [Get the User Profile](/architecture-scenarios/application/mobile-api/part-3#get-the-user-profile))
* UI Elements can be displayed conditionally based on the scope that was granted to the user (see [Display UI Elements Conditionally Based on Scope](/architecture-scenarios/application/mobile-api/part-3#display-ui-elements-conditionally-based-on-scope))
* The mobile app provides the Access Token in the HTTP Authorization header when making calls to the API (see [Call the API](/architecture-scenarios/application/mobile-api/part-3#call-the-api))
* The mobile app user's Access Token can be renewed to ensure the user does not have to log in again during a session (see [Renew the Token](/architecture-scenarios/application/mobile-api/part-3#renew-the-token))
:::

## The Premise

ExampleCo is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week. 

The company has built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets, but the company wants a mobile application for employees and contractors to use while not on the premises. The app will be used to log timesheet entries and send the data to the centralized timesheet database using the API. The app will also allow managers to approve timesheet entries.

### Goals & Requirements

ExampleCo wants to build a flexible solution. There are potential multiple employees and contractors who should be able to log timesheet entries, as well as batch processes which may upload timesheet entries from other, external systems.

Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this mobile app, but by all other apps as well. They want to put in place a security architecture that is flexible enough to accommodate this. ExampleCo wants to ensure that a large part of the code and business logic for the application can be shared across the different applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

<%= include('./_stepnav', {
 next: ["1. Solution Overview", "/architecture-scenarios/application/mobile-api/part-1"]
}) %>
