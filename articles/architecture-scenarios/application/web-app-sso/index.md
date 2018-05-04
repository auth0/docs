---
order: 01
title: Single Sign-On for Regular Web Apps
image: /media/articles/architecture-scenarios/web-oidc.png
extract: Traditional web application which needs to authenticate users using OpenID Connect.
description: Regular web app scenario which needs to authenticate users using OpenID Connect.
toc: true
---

# Single Sign-On for Regular Web Apps

In this scenario, we will build a web application for a fictitious company named ExampleCo. The app is meant to be used by ExampleCo's employees and contractors. Employees will use their existing corporate directory (Active Directory), while contractors will be managed in a separate user store.

::: panel TL;DR
* Auth0 supports open standards such as OAuth 2.0 and OpenID Connect (OIDC) for authentication and authorization (see [Which protocol to use](/architecture-scenarios/application/web-app-sso/part-1#which-protocol-to-use))
* OIDC supports several different authorization flows - the most appropriate one for Web Applications being the Authorization Code Flow (see [Authentication Flow](/architecture-scenarios/application/web-app-sso/part-1#authentication-flow))
* Your application will be configured in Auth0 as an application (see [Application](/architecture-scenarios/application/web-app-sso/part-2#application))
* Identity Providers will be configured in Auth0 as a Connection (see [Connections](/architecture-scenarios/application/web-app-sso/part-2#connections))
* Auth0 provides a Lock widget, which allow users to log in to the application (see [User Login](/architecture-scenarios/application/web-app-sso/part-3#user-login))
* The web application needs to manage session state to keep track of the fact that the user is logged in. Along with this, Auth0 and the Identity Provider is also managing session information. (see [Session Management](/architecture-scenarios/application/web-app-sso/part-3#session-management))
* Conversely, logging a user out also involves three layers of session management (see [User Logout](/architecture-scenarios/application/web-app-sso/part-3#user-logout))
* Access Control can be managed with the Auth0 Authorization Extension (see [Access Control](/architecture-scenarios/application/web-app-sso/part-3#access-control))
:::

::: note
By _Regular Web App_, we mean an app that uses primarily server side, page `GET`, `POST`, and cookies for maintaining state. This is contrast with a Web _SPA_ (Single Page App), that heavily relies on client side JavaScript code calling an API.
:::

## The Premise

ExampleCo is a consulting startup company. Currently they have approximately 100 employees and they also outsource several activities to external contractors. Most of the employees work from the company's main office, but there are some teams that work remotely. Additionally, some employees frequently travel to customer locations and work from mobile devices.

All employees and external contractors are required to fill in their timesheets every week using spreadsheets. The current system is inefficient and the company decided that they need to move to a better and more automated solution.

The company evaluated several of the available timesheets application and concluded that it would be more cost-effective to build their own in-house solution, since they are looking for a very simple application at the moment. The app will be built using ASP.NET Core, since their developers are already using this technology and they can have the app ready in a week or so.

### Goals & Requirements

ExampleCo wants to launch the new solution quickly so they chose to start simple and build into it as they gather feedback from their employees.

The application should be available to logged in users only. Each user will have a role, and based on this role, they should be able to perform certain actions and view specific data.

::: panel Authentication vs Authorization
ExampleCo wants to __authenticate__ and __authorize__ each user. Authentication has to do with identity: verifying that the user is indeed who they claim to be. Authorization is about deciding which resources a user should have access to, and what they should be allowed to do with those resources.
:::

ExampleCo's timesheets app needs to support two roles: _User_ and _Admin_:
- Someone with the User role can add timesheet entries, by specifying the date, the application and the hours worked. The Admin role also has this same right.
- Those with the User role should have access only to their own timesheets entries.
- Someone with the Admin role can additionally:
  - Approve or reject timesheet entries of other users.
  - Edit the application drop-down list of values (add, edit, delete).

Each user will be required to fill in their timesheets by the end of the week. They can either choose to register daily their timesheets or add the entries for the whole week together. The timesheets will have to be reviewed and approved by an Admin. The rejected entries will have to be updated by each employee and re-submitted for approval.

The company uses Active Directory for all employees and employees will sign into the Timesheet application using their Active Directory credentials. The external contractors can sign in with a username and password. Contractors are not on ExampleCo's corporate directory.

ExampleCo wants to minimize user login burden, but wants to maintain a level of security depending on the operation: submitting timesheet entries is lower risk than approving them. However the approved timesheets are used for customer charging so security is definitely a requirement. The authentication strategy should be flexible so it can adapt as the company grows. For example, they should easily be able to add additional authentication requirements, like multifactor authentication, for Admins.

The solution should be available both to the employees with a physical presence in the company office, as well as to those working remotely, without the overhead of a VPN connection, hence the app should be deployed on a cloud provider like Heroku or Microsoft Azure.

![Diagram of the solution](/media/articles/architecture-scenarios/web-app-sso/solution-diagram.png)

<%= include('./_stepnav', {
 next: ["1. Solution Overview", "/architecture-scenarios/application/web-app-sso/part-1"]
}) %>
