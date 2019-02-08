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

To allow you to customize your implementation, we provide various extensibility points for use with Hooks:

- **Credentials Exchange**: Allows you to change scopes and add custom claims to [Access Tokens](/tokens/overview-access-tokens) issued by [Auth0 API's `POST /oauth/token` endpoint](/api/authentication#authorization-code) during runtime. For more info, see [Credentials Exchange Extensibility Point](/hooks/concepts/credentials-exchange-extensibility-point).

- **Pre-User-Registration**: Allows you to add custom data points to a newly-created user's profile. For use with Database Connections only. For more info, see [Pre-User-Registration Extensibility Point](/hooks/concepts/pre-user-registration-extensibility-point).

- **Post-User-Registration**: Allows you to implement custom actions that execute after a new user registers and is added to the database. For use with Database Connections only. For more info, see [Post-User-Registration Extensibility Point](/hooks/concepts/post-user-registration-extensibility-point).
