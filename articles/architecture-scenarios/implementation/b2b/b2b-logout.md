---
title: Logout
description: Understand user logout planning considerations for your B2B implementation.
toc: true
topics:
    - b2b
    - b2biam
    - logout
    - sessions
contentType: concept
useCase:
    - user-logout
---
# Logout

<%= include('../../_includes/_logout/_introduction.md', { platform: 'b2b' }) %>

If you are redirecting users to a separate IDP to login then [Federated User Logout](/logout/guides/logout-idps) is something that you need to consider for your application.  *Should* you log the user out of their IDP when they log out of your application?  The answer to this depends on what your users would expect. If the application is tied closely to the organization and is a central part, then they may expect to be logged out of their IDP, if not, then it may be frustrating to them to get logged out of their IDP when they log out of your application. In most B2B applications, federated logout is not expected by the user.

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/implementation/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/implementation/b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/implementation/b2b/b2b-authorization)
* [Operations](/architecture-scenarios/implementation/b2b/b2b-operations)
