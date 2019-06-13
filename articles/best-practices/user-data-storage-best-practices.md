---
description: Recommendations for using Auth0 storage mechanisms.
topics:
    - users
    - user-management
    - user-profiles
    - data-storage
    - swift
    - ios
    - nodejs
    - api
contentType: reference
useCase: manage-users
---

# User Data Storage Best Practices

Auth0 stores user information for your tenant in a hosted cloud database, or you can choose to store user data in your own custom external database. 

## External database vs. Auth0 data store

To store user data beyond the basic information Auth0 uses for authentication, you can use the  Auth0 data store or a [custom database](/connections/database/mysql). However, if you use the additional data for authentication purposes, we recommend that you use the Auth0 data store, as this allows you to manage your user data through the [Auth0 Management Dashboard](${manage_url}).

The Auth0 data store is customized for authentication data. Storing anything beyond the default user information should be done only in limited cases. Here's why:

* **Scalability**: The Auth0 data store is limited in scalability, and your Application's data may exceed the appropriate limits. By using an external database, you keep your Auth0 data store simple, while the more efficient external database contains the extra data;
* **Performance**: Your authentication data is likely accessed at lower frequencies than your other data. The Auth0 data store isn't optimized for high frequency use, so you should store data that needs to be retrieved more often elsewhere;
* **Flexibility**: Because the Auth0 data store was built to accommodate only user profiles and their associated metadata, you are limited in terms of the actions you can perform on the database. By using separate databases for your other data, you can manage your data as appropriate.

## Metadata

Any data you store in Auth0 that's *not* already a part of the user profile should go into one of the two provided [metadata](/users/concepts/overview-user-metadata) types:

* `app_metadata`
* `user_metadata`

These fields contain JSON snippets and can be used during the Auth0 authentication process.

You can store data points that are read-only to the user in `app_metadata`. Three common types of data for the `app_metadata` field:

* **Permissions**: privileges granted to certain users allowing them rights within the Application that others do not have;
* **Plan information**: settings that cannot be changed by the user without confirmation from someone with the appropriate authority;
* **External IDs**: identifying information used to associate users with external accounts.

For a list of fields that *cannot* be stored within `app_metadata`, see [Metadata Field Name Rules](/users/references/metadata-field-name-rules).

When determining where you should store specific pieces of data about your user, here are the general rules of thumb:

| Type of Data | Storage Location |
| --- | --- |
| Data that should be **read-only** to the user | `app_metadata` |
| Data that should be **editable** by the user | `user_metadata` |
| Data unrelated to user authentication | External database |
