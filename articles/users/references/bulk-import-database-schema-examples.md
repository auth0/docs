---
title: Bulk User Import Database Schema and Example 
description: How to perform bulk user imports with the Management API.
topics:
  - users
  - user-management
  - migrations
  - bulk-imports
contentType:
  - reference
useCase:
  - manage-users
  - migrate
---
# Bulk User Import Database Schema and Example

::: note
For a list of user profile fields that can be imported, see [User Profile Attributes](/users/references/user-profile-structure#user-profile-attributes).
:::

The users file must have an array with the users' information in JSON format.

The following [JSON schema](http://json-schema.org) describes valid users:

```json
{
    "type": "object",
    "properties": {
        "email": {
            "type": "string",
            "description": "The user's email address.",
            "format": "email"
        },
        "email_verified": {
            "type": "boolean",
            "default": false,
            "description": "Indicates whether the user has verified their email address."
        },
        "user_id": {
            "type": "string",
            "description": "The user's unique identifier."
        },
        "username": {
            "type": "string",
            "description": "The user's username."
        },
        "given_name": {
            "type": "string",
            "description": "The user's given name."
        },
        "family_name": {
            "type": "string",
            "description": "The user's family name."
        },
        "name": {
            "type": "string",
            "description": "The user's full name."
        },
        "nickname": {
            "type": "string",
            "description": "The user's nickname."
        },
        "picture": {
          "type": "string",
          "description": "URL pointing to the user's profile picture."
        },
        "blocked": {
            "type": "boolean",
            "description": "Indicates whether the user has been blocked."
        },
        "password_hash": {
            "type": "string",
            "description":"Hashed password for the user. Passwords should be hashed using bcrypt $2a$ or $2b$ and have 10 saltRounds."
        },
        "custom_password_hash": {
            "type": "object",
            "description": "A more generic way to provide the users password hash. This can be used in lieu of the password_hash field when the users password hash was created with an alternate algorithm. Note that this field and password_hash are mutually exclusive.",
            "properties": {
                "algorithm": {
                    "type": "string",
                    "enum": ["md5", "sha1", "sha256", "sha512", "bcrypt", "argon2", "pbkdf2"],
                    "description": "The algorithm that was used to hash the password."
                },
                "hash": {
                    "type": "string",
                    "description": "The password hash."
                },
                "encoding": {
                    "type": "string",
                    "enum": ["hex", "base64"],
                    "description": "The hash encoding. Note that both upper and lower case hex variants are supported, as well as url-encoded base64."
                },
                "salt_prefix": {
                    "type": "string",
                    "default": "",
                    "description": "The salt value (prefix) used to generate the hash."
                },
                "salt_suffix": {
                    "type": "string",
                    "default": "",
                    "description": "The salt value (suffix) used to generate the hash."
                }
            },
            "required": ["algorithm", "hash"],
            "additionalProperties": false
        },
        "app_metadata": {
            "type": "object",
            "description": "Data related to the user that does affect the application's core functionality."
        },
        "user_metadata": {
            "type": "object",
            "description": "Data related to the user that does not affect the application's core functionality."
        }
    },
    "required": ["email"],
    "additionalProperties": false
}
```

## User `app_metadata` schema

Additionally, the `app_metadata` should **not** contain any of these properties:

* `__tenant`
* `_id`
* `blocked`
* `clientID`
* `created_at`
* `email_verified`
* `email`
* `globalClientID`
* `global_client_id`
* `identities`
* `lastIP`
* `lastLogin`
* `loginsCount`
* `metadata`
* `multifactor_last_modified`
* `multifactor`
* `updated_at`
* `user_id`


::: note
The `app_metadata` stores information that can impact how an application functions or what the user can access (for example, a user's support plan or <dfn data-key="role">roles</dfn> and access groups). For more information, refer to [User Metadata](/metadata).
:::

::: note
The `encoding`, `salt_prefix`, and `salt_suffix` fields of `custom_password_hash` are not applicable for `bcrypt`, `argon2`, or `pbkdf2`. These fields should be omitted when providing hashes that were generated using one of these algorithms.
:::

::: note
When the `custom_password_hash` was generated by either `argon2` or `pbkdf2`, the `hash` field should be in [PHC string format](https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md).
- For `argon2`, the hash should conform to the requirements described [here](https://github.com/auth0/magic#magicpasswordhash--magicverifypassword)
- For `pbkdf2`, the hash should include `i` (iterations) and `l` (keylen) parameters. If these parameters are omitted, they will default to `i=100000` and `l=64`.
:::

## Supported hash algorithms

As described above, the supported hash algorithms are:
* [`bcrypt`](https://auth0.com/blog/hashing-in-action-understanding-bcrypt/)
* [`md5`](https://tools.ietf.org/html/rfc1321)
* [`sha1`](https://tools.ietf.org/html/rfc3174)
* [`sha256` and `sha512`](https://tools.ietf.org/html/rfc4634)
* [argon2](https://github.com/p-h-c/phc-winner-argon2)
* [pbkdf2](https://tools.ietf.org/html/rfc2898#section-5.2)

## File example

A file with the following contents is valid:

```json
[
  {
    "email": "john.doe@contoso.com",
    "email_verified": false,
    "app_metadata": {
        "roles": ["admin"],
        "plan": "premium"
    },
    "user_metadata": {
        "theme": "light"
    }
  }
]
```

::: note
The file size limit for a bulk import is 500KB. You will need to start multiple imports if your data exceeds this size.
:::

## Keep reading

* [User Migration Overview](/users/concepts/overview-user-migration)
* [Configure Automatic Migration](/users/guides/configure-automatic-migration)
* [Bulk User Imports](/users/guides/bulk-user-imports)
* [User Import/Export Extension](/extensions/user-import-export)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
* [Migrating Stormpath Users to Auth0 Demo](https://github.com/auth0-blog/migrate-stormpath-users-to-auth0)
