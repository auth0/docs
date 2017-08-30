---
order: 03
title: SPA + API
image: /media/articles/architecture-scenarios/spa-api.png
extract: Single Page Web Application which talks to an API. The application will use OpenID Connect with the Implicit Grant Flow to authenticate users with Auth0.
description: Explains the architecture scenario where a Single Page Web Application (SPA) talks to an API using OpenID Connect, and the OAuth 2.0 Implicit Grant Flow, to authenticate users with Auth0.
toc: true
---

# SPA + API

In this scenario we will build a Timesheet API for a fictitious company named ABC Inc. The API will allow to add timesheet entries for an employee or a contractor.

We will also be building a Single Page Application (SPA) which will be used to log timesheet entries and send them to the centralized timesheet database using the API.

## The Premise

ABC Inc. is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week.

The company has built a timesheets application, a scenario we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The internal employees use this web app to fill in their timesheets but the company wants to replace it with a SPA. The app will be used to log timesheet entries and send the data to the centralized timesheet database using the API.

## Goals & Requirements

ABC wants to build a flexible solution. At the moment only an automated process needs to push timesheet entries but in the future the company plans on launching more clients, like a mobile app to accommodate their sales teams. Hence the company has decided to develop a single Timesheets API which will be used to log time not only by this server process, but by all future clients as well. They want to put in place a security architecture that is flexible enough to accommodate this. ABC Inc. wants to ensure that a large part of the code and business logic for the application can be shared across the different client applications.

It is required that only authorized users and applications are allowed access to the Timesheets API.

<%= include('./_stepnav', {
 next: ["1. Solution Overview", "/architecture-scenarios/application/spa-api/part-1"]
}) %>