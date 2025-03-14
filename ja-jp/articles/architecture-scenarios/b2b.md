---
url: /architecture-scenarios/b2b
classes: topic-page
title: Business to Business Identity and Access Management
description: Explains the architecture scenario B2B IAM with a SAAS application.
topics:
    - b2b
    - b2biam
    - SDLC
contentType: index
useCase:
  - implementation
---
<!-- markdownlint-disable MD041 MD002 -->
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Business to Business Identity and Access Management</h1>
  <p>
  This guidance is relevant to <b>all</b> project stakeholders. We recommend reading it in its entirety at least once, even if you've already started your journey with Auth0. We provide a Project Planning Guide in PDF format, details about how to get started with each phase of the implementation process, and checklists to help you manage the tasks in each phase.
  </p>
</div>

<%= include('./_includes/_base-ways-to-integrate.md', { platform: 'b2b' }) %>

## Project Planning Guide

<%= include('./_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('./_includes/_multitenancy.md', { platform: 'b2b' }) %>

## Get started

<%= include('./_includes/_base-intro.md', { platform: 'b2b' }) %>

<%= include('../_includes/_topic-links', { links: [
  'architecture-scenarios/implementation/b2b/b2b-architecture',
  'architecture-scenarios/implementation/b2b/b2b-provisioning',
  'architecture-scenarios/implementation/b2b/b2b-authentication',
  'architecture-scenarios/implementation/b2b/b2b-branding',
  'architecture-scenarios/implementation/b2b/b2b-deployment',
  'architecture-scenarios/implementation/b2b/b2b-qa',
  'architecture-scenarios/implementation/b2b/b2b-profile-mgmt',
  'architecture-scenarios/implementation/b2b/b2b-authorization',
  'architecture-scenarios/implementation/b2b/b2b-logout',
  'architecture-scenarios/implementation/b2b/b2b-operations'
] }) %>

## Implementation planning checklists

<%= include('./_includes/_implementation-checklists.md') %>
