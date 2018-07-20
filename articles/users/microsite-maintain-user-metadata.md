---
title: Maintain User Metadata
description: Learn about Auth0 features for maintaining user metadata and get links to all the related documents.
contentType: concept
template: microsite
topics: users
useCase: manage-users
---
::: full-panel
# Overview
You can manage and store data related to each of your users (that doesn't originate from identity providers) in the Auth0 data store or your own custom database. There are two kinds of metadata:

* `user_metadata`: stores user attributes (such as preferences) that do not impact users' core functionality. An authenticated user can modify this type of data. 
* `app_metadata`: stores information (such as users' support plans, security roles, and access control groups) that can impact users' core functionality. For example, how an application functions or what the user can access. A user cannot modify this type of data. 

You can search the user metadata name fields and if you have a paid subscription, you can search the app metadata fields. 

Manage user metadata using Auth0 rules, the Lock widget, or APIs, depending on your need.

* **Rules** are JavaScript functions executed as part of the Auth0 authentication process (prior to authorization). Using rules, you can read, create, or update user metadata which, in turn, affect the results of the authorization process. For more information and examples, refer to [User Metadata in Rules](/rules/current/metadata-in-rules).

* Use the **Lock** widget to add new items to user metadata and read user metadata after authentication. For more information, refer to the [Lock Reference Docs](/libraries#lock).

* When you use the **Authentication API**, you can use the Signup endpoint with a database connection, to set the user metadata for a user. You can also use the Management API to retrieve, create, or update both the user metadata and app metadata. For more information and examples, refer to [Use Auth0 APIs to Manage Metadata](/metadata/apis). 

Other ways to manipulate user metadata include:

* Merge metadata
* Delete metadata
* Import/Export metadata
* Blacklist metadata
:::

::: full-panel
# Learn More

The documents listed below will show you how to perform all these tasks as well as provide you with high-level conceptual and reference information. 
:::

::: half-panel
## Tutorials

:::

::: half-panel
## How-tos
* [Read, Create or Edit Metadata](/metadata#how-to-read-create-or-edit-metadata)
* [Use Rules to Manage Metadata](/rules/current/metadata-in-rules)
* [Use Lock to Manage Metadata](/metadata#using-lock-to-manage-metadata)
* [Use Auth0 APIs to Manage Metadata](/metadata/apis)
* [User Import/Export Extension](/extensions/user-import-export)
* [Search for Users](/search/v3)
* [Blacklist User Attributes](/security/blacklisting-attributes)
:::

::: half-panel
## Concepts
* [Metadata Overview](/metadata/overview-metadata)
* [GDPR Overview](/compliance/overview-gdpr)
:::

::: half-panel
## References
* [Metadata Field Name Rules](/metadata/metadata-field-name-rules)
* [Metadata Restrictions](/metadata#metadata-restrictions)
* [Metadata and Custom Databases](/metadata#metadata-and-custom-databases)
* [Lock Library](https://github.com/auth0/lock)
* [Lock Reference Docs](/libraries#lock)
* [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
* [Identity Providers Supported](/connections/identity-providers-supported)
* [User Search Query Syntax](/search/v3/query-syntax)
* [User Search Best Practices](/user-profile/user-search-best-practices)
* [User Data Storage Best Practices](/user-profile/user-data-storage-best-practices)
:::

::: full-panel
# What's Next

* [Manage Users and User Profiles](microsite-manage-users-and-user-profiles)
* [Manage User Metadata](microsite-manage-user-metadata)
:::
