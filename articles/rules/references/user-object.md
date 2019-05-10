---
title: User Object in Rules
description: Available properties of the user object in Rules.
toc: true
topics:
  - rules
  - extensibility
contentType: reference
useCase: extensibility-rules
---

# User Object in Rules

The `user` object represents the logged in user, returned by the identity provider.

## Properties of the `user` object

The following properties are available for the `user` object.

| Property | Data Type        | Description |
|----------|------------------|-------------|
| `user.app_metadata` | object | Custom fields that store info about a user that influences the user's access. For more info, see [Metadata](/metadata). |
| `user.blocked` | boolean | Only exists if `true`. Indicates if the user has been blocked. |
| `user.created_at` | datetime | The date when the user was created.
| `user.email` | text | (unique) The user's email address. |
| `user.email_verified` | boolean | `true` or `false` indicating if the user has verified their email address. |
| `user.identities` | array (object) |  <%= include('../_includes/_user-prop-identities.md') %> |
| `user.multifactor` | array (text) | List of the user's enrolled multi-factor providers. |
| `user.name` | text | The user's name. |
| `user.nickname` | text | The user's nickname. |
| `user.last_password_reset` | datetime | Last time the password was reset or changed. |
| `user.phone_number` | text  | The user's phone number. Only valid for users with SMS connections. |
| `user.phone_verified` | boolean | Value (`true`/`false`) indicating whether the user's phone number has been verified. Only valid for users with SMS connections. |
| `user.picture` | text | URL for [the user's profile picture](/user-profile/user-picture). |
| `user.updated_at` | datetime | Timestamp of when the user's profile was last updated/modified. |
| `user.user_id` | text | (unique) The user's unique identifier. |
| `user.user_metadata` | object | Custom fields that store info about a user that does not impact what they can or cannot access (such as work and home address). For more info, see [Metadata](/metadata). |
| `user.username` | text | (unique) The user's username. |
