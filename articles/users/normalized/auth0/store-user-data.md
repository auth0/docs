---
description: Learn how to store user data in tables.
topics:
  - user-profile
  - normalized-user-profile
  - users
  - auth0-user-profiles
contentType:
  - how-to
useCase:
  - manage-users
v2: true
---
# Store User Data

When outsourcing user authentication, there is usually no need to maintain your own users/passwords table. Even so, you may still want to associate application data to authenticated users.

For example, you could have a *Users table* that lists each user authenticated by Auth0. Every time a users logs in, you could search the table for that user. If the user does not exist, you would create a new record. If they do exist, you would update all fields, essentially keeping a local copy of all user data.

Alternatively, you could store the user identifier in each table/collection that has user-associated data. This is a simpler implementation suited to smaller applications.

## Keep reading

* [Normalized User Profiles Overview](/users/normalized)
* [Retrieve User Profiles](/users/search)
* [Identify Users](/users/normalized/auth0/identify-users)
* [Normalized User Profile Schema](/users/normalized/auth0/normalized-user-profile-schema) 
* [Sample User Profiles](/users/normalized/auth0/sample-user-profiles)
* [Claims for User Profile Returned via OIDC-Compliant Authorization Flow](/users/normalized/oidc)
