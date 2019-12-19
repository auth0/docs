---
title: Architecture
description: How you configure your Auth0 tenant architecture affects your B2B IAM implementation.
toc: true
topics:
    - b2b
    - b2biam
    - architecture
contentType: concept
useCase:
    - tenant-architecture
---
# Architecture

<%= include('../../_includes/_architecture/_introduction.md', { platform: 'b2b' }) %>

## Tenant provision

<%= include('../../_includes/_architecture/_tenant-provision.md', { platform: 'b2b' }) %>

### Tenant provision for complex organizations

In most cases, provisioning separate Auth0 tenants for your customer's organizations is not necessary. However, in certain circumstances this can be something that is valuable for reducing the complexity of your setup. For instance, we recommend provisioning a separate Auth0 tenant for your customers' organization as a best practice if:

* Your customers' organizations have isolated users that aren't shared with other organizations.
* You have some customer organizations that support more than one IdP. For example, your customer has their own IdP but also has some users that aren't in their IdP and whose credentials you will need to store. Or, your customer wants to provide for one or more social connections in addition to their enterprise IdP.

If both of these situations are the case, then we recommend that you create separate Auth0 tenants for each customer that needs it. This allows you to have a separate custom domain for them and to easily customize their login experience, including [Home Realm Discovery](/architecture-scenarios/b2b/b2b-authentication#home-real-discovery) on their login page.

::: warning
Maintaining multiple Auth0 tenants can add complexity to your system and should not be done unless absolutely necessary.
:::

## Tenant association

<%= include('../../_includes/_architecture/_tenant-association.md', { platform: 'b2b' }) %>

## Custom domains

<%= include('../../_includes/_architecture/_custom-domains.md', { platform: 'b2b' }) %>

## SDLC support

<%= include('../../_includes/_architecture/_sdlc-support.md', { platform: 'b2b' }) %>

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

# Keep reading

<%= include('../../_includes/_keep-reading.md', { platform: 'b2b', self: 'architecture' }) %>