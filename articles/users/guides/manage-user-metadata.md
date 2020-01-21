---
description: How to create and update metadata using the Auth0 APIs and Lock and how to work with custom databases.
toc: true
crews: crew-2
topics:
  - metadata
  - apis
  - management-api
contentType: how-to
useCase:
  - manage-users
v2: true
---

# Manage User Metadata

You can create and update metadata using [Rules](/rules/current/metadata-in-rules), the [Authentication API](/api/authentication), the [Management API](/api/management/v2), and the [Lock](/libraries/lock) library.

## Rules

[Rules](/rules) are JavaScript functions executed as part of the Auth0 authentication process (prior to authorization). Using rules, you can read, create, or update user metadata and have such changes affect the results of the authorization process. 

For more information and examples, see [User Metadata in Rules](/rules/current/metadata-in-rules).

## Authentication API

If you have a [custom database connection](/connections/database#using-your-own-user-store), you can use the [Authentication API](/api/authentication) [Signup](/api/authentication?shell#signup) endpoint to set the `user_metadata` for a user. For an example of working with metadata during a custom signup process, see [Custom Signup > Using the API](/libraries/custom-signup#using-the-api).

<%= include('../../_includes/_metadata_on_signup_warning') %>

You can also use the [GET /userinfo endpoint](/api/authentication#get-user-info) to get a user's `user_metadata`, however you must first [write a Rule](/rules#copy-user-metadata-to-id-token) to copy `user_metadata` properties to the ID Token.

## Management API

Use the following [Management API](/api/management/v2) endpoints to view, create, update, and delete the `user_metadata` and `app_metadata` fields.

| **Task** | **Endpoint** | **Scope** | 
| -- | -- | -- |
| View | [`GET /api/v2/user/{id}`](/api/management/v2#!/Users/get_users_by_id) | `read:current_user_metadata` | 
| Create | [`PATCH /api/v2/users/{id}`](/api/management/v2#!/Users/post_users) | `create:current_user_metadata` |
| Update | [`PATCH /api/v2/users/{id}`](/api/management/v2#!/Users/patch_users_by_id) | `update:current_user_metadata` | 
| Delete | [`DELETE /api/v2/users/{id}/multifactor/{provider}`](/api/management/v2#!/Users/delete_multifactor_by_provider) | `delete:current_user_metadata` | 

::: note
The Auth0 Management APIv2 token is required to call the Auth0 Management API. Learn more about [Access Tokens for the Management API](/api/management/v2/tokens) and [Get Access Tokens for SPAs](/api/management/v2/get-access-tokens-for-spas).
:::

## Lock library

You can define, add, read, and update the `user_metadata` using Auth0's [Lock](/libraries/lock) library. For information on adding `user_metadata` on signup, see [Additional Signup Fields](/libraries/lock/v10/customization#additionalsignupfields-array-).

When using Lock, you can read the user's `user_metadata` properties the same way you would for any other user profile property. For example, the following code snippet retrieves the value associated with `user_metadata.hobby` and assigns it to an element on the page:

```js
// Use the accessToken acquired upon authentication to call getUserInfo
lock.getUserInfo(accessToken, function(error, profile) {
  if (!error) {
    document.getElementById('hobby').textContent = profile.user_metadata.hobby;
  }
});
```

## Keep reading

* [Metadata](/users/concepts/overview-user-metadata)
* [Read Metadata](/users/guides/read-metadata)
* [Set Metadata Properties on Creation](/users/guides/set-metadata-properties-on-creation)
* [Update Metadata with the Management API](/users/guides/update-metadata-properties-with-management-api)
* [Metadata Best Practices](/best-practices/metadata-best-practices)
* [User Data Storage Best Practices](/best-practices/user-data-storage-best-practices)
