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
| `user.app_metadata` | object | Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups. For more info, see [Metadata](/metadata). |
| `user.blocked` | boolean | Indicates whether the user has been blocked. Only exists if `true`. |
| `user.created_at` | date time | Timestamp indicating when the user profile was first created. |
| `user.email` | text | (unique) The user's email address. |
| `user.email_verified` | boolean | Indicates whether the user has verified their email address. |
| `user.family_name` | text | The user's family name. |
| `user.given_name` | text | The user's given name. |
| `user.identities` | array (object) |  <%= include('../_includes/_user-prop-identities.md') %> |
| `user.last_ip`       | text | IP address associated with the user's last login. |
| `user.last_login`    | date time | Timestamp indicating when the user last logged in. If a user is blocked and logs in, the blocked session updates `last_login`. If you are using this property from inside a [Rule](/rules) using the `user` object, its value will be associated with the login that triggered the rule; this is because rules execute after login. |
| `user.last_password_reset` | date time | Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. |
| `user.logins_count` | integer | Number of times the user has logged in. If a user is blocked and logs in, the blocked session is counted in `logins_count`. |
| `user.multifactor` | array (text) | List of multi-factor providers with which the user is enrolled. |
| `user.name` | text | The user's full name. |
| `user.nickname` | text | The user's nickname. |
| `user.phone_number` | text  | The user's phone number. Only valid for users with SMS connections. |
| `user.phone_verified` | boolean | Indicates whether the user has been verified their phone number. Only valid for users with SMS connections. |
| `user.picture` | text | URL pointing to [the user's profile picture](/user-profile/user-picture). |
| `user.updated_at` | date time | Timestamp indicating when the user's profile was last updated/modified. Changes to `last_login` are considered updates, so most of the time, `updated_at` will match `last_login`. |
| `user.user_id` | text | (unique) The user's unique identifier. |
| `user.user_metadata` | object | Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. For more info, see [Metadata](/metadata). |
| `user.username` | text | (unique) The user's username. |
