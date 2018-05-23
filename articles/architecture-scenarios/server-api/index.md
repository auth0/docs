---
order: 02
title: Server Application + API
image: /media/articles/architecture-scenarios/server-api.png
extract: Server to server communication where a server “Application” needs to make secure calls to an API (“Resource Server”), but on behalf of the application vs. a user.
description: Explains the architecture scenario with server to server communication with secure calls to an API (“Resource Server”), but on behalf of the application vs. a user.
toc: true
---

# Server + API

In this scenario we will build a Timesheet API for a fictitious company named ExampleCo. The API will allow to add timesheet entries for an employee or a contractor.

We will also be building a cron job which will process timesheet entries from an external system to the centralized timesheet database using the API.

::: panel TL;DR
* Auth0 provides API Authentication and Authorization as a means to secure access to API endpoints (see [API Authentication and Authorization](/architecture-scenarios/application/server-api/part-1#api-authentication-and-authorization))
* For authorizing a Machine to Machine Application (a CLI, service or daemon where no user interaction is involved) Auth0 supports the Client Credentials grant (see [Client Credentials Grant](/architecture-scenarios/application/server-api/part-1#client-credentials-grant))
* Both the Machine to Machine Application and the API must be configured in the Auth0 Dashboard (see [Auth0 Configuration](/architecture-scenarios/application/server-api/part-2))
* The API will be secured by ensuring that a valid Access Token (which is implemented as a JSON Web Token) is passed in the HTTP Authorization header when calls are made to the API (see [Implement the API](/architecture-scenarios/application/server-api/part-3))
* Upon successful authorization an Access Token is issued to the Machine to Machine Application (see [Get an Access Token](/architecture-scenarios/application/server-api/part-3#get-an-access-token))
* The Machine to Machine Application can in turn use this Access Token to pass along as an HTTP Authorization header to authenticate calls to API endpoints (see [Invoke the API](/architecture-scenarios/application/server-api/part-3#invoke-the-api))
:::

## The Premise

ExampleCo is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week. For this purpose, they built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets but some of the external contractors already use another tool to track their timesheets. Hence a solution to avoid the double work is required. It was decided to build a cron job which will read the timesheet entries from this external system, and automatically upload those to ExampleCo's backend using an API.

### Goals & Requirements

ExampleCo wants to build a flexible solution. At the moment only an automated process needs to push timesheet entries but in the future the company plans on launching more applications, like a mobile app to accommodate their sales teams. Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this server process, but by all future applications as well. They want to put in place a security architecture that is flexible enough to accommodate this. ExampleCo wants to ensure that a large part of the code and business logic for the application can be shared across the different applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

<%= include('./_stepnav', {
 next: ["1. Solution Overview", "/architecture-scenarios/application/server-api/part-1"]
}) %>
