---
description: Lists the attributes that are available on the Auth0 user profile
topics:
    - users
    - user-management
    - user-profiles
    - user-profile-structure
contentType: reference
useCase: manage-users
v2: true
---

# User Profile Structure

Auth0's normalized user profile consists of a few different components: 

* **Details**: Core User Profile object, which contains basic info, such as name, email, and timestamp of the user's latest login, in pre-defined attributes. This object may also contain info from a user's source [connection](/connections). Most of the user attributes are root attributes (attributes stored at the first, or root, level of the `user` object), and some of these are editable.

* **Metadata**: Two sub-objects that operate as secondary storage to store additional user info in customizable attributes: `user_metadata` and `app_metadata`. See [Metadata](/users/concepts/overview-user-metadata) for more information, including when to use `app_metadata` and `user_metadata`.

## User profile attributes

The following attributes are available on the user profile. Many are root attributes (attributes stored at the first, or root, level of the `user` object), and some may be updated, imported, and exported, as noted below.

::: panel Blacklist user attributes
If there are user fields that should not be stored by Auth0 due to privacy reasons, you can blacklist the attributes you do not want persisting in Auth0 databases. For details, see [Blacklist User Attributes](/security/blacklisting-attributes).
:::

::: warning
<%= include('../../_includes/_users_update_normalized_profile_attributes') %>
:::

| Name             | Type | Description | [Search?](/users/search) | [Update?](/api/management/guides/users/update-root-attributes-users) | [Import?](/users/guides/bulk-user-imports) | [Upsert during import?](/users/guides/bulk-user-imports#request-bulk-import) | [Export?](/users/guides/bulk-user-exports) |
|-|-|-|-|-|-|-|-|-|
| `app_metadata`   | object | Custom fields that store info about a user that influences the user's access, such as support plan, security roles (if not using the Authorization Core feature set), or access control groups. For more info, see [Metadata Overview](/users/concepts/overview-user-metadata). | Y | Y | Y | Y | Y |
| `blocked`        | boolean | Indicates whether the user has been blocked. Importing enables subscribers to ensure that users remain blocked when migrating to Auth0. | Y | Y | Y | N | Y |
| `created_at`     | date time | Timestamp indicating when the user profile was first created. | Y | N | N | N | Y |
| `email`          | text | (unique) The user's email address. | Y | Y | Y | N | Y |
| `email_verified` | boolean | Indicates whether the user has verified their email address. | Y | Y | Y | Y | Y |
| `family_name` | text | The user's family name. | Y | Y | Y | Y | Y |
| `given_name` | text | The user's given name. | Y | Y | Y | Y | Y |
| `identities`     | array (object) | <%= include('../_includes/_user-prop-identities.md') %> |  Y | N | N | N | Y |
| `last_ip`       | text | IP address associated with the user's last login. | Y | N | N | N | Y |
| `last_login`    | date time | Timestamp indicating when the user last logged in. If a user is blocked and logs in, the blocked session updates `last_login`. If you are using this property from inside a [Rule](/rules) using the `user` object, its value will be associated with the login that triggered the rule; this is because rules execute after login. | Y | N | N | N | Y |
| `last_password_reset` | date time | Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. | N | N | N | N | N |
| `logins_count` | integer | Number of times the user has logged in. If a user is blocked and logs in, the blocked session is counted in `logins_count`. | Y | N | N | N | Y |
| `multifactor`   | text | List of multi-factor providers with which the user is enrolled. | N | N | N | N | Y |
| `name`          | text | The user's full name. | Y | Y | Y | Y | Y |
| `nickname`      | text | The user's nickname. | Y | Y | Y | Y | Y |
| `phone_number` | text | The user's phone number. Only valid for users with SMS connections. | Y | Y | N | N | Y |
| `phone_verified` | boolean | Indicates whether the user has been verified their phone number. Only valid for users with SMS connections. | Y | Y | N | N | Y |
| `picture` | text | URL pointing to [the user's profile picture](/users/guides/change-user-pictures). | N | Y | Y | Y | Y |
| `updated_at` | date time | Timestamp indicating when the user's profile was last updated/modified. Changes to `last_login` are considered updates, so most of the time, `updated_at` will match `last_login`. | Y | N | N | N | Y |
| `user_id` | text | (unique) The user's identifier. Importing allows user records to be synchronized across multiple systems without using mapping tables. | Y | N | Y | N | Y |
| `user_metadata` | object | Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. For more info, see [Metadata Overview](/users/concepts/overview-user-metadata). | Y | Y | Y | Y | Y |
| `username` | text | (unique) The user's username. | Y | Y | Y | N | Y |

::: note
Three other fields are not technically part of the user profile, but may be of interest when importing users:

* `password_hash` (text): Hashed password for the user's connection. When users are created, Auth0 uses [bcrypt](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/) to secure the password. Importing compatible hashed passwords allows users to retain their passwords, thereby providing a smoother experience. Compatible passwords should be hashed using bcrypt $2a$ or $2b$ and have 10 saltRounds. Note that this field can only be provided when the user is first imported — it can not be updated later.
* `custom_password_hash` (object): A more generic way to provide the users password hash. This can be used in lieu of the password_hash field when the users password hash was created with an alternate algorithm. Note that this field can only be provided when the user is first imported — it can not be updated later.
* `password_set_date` (date time): Timestamp indicating when the password for the user's connection was set. At user creation, this field exists, and `last_password_reset` does not. If the user has reset their password, this field and `last_password_reset` are identical.
:::

## View user profile

To view the user profile, navigate to [Users](${manage_url}/#/users) in the [Auth0 Dashboard](${manage_url}), and then click a user you want to view.

## Keep reading

* [Normalized User Profiles](/users/normalized)
* [Metadata](/users/concepts/overview-user-metadata)
* [View Users](/users/guides/view-users)
* [Update User Profiles Using Your Database](/users/guides/update-user-profiles-using-your-database)
