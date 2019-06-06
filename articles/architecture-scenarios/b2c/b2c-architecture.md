---
title: Architecture
description: Understand how Auth0 lets you create Auth0 tenants for one or more environments
toc: true
topics:
    - b2c
    - ciam
    - tenants
contentType: concept
useCase:
  - tenant-architecture
---

# Architecture

<%= include('../_includes/_architecture-intro.md') %>

<%= include('../_includes/_bp-sso-training.md') %>

<%= include('../_includes/_architecture-design-considerations.md') %>

<%= include('../_includes/_domains-impact-architecture-intro.md') %>

<%= include('../_includes/_bp-user-communities.md') %>

<%= include('../_includes/_architecture-dev-process.md') %>

<%= include('../_includes/_protocol-impact-architecture-intro.md') %>

## Tenant provisioning

Everything starts with an Auth0 tenant. This is where you will be configuring your use of Auth0, and the where Auth0 assets - such as [Applications](/applications), [Connections](/connections) and [user profiles](/architecture-scenarios/b2c/b2c-profile-mgmt) are defined, managed and stored. Access to an Auth0 tenant is performed via the Auth0 [Dashboard](/dashboard), and via the Dashboard you can also create additional, associated tenants; you’re allowed to create more than one Auth0 tenant so that you can structure your tenants in a way that will isolate different domains of users and also support your [Software Development Life Cycle](#sdlc-support) (SDLC).

<%= include('../_includes/_warning-tenant-names.md') %>

<%= include('../_includes/_architecture-tenant-isolation.md') %>

We recommend that you create a full suite of [SDLC supporting tenants](#sdlc-support) for every Auth0 tenant you will run in a production environment, and the number of Auth0 tenants you will need to manage can quickly grow. Therefore you should consider carefully before creating multiple Auth0 tenants for production, and should consult our guidance on [Branding](/architecture-scenarios/b2c/b2c-branding) before making your final decision. 

## Custom domains

<%= include('../_includes/_custom-domains.md') %>

## SDLC support

<%= include('../_includes/_sdlc-support.md') %>

## Tenant association

<%= include('../_includes/_tenant-association.md') %>

## Planning

<%= include('../_includes/_b2c-planning.md') %>

## Keep reading

* [Provisioning](/architecture-scenarios/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/b2c/b2c-qa)
* [Profile Management](/architecture-scenarios/b2c/b2c-profile-mgmt)
* [Authorization](/architecture-scenarios/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/b2c/b2c-logout)
* [Operations](/architecture-scenarios/b2c/b2c-operations)
