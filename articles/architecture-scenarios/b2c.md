---
url: /architecture-scenarios/b2c
classes: topic-page
title: Business to Consumer Identity and Access Management
description: Explains the architecture scenario B2C IAM with an eCommerce or SAAS application.
topics:
    - b2c
    - CIAM
    - SDLC
contentType: concept
useCase:
  - implementation
---
<!-- markdownlint-disable MD041 MD002 -->
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Business to Consumer Identity and Access Management</h1>
  <p>
  This guidance is relevant to <b>all</b> project stakeholders. We recommend reading it in its entirety at least once, even if you've already started your journey with Auth0. We provide a Project Planning Guide in PDF format, details about how to get started with each phase of the implementation process, and checklists to help you manage the tasks in each phase.
  </p>
</div>

<%= include('./_includes/_base-ways-to-integrate.md', { platform: 'b2c' }) %>

## Project Planning Guide

<%= include('./_includes/_planning.md', { platform: 'b2c' }) %>

## Get started

<%= include('./_includes/_base-intro.md', { platform: 'b2c' }) %>

<%= include('../_includes/_topic-links', { links: [
  'architecture-scenarios/implementation/b2c/b2c-architecture',
  'architecture-scenarios/implementation/b2c/b2c-provisioning',
  'architecture-scenarios/implementation/b2c/b2c-authentication',
  'architecture-scenarios/implementation/b2c/b2c-branding',
  'architecture-scenarios/implementation/b2c/b2c-deployment',
  'architecture-scenarios/implementation/b2c/b2c-qa',
  'architecture-scenarios/implementation/b2c/b2c-profile-mgmt',
  'architecture-scenarios/implementation/b2c/b2c-authorization',
  'architecture-scenarios/implementation/b2c/b2c-logout',
  'architecture-scenarios/implementation/b2c/b2c-operations',
  'architecture-scenarios/implementation/b2c/b2c-launch'
] }) %>

## Implementation planning checklists

<%= include('./_includes/_implementation-checklists.md') %>
