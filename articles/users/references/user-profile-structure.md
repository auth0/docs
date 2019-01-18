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

There are several components to the User Profile data structure in Auth0. This structure can be viewed by clicking on the [Users tab](${manage_url}/#/users) in the Auth0 Dashboard and then on a particular user.

The **Details** consists of core User Profile object with basic information such as name, email, and the timestamp of the latest login. The core User Profile object may contain additional attributes from its source Connection, in addition to the normalized Auth0 User Profile attributes.

The User Profile object also has two **metadata** sub-objects, one called `user_metadata` and the other `app_metadata`. The metadata objects can be used to store additional User Profile information. The `user_metadata` object should be used to store user attributes, such as user preferences, that don't impact what a user can access. The `app_metadata` object should be used for user attributes, such as a support plan, security roles, or access control groups, which can impact how an application functions and/or what the user can access. [Learn more](/api/management/v2/changes#8) about when to use `app_metadata` vs `user_metadata`.

### User Metadata Best Practices

* Both `app_metadata` and `user_metadata` are limited to a size of 16mb each. However, we recommend against using these properties like a database. They should be used for identity related information. Additionally, at some point we may put a more strict size limit on these properties. Please also be aware that using Rules and/or the Management Dashboard may further limit the amount of metadata you can store.

* An authenticated user can perform actions that modify data in their profile's **user_metadata**, but they can't do anything that modifies their **app_metadata**.

* Use a consistent datatype each time you create or update a given metadata field. Using `user.user_metadata.age = "23"` for one user and `user.user_metadata.age = 23` for another user will cause issues when retrieving the data.

## Attributes

The `Identity Provider Attributes` section contains information retrieved from the authentication provider (such as Facebook, Twitter, Google, SAML, your own provider, and so on). This section always contains at least one identity provider, and it is the one the user originally authenticated against. This data is read-only.

Auth0 also supports the ability for users to [link their profile to multiple identity providers](/link-accounts), and when they do, those additional identities show up in this array. The contents of an individual identity provider object varies by provider, but it will typically include a user identifier, the name of the provider, the name of the connection set up in Auth0 for that provider, whether it is a social provider, and in some cases an API Access Token that can be used with that provider.The following attributes are available on the user profile.

* `app_metadata`: Custom fields storing information about a user. These attributes contain information that influences the user's access. For more infornation see [Metadata Overview](/users/concepts/overview-user-metadata).

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

* `logins_count`: The number of times the user has logged in. If a user is blocked and logs in, the blocked session is counted in `logins_count` and updates the `last_login` value.

* `name`: The user's name.

* `nickname`: The user's nickname.

* `last_password_reset`: The last time the password was reset/changed.

* `password_set_date`: The date when the user's password was set. At user creation, this field exists, but `last_password_reset` does not. If the user has reset their password, this field and `last_password_reset` are identical.

* `phone_number`: The user's phone number. Only valid for users with SMS connections.

* `phone_verified`: The `true/false` value indicating whether the user's phone number has been verified. Only valid for users with SMS connections.

* `picture`: [The user's profile picture](/users/guides/change-user-pictures).

* `updated_at`: The timestamp of when the user's profile was last updated/modified.

* `user_id` (unique): The user's unique identifier.

* `user_metadata`: The custom fields storing information about a user. These attributes should contain information about the user that does not impact what they can or cannot access (such as work and home addresses). For more information see [Metadata Overview](/users/concepts/overview-user-metadata).

* `username` (unique): The user's username.

Most user profile fields are not returned as part of [ID Token](/tokens/id-token), nor are they included in the response from the [/userinfo endpoint](/api/authentication#get-user-info) of the Authentication API. To retrieve user datails from these fields you will need to utilize one of the [User endpoints](/api/management/v2#!/Users/get_users) of the Management API. For more information on the endpoints you can use to retrieve users, see [User Search Best Practices](/best-practices/search-best-practices).

::: panel Blacklist user attributes
If there are user fields that should not be stored by Auth0 due to privacy reasons, you can blacklist the attributes you do not want persisting in Auth0 databases. For details, see [Blacklist User Attributes](/security/blacklisting-attributes).
:::

## Keep reading

* [Normalized User Profiles](/users/normalized)
* [User Metadata](/users/concepts/overview-user-metadata)
* [View Users](/users/guides/view-users)
* [Update User Profiles Using Your Database](/users/guides/update-user-profiles-using-your-database)
