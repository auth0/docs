---
description: Learn how to uniquely identify users.
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
# Identify Users

There are two recommended options to uniquely identify your users:

1. By the `user_id` property. This is guaranteed to be unique per user (such as `{identity provider id}|{unique id in the provider}`, or `facebook|1234567890`).
2. By a *natural* key, like the `email` property. In this case, it is recommended that you enable email verification and only use this option with providers that require that users verify their emails.

If you use [custom databases](/connections/database/mysql), you must return a unique `user_id` property. If you have multiple custom databases and expect possible collisions between ids from different connections, you should use a prefix identifying the connection. For example:

```javascript
function login (email, password, callback) {
  var user = getUserFromDB(email);
  var profile = {
    user_id: 'MyConnection1|' + user.id,
    email: user.email,
    [...]
  };
  callback(null, profile);
}
```

## Keep reading

* [Normalized User Profiles Overview](/users/normalized)
* [Store User Data](/users/normalized/auth0/store-user-data)
* [Retrieve User Profiles](/users/search)
* [Normalized User Profile Schema](/users/normalized/auth0/normalized-user-profile-schema) 
* [Sample User Profiles](/users/normalized/auth0/sample-user-profiles)
* [Claims for User Profile Returned via OIDC-Compliant Authorization Flow](/users/normalized/oidc)
