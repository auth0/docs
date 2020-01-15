---
description: Describes the extensibility points available for use with Hooks
topics:
    - hooks
    - extensibility-points
contentType:
  - concept
useCase: extensibility-hooks
v2: true
---
# Extensibility Points for Hooks

Hooks allow you to customize the behavior of Auth0 with Node.js code, but they are executed only against selected extensibility points, which are the serverless option analogous to the webhooks that come with a server. The following is a list of currently available extensibility points:

- [Credentials Exchange](/hooks/concepts/credentials-exchange-extensibility-point): Change the <dfn data-key="scope">scopes</dfn> and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint.
- [Pre-User Registration](/hooks/concepts/pre-user-registration-extensibility-point): Prevent user registration and add custom metadata to a newly-created user.
- [Post-User Registration](/hooks/concepts/post-user-registration-extensibility-point): Implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database.
- [Post Change Password](/hooks/guides/post-change-password): Implement custom actions to be executed after a successful user password change.

<%= include('../../_includes/_ip_whitelist') %>
