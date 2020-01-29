---
title: Extensibility Points
description: Learn about extensibility points of the Auth0 platform that are available to use with Hooks.
beta: true
topics:
    - hooks
    - extensibility-points
contentType:
  - reference
useCase: extensibility-hooks
---

# Extensibility Points

Extensibility points are places in the Auth0 platform where [Hooks](/hooks) can be executed.

Depending on the extensibility point, you can use Hooks with [Database Connections](/connections/database) and/or [Passwordless Connections](/connections/passwordless).

The following extensibility points are available:

| Extensibility&nbsp;Point | Trigger ID | Connection Type(s) | Description | 
|---------------------|-----------|-----------------|-------------|
| [Client Credentials Exchange](/hooks/extensibility-points/client-credentials-exchange) | `credentials-exchange` | Database, Passwordless | Change the <dfn data-key="scope">scopes</dfn> and add custom claims to access tokens issued by the Auth0 API's `POST /oauth/token` endpoint. |
| [Pre User Registration](/hooks/extensibility-points/pre-user-registration) | `pre-user-registration` | Database, Passwordless | Prevent user registration and add custom metadata to a newly-created user. |
| [Post User Registration](/hooks/extensibility-points/post-user-registration) | `post-user-registration` | Database, Passwordless | Implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database. |
| [Post Change Password](/hooks/extensibility-points/post-change-password) | `post-change-password` | Database | Implement custom actions to be executed after a successful user password change. |