---
description: Using the Grant Types property on Applications
toc: true
topics:
  - applications
  - grant-types
contentType: 
    - reference
    - concept
    - how-to
useCase:
  - build-an-app
---
# Application Grant Types

Auth0 provides many different authentication and authorization flows to suit your needs. For example, if you are securing a mobile app, you'd use the [Authorization Code using Proof Key for Code Exchange (PKCE) OAuth 2.0 Grant](/api-auth/grant/authorization-code-pkce), or if you're securing a client-side app (such as a mobile app that's *not* native), you'd use the [Implicit Grant](api-auth/grant/implicit).

However, you might want to limit the use of certain flows (which we'll refer to as "grant types" in this doc) depending on the type of app you're securing. You can set and manage these limitations using the `grant_types` property that each Application has.

In this doc, we'll talk about:

* What grant types are
* The grant types available
* How to set the Applications's `grant_type` property
* What grant types are available based on the Applications's `grant_type` property value

## What Grant Types Are

OAuth 2.0 is a protocol that allows you to grant limited access to your resources to another entity without exposing credentials. By using Auth0, you can support different OAuth 2.0 flows without worrying about the technical aspects/implementation.

OAuth 2.0 supports several types of grants, which are methods by which you can gain Access Tokens (string values that represent the permissions granted). Different grant types allow different types of access, and based on the needs of your app, some grant types are more appropriate than others. Auth0 allows you to indicate which sets of permissions are appropriate based on the `grant_type` property.

::: note
Not sure which grant type is appropriate for your use case? Refer to [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use) for help.
:::




### New Applications

Depending on whether a newly-created Application is [public](/applications/client-types#public-applications) or [confidential](/applications/client-types#confidential-applications), the Application will have varying access to grant types. Trusted first-party applications have access to additional grant types.

#### Public Applications

Public Applications, indicated by the `token_endpoint_auth_method` flag set to `none`, are those created in the Dashboard for Native and Single Page Applications. 

::: panel Token Endpoint Authentication Method
The `Token Endpoint Authentication Method` defines how a Application authenticates against the [token endpoint](/api/authentication#authorization-code). Its valid values are:

* `None`, for a public application without a client secret
* `Post`, for a application using HTTP POST parameters
* `Basic`, for a application using HTTP Basic parameters 

You can find this field at the [Application Settings page](${manage_url}/#/applications/${account.clientId}/settings) of the [Auth0 Dashboard](${manage_url}).
:::

By default, Public Applications are created with the following `grant_types`:

* `implicit`
* `authorization_code`
* `refresh_token`

::: note
Public Applications **cannot** utilize the `client_credentials` grant type. To add this grant type to a Application using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id), set the **token_endpoint_auth_method** to `client_secret_post` or `client_secret_basic`. Either of these will indicate the Application is confidential, not public.
:::

#### Confidential Applications

Confidential Applications, indicated by the `token_endpoint_auth_method` flag set to anything *except* `none`, are those created in the Dashboard for Regular Web Applications or Machine to Machine Applications. Additionally, any Application where `token_endpoint_auth_method` is unspecified is confidential. By default, Confidential Applications are created with the following `grant_types`:

* `implicit`;
* `authorization_code`;
* `refresh_token`;
* `client_credentials`.

#### Trusted First-Party Applications

Trusted first-party applications can additionally use the following `grant_types`:

* `password`
* `http://auth0.com/oauth/grant-type/password-realm`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

::: note
If you are using the [Dashboard](${manage_url}) to enable or disable these grant types, note that all the Password and MFA grant types are enabled when you add the `Password` or `MFA` grant type on your Application. You cannot select these individually.
:::
