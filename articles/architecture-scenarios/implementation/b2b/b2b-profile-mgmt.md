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

## Organization Admin Portal
An organization admin portal is a portal that allows your administrators to create, modify, and remove organizations. There are multiple activities that need to be done both in your own system and your Auth0 tenant.  This portal will likely need to exist in your own system so it has access to your datastores and configuration.  However, Auth0 provides the [**Auth0 Management API**](/api/management/v2) so that you can incorporate changes to your Auth0 tenant at the same time that you create the changes in your own system.

There are two main approaches that can be taken for creating a new organization.  The one you choose depends highly on your tolerance for how long it would take to deploy a new organization.
* **Live Updates to your Auth0 Tenant**: If you want to be able to create new organizations in real-time, then you will likely want to make the changes directly to your Auth0 tenant using the Auth0 Management API.  This allows the changes to take place in real-time and allow the addition of a new organization to take effect immediately.

::: warning
  Live Updates do come with some things to consider.  There are certain operations that must be done in serial to avoid issues.  Enabling clients on a connection, adding callback URL's to an Application are two examples.  Any operation in the Management API where you must retrieve an entire list and re-submit the entire list with the new value added to it are operations that must be done in serial to avoid two parallel operations overwriting one of the values.
:::

* **Change the Repository and Re-deploy**: If you are taking advantage of the Deploy CLI (or a custom CLI) as part of your [CI/CD pipeline]( /architecture-scenarios/implementation/b2b/b2b-deployment), you may prefer to push your changes directly to your repository and then kickoff a new deployment instead.  This can take a little more time, but it has benefits associated with version history and the ability to backout a change by re-deploying the previous version.

::: panel Best Practice
You may want to have a separate repository just for the items that the organizations need so that you don't have to re-deploy other common components and risk making an error.
:::

## Project Planning Guide

<%= include('../../_includes/_planning.md', { platform: 'b2b' }) %>

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
