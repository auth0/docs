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

User provisioning defines how users will be added to your system. This part of the implementation determines where you will store your users' profile information, how you will migrate existing users, and how your users will sign up. 

## Design considerations

It is important to decide early in your implementation planning how you want users added. The decisions you make influence many other implementation choices.

The factors to consider are: 

1. Where to store your user data, in your own identity data store or in Auth's data store?
2. If you have legacy user data, do you want to migrate it to Auth0?
3. Do you want your users to sign up with their existing accounts like Facebook or Google? 

## Identity data storage

During sign up, Auth0 creates a [user profile](/users/concepts/overview-user-profile) that contains information about the user’s account. You can choose to store the user information in Auth0's data store or your own. 

### Use your own identity data store

If you want to use your own identity store, perhaps because you’ve got applications which you aren’t ready to migrate or can’t be migrated, use Auth0’s [Database Connections](/connections/database/custom-db) to proxy an existing identity store. 

### Use Auth0 as the identity data store

Auth0 provides identity data storage to help you manage the burden of storing user credentials safely and securely. If you have a legacy identity store that you would like Auth0 to host, you can use Auth0’s user migration capabilities. 

## User migration

If you decide to use Auth0 instead of your own identity store, you can [migrate users](/users/concepts/overview-user-migration) with bulk migration or progressively with automatic migration. You can also choose a two-phased approach to user migration, using automatic migration first, then using bulk migration for the users that remain. For other scenarios, see [User Migration Scenarios](/users/references/user-migration-scenarios).

### Bulk migration

Auth0 recommends using the [Management API](/users/concepts/overview-user-migration#bulk-user-imports-with-the-management-api) for bulk migration over the [User Import/Export extension](https://auth0.com/docs/users/concepts/overview-user-migration#migrate-users-with-the-user-import-export-extension) in all but the most simple cases. The Management API provides more flexibility and control. 

After the bulk migration is complete, your users will need to reset their passwords.

### Automatic migration

[Automatic migration](/users/guides/configure-automatic-migration) allows users to be migrated incrementally, so they will not need to reset their passowrds. 

## Self Sign Up

Self sign up leverages Auth0 database connections to store the user id, password and username collected during the sign up process. Using the Auth0 Dashboard, you can configure the database connection policies such as minimum username length and password options such as password strength and complexity.  
Auth0 provides a widget, [Lock](/libraries), which provides user interface functionality for sign up out-of-the-box. Lock supports a range of customization for user self sign up as well as login, however if you need to make extensive changes to CSS, Javascript or HTML to achieve your branding goals then you should use a fully customized [Universal Login](/universal-login) instead. For a comparison of the capabilities, see [Lock vs. a Custom UI](/libraries/when-to-use-lock).

## Best practices

* Using a web based workflow with [Auth0 Universal Login](/universal-login) for sign up is considered both industry and Auth0 best practice because it provides optimal functionality and security. 

* Calls to the Management API are subject to [Auth0 Rate Limiting policy](/docs/policies/rate-limits). Auth0 recommends using the [Auth0 SDK](/libraries) for your development environment rather than calling our APIs directly. 
