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

Depending on the extensibility point, some Hooks can only be used with certain kinds of Connections, such as [Database Connections](/connections/database) or [Passwordless Connections](/connections/passwordless).

Extensibility points are also `synchronous` or `asynchronous`. Synchronous extensibility points execute the Hook as part of the trigger's process and will prevent that process from executing until the Hook is complete. An Asynchronous extensibility point will not wait for the hook to finish its execution before proceeding.

The following extensibility points are available:

| Extensibility&nbsp;Point | Trigger ID | Connection Type(s) | Description | synchronous/asynchronous |
|---------------------|-----------|-----------------|-------------|-------------------|
| [Client Credentials Exchange](/hooks/extensibility-points/client-credentials-exchange) | `credentials-exchange` | N/A | Extend machine-to-machine token exchanges. Prevent a token exchange or change the <dfn data-key="scope">scopes</dfn> and add custom claims to access tokens issued by the Auth0 API's `POST /oauth/token` endpoint. | Synchronous |
| [Pre-User Registration](/hooks/extensibility-points/pre-user-registration) | `pre-user-registration` | Database, Passwordless | Prevent user registration/creation and add custom metadata to a newly-created user. | Synchronous |
| [Post-User Registration](/hooks/extensibility-points/post-user-registration) | `post-user-registration` | Database, Passwordless | Implement custom actions from the Auth0 authentication process after a new user is created or registers and is added to the database. | Asynchronous |
| [Post-Change Password](/hooks/extensibility-points/post-change-password) | `post-change-password` | Database | Implement custom actions to be executed after a successful user password change. | Asynchronous |
| [Send Phone Message](/hooks/extensibility-points/send-phone-message) | `send-phone-message` | N/A | Implement a custom SMS provider to deliver MFA one-time-use codes | Synchronous |
