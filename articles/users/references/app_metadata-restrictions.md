---
description: Describes restrictions on what can be stored in app metadata fields. 
topics:
  - users
  - metadata
  - user-management
  - migrations
  - bulk-imports
contentType:
  - reference
useCase:
  - manage-users
  - migrate
---
# App Metadata Restrictions

The `app_metadata` field should **not** contain any of these properties:

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