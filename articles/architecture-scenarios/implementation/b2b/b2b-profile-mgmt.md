---
title: Profile Management
description: Understand user profile management planning considerations for your B2B implementation. 
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

An admin portal is an application where you can create new users, edit a user’s profile, see activity about a user, etc.  This application should be accessible by administrators only.  Though Auth0 provides its management dashboard, it is not advised to give access to the management dashboard to many people as their are a lot of ways someone can unintentionally break your Auth0 tenant.  Instead, Auth0 provides two other options:

* [**Auth0 Management API**](/api/management/v2): With the Management API you can easily construct an application that provides administrators the ability to manage users.  You can either incorporate this into an existing application that already exists for your administrators, or create a new one with a UI that matches your current applications.

* [**Auth0 Delegated Administration Extension**](/extensions/delegated-admin/v3): This powerful and flexible extension allows you to customize a user administration experience.  You can tailor this extension so that you can allow your customer admins to log in and allow them to only see and manage user’s within their organization.

::: panel Best practice
If you are providing your own way for an administrator to manage users, you should only allow administrators to send users a change password link through email rather than allowing administrators to set passwords directly. If you must go against this recommendation and allow your administrators to set someone’s password, you should force the user to change their password at their next login so that only they it (and not an administrator as well).
:::

## Planning

To help you with planning your implementation, we've put together some [planning guidance](https://drive.google.com/a/auth0.com/file/d/1lQU-uPTfwEi58WJMKL2azUhZhvy9h1IU/view?usp=sharing) that details our recommended strategies.

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/implementation/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/implementation/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/implementation/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/implementation/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/implementation/b2b/b2b-qa)
* [Authorization](/architecture-scenarios/implementation/b2b/b2b-authorization)
* [Logout](/architecture-scenarios/implementation/b2b/b2b-logout)
* [Operations](/architecture-scenarios/implementation/b2b/b2b-operations)
