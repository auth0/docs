---
title: Auth0 Application Types
description: Learn about the Auth0 application types used when registering an application with Auth0
toc: true
topics:
  - applications
  - application-types
contentType: 
  - concept
useCase:
  - build-an-app
---

## Auth0 Application Types

To add authentication to your application, you must first register it with Auth0 and select an application type. Auth0 recognizes four application types:

- **Native Apps**: Mobile or Desktop apps that run natively in a device (e.g., iOS, Android). Learn to [register your Native/Mobile App using the Dashboard](/dashboard/guides/applications/register-app-native).

- **Single-Page Apps (SPAs)**: JavaScript applications that perform most of their user interface logic in a web browser, communicating with a web server primarily using APIs (e.g., AngularJS + Node.js, React). Learn to [register your Single Page App using the Dashboard](/dashboard/guides/applications/register-app-spa).

- **Regular Web Apps**: Traditional web applications that perform most of their application logic on the server (e.g., Express.js, ASP.NET). Learn to [register your Regular Web App using the Dashboard](/dashboard/guides/applications/register-app-regular-web).

- **Machine-to-Machine (M2M) Apps**: Non-interactive applications, such as command-line tools, daemons, IoT devices, or services running on your back-end. Typically, you use this option if you have a service that requires access to an API. Learn to [register your M2M App using the Dashboard](/dashboard/guides/applications/register-app-m2m).


## Keep reading

- After creating your first application, you should [set the environment for your tenant](/dev-lifecycle/setting-up-env#set-the-environment). Options include development, staging, or production.

- Learn about other application categories, such as [public vs. confidential](/applications/concepts/app-types-confidential-public) and [first-party vs. third-party](/applications/concepts/app-types-first-third-party).
