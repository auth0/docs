---
description: The extensibility points for use with Auth0 Hooks
url: /auth0-hooks/extensibility-points
---

# Extensibility Points

The following is a list of available extensibility points:

- [Client Credentials Exchange](/auth0-hooks/extensibility-points/client-credentials-exchange): change the scopes and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint
- [Pre-User Registration](/auth0-hooks/extensibility-points/pre-user-registration): prevent user registration and add custom metadata to a newly-created user
- [Post-User Registration](/auth0-hooks/extensibility-points/post-user-registration): implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database
