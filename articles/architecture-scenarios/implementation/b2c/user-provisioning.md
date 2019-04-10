---
title: User Provisioning
description: Understand user provisioning functionality and considerations for your B2C implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-migration
    - custom-db
    - universal-login
    - user-profiles
contentType: concept
useCase:
  - user-provisioning
  - store-user-data
---
# User Provisioning

User provisioning is the process of adding users to your system. When you define your user provisioning process, you'll determine:

* How you will store your users' profiles
* How you will migrate existing users to your new system
* How new users will sign up

In this section, we will walk you through the things you should consider when making these decisions.

## Design considerations

It's important to decide early on how you will provision users, so the decisions you make will influence subsequent implementation choices. Be sure to consider:

* Where you will store user data. Will you be using your own identity data store, or will you be using Auth0's data store?
* Whether you will be migrating legacy user data to Auth0
* Whether you want to allow users to sign up with accounts they already have, such as Facebook or Google

## Store user data

During sign up, Auth0 creates a [user profile](/users/concepts/overview-user-profile) that contains information about the user. You can choose to store the user information in Auth0's data store or your own. 

::: panel Best Practice
For information on the best ways to store your user data, see [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices). 
:::

### Use your own identity data store

If you want to use your own identity store, perhaps because you’ve got applications which you aren’t ready to migrate or can’t be migrated, use Auth0’s [Database Connections](/connections/database/custom-db) to make a connection to an existing identity store. 

### Use Auth0's identity data store

Auth0 provides identity data storage that you can use to store and manage your users' credentials. You can also migrate legacy data to Auth0 using Auth0's user migration tools. 

## User migration

If you decide to use Auth0, you can [migrate users](/users/concepts/overview-user-migration) in one of two ways: 

* With bulk migration to bring all your data at once
* With progressive automatic migration to bring your data over time

Keep in mind that there are multiple approaches to user migration - you are not obligated to choose only one option. For example, you might opt for a two-phased approach to migration, beginning with automatic migration and following it up with bulk migration for the remaining users. See [User Migration Scenarios](/users/references/user-migration-scenarios) for additional options.

### Bulk migration

There are two tools you can use when migrating users in bulk:

* The Management API
* The User Import/Export Extension

In most cases, we recommend that you use the [Management API](/users/concepts/overview-user-migration#bulk-user-imports-with-the-management-api), since this option provides you with more flexibility and control. We only recommend the [User Import/Export extension](/users/concepts/overview-user-migration#migrate-users-with-the-user-import-export-extension) in simple cases, such as the movement of a few users.

Please note that your users will need to reset their passwords once you've migrated their accounts to Auth0 using one of the bulk migration processes.

### Automatic migration

[Automatic migration](/users/guides/configure-automatic-migration) allows users to be migrated incrementally. Users whose accounts are migrated to Auth0 using this method will not need to reset their passwords afterward. 

::: panel Best Practice
<%= include('../../_includes/_rate-limit-policy.md') %>
:::

## User sign up

Auth0 uses database connections to store the user ID, password, and username collected from new users during the sign-up process. You can configure the database connection policies governing things such as minimum username length or password strength and complexity using the Auth0 Dashboard. 

::: panel Best Practice
Auth0 recommends using a web-based workflow featuring [Universal Login](/universal-login) for signups due to the functionality and security offered.

If it doesn't meet your needs, we also have libraries that can be embedded in your application, such as [Lock](/libraries) (a premade login widget) and Auth0.js (a library with which you can build your own login UI). For a comparison of the capabilities, see [Lock vs. a Custom UI](/libraries/when-to-use-lock).
:::

## Keep reading

* [Architecture](/architecture-scenarios/implementation/b2c/architecture)
* [Authentication](/architecture-scenarios/implementation/b2c/authentication)
* [Branding](/architecture-scenarios/implementation/b2c/branding)
* [User Profile Management](/architecture-scenarios/implementation/b2c/user-profile-mgmt)
* [User Authorization](/architecture-scenarios/implementation/b2c/user-authorization)
* [User Logout](/architecture-scenarios/implementation/b2c/user-logout)
