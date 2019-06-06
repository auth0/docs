# Planned deprecations

Based on customer feedback, we have adjusted our plans and will continue to maintain and support the below listed endpoints and features.

We will publish guidance for each of the below scenarios on how to transition your applications to standards-based protocols. If we need to make security enhancements to any of these legacy endpoints which would require more urgency, we will promptly announce timeframes and guidelines for any required changes.

## Allow ID Tokens for Management API v2 Authentication

For some use cases you can use [ID Tokens](/tokens/id-token) as credentials in order to call the [Management API](/api/management/v2).

The functionality is available and affected users are encouraged to migrate. However the ability to use ID Tokens will not be disabled in the foreseeable future so the mandatory opt-in date for this migration remains open. When this changes, customers will be notified beforehand.

For more information on this migration and the steps you should follow to upgrade your implementation, see the [Migration Guide: Management API and ID Tokens](/migrations/guides/calling-api-with-idtokens).

## Am I affected by the change?

If you are currently using [ID Tokens](/tokens/id-token) to access any part of the Management API, your application will need to be updated.

## Legacy oauth/ro Endpoint

Support was introduced for [Resource Owner Password](/api/authentication#resource-owner-password) to the [/oauth/token](/api/authentication#authorization-code) endpoint earlier this year.

## Am I affected by the change?

If you are currently implementing the [/oauth/ro](/api/authentication#resource-owner) endpoint your application can be updated to use the [/oauth/token](/api/authentication#authorization-code) endpoint. For details on how to make this transition, see the [Migration Guide for Resource Owner Password Credentials Exchange](/migrations/guides/migration-oauthro-oauthtoken).

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Legacy Delegation Endpoint (API authorization with third-party vendor APIs)

The mechanism by which you get tokens for third-party / vendor APIs (for example AWS, Firebase, and others) is being changed. It will work the same as any custom API, providing better consistency. This new architecture will be available in 2019 and once it becomes available, the [/delegation](/api/authentication#delegation) endpoint will be officially deprecated.

## Am I affected by the change?

If you are currently using [/delegation](/api/authentication#delegation) to provide third party authorization, your application will need to be updated once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).

## Legacy User Profile

The [userinfo](/api/authentication#get-user-info) endpoint is being updated to return [OIDC conformant user profile attributes](/users/normalized/oidc). The most notable change is that `user_id` becomes `sub`. This will deprecate the [legacy Auth0 user profile](/users/normalized/auth0) (in [userinfo](/api/authentication#get-user-info) and in [ID Tokens](/tokens/id-token)).

## Am I affected by the change?

If you are currently using the [/userinfo](/api/authentication#get-user-info) endpoint or receiving ID Tokens, you are affected by this change and need to update your implementation so that it expects normalized OIDC conformant user profile attributes once migration guides are available.

If you have any questions, create a ticket in our [Support Center](${env.DOMAIN_URL_SUPPORT}).
