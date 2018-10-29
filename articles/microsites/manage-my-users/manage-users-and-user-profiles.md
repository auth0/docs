---
title: Manage Users and User Profiles
description: Everything you need to know about managing users and user profiles
template: microsite
---

Auth0 creates [user profiles](/user-profile/overview-user-profile) that contain specific information about users such as name, email address, contact information, and so on. 

## Where does user profile information come from?

Auth0 gets user profile attributes from authenticating services (such as [Google or Facebook](/connections/identity-providers-supported)), your custom databases, or web services. You can also store custom attributes such as users' favorite color or phone number.

Auth0 refers to all user profile attribute sources as **connections** because Auth0 "connects" to them to authenticate the user. Each connection may return a set of attributes about the user, and it's possible that each provider uses different names for the same attribute, such as surname, last name, and family name. To handle such differences, Auth0 provides a Normalized User Profile,  which returns a basic set of information using specific attribute names.

Auth0 caches the user profile received from a connection prior to passing it on to your application. This cache is stored in the Auth0 database. The information in the cache that originates from a connection is refreshed each time the user authenticates. 

## Can users add information to their own profiles?

Auth0 provides a [JS widget](https://github.com/auth0-community/auth0-editprofile-widget) that you can use to allow users to update their own profile information.

## What tools can help me manage my user information?

Auth0 provides tools to help you manage user identities, including adding or removing users, modifying user profiles and authorization attributes, and identifying root-cause login issues in minutes with a simple, intuitive and powerful web interface. 

You can modify information contained in a user profile in a number of ways.

* **Dashboard**: Edit the user_metadata and app_metadata portions of the user profile using the Dashboard.
* **Management API**: Read, update, and delete user profiles stored in the Auth0 database by making the appropriate calls to the Management API.

More specifically, you can use the Dashboard and the Management API to complete tasks like the following:

* [Manage Users Using the Management API](/user-profile/manage-users-using-the-management-api)
* [Create users](/dashboard/create-users)
* [Search users](/search/v3)
* [View users](/user-profile/view-users)
* [Delete users](/user-profile/delete-users)
* [Block and unblock users](/user-profile/block-and-unblock-users)
* [Change user pictures](/user-profile/change-user-pictures)
* [Change user passwords](/connections/database/password-change)
* [Fix Breached Passwords](/anomaly-detection/breached-passwords)
* [Import/Export users](/extensions/user-import-export)

## Can I customize user profiles?

If you need to [add additional attributes](/microsites/manage-my-users/define-maintain-custom-user-data) to the user profile, Auth0 provides rules to allow you to augment the user profiles. Rules execute after the user has been authenticated. Auth0 provides several example rules to achieve certain results.

## Can I use my own database as a connection?

If you want to [use your own database](/user-profile/update-user-profiles-using-your-database) as the connection, you can write scripts to implement lifecycle events such as create, login, verify, delete, and password change. Auth0 provides templates for these scripts, which you can modify for your particular database and schema.

:::: further-reading
::: concepts
  * [User Profile Overview](/user-profile/overview-user-profile)
  * [Normalized User Profile](/user-profile/normalized/auth0)
  * [User Profiles Returned from OIDC-compliant Pipelnes](/user-profile/normalized/oidc)
  * [Progressive Profiling](/user-profile/progressive-profiling)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Search for Users](/search/v3)
  * [View User Profiles](/user-profile/view-users)
  * [Update User Profiles Using Your Database](/user-profile/update-user-profiles-using-your-database)
  * [Create Users Using the Dashboard](/dashboard/create-users)
  * [Manage Users Using the Management API](/user-profile/manage-users-using-the-management-api)
  * [Delete Users](/user-profile/delete-users)
  * [Change User Pictures](/user-profile/change-user-pictures)
  * [Change User Passwords](/connections/database/password-change)
  * [Get User Information with Unbounce Landing Pages](get-user-information-with-unbounce-landing-pages)
  * [Redirect Users After Login](redirect-users-after-login)
  * [Fix Breached Passwords](/anomaly-detection/fix-breached-passwords)
  * [Block and Unblock Users](/user-profile/block-and-unblock-users)
  * [User Import/Export Extension](/extensions/user-import-export)
  * [Authorization Extension](/extensions/authorization-extension/v2)
  * [Fix Breached Passwords](/anomaly-detection/breached-passwords)
:::

::: references
  * [User Profile Structure](/user-profile/user-profile-structure)
  * [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
  * [User Search Best Practices](/user-profile/user-search-best-practices)
  * [User Search Query Syntax](/search/v3/query-syntax)
  * [Password Security Tips](/anomaly-detection/password-security-tips)
  * [Identity Providers Supported](/connections/identity-providers-supported)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: whats-next

* [Define and Maintain Custom User Data](/microsites/manage-my-users/define-maintain-custom-user-data)
* [Connect Users to my Identity Platform](/microsites/manage-my-users/connect-users-to-my-identity-platform)
:::