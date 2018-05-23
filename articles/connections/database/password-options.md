---
title: Password Options in Auth0 Database Connections
description: Auth0's Password Options allow you to disallow users from repeating prior passwords, to customize a password dictionary of passwords to disallow, and to disallow passwords related to the user's personal data.
crews: crew-2
tags:
    - connections
    - database
    - db-connections
    - passwords
---
# Password Options in Auth0 Database Connections

::: warning
The **Password Options** feature is only available for Database connections. The password limitations in Social and Enterprise connections are enforced by each provider.
:::

An important concern when using passwords for authentication is the creation of unique passwords. A strong password policy will make it difficult, if not improbable, for someone to guess a password through either manual or automated means.

One facet of strong passwords is their uniqueness and difficulty to guess. Auth0's password options for database connections are designed to allow you to force your users to make better decisions when choosing their passwords.

![Password Options](/media/articles/connections/database/pw-options.png)

The Password Options area is located in your [Auth0 Dashboard](${manage_url}). Go to Connections -> Database, choose a database connection, and then open its settings, and click _Password Policy_. The Password Policy settings page contains the ability to configure the [Password Strength Policy](/connections/database/password-strength) as well as the Password Options below.

## Password History

When your users are creating passwords, you often don't want them to repeat the usage of passwords that they've used in the recent past. That, of course, would defeat the purpose of having them change their password! Even if you do not have a required password change policy (for example, forcing users to change passwords every six months), you still might have a reason to disallow the use of previous passwords. For example, if a security breach in your organization causes you to want users to change their passwords everywhere, you want to ensure that they aren't just re-using one that might be compromised!

Auth0 can retain a password history for each user in order to prevent their re-use. You can choose an amount of prior password entries to keep, up to 24 maximum.

Note that upon enabling this option, only password changes going forward will be affected, as the history will not have been kept until that point.

## Password Dictionary

The Password Dictionary option, when enabled, allows the use of a password dictionary to stop users from choosing common passwords. The [default dictionary list](https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10k-most-common.txt) that Auth0 uses can be enabled just by toggling this option on. It will not allow users to use a password that is present on that list.

Additionally, you can use the text area here and add your own prohibited passwords, one per line. These can be items that are specific to your company, or passwords that your own research has shown you are commonly used in general or at your company in specific.

Note that Auth0 uses case-insensitive comparison with the Password Dictionary feature.

## Personal Data

Enabling this option will force a user that is setting their password to not set passwords that contain any part of the user's personal data. This includes:

* `name`
* `username`
* `nickname`
* `user_metadata.name`
* `user_metadata.first`
* `user_metadata.last`
* The first part of the user's email will also be checked - `firstpart`@example.com

For example, if the user's name is "John", including "John" in the user's password `John1234` would not be allowed, if this option is enabled.

## API Access

Password options are associated with a Database connection so these values can be accessed with the [Connections endpoints of the Management API](/api/management/v2#!/Connections). The password related fields are stored in the `options` object. These fields are not required because these fields are not used for non-database connections and if they are not enabled for a connection they may not appear.

For example here is what a MySQL database connection may look like after setting a password policy. In this example, as we can see from the contents of the `options` object, all three password options are enabled, password history will store the 5 latest passwords and each password will be crossed checked against two dictionaries: `entry1` and `entry2`.

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

If you are [creating a connection](/api/management/v2#!/Connections/post_connections) or [updating an existing connection](/api/management/v2#!/Connections/patch_connections_by_id) using the Management API you can update the password policy for the connection using these fields.
