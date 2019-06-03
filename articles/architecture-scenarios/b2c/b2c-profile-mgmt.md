---
title: Profile Management
description: Understand user profile management planning considerations for your B2C implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-profiles
contentType: concept
useCase:
  - profile-management
---
# Profile Management

<%= include('../_includes/_profile-mgmt-intro.md') %>

<%= include('../_includes/_warning-user-profiles-across-tenants.md') %>

## Design considerations

<%= include('../_includes/_profile-mgmt-design-considerations.md') %>

<%= include('../_includes/_note-rule-override-user-profile.md') %>

<%= include('../_includes/_profile-mgmt-design-considerations2.md') %>

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

The Auth0 Management API, on the other hand, can be used to [directly change the password](/connections/database/password-change#directly-set-the-new-password) for a user identity defined using a Database Connection type. The Auth0 Management API can be used as part of any self-service profile management implementation, and is also used as part of any [Change Password page customization](/architecture-scenarios/b2c/b2c-branding#change-password-page-customization). 

## Account verification

<%= include('../_includes/_profile-mgmt-accouint-verification.md') %>

Auth0 provides out-of-box functionality for sending a [verification email](/email/custom#verification-email) to a user's email address as one way of verifying their account. By default, Auth0 is configured to automatically send verification emails for any [Database Connection](/connections/database) identity created (e.g., as part of [self sign-up](/architecture-scenarios/b2c/b2c-provisioning#self-sign-up)). However, Auth0 also provides a [Management API endpoint](/api/v2#!/Tickets/post_email_verification) that can also be used to send verification emails (e.g., in cases where email address validation is not performed by a Social Provider upon user registration). 

## Blocking users 

[Blocking user access](/users/guides/block-and-unblock-users) in Auth0 provides a way to prevent user login to applications under certain conditions. By default, the Auth0 Dashboard provides an out-of-the-box mechanism to give administrators the ability to both block and unblock user access to all applications, and you can implement this functionality via use of the [Auth0 Management API](/api/management/v2#!/Users/patch_users_by_id). Auth0 extensibility can also be used to [disable user access to certain applications](/users/guides/manage-user-access-to-applications) as well as provide more fine-grained [access control](/architecture-scenarios/b2c/b2c-authorization).

In addition, the Auth0 Management API provides you with the ability to [unblock](/api/management/v2#!/User_Blocks/delete_user_blocks_by_id) users disabled due to excessive use of incorrect credentials.  

## Linking user accounts 

By default, there is one [user profile](/users/concepts/overview-user-profile) (i.e., one user account) for each user identity. If you enable login from multiple identity providers--via, say, Facebook or Google [social authentication](/architecture-scenarios/b2c/b2c-authentication#social-authentication) as well as via Auth0 [username and password authentication](/architecture-scenarios/b2c/b2c-authentication#username-and-password-authentication) --then each will have a separate user profile. Auth0’s functionality for [linking user accounts](/link-accounts) (a.k.a. account linking) can be used to create one profile for a user, as an aggregate of all their associated identities. 

<%= include('../_includes/_profile-mgmt-linking-user-accounts.md') %>

## De-provisioning

<%= include('../_includes/_profile-mgmt-deprovisioning.md') %>

<%= include('../_includes/_note-gdpr.md') %>

## Planning

<%= include('../_includes/_b2c-planning.md') %>

## Keep reading

* [Architecture](/architecture-scenarios/b2c/b2c-architecture)
* [Provisioning](/architecture-scenarios/b2c/b2c-provisioning)
* [Authentication](/architecture-scenarios/b2c/b2c-authentication)
* [Branding](/architecture-scenarios/b2c/b2c-branding)
* [Deployment Automation](/architecture-scenarios/b2c/b2c-deployment)
* [Quality Assurance](/architecture-scenarios/b2c/b2c-qa)
* [Authorization](/architecture-scenarios/b2c/b2c-authorization)
* [Logout](/architecture-scenarios/b2c/b2c-logout)
* [Operations](/architecture-scenarios/b2c/b2c-operations)
