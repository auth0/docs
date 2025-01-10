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

## Provisioning organizations

<%= include('../../_includes/_provisioning/_organizations.md', { platform: 'b2b' }) %>

## Self-Service IdP provisioning

While Auth0 [connections](/identityproviders) make it easy to configure IdPs, it can be a time-consuming process to onboard customer organization IdPs especially if you are selling to new customer organizations on a regular basis or existing organizations have changing IdP requirements. As a result, many of our customers have found it worthwhile to build a self-service portal for their customers' organization admins so that they can configure their own IdPs. This cuts down on your IT department's workload. The [Auth0 Management API](/api/management/v2) provides all necessary [connection](/api/management/v2#!/Connections/get_connections) management functionality to achieve this.

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

## Keep reading

<%= include('../../_includes/_keep-reading.md', { platform: 'b2b', self: 'operations' }) %>

