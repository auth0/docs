---
title: Define and Maintain Custom User Data
description: An introduction to the concepts and tasks related to how Auth0 helps you manage metadata associated with your users' profile information. 
contentType: microsite
topics:
  - users
  - user-management
  - define-user-data
useCase: manage-users
template: microsite
v2: True
---

# Define and Maintain Custom User Data - DRAFT

After you have set up your [user profiles](/microsites/manage-my-users/manage-users-and-user-profiles), Auth0 can help you define custom user data using the metadata within the user profiles using Rules, the Lock widget, or APIs, depending on your need.

* [Rules](/rules/current/metadata-in-rules) are JavaScript functions executed as part of the Auth0 authentication process (prior to authorization). Using rules, you can read, create, or update user metadata which, in turn, affect the results of the authorization process.
* Use the [Lock widget](https://auth0.com/docs/libraries#lock) to add new items to user metadata and read user metadata after authentication. 
* When you use the **Authentication API**, you can use the Signup endpoint with a database connection, to set the user metadata for a user. 
* You can also use the **Management API** to retrieve, create, or update both the user metadata and app metadata. 

Depending on the method you choose, you can define, read, update, merge and delete metadata using Auth0 [User Profiles](/user-profile/overview-user-profile) in the Auth0 Dashboard. You can also import, export and blacklist metadata.

## What kinds of custom user data can I manage with Auth0?

There are two kinds of metadata in Auth0:

* `user_metadata` stores user attributes (such as preferences) that do not impact users' core functionality. An authenticated user can modify this type of data. 
* `app_metadata` stores information (such as users' support plans, security roles, and access control groups) that can impact users' core functionality. For example, how an application functions or what the user can access. A user cannot modify this type of data. 

::: note
You can search the `user_metadata` name fields and if you have a paid subscription, you can search the `app_metadata` fields. 
:::

## What tools can help me maintain my metadata?

After you have customized the user metadata, there are a couple of ways that Auth0 can help you maintain it.

* You can use Auth0 [Lock](https://github.com/auth0/lock) or the [Management API](/metadata/manage-user-metadata-with-apis) depending on how complex your apps are and how much metadata you have.
* You can manage and store data related to each of your users (that doesn't originate from identity providers) in the Auth0 data store or your own custom database.

:::: further-reading
::: concepts
  * [User Profile Overview](/user-profile/overview-user-profile)
  * [Normalized User Profile](/user-profile/normalized/auth0)
  * [User Profiles Returned from OIDC-compliant Pipelnes](/user-profile/normalized/oidc)
  * [Progressive Profiling](/user-profile/progressive-profiling)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Search for Users](/users/search/v3)
  * [View User Profiles](/user-profile/view-users)
  * [Update User Profiles Using Your Database](/user-profile/update-user-profiles-using-your-database)
  * [Manage User Metadata with Auth0 APIs](/metadata/manage-user-metadata-with-apis)
  * [User Metadata in Rules](/rules/current/metadata-in-rules)
  * [Get User Information with Unbounce Landing Pages](/users/guides/get-user-information-with-unbounce-landing-pages)
  * [Redirect Users After Login](redirect-users-after-login)
  * [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
  * [User Search Best Practices](/users/search/best-practices)
  :::

::: references
  * [User Profile Structure](/users/references/user-profile-structure)
  * [User Search Query Syntax](/users/search/v3/query-syntax)
  * [Identity Providers Supported](/identityproviders)
  * [Lock Library](https://github.com/auth0/lock)
  * [User Import/Export Extension](/extensions/user-import-export)
  * [Authorization Extension](/extensions/authorization-extension/v2)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: whats-next
* [Connect Users to My Identity Platform](/microsites/manage-my-users/connect-users-to-my-identity-platform)
:::