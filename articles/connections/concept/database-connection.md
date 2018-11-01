---
title: Database Connections
description: Learn about database connections.
topics:
  - authentication
  - applications
  - dashboard
contentType: concept
useCase:
  - add-login
---
# Database Connections

If you want to create your own user store, instead of using external identity providers like Google or Facebook, you can use a Database Connection. This way you can authenticate users with an email or username and a password. The credentials can be securely stored either in the Auth0 user store or in your own database.

You can create any number of custom fields and store this information as part of the `user_metadata`. You can easily import users from a legacy user store, enable or disable sign ups, configure your password policy, or enable Multi-factor Authentication.

For more details, refer to the [Database Connections](/connections/database) documentation.
