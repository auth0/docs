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

| | |
|-|-|
| `user.app_metadata` | Custom fields storing information about a user. These attributes contain information that influences the user's access. For more info see [Metadata](/metadata). |
| `user.blocked` | Boolean value (`true`/`false`) indicating if the user has been blocked. |
| `user.created_at` | The date when the user was created.
| `user.email` | (unique) The user's email address. |
| `user.email_verified` | Boolean value (`true`/`false`) indicating if the user has verified their email address. |
| `user.identities` | <%= include('../_includes/_user-prop-identities.md') %> |
| `user.multifactor` | Array of the user's enrolled multi-factor providers. |
| `user.last_ip` | IP address associated with the user's last login. |
| `user.last_login` | Timestamp of when the user last logged in. |
| `user.logins_count` | Number of times the user has logged in. |
| `user.name` | The user's name. |
| `user.nickname` | The user's nickname. |
| `user.last_password_reset` | Last time the password was reset or changed. |
| `user.password_set_date` | Date when the user's password was set. At user creation, this field exists, but `last_password_reset` does not. If the user has reset their password, this field and `last_password_reset` are identical. |
| `user.phone_number` | The user's phone number. Only valid for users with SMS connections. |
| `user.phone_verified` | Boolean value (`true`/`false`) indicating whether the user's phone number has been verified. Only valid for users with SMS connections. |
| `user.picture` | [The user's profile picture](/user-profile/user-picture). |
| `user.updated_at` | Timestamp of when the user's profile was last updated/modified. |
| `user.user_id` | (unique) The user's unique identifier. |
| `user.user_metadata` | The custom fields storing information about a user. These attributes should contain information about the user that does not impact what they can or cannot access (such as work and home addresses). For more info see [Metadata](/metadata). |
| `user.username` | (unique) The user's username. |