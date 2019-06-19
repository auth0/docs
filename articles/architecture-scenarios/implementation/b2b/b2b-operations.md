---
title: Operations
description: Understand operationalization of your Auth0 tenant environments
toc: true
topics:
    - b2b
    - b2biam
    - tenants
    - operations
contentType: concept
useCase:
  - tenant-operations
---

# Operations

<%= include('../../_includes/_operations/_introduction.md', { platform: 'b2b' }) %>

## Service status

<%= include('../../_includes/_operations/_service-status.md', { platform: 'b2b' }) %>

## Email provider setup

<%= include('../../_includes/_operations/_email-provider.md', { platform: 'b2b' }) %>

## Infrastructure

<%= include('../../_includes/_operations/_infrastructure.md', { platform: 'b2b' }) %>

## Logging

<%= include('../../_includes/_operations/_logging.md', { platform: 'b2b' }) %>

## Monitoring

<%= include('../../_includes/_operations/_monitoring.md', { platform: 'b2b' }) %>

## Notifications

<%= include('../../_includes/_operations/_notifications.md', { platform: 'b2b' }) %>

## Self-Service IDP provisioning

Auth0 makes it easy to configure IDPs, but depending on the number of organizations and the amount of coordination work with those organizations, it can be a time consuming process to onboard a new customer organization IDP.  As a result, many of our customers have found it worth the time and effort to build a self-service portal for the administrators of their customer organizations so that they can configure their own IDP instead of having your IT department have to work with them.  Auth0’s Management API provides all of the necessary functionality to support your UI.

::: Best practice
If you are creating a separate Auth0 tenant for your more [complicated organizations](/architecture-scenarios/b2b/b2b-architecture#tenant-provision-for-complex-organizations), then you can consider allowing an administrator from that organization to have access to the Auth0 Dashboard of that separate tenant.  This would depend on how much trust there is with the other organization as that administrator would be able to break their login experience if they don’t know how to set things up correctly.
:::

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
* [Logout](/architecture-scenarios/implementation/b2b/b2b-logout)
