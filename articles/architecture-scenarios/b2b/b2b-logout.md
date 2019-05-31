---
title: Logout
description: Understand user logout planning considerations for your B2B implementation.
toc: true
topics:
    - b2b
    - iam
    - logout
    - sessions
contentType: concept
useCase:
    - user-logout
---
# Logout

<%= include('../_includes/_logout.md') %>

If you are doing Login Federation (redirecting users to a separate IDP to login), then Logout Federation is something that you need to consider for your application.  *Should* you log the user out of their IDP when they log out of your application?  The answer to this depends on what your users would expect.  If the application is tied closely to the organization and is a central part, then they may expect to be logged out of their IDP, if not, then it may be frustrating to them to get logged out of their IDP when they log out of your application.  In most B2B applications, federated logout is not expected by the user, but if your situation is different see [Federated User Logout](/logout/guides/logout-idps) for more information.

## Planning

<%= include('../_includes/_b2b-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/b2b/b2b-authorization)
* [Operations](/architecture-scenarios/b2b/b2b-operations)
