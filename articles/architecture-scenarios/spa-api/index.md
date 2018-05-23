---
order: 03
title: SPA + API
image: /media/articles/architecture-scenarios/spa-api.png
extract: Single Page Web Application which talks to an API. The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.
description: Explains the architecture scenario where a Single Page Web Application (SPA) talks to an API using OpenID Connect, and the OAuth 2.0 Implicit Grant Flow, to authenticate users with Auth0.
toc: true
---

# SPA + API

In this scenario, we will build a Timesheet API for a fictitious company named ExampleCo. The API will allow adding timesheet entries for an employee or a contractor.

We will also be building a Single Page Application (SPA) which will be used to log timesheet entries and send them to the centralized timesheet database using the API.

::: panel TL;DR
* Auth0 provides API Authentication and Authorization as a means to secure access to API endpoints (see [API Authentication and Authorization](/architecture-scenarios/application/spa-api/part-1#api-authentication-and-authorization))
* For authorizing a user of a SPA, Auth0 supports the Implicit Grant (see [Implicit Grant](/architecture-scenarios/application/spa-api/part-1#implicit-grant))
* Both the SPA and the API must be configured in the Auth0 Dashboard (see [Auth0 Configuration](/architecture-scenarios/application/spa-api/part-2#auth0-configuration))
* User Permissions can be enforced using the Authorization Extension (see [Configure the Authorization Extension](/architecture-scenarios/application/spa-api/part-2#configure-the-authorization-extension))
* The API will be secured by ensuring that a valid Access Token is passed in the HTTP Authorization header when calls are made to the API (see [Implement the API](/architecture-scenarios/application/spa-api/part-3#implement-the-api))
* The Auth0.js library can be used to authorize the user of the SPA and obtain a valid Access Token which can be used to call the API (see [Authorize the User](/architecture-scenarios/application/spa-api/part-3#authorize-the-user))
* The SPA can pass the Access Token in the HTTP Authorization header when making calls to the API (see [Call the API](/architecture-scenarios/application/spa-api/part-3#call-the-api))
* The SPA can display UI elements conditionally based on scopes granted to user (see [Display UI Elements Conditionally Based on Scope](/architecture-scenarios/application/spa-api/part-3#display-ui-elements-conditionally-based-on-scope))

:::

## The Premise

ExampleCo is a consulting startup company. Currently, they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week.

The company has built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets but the company wants to replace it with a SPA. The app will be used to log timesheet entries and send the data to the centralized timesheet database using the API. The app will also allow managers to approve timesheet entries.

## Goals & Requirements

ExampleCo wants to build a flexible solution. At the moment only a SPA is required to capture timesheet entries but in the future, the company plans on launching more applications, like a mobile app to accommodate their sales teams. Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this server process but by all future applications as well. They want to put in place a security architecture that is flexible enough to accommodate this. ExampleCo wants to ensure that a large part of the code and business logic for the application can be shared across the different applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

Two kinds of users will use this SPA: employees and managers. The employees should be able to read, create and delete their own timesheet entries, while the managers should be able to approve timesheets as well.

<%= include('./_stepnav', {
 next: ["1. Solution Overview", "/architecture-scenarios/application/spa-api/part-1"]
}) %>
