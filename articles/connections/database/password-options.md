---
title: Password Options in Auth0 Database Connections
description: Auth0's Password Options allow you to disallow users from repeating prior passwords, to customize a password dictionary of passwords to disallow, and to disallow passwords related to the user's personal data.
crews: crew-2
topics:
    - connections
    - database
    - db-connections
    - passwords
contentType: concept
useCase: customize-connections
---
# Password Options in Auth0 Database Connections

::: warning
**Password History**, **Password Dictionary**, and **Personal Data** password options are available for Database connections using the Auth0 data store and for Custom Database connections that have import mode enabled. Password limitations in Social and Enterprise connections are enforced by each provider.
:::

When using passwords for authentication, you should enforce the creation of unique passwords. A strong password policy will make it difficult, if not improbable, for a bad actor to guess a password through either manual or automated means.

Important facets of strong passwords are their uniqueness and difficulty to guess. Auth0's password options for database connections allow you to force your users to make better decisions when choosing their passwords.

![Password Options](/media/articles/connections/database/pw-options.png)

The Password Options area is located in your [Auth0 Dashboard](${manage_url}). Go to Connections -> Database, choose a database connection, and then open its settings, and click _Password Policy_. The Password Policy settings page contains the ability to configure the [Password Strength Policy](/connections/database/password-strength) as well as the Password Options below.

## Password History

Enabling this option disallows users from setting passwords that repeat passwords they've used in the recent past. Auth0 can retain a password history for each user, up to a maximum of 24 entries per user. Note that when this option is enabled, only password changes going forward will be affected because the history will not have been kept prior to that point.

Even if you do not have a required password change policy (for example, forcing users to change passwords every six months), you still may want to disallow the use of previous passwords. For example, if a security breach in your organization causes you to force users to change their passwords everywhere, you will want to ensure they aren't just re-using passwords that might be compromised.

## Password Dictionary

Enabling this option disallows users from setting passwords to common options included in a [default dictionary list](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10k-most-common.txt). You may also include your own prohibited passwords by entering them in the text field in this section.

Note that Auth0 uses case-insensitive comparison with the Password Dictionary feature.

## Personal Data

Enabling this option disallows users from setting passwords that contain any part of their personal data. This includes:

* `name`
* `username`
* `nickname`
* `user_metadata.name`
* `user_metadata.first`
* `user_metadata.last`
* The first part of the user's email will also be checked - `firstpart`@example.com

For example, if the user's name were "John", the user would not be allowed to include "John" in their password; `John1234` would not be allowed.

## API Access

Because password options are associated with a Database connection, you can access them using the [Connections endpoints of the Management API](/api/management/v2#!/Connections). Password-related fields are stored in the `options` object. Because these fields are not used for non-database connections, they are not required, so if they are not enabled for a connection, they may not appear.

For example, after setting a password policy, a MySQL database connection will look like this: 

```json
{
  "id": "con_9dKKcib71UMRiHHW",
  "options": {
    "password_history": {
      "enable": true,
      "size": 5
    },
    "password_dictionary": {
      "enable": true,
      "dictionary": [
        "entry1",
        "entry2"
      ]
    },
    "password_no_personal_info": {
      "enable": true
    },
    "passwordPolicy": "fair"
  },
  "strategy": "auth0",
  "name": "MySQL",
  "enabled_clients": [
    "smTzlgPEdqGV0i070t6kPhmG98787987",
    "ztIyxRuiK7Pr2VTzEGvRqxfuh7DgePbF"
  ]
}
```

In this example, we can see from the `options` object that all three password options are enabled, password history will store the 5 most recent passwords, and each password will be cross-checked against two dictionaries: `entry1` and `entry2`.

If you are [creating a connection](/api/management/v2#!/Connections/post_connections) or [updating an existing connection](/api/management/v2#!/Connections/patch_connections_by_id) using the Management API, you can update the password policy for the connection using these fields.
