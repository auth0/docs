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

| Property | Data&nbsp;Type        | Description |
|----------|------------------|-------------|
| `user.app_metadata` | object | Custom fields that store info about a user that influences the user's access. For more info, see [Metadata](/metadata). |
| `user.blocked` | boolean | Value (`true`/`false`) indicating if the user has been blocked. |
| `user.created_at` | date&nbsp;time | The date when the user was created.
| `user.email` | text | (unique) The user's email address. |
| `user.email_verified` | boolean | Value (`true`/`false`) indicating if the user has verified their email address. |
| `user.identities` | array&nbsp;(object) |  <%= include('../_includes/_user-prop-identities.md') %> |
| `user.multifactor` | text | List of the user's enrolled multi-factor providers. |
| `user.last_ip` | text | IP address associated with the user's last login. |
| `user.last_login` | date&nbsp;time | Timestamp of when the user last logged in. |
| `user.logins_count` | integer | Number of times the user has logged in. |
| `user.name` | text | The user's name. |
| `user.nickname` | text | The user's nickname. |
| `user.last_password_reset` | date&nbsp;time | Last time the password was reset or changed. |
| `user.password_set_date` | date&nbsp;time | Date when the user's password was set. At user creation, this field exists, but `last_password_reset` does not. If the user has reset their password, this field and `last_password_reset` are identical. |
| `user.phone_number` | text  | The user's phone number. Only valid for users with SMS connections. |
| `user.phone_verified` | boolean | Value (`true`/`false`) indicating whether the user's phone number has been verified. Only valid for users with SMS connections. |
| `user.picture` | text | URL for [the user's profile picture](/user-profile/user-picture). |
| `user.updated_at` | date&nbsp;time | Timestamp of when the user's profile was last updated/modified. |
| `user.user_id` | text | (unique) The user's unique identifier. |
| `user.user_metadata` | object | Custom fields that store info about a user that does not impact what they can or cannot access (such as work and home address). For more info, see [Metadata](/metadata). |
| `user.username` | text | (unique) The user's username. |
