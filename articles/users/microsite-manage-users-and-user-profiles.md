---
title: Manage Users and User Profiles
description: Now that you've added login to your app, granted Access Tokens and protected your API, it's time to manage your users and their identity information.
contentType: concept
template: microsite
topics: users
useCase: manage-users
---
::: full-panel
## Overview

In order to authenticate a user and get their consent to retrieve profile information with Auth0, your application uses redirects. A high-level description of the flow is the following:

1. Your application redirects the user to the login page, hosted by Auth0.
2. Auth0 authenticates the user using one of the options you have enabled (username/password, login with social media, etc). The first time the user goes through this flow, or if the required permissions change, a consent page will be shown where the required permissions are listed (for example, retrieve profile information).
3. Auth0 redirects the user back to the application (to a preconfigured URL that you specify earlier).

Connect users to your apps using popular social media providers like Facebook and Twitter. Or, if your apps are within an enterprise, use SD, LDAP, SAML and more to authenticate users. You can create connections that don't require your users to remember passwords. You can even specify which users have access to which apps. 

You can manage users with the Auth0 Dashboard or Management API. These are all the tasks you can do using these tools:
   * Create users
   * Search users
   * View users
   * Delete users
   * Block and unblock users
   * Change user pictures
   * Change user passwords
   * Fix breached passwords

You can also choose to impersonate users to view how they will interact with your interface and you can customize your user profiles by using progressive profiling.
:::

::: full-panel
## Learn More About Managing Users and User Profiles

The documents listed below will show you how to perform all these tasks as well as provide you with high-level conceptual and reference information. 

* Understand the various aspects of managing users and user profiles by following our **Tutorials**. These are lessons, often accompanied by a sample implementation, meant to show what you can do with various Auth0 features.
* Follow step-by-step instructions to accomplish specific tasks (like search for a the user profile or block a user) with our **How-tos**.
* Take a dive into the world of how Auth0 helps you manage users and identity in general, by reading our **Concepts**. Here you can learn more about the standards we use, the best practices to follow and all things security.
* Already know what to do and just need a reference guide to start coding? Check out our **References** section for API endpoints and library methods.
:::

::: half-panel
## Tutorials
* link
* link
* link
:::

::: half-panel
## How-tos
* [Fix Breached Passwords](/anomaly-detection/fix-breached-passwords)
* [Create Users Using the Dashboard](/dashboard/create-users)
* [View User Profiles](/user-profile/view-users)
* [Update User Profiles Using Your Database](/user-profile/update-user-profiles-using-your-database)
* [Impersonate Users Using the Dashboard](/user-profile/impersonate-users-using-the-dashboard)
* [Impersonate Users Using the Impersonation API](/user-profile/impersonate-users-using-the-impersonation-api)
* [Block and Unblock Users](/user-profile/block-and-unblock-users)
* [Delete Users](/user-profile/delete-users)
* [Manage Users Using the Management API](/user-profile/manage-users-using-the-management-api)
* [Manage User Access to Applications](/user-profile/manage-user-access-to-applications)
* [Change User Pictures](/user-profile/change-user-pictures)
* [Change User Passwords](/connections/database/password-change)
* [Get User Information with Unbounce Landing Pages](get-user-information-with-unbounce-landing-pages)
* [Redirect Users After Login](redirect-users-after-login)
:::

::: half-panel
## Concepts
* [User Profile Overview](/user-profile/overview-user-profile)
* [Metadata Overview](/metadata/overview-metadata)
* [Progressive Profiling](/user-profile/progressive-profiling)
* [GDPR Overview](/compliance/overview-gdpr)
:::

::: half-panel
## References
* [Password Security Tips](/anomaly-detection/password-security-tips)
* [Identity Providers Supported](/connections/identity-providers-supported)
* [Metadata Field Name Rules](/metadata/metadata-field-name-rules)
* [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
* [User Profile Structure](/user-profile/user-profile-structure)
* [User Search Best Practices](/user-profile/user-search-best-practices)
* [Authorization Extensions](/extensions/authorization-extension/v2/index)
:::

::: full-panel
## What's Next

* [Connect Users to Your Identity Platform](microsite-connect-users-to-your-identity-platform)
* [Manage User Metadata](microsite-manage-user-metadata)
:::