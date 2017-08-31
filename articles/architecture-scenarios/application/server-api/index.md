---
order: 02
title: Server Client + API
image: /media/articles/architecture-scenarios/server-api.png
extract: Server to server communication where a server “Client” needs to make secure calls to an API (“Resource Server”), but on behalf of the client vs. a user.
description: Explains the architecture scenario with server to server communication with secure calls to an API (“Resource Server”), but on behalf of the client vs. a user.
toc: true
---

# Server + API

In this scenario we will build a Timesheet API for a fictitious company named ABC Inc. The API will allow to add timesheet entries for an employee or a contractor.

We will also be building a cron job which will process timesheet entries from an external system to the centralized timesheet database using the API.

## The Premise

ABC Inc. is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week. For this purpose, they built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets but some of the external contractors already use another tool to track their timesheets. Hence a solution to avoid the double work is required. It was decided to build a cron job which will read the timesheet entries from this external system, and automatically upload those to ABC's backend using an API.

### Goals & Requirements

ABC wants to build a flexible solution. At the moment only an automated process needs to push timesheet entries but in the future the company plans on launching more clients, like a mobile app to accommodate their sales teams. Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this server process, but by all future clients as well. They want to put in place a security architecture that is flexible enough to accommodate this. ABC Inc. wants to ensure that a large part of the code and business logic for the application can be shared across the different client applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

<%= include('./_stepnav', {
 next: ["1. Solution Overview", "/architecture-scenarios/application/server-api/part-1"]
}) %>