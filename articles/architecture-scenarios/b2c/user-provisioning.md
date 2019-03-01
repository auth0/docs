---
title: Consumer Identity and Access Management User Provisioning
description: Understand how user provisioning works in your CIAM implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-migration
    - identity-store
contentType: concept
useCase:
  - user-provisioning
---
# Consumer Identity and Access Management User Provisioning

User provisioning is the process of adding users to your system. When you define your user provisioning process, you'll determine:

* How you will store your users' profiles
* How you will migrate existing users to your new system
* How new users will sign up

In this section, we will walk you through the things you should consider when making these decisions.

## Prerequisites

* Complete the [Tenant Architecture](/architecture-scenarios/b2c/tenant-architecture) implementation planning.

## Design considerations

It's important to decide early on how you will provision users, so the decisions you make will influence subsequent implementation choices. Be sure to consider:

* Where you will store user data. Will you be using your own identity data store, or will you be using Auth0's data store?
* Whether you will be migrating legacy user data to Auth0
* Whether you want to allow users to sign up with accounts they already have, such as Facebook or Google

## Store user data

During sign up, Auth0 creates a [user profile](/users/concepts/overview-user-profile) that contains information about the user. You can choose to store the user information in Auth0's data store or your own. 

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

In most cases, we recommend that you use the [Management API](/users/concepts/overview-user-migration#bulk-user-imports-with-the-management-api), since this option provides you with more flexibility and control. We only recommend the [User Import/Export extension](https://auth0.com/docs/users/concepts/overview-user-migration#migrate-users-with-the-user-import-export-extension) in simple cases, such as the movement of a few users.

Please note that your users will need to reset their passwords once you've migrated their accounts to Auth0 using one of the bulk migration processes.

### Automatic migration

[Automatic migration](/users/guides/configure-automatic-migration) allows users to be migrated incrementally. Users whose accounts are migrated to Auth0 using this method will not need to reset their passwords afterward. 

## User sign up

Auth0 uses database connections to store the user ID, password, and username collected from new users during the sign-up process. You can configure the database connection policies governing things such as minimum username length or password strength and complexity using the Auth0 dashboard.  

Auth0 offers [Lock](/libraries), which providers a user interface that includes signup functionality out of the box. Lock supports a some customization to its appearance, but if you would like to make extensive changes to the login widget to achieve your branding goals, we recommend that you use [Universal Login](/universal-login) instead. For a comparison of the capabilities, see [Lock vs. a Custom UI](/libraries/when-to-use-lock).

## Best practices

* For information on the best ways to store your user data, see [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices). 

* Using a web-based workflow featuring [Universal Login](/universal-login) for signups is Auth0's recommendation due to the functionality and security offered.

<%= include('./_includes/_rate-limit-policy.md') %>

## Implementation checklist

| Step Number | Description | Details | Comments |
| - | - | - | - |
| 1. | Determine data storage location |  | Your data store or Auth0's |
| 2. | Migrate user data | Bulk migration and/or automatic migration | Management API or User Import/Export Extension |
| 3. | Determine Sign Up functionality |  | Universal Login or Lock |

## Next steps

* User Authentication
* User Authorization