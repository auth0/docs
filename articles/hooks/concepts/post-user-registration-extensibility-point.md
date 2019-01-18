---
description: Describes post-user-registration extensibility point for use with Hooks
beta: true
topics:
    - hooks
    - extensibility-points   
contentType:
  - how-to
useCase: extensibility-hooks
v2: true
---
# Post-User Registration Extensibility Point

For [Database Connections](/connections/database), the `post-user-registration` extensibility point allows you to implement custom actions that execute after a new user registers and is added to the database.

[Hooks](/hooks#work-with-hooks) associated with the `post-user-registration` extensibility point execute asynchronously from the actions that are a part of the Auth0 authentication process.

This allows you to implement scenarios including (but not limited to):

* Sending notifications to Slack or via email about the user's new account;
* Creating a new user record in a CRM system.