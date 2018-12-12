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

The users file must have an array with the users' information in JSON format. The following [JSON schema](http://json-schema.org) describes valid users:

```json
{
    "type": "object",
    "properties": {
        "email_verified": {
            "type": "boolean"
        },
        "email": {
            "type": "string",
            "description": "The email of the user.",
            "format": "email"
        },
        "username": {
            "type": "string",
            "description": "The username."
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
    "required": ["email", "email_verified"],
    "additionalProperties": false
}
```

## User `app_metadata` schema

Additionally, the `app_metadata` should **not** contain any of these properties:

* `clientID`
* `globalClientID`
* `global_client_id`
* `email_verified`
* `user_id`
* `identities`
* `lastIP`
* `lastLogin`
* `metadata`
* `created_at`
* `loginsCount`
* `_id`

::: note
The `app_metadata` stores information that can impact how an application functions or what the user can access (for example, a user's support plan or roles and access groups). For more information, refer to [User Metadata](/metadata).
:::

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
* [Bulk User Imports with the Management API](/users/guides/bulk-user-import)
* [User Import/Export Extension](/extensions/user-import-export)
* [User Migration Scenarios](/users/references/user-migration-scenarios)
* [Migrating Stormpath Users to Auth0 Demo](https://github.com/auth0-blog/migrate-stormpath-users-to-auth0)
