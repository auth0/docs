---
description: Learn about working with users in Auth0
topics:
  - users
  - user-management
contentType: concept
useCase: manage-users
v2: true
---

# User Management

Auth0 stores user information for your tenant in a hosted cloud database. [Users](/users/concepts/overview-users) related to your tenant have access to the applications connected to the tenant. User information is stored in a *user profile* and can come from a variety of sources such as identity providers, your own databases, and enterprise connections (Active Directory, SAML, etc.). You can normalize user data that comes from a variety of data sources.

## User profiles

Auth0 [user profiles](/users/concepts/overview-user-profile) contain information about your users such as name and contact information. Auth0 provides a variety of tools to help you manage user profiles such as the Dashboard and the Management API. You can create, search, view, and delete users. You can also define, manage, and store custom user profile attributes such as favorite color or location.

## User metadata

Auth0 allows you to create, manage, and store [metadata](/users/concepts/overview-user-metadata) related to each user that has not come from an external data source. 

## Authorization extension

The [Authorization Extension](/extensions/authorization-extension/v2) provides support for user authorization via Groups, Roles, and Permissions. You can define the expected behavior during the login process, and your configuration settings will be captured in a [rule](/rules) that is executed at runtime.

You can store authorization data like groups, roles, or permissions in the outgoing token issued by Auth0. Your application can then consume this information by inspecting the token and take appropriate actions based on the user's current authorization context. 

## Data storage

Auth0 provides multiple places to [store data](/users/reference/data-store-best-practices) used to authenticate an application's users. 

## User migration

Auth0 supports importing users from external applications using [custom database connections](/users/migrations/automatic), the [Management API](/users/migrations/bulk-import), or the [User Import/Export Extension](/extensions/user-import-export).

## Redirect users

To make your login process as easy-to-use and seamless as possible, you'll need to keep track of where you want to route users inside your application once Auth0 [redirects](/users/guides/redirect-users-after-login) users back to your application after authentication and after they [log out](/logout#redirect-users-after-logout). You can also [redirect users from rules](/rules/current/redirect).

## User search

Learn about how [search](/users/search/v3) works and the best ways to search for users using the Management API.