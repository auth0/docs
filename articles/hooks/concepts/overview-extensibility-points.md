---
description: Describes what extensibility points for use with Hooks are
beta: true
topics:
    - hooks
    - extensibility-points
contentType:
  - concept
useCase: extensibility-hooks
v2: true
---
# Extensibility Points

Hooks allow you to customize the behavior of Auth0 with Node.js code. They are essentially [Webtask](https://webtask.io), but [Hooks](/hooks#work-with-hooks) are executed only against selected extensibility points, which are the serverless option that's analogous to the webhooks that come with a server. The following is a list of currently available extensibility points:

- [Credentials Exchange](/hooks/concepts/credentials-exchange-extensibility-point): change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint
- [Pre-User Registration](/hooks/concepts/pre-user-registration-extensibility-point): prevent user registration and add custom metadata to a newly-created user
- [Post-User Registration](/hooks/concepts/post-user-registration-extensibility-point): implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database