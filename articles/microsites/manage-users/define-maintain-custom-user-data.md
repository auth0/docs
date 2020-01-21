---
title: Define and Maintain Custom User Data
description: An introduction to how Auth0 helps you manage user metadata and custom profile information 
contentType: microsite
topics:
  - users
  - user-management
  - define-user-data
useCase: manage-users
template: microsite
v2: True
---

After you have set up your [user profiles](/microsites/manage-users/manage-users-and-user-profiles), Auth0 can help you define custom user data using the [metadata](/users/concepts/overview-user-metadata) within the user profiles.

## How it works

There are two kinds of metadata in Auth0:

* **`user_metadata`** stores user attributes (such as preferences) that do not impact users' core functionality. An authenticated user can modify this type of data. 
* **`app_metadata`** stores information (such as users' support plans, security <dfn data-key="role">roles</dfn>, and access control groups) that can impact users' core functionality. For example, how an application functions or what the user can access. A user cannot modify this type of data. 

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

There are a few different ways you can customize the user metadata:

* Use [Rules](/rules), which execute after a user has been authenticated, to augment the user profile during the authentication transaction, and optionally persist those changes back to Auth0. 

* Use the `GET/userinfo` endpoint to get a user's `user-metadata`, however you must first write a Rule to [copy metadata properties to the ID Token](/rules/current#copy-user-metadata-to-id-token). 

* If you have a database connection, use the [Authentication API](/api/authentication) with the [Signup](/api/authentication?shell#signup) endpoint to set the `user-metadata` for a user. For an example, refer to [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

* You can use the [Management API](/api/management/v2) to create, retrieve, or update both the `user-metadata` and `app-metadata` fields. 

After you have customized the user metadata, you can manage and store data related to each of your users that doesn't originate from identity providers in the Auth0 data store or your own custom database.

:::: further-reading
::: concepts
  * [User Management](/users)
  * [User Profiles](/users/concepts/overview-user-profile)
  * [Metadata](/users/concepts/overview-user-metadata)
  * [Normalized User Profiles](/users/normalized/auth0)
:::

::: guides
  * [Manage User Metadata](/users/guides/manage-user-metadata)
  * [User Metadata in Rules](/rules/current/metadata-in-rules)
  :::

::: references
  * [User Data Storage Best Practices](/users/references/user-data-storage-best-practices)
  * [User Data Storage Scenario](/users/references/user-data-storage-scenario)
  * [Authorization Extension](/extensions/authorization-extension/v2)
:::
::::

::: whats-next
* Learn more about the tools availabe to [manage users and user profiles](/microsites/manage-users/manage-users-and-user-profiles).
* If you are building your own API and you want to secure the endpoints using Auth0, see [Protect Your API](/microsites/protect-api/protect-api).
 :::
