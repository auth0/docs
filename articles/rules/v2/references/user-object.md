---
title: User Object in Rules
description: A list of the Node.js modules and libraries that are available when creating Rules.
topics:
  - rules
  - extensibility
contentType:
  - reference
useCase:
  - extensibility-rules
---

# User Object in Rules

The `user` object represents the logged in user, returned by the identity provider.

## Properties of the `user` object

**`user.app_metadata`**<br/>
Custom fields storing information about a user. These attributes contain information that influences the user's access. For more info see [Metadata](/metadata).

**`user.blocked`**<br/>
Boolean value (`true` or `false`) indicating if the user has been blocked.

**`user.created_at`**<br/>
The date when the user was created.

**`user.email`** (unique)<br/>
The user's email address.

* `email_verified`: The `true/false` value indicating if the user has verified their email address.

* `identities`: The array of objects with information about the user's identities:

    * `connection`: The name of the connection used to authenticate the user
    * `isSocial`: The `true/false` value indicating if the connection is a social one or not
    * `provider`: The entity that is authenticating the user (such as Facebook, Twitter, and so on)
    * `user_id`: The user's unique identifier for this connection/provider


* `multifactor`: The list of multi-factor providers in which the user is enrolled.

* `last_ip`: The IP address associated with the user's last login.

* `last_login`: The timestamp of when the user last logged in.

* `logins_count`: The number of times the user has logged in.

* `name`: The user's name.

* `nickname`: The user's nickname.

* `last_password_reset`: The last time the password was reset/changed.

* `password_set_date`: The date when the user's password was set. At user creation, this field exists, but `last_password_reset` does not. If the user has reset their password, this field and `last_password_reset` are identical.

* `phone_number`: The user's phone number. Only valid for users with SMS connections.

* `phone_verified`: The `true/false` value indicating whether the user's phone number has been verified. Only valid for users with SMS connections.

* `picture`: [The user's profile picture](/user-profile/user-picture).

* `updated_at`: The timestamp of when the user's profile was last updated/modified.

* `user_id` (unique): The user's unique identifier.

* `user_metadata`: The custom fields storing information about a user. These attributes should contain information about the user that does not impact what they can or cannot access (such as work and home addresses). For more info see [Metadata](/metadata).

* `username` (unique): The user's username.