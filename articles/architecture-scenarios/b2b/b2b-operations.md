---
title: Operations
description: Understand operationalization of your Auth0 tenant environments
toc: true
topics:
    - b2b
    - iam
    - tenants
    - operations
contentType: concept
useCase:
  - tenant-operations
---

# Operations

<%= include('../_includes/_operations-intro.md') %>

<%= include('../_includes/_operations-design-considerations.md') %>

* Will you want to provide serlf-service provisioning of your customer organization IDPs?

<%= include('../_includes/_operations-design-considerations2.md') %>

::: panel Best practice
Some Auth0 customers create a [self-service portal](#self-service-idp-provisioning) so their customer's administrators can configure their IDPs for their organizations. 
:::

## Monitoring

<%= include('../_includes/_operations-monitoring.md') %>

## Service status

<%= include('../_includes/_operations-self-service.md') %>

## Notifications

<%= include('../_includes/_operations-notifications.md') %>

## Logging

<%= include('../_includes/_operations-logging.md') %>

## Infrastructure

### Firewalls

<%= include('../_includes/_operations-infrastructure.md') %>

### Self-service IDP provisioning

Auth0 makes it easy to configure IDPs, but depending on the number of organizations and the amount of coordination work with those organizations, it can be a time consuming process to onboard a new customer organization IDP.  As a result, many of our customers have found it worth the time and effort to build a self-service portal for the administrators of their customer organizations so that they can configure their own IDP instead of having your IT department have to work with them. Auth0’s Management API provides all of the necessary functionality to support your UI.

::: panel Best practice
If you are creating a [separate Auth0 tenant](/architecture-scenarios/b2b/b2b-architecture#complex-organization-tenant-provisioning) for your more complicated organizations, then you can consider allowing an administrator from that organization to have access to the Auth0 Dashboard of that separate tenant.  This would depend on how much trust there is with the other organization as that administrator would be able to break their login experience if they don’t know how to set things up correctly.
:::

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
* [Logout](/architecture-scenarios/b2b/b2b-logout)
