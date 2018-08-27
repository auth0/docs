---
title: Manage Users and User Profiles
description: Now that you've added login to your app, granted Access Tokens and protected your API, it's time to manage your users and their identity information.
contentType: concept
template: microsite
topics: users
useCase: manage-users
---
::: full-panel
# Overview

Auth0 provides the user profile to an app once authentication is complete and control is returned to the app. At a low level, this can be accomplished using one of the application [protocols](/protocols) supported by Auth0, however, most developers prefer to leverage the Auth0 SDKs.

In order to authenticate a user and get their consent to retrieve profile information with Auth0, your application uses redirects. A high-level description of the flow is the following:

1. Your application redirects the user to the login page hosted by Auth0.
2. Auth0 authenticates the user using one of the options you have enabled (username/password, login with social media, etc). The first time the user goes through this flow, or if the required permissions change, a consent page will be shown where the required permissions are listed (for example, retrieve profile information).
3. Auth0 redirects the user back to the application (to a preconfigured URL that you specify earlier).

You can connect users to your apps using popular social media providers like Facebook and Twitter. Or, if your apps are within an enterprise, use SD, LDAP, SAML and more to authenticate users. You can create connections that don't require your users to remember passwords. You can even specify which users have access to which apps. 

## User Profiles

Auth0 user profiles contain the set of attributes that contain specific information about a user. The user profile typically contains information like the user's name, email address, contact information, and so on. The user profile attributes can come from many places. Attributes may be returned by the authenticating service (such as Facebook), as well as from custom databases and web services. Auth0 refers to all user profile attribute sources as **connections** because Auth0 connects to them to authenticate the user. Each connection may return a set of attributes about the user, and each provider uses different names for the same attribute, such as **surname**, **last name**, and **family name**. To handle the differences, Auth0 provides a [Normalized User Profile](/user-profile/normalized/auth0) which returns a basic set of information using specific attribute names.

You can also store custom attributes such as users' favorite color or phone number. Auth0 provides a [JS widget](/https://github.com/auth0-community/auth0-editprofile-widget) that allows the user to update their profile information. 

Auth0 caches the user profile received from a connection prior to passing it on to the calling application. This cache is stored in the Auth0 database. The information in the cache that originates from a connection is refreshed each time the user authenticates. The user profile is cached for several reasons. First, caching allows you the option of implementing [Single Sign-On](/sso) at the Auth0 layer to avoid going to the connection for every request. Additionally, this provides resilience if a connection is temporarily unavailable. You delete the users' cached profile information using the Dashboard or the Management API. 

## User Management Tasks

You can modify information contained in a user profile in a number of ways. 

* **Scopes**: The authentication flow supported by Auth0 includes an optional parameter that allows you to specify a scope which controls the user profile information included in the ID Token (JWT).
* **Dashboard**: The Dashboard allows you to manually edit portions of the user profile for a particular user. You can alter `user_metadata` and `app_metadata` portions of the user profile. 
* **Management API**: Use the Auth0 Management API to read, update, and delete user profiles stored in the Auth0 database. 

::: note
With both the Dashboard and the Management API, you **cannot** alter data sourced from connections such as Facebook or Active Directory. 
:::

Use the Dashboard and the Management API to complete the following tasks:
   * Create users
   * Search users
   * View users
   * Delete users
   * Block and unblock users
   * Change user pictures
   * Change user passwords
   * Fix breached passwords
   * Import/Export users

You can also choose to impersonate users to view how they will interact with your interface and you can use progressive profiling.

If you want to use a custom database as the connection, you must write scripts to implement lifecycle events such as create, login, verify, delete, and change password. Auth0 provides templates for these scripts, which you can modify for your particular database and schema. If you need to add additional attributes to the user profile, Auth0 provides Rules to allow you augment the user profile. Rules execute after the user has been authenticated. Auth0 provides several example rules to achieve certain results. 
:::

::: full-panel
# Learn More About Managing Users and User Profiles

The documents listed below will show you how to perform all these tasks as well as provide you with high-level conceptual and reference information. 
:::

::: half-panel
## Tutorials
* link
* link
* link
:::

::: half-panel
## How-tos
* [Search for Users](/search/v3)
* [Create Users Using the Dashboard](/dashboard/create-users)
* [Manage Users Using the Management API](/user-profile/manage-users-using-the-management-api)
* [Update User Profiles Using Your Database](/user-profile/update-user-profiles-using-your-database)
* [View User Profiles](/user-profile/view-users)
* [Delete Users](/user-profile/delete-users)
* [Change User Pictures](/user-profile/change-user-pictures)
* [Change User Passwords](/connections/database/password-change)
* [Get User Information with Unbounce Landing Pages](get-user-information-with-unbounce-landing-pages)
* [Redirect Users After Login](redirect-users-after-login)
* [Fix Breached Passwords](/anomaly-detection/fix-breached-passwords)
* [Block and Unblock Users](/user-profile/block-and-unblock-users)
* [Impersonate Users Using the Dashboard](/user-profile/impersonate-users-using-the-dashboard)
* [Impersonate Users Using the Impersonation API](/user-profile/impersonate-users-using-the-impersonation-api)
* [User Import/Export Extension](/extensions/user-import-export)
* [Authorization Extension](/extensions/authorization-extension/v2)
* [Delegated Administration Extension](/extensions/delegated-admin/v3)
:::

::: half-panel
## Concepts
* [User Profile Overview](/user-profile/overview-user-profile)
* [Metadata Overview](/metadata/overview-metadata)
* [Auth0 Normalized User Profile](/user-profile/normalized/auth0)
* [User Profiles Returned from OIDC-compliant Pipelnes](/user-profile/normalized/oidc)
* [Progressive Profiling](/user-profile/progressive-profiling)
* [GDPR Overview](/compliance/overview-gdpr)
:::

::: half-panel
## References
* [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
* [Password Security Tips](/anomaly-detection/password-security-tips)
* [Identity Providers Supported](/connections/identity-providers-supported)
* [User Search Query Syntax](/search/v3/query-syntax)
* [Metadata Field Name Rules](/metadata/metadata-field-name-rules)
* [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
* [User Profile Structure](/user-profile/user-profile-structure)
* [User Search Best Practices](/user-profile/user-search-best-practices)
:::

::: full-panel
# What's Next
* [Connect Users to Your Identity Platform](microsite-connect-users-to-your-identity-platform)
* [Manage User Metadata](microsite-manage-user-metadata)
:::