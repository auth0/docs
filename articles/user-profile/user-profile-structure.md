---
description: Lists the attributes that are available on the Auth0 user profile
topics:
    - users
    - user-management
    - user-profiles
    - user-profile-structure
contentType: reference
useCase: manage-users
---

# User Profile Structure

The following attributes are available on the user profile.

* `app_metadata`: Custom fields storing information about a user. These attributes contain information that influences the user's access. For more info see [Metadata](/metadata).

* `blocked`: The `true/false` value indicating if the user has been blocked.

* `created_at`: The timestamp of when the user profile was first created.

* `email` (unique): The user's email address.

* `email_verified`: The `true/false` value indicating if the user has verified their email address.

* `identities`: The array of objects with information about the user's identities:

    * `connection`: The name of the connection used to authenticate the user
    * `isSocial`: The `true/false` value indicating if the connection is a social one or not
    * `provider`: The entity that is authenticating the user (such as Facebook, Twitter, and so on)
    * `user_id`: The user's unique identifier for this connection/provider


* `multifactor`: The list of multi-factor providers in which the user is enrolled.

* `last_ip`: The IP address associated with the user's last login.

* `last_login`: The timestamp of when the user last logged in. In case you are this property from inside a [Rule](/rules) using the `user` object, its value will be the one associated with the login that triggered the rule (since rules execute after the actual login).

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

Most user profile fields are not returned as part of [ID Token](/tokens/id-token), nor are they included in the response from the [/userinfo endpoint](/api/authentication#get-user-info) of the Authentication API. To retrieve user datails from these fields you will need to utilize one of the [User endpoints](/api/management/v2#!/Users/get_users) of the Management API. For more information on the endpoints you can use to retrieve users, see [User Search Best Practices](/users/search/best-practices).

::: panel Blacklist user attributes
If there are user fields that should not be stored by Auth0 due to privacy reasons, you can blacklist the attributes you do not want persisting in Auth0 databases. For details, see [Blacklist User Attributes](/security/blacklist-user-attributes).
:::
