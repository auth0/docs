---
description: Learn about extensibility points of the Auth0 platform that are available to use with Hooks.
topics:
    - hooks
    - extensibility-points
contentType:
  - reference
useCase: extensibility-hooks
---

# Extensibility Points

Extensibility points are places in the Auth0 platform where [Hooks](/hooks) can be executed.

Whether Hooks can be used with connections varies according to extensibility point. Hooks that can be used with connections only work with [Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless).

Extensibility points may also block processes from executing. Synchronous extensibility points are blocking, which means they execute the Hook as part of the trigger's process and will prevent that process from executing until the Hook is complete. Aynchronous extensibility points will not wait for the Hook to finish its execution before proceeding.

The following extensibility points are available:

| Extensibility&nbsp;Point | Trigger ID | Connection Type(s) | Blocking? | Description |
|---------------------|-----------|-----------------|-------------|-------------------|
| [Client Credentials Exchange](/hooks/extensibility-points/client-credentials-exchange) | `credentials-exchange` | N/A | Yes | Extend machine-to-machine token exchanges. Prevent a token exchange or change the <dfn data-key="scope">scopes</dfn> and add custom claims to access tokens issued by the Auth0 API's `POST /oauth/token` endpoint. |
| [Pre-User Registration](/hooks/extensibility-points/pre-user-registration) | `pre-user-registration` | Database, Passwordless | Yes | Prevent user creation or registration, or add custom metadata to a newly-created user. |
| [Post-User Registration](/hooks/extensibility-points/post-user-registration) | `post-user-registration` | Database, Passwordless | No | Implement custom actions from the Auth0 authentication process after a new user is created or registers and is added to the database. |
| [Post-Change Password](/hooks/extensibility-points/post-change-password) | `post-change-password` | Database | No | Implement custom actions to be executed after a successful user password change. |
| [Send Phone Message](/hooks/extensibility-points/send-phone-message) | `send-phone-message` | N/A | Yes | Implement a custom phone messaging provider to deliver MFA one-time-use codes. |
