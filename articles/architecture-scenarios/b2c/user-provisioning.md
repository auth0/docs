---
title: Consumer Identity and Access Management User Provisioning
description: Understand how user provisioning works in your CIAM implementation. 
toc: true
topics:
    - b2c
    - ciam
    - user-provisioning
contentType: concept
useCase:
  - user-provisioning
---
# Consumer Identity and Access Management User Provisioning

User provisioning defines how users will be added to your system.

## Design considerations

It is important to decide early in your implementation planning how you want users added. The decisions you make influence many other implementation choices.

The factors to consider are: 

1. Where you want to store your user data, in your own identity data store or in Auth's data store?
2. If you have legacy user data, do you want to migrate it to Auth0?
3. Do you want your users to sign up with their existing accounts like Facebook or Google? 

## Identity data storage

During sign up, Auth0 creates a [user profile](/users/concepts/overview-user-profile) that contains information about the user’s account. You can choose to store the user information in  Auth0's data store or your own. 

### Use your own identity data store

If you want to use your own identity store, perhaps because you’ve got applications which you aren’t ready to migrate or can’t be migrated, use Auth0’s identity store proxying capability. 

You can configure the Auth0 [Database Connections](/connections/database/custom-db) type to proxy an existing identity store. 

### Use Auth0 as the identity data store

Auth0 provides identity storage to help you manage the burden of storing user credentials safely and securely. If you’ve already got a legacy identity store, you can use Auth0’s user migration capabilities. 

## User migration

In addition to hosting user profiles, Auth0 can proxy your legacy identity store and provide a secure Auth0 hosted replacement using Auth0 Database Connections. If you decide to use Auth0 instead of your legacy identity store then you can [migrate users](/users/concepts/overview-user-migration) either with bulk migration or progressively with automatic migration.  

### Bulk migration

For Bulk Migration Auth0 recommends using the Management API over the User Import/Export extension in all but the most simple cases; the Management API provides greater flexibility and control (see here for further details). With Bulk Migration users will typically need to reset their password once migration is complete.

Calls to the Management API are subject to Auth0 Rate Limiting policy (see here), which implementation must take into consideration. In general, we recommend using the [Auth0 SDK](/libraries) appropriate for your development environment rather than calling our APIs directly. 

### Automatic migration

Automatic Migration is preferred as it allows users to be migrated in a piecemeal fashion, and also allows them to retain their existing password. 

## Self Sign Up

Allowing your customers to use “bring your own identity” is often an attractive proposition, and although we find our customers don’t typically do so from the get-go, when you’re ready to provide it Auth0’s Social Sign Up capability - described here - is exactly what you’ll need.

Self sign up leverages Auth0 Database Connections (described here) for storing the user id, password and (optional) username identity information collected during the sign up process. Via the Auth0 Dashboard, Database Connections provide easy to configure capabilities to allow policies such as minimum username length (here) and the numerous password options (e.g. password strength and complexity) described here.  

Auth0 provided out-of-box widgets, such as Lock (see here), also provide comprehensive user interface functionality for sign up out of the box. These widgets are fully reactive, and with Lock’s feature rich configuration capabilities (here) and comprehensive customization (here) ready to go functionality can be deployed for user self sign up as well as login. Integration with Auth0 Universal Login (https://auth0.com/docs/universal-login) - which provides for Single Sign On (SSO) and security peace of mind - also means that for many customers fully functional self sign can implemented in short order.

## Best practices

* Using a web based workflow with [Auth0 Universal Login](/universal-login) for sign up is considered both industry and Auth0 best practice because it provides optimal functionality and security. 

* Auth0 provided widgets, such as [Lock](https://auth0.com/lock), integrated with database connections and Universal Login to provide self sign up. 

  Though Lock supports a wide range of customization, if you need to make extensive changes to CSS, Javascript or HTML to achieve your branding goals then you should be using fully customized Universal Login instead (click here for details).

* Many customers choose a two-phased approach to user migration, employing Automatic Migration in the first instance in order to migrate as many users as possible, and then performing Bulk Migration for the users that remain. For further details on migration scenarios see the Auth0 documentation located here. 

