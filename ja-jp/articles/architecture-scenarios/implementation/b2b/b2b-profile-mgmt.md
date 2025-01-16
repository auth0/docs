---
title: Profile Management
description: User profile management planning considerations for your B2B IAM implementation.
toc: true
topics:
    - b2b
    - b2biam
    - user-profiles
contentType: concept
useCase:
  - profile-management
  - manage-user-profiles
---
# Profile Management

<%= include('../../_includes/_profile-mgmt/_introduction.md', { platform: 'b2b' }) %>

## Metadata

<%= include('../../_includes/_profile-mgmt/_metadata.md', { platform: 'b2b' }) %>

## Password reset

<%= include('../../_includes/_profile-mgmt/_password-reset.md', { platform: 'b2b' }) %>

## Account verification

<%= include('../../_includes/_profile-mgmt/_account-verification.md', { platform: 'b2b' }) %>

## Blocking users

<%= include('../../_includes/_profile-mgmt/_blocking-users.md', { platform: 'b2b' }) %>

## Admin portal

An admin portal is an application where you can create new users, edit a user’s profile, see activity about a user, etc.  This application should be accessible by administrators only.  Though Auth0 provides its management dashboard, it is not advised to give access to the management dashboard to many people as there are a lot of ways someone can unintentionally break your Auth0 tenant.  Instead, Auth0 provides two other options:

* [**Auth0 Management API**](/api/management/v2): With the Management API you can easily construct an application that provides administrators the ability to manage users.  You can either incorporate this into an existing application that already exists for your administrators, or create a new one with a UI that matches your current applications.

* [**Auth0 Delegated Administration Extension**](/extensions/delegated-admin/v3): This powerful and flexible extension allows you to customize a user administration experience.  You can tailor this extension so that you can allow your customer admins to log in and allow them to only see and manage users within their organization.

::: panel Best practice
If you are providing your own way for an administrator to manage users, you should only allow administrators to send users a change password link through email rather than allowing administrators to set passwords directly. If you must go against this recommendation and allow your administrators to set someone’s password, you should force the user to change their password at their next login so that only they know the password (and not an administrator as well).
:::

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

## Multiple Organization Architecture (Multitenancy)

<%= include('../../_includes/_multitenancy.md', { platform: 'b2b' }) %>

## Keep reading

<%= include('../../_includes/_keep-reading.md', { platform: 'b2b', self: 'profile-mgmt' }) %>

