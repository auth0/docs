---
title: User Data Storage Best Practices
description: Learn about recommendations for using Auth0 storage mechanisms.
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
