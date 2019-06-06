---
title: Profile Management
description: Understand user profile management planning considerations for your B2B implementation. 
toc: true
topics:
    - b2b
    - iam
    - user-profiles
contentType: concept
useCase:
  - profile-management
---
# Profile Management

<%= include('../_includes/_profile-mgmt-intro.md') %>

<%= include('../_includes/_warning-user-profiles-across-tenants.md') %>

<%= include('../_includes/_profile-mgmt-design-considerations.md') %>

* How do you provide an administrator from a third-party organization the ability to manage their users?

<%= include('../_includes/_note-rule-override-user-profile.md') %>

If you need to provide a way for your customers to have an administrator that can manage their own users when they are storing those credentials in your system, you can either build something yourself or use an Auth0 Extension. See [Admin portal](#admin-portal) for more information.

## Metadata

<%= include('../_includes/_profile-mgmt-metadata.md') %>

::: warning
<%= include('../_includes/_rate-limit-policy.md') %>
:::

### User metadata

<%= include('../_includes/_profile-mgmt-user-metadata.md') %>

<%= include('../_includes/_bp-user-metadata.md') %>

### App metadata

<%= include('../_includes/_profile-mgmt-app-metadata.md') %>

## Password reset

<%= include('../_includes/_profile-mgmt-password-reset.md') %>

The Auth0 Management API, on the other hand, can be used to [directly change the password](/connections/database/password-change#directly-set-the-new-password) for a user identity defined using a Database Connection type. The Auth0 Management API can be used as part of any self-service profile management implementation, and is also used as part of any [Change Password page customization](/architecture-scenarios/b2b/b2b-branding#change-password-page-customization). 

## Account verification

<%= include('../_includes/_profile-mgmt-account-verification.md') %>

Auth0 provides out-of-box functionality for sending a [verification email](/email/custom#verification-email) to a user's email address as one way of verifying their account. By default, Auth0 is configured to automatically send verification emails for any [Database Connection](/connections/database) identity created (e.g., as part of [self sign-up](/architecture-scenarios/b2b/b2b-provisioning#self-sign-up)). However, Auth0 also provides a [Management API endpoint](/api/v2#!/Tickets/post_email_verification) that can also be used to send verification emails (e.g., in cases where email address validation is not performed by a Social Provider upon user registration). 

## Blocking users 

[Blocking user access](/users/guides/block-and-unblock-users) in Auth0 provides a way to prevent user login to applications under certain conditions. By default, the Auth0 Dashboard provides an out-of-the-box mechanism to give administrators the ability to both block and unblock user access to all applications, and you can implement this functionality via use of the [Auth0 Management API](/api/management/v2#!/Users/patch_users_by_id). Auth0 extensibility can also be used to [disable user access to certain applications](/users/guides/manage-user-access-to-applications) as well as provide more fine-grained [access control](/architecture-scenarios/b2b/b2b-authorization).

In addition, the Auth0 Management API provides you with the ability to [unblock](/api/management/v2#!/User_Blocks/delete_user_blocks_by_id) users disabled due to excessive use of incorrect credentials.  

## Admin portal

An admin portal is an application where you can create new users, edit a user’s profile, see activity about a user, etc.  This application should be accessible by administrators only.  Though Auth0 provides its management dashboard, it is not advised to give access to the management dashboard to many people as their are a lot of ways someone can unintentionally break your Auth0 tenant.  Instead, Auth0 provides two other options:

* **Auth0 Management API**: With the Management API you can easily construct an application that provides administrators the ability to manage users.  You can either incorporate this into an existing application that already exists for your administrators, or create a new one with a UI that matches your current applications.

* **Auth0 Delegated Administration Extension**: This powerful and flexible extension allows you to customize a user administration experience.  You can tailor this extension so that you can allow your customer admins to log in and allow them to only see and manage user’s within their organization.

::: panel Best practice
If you are providing your own way for an administrator to manage users, you should only allow administrators to send users a change password link through email rather than allowing administrators to set passwords directly. If you must go against this recommendation and allow your administrators to set someone’s password, you should force the user to change their password at their next login so that only they it (and not an administrator as well).
:::

## Linking user accounts 

By default, there is one [user profile](/users/concepts/overview-user-profile) (i.e., one user account) for each user identity. If you enable login from multiple identity providers - via, say, Facebook or Google [social authentication](/architecture-scenarios/b2b/b2b-authentication#social-authentication) as well as via Auth0 [username and password authentication](/architecture-scenarios/b2b/b2b-authentication#username-and-password-authentication) - then each will have a separate user profile. Auth0’s functionality for [linking user accounts](/link-accounts) (a.k.a. account linking) can be used to create one profile for a user, as an aggregate of all their associated identities. 

<%= include('../_includes/_profile-mgmt-linking-user-accounts.md') %>

## De-provisioning

<%= include('../_includes/_profile-mgmt-deprovisioning.md') %>

<%= include('../_includes/_note-gdpr.md') %>

## Planning

<%= include('../_includes/_b2b-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2b/b2b-architecture)
* [Provisioning](/architecture-scenarios/b2b/b2b-provisioning)
* [Authentication](/architecture-scenarios/b2b/b2b-authentication)
* [Branding](/architecture-scenarios/b2b/b2b-branding)
* [Deployment Automation](/architecture-scenarios/b2b/b2b-deployment)
* [Quality Assurance](/architecture-scenarios/b2b/b2b-qa)
* [Authorization](/architecture-scenarios/b2b/b2b-authorization)
* [Logout](/architecture-scenarios/b2b/b2b-logout)
* [Operations](/architecture-scenarios/b2b/b2b-operations)
