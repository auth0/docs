---
url: /architecture-scenarios/b2b
image: /media/articles/architecture-scenarios/b2b.png
classes: topic-page
title: Business to Business Identity and Access Management
description: Learn about the B2B IAM architecture scenario best practices.
topics:
  - b2biam
  - b2b
  - SDLC
contentType:
  - index
useCase:
  - implement-B2B
---

<!-- markdownlint-disable MD041 MD002 -->
<div class="topic-page-header">
  <div data-name="example" class="topic-page-badge"></div>
  <h1>Business to Business Identity and Access Management</h1>
</div>

<%= include('./_includes/_base-intro.md', { platform: 'b2b' }) %>

There are many different ways Auth0 can be integrated into the <% if (platform === "b2c") { %>CIAM<% } else { %>B2B IAM<% } %> project architecture. Auth0's flexibility comprehensively supports many different use cases, however keep in mind that not every project requires 100% of the capabilities provided by Auth0.

When you embark on your journey to integrate with Auth0, there are many things for you to consider. Knowing what, when, and how best to implement something will help you focus on completing the necessary tasks at the right time. 

## Planning guide

<%= include('../_includes/_topic-links', { links: [
  'media/articles/architecture-scenarios/planning/B2B-Project-Planning.pdf'
] }) %>

## Getting started

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

## Implementation checklists

<%= include('../_includes/_topic-links', { links: [
  'architecture-scenarios/checklists'
] }) %>

## Implementation resources

<%= include('../_includes/_topic-links', { links: [
  'architecture-scenarios/implementation-resources'
] }) %>
