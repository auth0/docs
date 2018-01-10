---
order: 05
title: Regular Web App (using SAML)
image: /media/articles/architecture-scenarios/web-saml.png
extract: Traditional web application that needs to authenticate users using SAML 2.0
description: Explains the architectural scenario of a traditional web application authenticating users using SAML 2.0.
toc: true
---
# Regular Web App (using SAML)

In this scenario, we will build a regular web app for a fictitious company called ExampleCo. The app will be used by ExampleCo's in-house employees and external contractors. Employees and contractors are stored in differing directories, but regardless of where the user information is located, the regular web app will "outsource" all authentication tasks to Auth0, which will be utilizing the SAML 2.0 protocol.

## The Premise

ExampleCo is a consulting startup company. The company currently has about 100 employees, and they outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week.

The company has built a timesheets app, which we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The timesheets app is used by both internal employees and contractors.

ExampleCo wants to revamp the way that users who want access to the timesheets app are authenticated and authorized. Rather than rolling their own identity management solution, ExampleCo wants to integrate with Auth0, who will handle these tasks and implement the SAML authentication process.

## Goals & Requirements

![](/media/articles/architecture-scenarios/web-saml.png)

The application should be available to logged in users only. Each user will have a role, and based on this role, they should be able to perform certain actions and view specific data.

ExampleCo wants to minimize user login burden (which is one of the reasons why the regular web app features single sign on (SSO) functionality), but wants to maintain a level of security depending on the operation: submitting timesheet entries is lower risk than approving them.

However, the approved timesheets are used for customer charging so security is definitely a requirement. The authentication strategy should be flexible so it can adapt as the company grows. For example, they should easily be able to add additional authentication requirements, like multifactor authentication, for Admins.

::: panel Authentication vs Authorization
ExampleCo wants to __authenticate__ and __authorize__ each user. Authentication has to do with identity: verifying that the user is indeed who they claim to be. Authorization is about deciding which resources a user should have access to, and what they should be allowed to do with those resources.
:::

The timesheets app needs a SAML library that can:

1. Process the SAML response received from Auth0
2. Validate the user based on assertions included in the SAML response
3. Create the local login session for the user (typically stored using cookies)

::: note
Though Auth0 returns an access token to the user, the token itself is rarely used since there is no API against which the user is authenticated.
:::