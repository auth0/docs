---
title: Deployment Automation
description: Understand how Auth0 tooling helps to automate tenant deployment
toc: true
topics:
    - b2c
    - ciam
    - tenants
    - deployment
contentType: concept
useCase:
  - tenant-deployment
---

# Deployment Automation

In addition to adopting best practices for change management and quality assurance, successful customers will also integrate Auth0 collateral management as part of some automated deployment process. As discussed in the Architecture section under [SDLC support](/architecture-scenarios/b2c/b2c-architecture#sdlc-support), you will want to ensure you configure separate Auth0 tenants for development, testing, and production environments, and you will want that configuration to be almost identical for the tenant in each environment. Using deployment automation helps ensure this, so that each environment tenant is configured the same, and you will be less likely to see bugs show up as a result of mismatched configurations between environments.

::: panel Best Practice
However you configure deployment automation, we’d recommend you unit test your rules, custom DB scripts, and hooks prior to deployment, and run some integration tests against your tenant post-deployment too. For more details regarding this, see [Quality Assurance](/architecture-scenarios/b2c/b2c-qa) for more information.
:::

<%= include('../_includes/_deployment.md') %>

## Tenant specific variables

<%= include('../_includes/_deployment-tenant-specific-variables.md') %>

<%= include('../_includes/_bp-deployment-tenant-specific-variables.md') %>

## Planning

<%= include('../_includes/_b2c-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/b2c/b2c-branding)
* [Quality Assurance](/architecture-scenarios/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/b2c/b2c-logout)
* [Operations](/architecture-scenarios/b2c/b2c-operations)
