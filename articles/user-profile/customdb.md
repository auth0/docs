---
description: Considerations regarding the User Profile when using a Custom DB.
---
# Update Users using a Custom Database

Auth0 [caches the User Profile](/user-profile/user-profile-details#caching-of-the-user-profile-in-auth0) received from a Custom Database Connection prior to passing it on to the calling client application. This cache is stored in the Auth0 database, and the information in the cache that originates from the Custom Database Connection is refreshed each time the user authenticates.

The values of the fields for the [Normalized User Profile](/user-profile/normalized) which is cached will be populated based on the values being returned from the Login Script of your Custom Database Connection.

## Updating via the Management API

The only fields you are allowed to update for a user in a Custom Database Connection using the [Management API](/api/management/v2) are the `user_metadata`, `app_metadata` and `blocked` fields.

If you need to update any of the other user fields you will need to do it directly in the custom database.

## Updating the Custom Database directly

You can update the fields of your user directly in the custom database to which your Custom Database Connection is connecting to. You can do this using whatever mechanism you already have in place to update that database. It is however important to note that the cached User Profile in Auth0 will not be updated until the next time that the user logs in. At that point the cached User Profile will be updated based on the values received from your custom database via the [Login script](/connections/database/mysql#3-provide-action-scripts). 

It is therefore important to note that you should consider the custom database as the primariy source of truth.

### Using Database Migration

One caveat to updating a user in the custom database (and considering it as the primary source of truth) is enabling user migration. If you have [enabled user migration](/connections/database/migrating), and a user has already been migrated to the Auth0 database, then Auth0 will not query your database again for the user profile. And therefore all changes made in the custom database for that user will never reflect in Auth0.

Once a user has been migrated, you will also be able to update fields such as `email` and `email_verified` via the Management API. However, normal rules for updating other user fields will still apply as described in the [Normalized User Profile](/user-profile/normalized) (e.g. you will still not be able to update fields such as `nickname`, `picture` etc.).