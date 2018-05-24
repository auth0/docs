---
description: The extensibility points for use with Hooks
url: /hooks/extensibility-points
beta: true
tags:
    - hooks
    - extensibility-points
---

# Extensibility Points

Hooks allow you to customize the behavior of Auth0 with Node.js code. They are essentially [Webtask](https://webtask.io), but [Hooks](/hooks#work-with-hooks) are executed only against selected extensibility points, which are the serverless option that's analagous to the webhooks that come with a server. The following is a list of currently available extensibility points:

- [Credentials Exchange](/hooks/extensibility-points/credentials-exchange): change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint
- [Pre-User Registration](/hooks/extensibility-points/pre-user-registration): prevent user registration and add custom metadata to a newly-created user
- [Post-User Registration](/hooks/extensibility-points/post-user-registration): implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database