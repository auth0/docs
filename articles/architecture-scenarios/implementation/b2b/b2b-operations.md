---
title: Operations
description: How to operationalize your Auth0 tenant environments.
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

## Organization Admin Portal
An organization admin portal is a portal that allows your administrators to create, modify, and remove organizations. There are multiple activities that need to be done both in your own system and your Auth0 tenant.  This portal will likely need to exist in your own system so it has access to your datastores and configuration.  However, Auth0 provides the [**Auth0 Management API**](/api/management/v2) so that you can incorporate changes to your Auth0 tenant at the same time that you create the changes in your own system.

There are two main approaches that can be taken for creating a new organization.  The one you choose depends highly on your tolerance for how long it would take to deploy a new organization.
* **Live Updates to your Auth0 Tenant**: If you want to be able to create new organizations in real-time, then you will likely want to make the changes directly to your Auth0 tenant using the Auth0 Management API.  This allows the changes to take place in real-time and allow the addition of a new organization to take effect immediately.

::: warning
  Live Updates do come with some things to consider.  There are certain operations that must be done in serial to avoid issues.  Enabling clients on a connection, adding callback URL's to an Application are two examples.  Any operation in the Management API where you must retrieve an entire list and re-submit the entire list with the new value added to it are operations that must be done in serial to avoid two parallel operations overwriting one of the values.
:::

## Self-Service IdP provisioning

While Auth0 [connections](/identityproviders) make it easy to configure IdPs, it can be a time-consuming process to onboard customer organization IdPs especially if you are selling to new customer organizations on a regular basis or existing organizations have changing IdP requirements. As a result, many of our customers have found it worthwhile to build a self-service portal for their customers' organization admins so that they can configure their own IdPs. This cuts down on your IT department's workload. The [Auth0 Management API](/api/management/v2) provides all necessary [connection](/api/management/v2#!/Connections/get_connections) management functionality to achieve this.

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

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
