---
title: Architecture
description: Understand how Auth0 lets you create Auth0 tenants for one or more environments
toc: true
topics:
    - b2b
    - iam
    - tenants
contentType: concept
useCase:
  - tenant-architecture
---

# Architecture

<%= include('../_includes/_architecture-intro.md') %>

<%= include('../_includes/_bp-sso-training.md') %>

## Design considerations

<%= include('../_includes/_architecture-design-considerations.md') %>
* How can I align the structure and domain of my customers' organization with my Auth0 deployment?

### How your domains and user community impact architecture

<%= include('../_includes/_domains-impact-architecture-intro.md') %>

<%= include('../_includes/_bp-user-communities.md') %>

If you need to provision an independent tenant then you’ll also want to [associate this with your existing Auth0 account](#tenant-association), so that you can take full advantage of the benefits provided at your organization’s contracted subscription level.

<%= include('../_includes/_architecture-dev-process.md') %>

### How the protocol you choose impacts architecture

<%= include('../_includes/_protocol-impact-architecture-intro.md') %>

If your customers' organization supports the use of multiple IDPs, then it often makes sense to [create a separate tenant for that organization](#complex-organization-tenant-provisioning). This allows you to keep the rest of your architecture much simpler by maintaining a one-to-one relationship between your organization and all of your customer organizations within your main tenant.

## Tenant provisioning

Everything starts with an Auth0 tenant. This is where you will be configuring your use of Auth0, and the where Auth0 assets - such as [Applications](/applications), [Connections](/connections) and [user profiles](/architecture-scenarios/implementation/b2b/b2b-profile-mgmt) are defined, managed and stored. Access to an Auth0 tenant is performed via the Auth0 [Dashboard](/dashboard), and via the Dashboard you can also create additional, associated tenants; you’re allowed to create more than one Auth0 tenant so that you can structure your tenants in a way that will isolate different domains of users and also support your [Software Development Life Cycle](#sdlc-support) (SDLC).

<%= include('../_includes/_warning-tenant-names.md') %>

<%= include('../_includes/_architecture-tenant-isolation.md') %>

We recommend that you create a full suite of [SDLC supporting tenants](#sdlc-support) for every Auth0 tenant you will run in a production environment, and the number of Auth0 tenants you will need to manage can quickly grow. Therefore you should consider carefully before creating multiple Auth0 tenants for production, and should consult our guidance on [Branding](/architecture-scenarios/implementation/b2b/b2b-branding) before making your final decision. 

### Complex organization tenant provisioning

In most cases, provisioning separate Auth0 tenants for your customers organization is not necessary, however, in certain circumstancees its valuable to simplify setup. For instance, we recommend provisioning a separate Auth0 tenant for your customers' organization as a best practice if the following circumstances exist.

* Your customers' organizations have isolated users, meaning the users are never shared between organizations.
* Your have some customer organizations that support more than one IDP. For example, you might have a customer that has their own enterprise IDP, but who also has some users that aren't in their IDP and whose credentials you'll need to store. You may also have a customer who wants to provide for one or more social connections in addition to their enterprise IDP.

If both of these circumstances exist, then you should consider creating a separate Auth0 tenant for each customer. This allows you to have separate custom domains for them and to easily customize their login experience, including [Home Realm Discovery](/b2b/b2b-authentication#home-realm-discovery) on their login page. 

::: warning
Maintaining multiple Auth0 tenants can add complexity to your system and should not be done unless absolutely necessary. 
:::

## Custom domains

<%= include('../_includes/_custom-domains.md') %>

## SDLC support

<%= include('../_includes/_sdlc-support.md') %>

## Tenant association

<%= include('../_includes/_tenant-association.md') %>

## Planning

<%= include('../_includes/_b2b-planning.md') %>

## Keep reading

* [Provisioning](/architecture-scenarios/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/b2b/b2b-qa)
* [Profile Management](/architecture-scenarios/b2b/b2b-profile-mgmt)
* [Authorization](/architecture-scenarios/b2b/b2b-authorization)
* [Logout](/architecture-scenarios/b2b/b2b-logout)
* [Operations](/architecture-scenarios/b2b/b2b-operations)
