---
description: An overview of Auth0 Hooks for Database Connections and Passwordless Connections.
beta: true
topics:
    - hooks
    - extensibility-points
contentType:
  - index
  - concept
useCase: extensibility-hooks
---

# Hooks

Hooks are secure, self-contained functions that execute for selected extension points. With Hooks you can customize the runtime behavior of Auth0 using custom Node.js code. Currently, you can only use Hooks with [Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless). The following is a list of currently available extensibility points:

- [Client Credentials Exchange](/hooks/client-credentials-exchange): change the <dfn data-key="scope">scopes</dfn> and add custom claims to access tokens issued by the Auth0 API's `POST /oauth/token` endpoint
- [Pre User Registration](/hooks/pre-user-registration): prevent user registration and add custom metadata to a newly-created user
- [Post User Registration](/hooks/post-user-registration): implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database
- [Post Change Password](/hooks/guides/post-change-password): Implement custom actions to be executed after a successful user password change.

## Manage Hooks

You can create, update, delete, and enable/disable Hooks from the Dashboard or using the Auth0 CLI:

- [Create a Hook](/hooks/create)
- [Update Hooks](/hooks/update)
- [Delete Hooks](/hooks/delete)
- [Enable/Disable Hooks](/hooks/enable-disable)


## How to Handle Rate Limits when calling Auth0 APIs

For Hooks that call Auth0 APIs, you should always handle rate limiting by checking the X-RateLimit-Remaining header and acting appropriately when the number returned nears 0.

You should also add logic to handle cases in which you exceed the provided rate limits and receive the HTTP Status Code 429 (Too Many Requests). In this case, if a re-try is needed, it is best to allow for a back-off to avoid going into an infinite re-try loop. For more information about rate limits, see [Rate Limit Policy For Auth0 APIs](/policies/rate-limits).

<%= include('../_includes/_ip_whitelist') %>
