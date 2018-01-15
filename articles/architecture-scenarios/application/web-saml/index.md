---
order: 05
title: Regular Web App Using SAML
image: /media/articles/architecture-scenarios/web-saml.png
extract: Traditional web application that needs to authenticate users using SAML 2.0
description: Explains the architectural scenario of a traditional web application authenticating users using SAML 2.0.
toc: true
---
# Regular Web App (using SAML)

In this scenario, we will build a regular web app for a fictitious company called ExampleCo. The app will be used by ExampleCo's in-house employees and external contractors. Employees and contractors are stored in differing directories, but regardless of where the user information is located, the regular web app will "outsource" all authentication tasks to Auth0, which will be utilizing the SAML 2.0 protocol.

::: panel TL;DR
* Your application will be configured in Auth0 as a [Client](/architecture-scenarios/application/web-saml/)
* Your Identity Providers will be configured in Auth0 as [Connections](/architecture-scenarios/application/web-saml/)
* [SAML 2.0](/architecture-scenarios/application/web-saml/) is a framework that allows security credentials to be shared and for one party to handle some (or all) of the security-related actions for another party
* Auth0 provides a Lock widget, which [allows users to log in](/architecture-scenarios/application/web-saml/) to the application
* The web application needs to [manage session state](/architecture-scenarios/application/web-saml/) to keep track of the fact that the user is logged in. Along with this, Auth0 and the Identity Provider is also managing session information
* At the other end of the process, [logging a user out](/architecture-scenarios/application/web-saml/) also involves three layers of session management
* You can manage [access control](/architecture-scenarios/application/web-saml/) using the Auth0 Authorization Extension
:::

## The Premise

ExampleCo is a consulting startup company. The company currently has about 100 employees, and they outsource several activities to external contractors. All employees and external contractors are required to fill in their timesheets every week.

The company has built a timesheets app, which we covered in [Single Sign-On for Regular Web Apps](/architecture-scenarios/application/web-app-sso). The timesheets app is used by both internal employees and contractors.

ExampleCo wants to revamp the way that users who want access to the timesheets app are authenticated and authorized. Rather than rolling their own identity management solution, ExampleCo wants to integrate with Auth0, who will handle these tasks and implement the SAML authentication process.

ExampleCo also wants to maintain records of information submitted by employees using the timesheets.

## Goals & Requirements

For the purposes of this tutorial, Auth0 acts as the SAML identity provider. The regular web app handling timesheets, as well as Tableau (which we will discuss further down on this page), will act as the SAML service providers.

The application should be available to logged in users only. Each user will have a role, and based on this role, they should be able to perform certain actions and view specific data.

ExampleCo wants to minimize user login burden (which is one of the reasons why the regular web app features single sign on (SSO) functionality), but wants to maintain a level of security depending on the operation: submitting timesheet entries is lower risk than approving them.

However, the approved timesheets are used for customer charging so security is definitely a requirement. The authentication strategy should be flexible so it can adapt as the company grows. For example, they should easily be able to add additional authentication requirements, like multifactor authentication, for Admins.

::: panel Authentication vs Authorization
ExampleCo wants to __authenticate__ and __authorize__ each user. Authentication has to do with identity: verifying that the user is indeed who they claim to be. Authorization is about deciding which resources a user should have access to, and what they should be allowed to do with those resources.
:::

Because ExampleCo wants to utilize the SAML 2.0 protocol, the timesheets app itself needs a SAML library that can:

1. Process the SAML response received from Auth0
2. Validate the user based on assertions included in the SAML response
3. Create the local login session for the user (typically stored using cookies)

::: note
Though Auth0 returns an access token to the user, the token itself is rarely used since there is no API against which the user is authenticated.
:::

ExampleCo also uses Tableau for its analytics purposes. While not all of ExampleCo's employees have access to this product, many do and the company takes advantage of Tableau's SAML SSO functionality. As such, our integration will need to be able to handle users who want to log in to the regular web app using their Tableau credentials.

Furthermore, for those who choose to log in using Tableau, there will be information-rich profiles. We will want to extract details from these profiles and store them on the Auth0 profile (remember: never ask the user for something you already know, and there is an abundance of information available already from their Tableau profiles). We can then include such information in the SAML response.  

Finally, we will need to ensure that we've encrypted our SAML requests (for the purposes of this tutorial, we will include a discussions as to why or why you might not encrypt your requests), as well as implemented single logout.

<%= include('./_stepnav', {
 next: ["1. Solution Overview", "/architecture-scenarios/application/web-saml/part-1"]
}) %>