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

After you have set up your [user profiles](/microsites/manage-my-users/manage-users-and-user-profiles), Auth0 can help you define custom user data using the [metadata](/users/concepts/overview-user-metadata) within the user profiles.

## How it works

There are two kinds of metadata in Auth0:

* **`user_metadata`** stores user attributes (such as preferences) that do not impact users' core functionality. An authenticated user can modify this type of data. 
* **`app_metadata`** stores information (such as users' support plans, security roles, and access control groups) that can impact users' core functionality. For example, how an application functions or what the user can access. A user cannot modify this type of data. 

For example, suppose the following metadata is stored for a use with the email address `jane.doe@example.com`:

```json
{
    "emails": "jane.doe@example.com",
    "user_metadata": {
        "hobby": "surfing"
    },
    "app_metadata": {
        "plan": "full"
    }
}
```
To read metadata, simply access the correct property as you would from any JSON object. For example, if you were working with the above example metadata within a Rule or via a call to the Management API, you could reference specific items from the data set as follows:

```js
console.log(user.email); // "jane.doe@example.com"
console.log(user.user_metadata.hobby); // "surfing"
console.log(user.app_metadata.plan); // "full"
```

## Customize and maintain user data

There are a few different ways you can choose to customize the user metadata:

* You can use [Rules](/rules), which execute after a user has been authenticated, to augment the user profile during the authentication transaction, and optionally persist those changes back to Auth0. 

* You can use the `GET/userinfo` endpoint to get a user's `user-metadata`, however you must first write a Rule to [copy metadata properties to the ID Token](/rules/current#copy-user-metadata-to-id-token). 

* If you have a database connection, you can use the [Authentication API](/api/authentication) with the [Signup](/api/authentication?shell#signup) endpoint to set the `user-metadata` for a user. For an example, refer to [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

* You can use the [Management API](/api/management/v2) to create, retrieve, or update both the `user-metadata` and `app-metadata` fields. 

After you have customized the user metadata, there are a couple of ways that Auth0 can help you maintain it.

* Use Auth0 [Lock](https://github.com/auth0/lock) or the [Management API](/metadata/manage-user-metadata-with-apis) depending on how complex your apps are and how much metadata you have.
* Manage and store data related to each of your users (that doesn't originate from identity providers) in the Auth0 data store or your own custom database.

:::: further-reading
::: concepts
  * [User Metadata Overview](/users/concepts/overview-user-metadata)
  * [GDPR Overview](/compliance/overview-gdpr)
:::

::: guides
  * [Search for Users](/users/search/v3)
  * [Manage User Metadata with Auth0 APIs](/users/guides/manage-user-metadata-with-apis)
  * [User Metadata in Rules](/rules/current/metadata-in-rules)
  * [Implement Progressive Profiling](/users/guides/implement-progressive-profiling)
  :::

::: references
  * [User Search Query Syntax](/users/search/v3/query-syntax)
  * [User Data Storage Best Practices](/users/references/user-data-storage-best-practices)
  * [User Search Best Practices](/users/references/search-best-practices)
  * [Lock Library](https://github.com/auth0/lock)
  * [User Import/Export Extension](/extensions/user-import-export)
  * [Authorization Extension](/extensions/authorization-extension/v2)
  * [Auth0 Identity Glossary](https://auth0.com/identity-glossary)
:::
::::

::: whats-next
* [Connect Users to My Identity Platform](/microsites/manage-my-users/connect-users-to-my-identity-platform)
:::