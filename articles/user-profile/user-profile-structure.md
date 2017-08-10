---
title: Structure of the User Profile
description: This page lists the attributes that are available on the User Profile.
---

# Structure of the User Profile

The following attributes are available on the [User Profile](/user-profile):

::: note
The User Details page will show `pending` when a user is first created until they have logged in for the first time.
:::

* `app_metadata`: the custom fields storing information about a user. These attributes contain information that influences the user's access;

* `blocked`*: the `true/false` value indicating if the user has been blocked;

* `created_at`: the timestamp of when the user profile was first created;

* `email` (unique): the user's email address

* `email_verified`: the `yes/no` value indicating if the user has verified their email address;

* `identities`: the array of objects with information about the user's identities:

    * `connection`: the name of the connection used to authenticate the user;
    * `isSocial`: the `true/false` value indicating if the connection is a social one or not;
    * `provider`: the entity that is authenticating the user (e.g. Facebook, Twitter, etc.);
    * `user_id`: the user's unique identifier for this connection/provider.


* `multifactor`: the list of multifactor providers in which the user is enrolled;

* `last_ip`*: the IP address associated with the user's last login;

* `last_login`*: the timestamp of when the user last logged in;

* `logins_count`*: the number of times the user has logged in;

* `name`: the user's name;

* `nickname`: the user's nickname;

* `phone_number`: the user's phone number;

* `phone_verified`: the `true/false` value indicating whether the user's phone number has been verified (only valid for users with SMS connections);

* `picture`: the user's profile picture, [click here to learn more about the picture field](/user-profile/user-picture);

* `updated_at`: the timestamp of when the user's profile was last updated/modified;

* `user_id` (unique): the user's unique identifier;

* `user_metadata`: the custom fields storing information about a user. These attributes should contain information about the user that does not impact what they can or cannot access (e.g. work and home addresses);

* `username` (unique): the user's username.

::: note
In cases where you are accessing the User Profile from inside a [Rule](/rules) using the `user` object, properties such as the `last_ip` and `last_login` would be the values associated with the login that triggered the rule since Rules execute after the actual login.
:::

::: note
Fields indicated with an asterisk (*) are not returned as part of `user_profile/id_token` nor are they included in any response from the [/userinfo endpoint](/api/authentication#get-user-info) in the Authentication API. To retrieve user datails from these fields you will need to utilize one of the [User endpoints](/api/management/v2#!/Users/get_users) in the Management API.
:::
