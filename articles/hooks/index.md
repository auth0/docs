---
description: Describes what Hooks and Extensibility Points are
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

Hooks are secure, self-contained functions running on Auth0's serverless environment and associated with specific extensibility points of the Auth0 platform; they allow you to customize the behavior of Auth0 with custom code using Node.js. When using [Database Connections](/connections/database) or [Passwordless Connections](/connections/passwordless), Auth0 invokes the Hooks at runtime to execute custom logic.

When using either of the two supported connection types ([Database Connections](/connections/database) and [Passwordless Connections](/connections/passwordless)), Hooks allow you to customize the behavior of Auth0 using Node.js code that executes against extensibility points (which are comparable to webhooks that come with a server). Hooks allow you modularity when configuring your Auth0 implementation and extend the functionality of base Auth0 features.

::: warning How to Handle Rate Limits when calling Auth0 APIs
For scripts that call Auth0 APIs, you should always handle rate limiting by checking the X-RateLimit-Remaining header and acting appropriately when the number returned nears 0. You should also add logic to handle cases in which you exceed the provided rate limits and receive the HTTP Status Code 429 (Too Many Requests); in this case, if a re-try is needed, it is best to allow for a back-off to avoid going into an infinite re-try loop. For more information about rate limits, see [Rate Limit Policy For Auth0 APIs](/policies/rate-limits).
:::

## Extensibility points

Hooks allow you to customize the behavior of Auth0 with Node.js code, but they are executed only against selected extensibility points, which are the serverless option analogous to the webhooks that come with a server. The following is a list of currently available extensibility points:

- [Credentials Exchange](/hooks/concepts/credentials-exchange-extensibility-point): change the <dfn data-key="scope">scopes</dfn> and add custom claims to the tokens issued by the Auth0 API's `POST /oauth/token` endpoint
- [Pre-User Registration](/hooks/concepts/pre-user-registration-extensibility-point): prevent user registration and add custom metadata to a newly-created user
- [Post-User Registration](/hooks/concepts/post-user-registration-extensibility-point): implement custom actions that execute asynchronously from the Auth0 authentication process after a new user registers and is added to the database
- [Post Change Password](/hooks/guides/post-change-password): Implement custom actions to be executed after a successful user password change.

<%= include('../_includes/_ip_whitelist') %>

## Manage Hooks

Manage Hooks using the Dashboard. With the Dashboard, you can [create](/hooks/guides/create-hooks-using-dashboard) or [delete](/hooks/guides/delete-hooks-using-dashboard) a Hook, [edit an existing Hook](/hooks/guides/edit-hooks-using-dashboard), and [enable or disable an existing Hook](/hooks/guides/enable-disable-hooks-using-dashboard) using the Dashboard.
