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

Auth0 provides many different authentication and authorization flows to suit your needs. For example, if you are securing a mobile app, you'd use the [Authorization Code using Proof Key for Code Exchange (PKCE) OAuth 2.0 Grant](/flows/concepts/mobile-login-flow), or if you're securing a client-side app (such as a mobile app that's *not* native), you'd use the [Implicit Grant](/flows/concepts/single-page-login-flow).

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

## Grant Types Available

The following is a list of grant types valid for Auth0 Applications. The grant types can be divided into three different categories:

* Grants that conform with specifications (such as [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html))
* [Auth0 extension grants](https://tools.ietf.org/html/rfc6749#section-4.5)
* Auth0 legacy grants

The following `grant_types`, are either:

* OIDC-conformant (that is, their implementation conforms to the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html))
* Auth0 extension grants

| `grant_type` | More info |
|:-----|:----|
| `implicit` | [Implicit Grant](/flows/concepts/single-page-login-flow) |
| `authorization_code` | [Authorization Code Grant](/flows/concepts/regular-web-app-login-flow) |
| `client_credentials` | [Client Credentials Grant](/flows/concepts/m2m-flow) |
| `password` | [Resource Owner Password Grant](/api-auth/grant/password) |
| `refresh_token` | [Use a Refresh Token](/tokens/refresh-token/current#use-a-refresh-token) |
| `http://auth0.com/oauth/grant-type/password-realm` | [Use an extension grant similar to the Resource Owner Password Grant that includes the ability to indicate a specific realm](/api-auth/grant/password#realm-support) |
| `http://auth0.com/oauth/grant-type/mfa-oob` | [Multi-factor Authentication OOB Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-oob-grant-request) |
| `http://auth0.com/oauth/grant-type/mfa-otp` | [Multi-factor Authentication OTP Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-otp-grant-request) |
| `http://auth0.com/oauth/grant-type/mfa-recovery-code` | [Multi-factor Authentication Recovery Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-recovery-grant-request) |

The following are legacy grant types:

* `http://auth0.com/oauth/legacy/grant-type/ro`
* `http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer`
* `http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token`
* `http://auth0.com/oauth/legacy/grant-type/delegation/id_token`
* `http://auth0.com/oauth/legacy/grant-type/access_token`

## How to Edit the Application's `grant_types` Property

You can set the `grant_types` property for your Auth0 Application using the Management Dashboard.

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add *any* of the legacy grant types to their Applications. Only customers as of 8 June 2017 can add legacy grant types to their existing Applications.
:::

Begin by navigating to the [Applications page](${manage_url}/#/applications) of the Management Dashboard.

![Auth0 Applications](/media/articles/clients/client-grant-types/clients.png)

Click on the cog icon <i class="icon icon-budicon-329"></i> next to the Application you're interested in to launch its settings page.

![Auth0 Application Settings](/media/articles/clients/client-grant-types/client-settings.png)

Scroll down to the bottom of the settings page, and click **Advanced Settings**.

![Auth0 Application Advanced Settings](/media/articles/clients/client-grant-types/client-advanced-settings.png)

Switch to the **Grant Types** tab and enable or disable the respective grants for this application. Click **Save Changes**.

![Auth0 Application Grant Types](/media/articles/clients/client-grant-types/grant-types.png)

### Use the Management API

In addition to setting the `grant_types` value using the Dashboard, you can make a [`PATCH` call to the Update an Application endpoint](/api/management/v2#!/Clients/patch_applications_by_id) of the Management API to update the `grant_types` field.

### Errors

Attempting to use any flow with a Application lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```

## Information for Existing and New Auth0 Customers

As of 8 June 2017, all Auth0 Applications have a `grant_types` property that **must** be populated. Here's how Auth0 will handle this change based on whether you're a current customer with an existing Application or a new customer.

### Existing Applications

To avoid changes in functionality for current Auth0 customers, we will populate the `grant_types` property for all existing Applications as of 8 June 2017 with **all** Auth0 legacy, Auth0 extension, and specification-conformant grant types.

### New Applications

Your newly-created Application will have access to different grant types based on whether it is [public or confidential](/applications/application-types#confidential-vs-public-applications).

Trusted first-part applications have access to additional grant types.

#### Public Applications

Public applications are those created in the Dashboard for **Native Applications** and **Single Page Applications**. The application's `token_endpoint_auth_method` flag is set to `none`.

By default, Public Applications are created with the following `grant_types`:

* `implicit`
* `authorization_code`
* `refresh_token`

::: note
Public Applications **cannot** utilize the `client_credentials` grant type. To add this grant type to a Application using the [Management API](/api/management/v2#!/Clients/patch_clients_by_id), set the **token_endpoint_auth_method** to `client_secret_post` or `client_secret_basic`. Either of these will indicate the Application is confidential, not public.
:::

#### Confidential Applications

Confidential applications are created in the Dashboard for **Regular Web Applications** or **Machine-to-Machine Applications**. The application's `token_endpoint_auth_method` flag can be set to any value *except* `none`. By default, Auth0 creates confidential applications with the following `grant_types` enabled:

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

## Secure Alternatives to the Legacy Grant Types

If you're currently using a legacy grant type, refer to the chart below to see which of the secure alternatives you should use instead.

| Legacy Grant Type | Alternative |
|:-----|:----|
|`http://auth0.com/oauth/legacy/grant-type/ro` | Use the [/oauth/token](/api/authentication#authorization-code) endpoint with a grant type of `password`. See [Resource Owner Password Credentials Exchange](/api-auth/tutorials/adoption/password) and [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant) for additional information. |
| `http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer` | This feature is disabled by default. If you would like this feature enabled, please [contact support](https://support.auth0.com/) to discuss your use case and prevent the possibility of introducing security vulnerabilities. |
| `http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token` | Use the `oauth/token` endpoint to obtain Refresh Tokens. See [OIDC-conformant Refresh Tokens](/api-auth/tutorials/adoption/refresh-tokens) for more info. |
| `http://auth0.com/oauth/legacy/grant-type/delegation/id_token` | This feature is disabled by default. If you would like this feature enabled, please [contact support](https://support.auth0.com/) to discuss your use case and prevent the possibility of introducing security vulnerabilities. |
| `http://auth0.com/oauth/legacy/grant-type/access_token` | Use browser-based social authentication. |

::: note
Those implementing Passwordless Authentication should use [Universal Login](/hosted-pages/login) instead of the `oauth/ro` endpoint.
:::

## Enable a Legacy Grant Type

::: warning
As of 8 June 2017, new Auth0 customers cannot add any of the legacy grant types to their applications. Legacy grant types are only available for previous customers while they migrate to new flows, to avoid breaking changes. To find the secure alternative for your case refer to [Secure Alternatives to the Legacy Grant Types](#secure-alternatives-to-the-legacy-grant-types).
:::

To enable a legacy grant type, you will need to update the `grant_types` property for you Application appropriately. For details on how to do so, refer to [Edit the grant_types Property](#edit-available-grant_types).
