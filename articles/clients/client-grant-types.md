---
  description: Using the Grant Types property on Clients
  toc: true
---
# Client Grant Types

Auth0 provides many authentication and authorization flows to suit your needs. Depending on your use case, you may wish to limit the use of certain flows (or grant types as we will refer to them) for a particular client. This is controlled using the `grant_types` property that each client has.

## Grant Types

::: note
Not sure which non-legacy grant type is appropriate for your use case? Refer to [Which OAuth 2.0 flow should I use?](/api-auth/which-oauth-flow-to-use) for help.
:::

The following is a list of grant types valid for Auth0 Clients. There are three possible types of authorization flows:

* Grants that conform with specifications (such as [OpenID Connect](https://openid.net/specs/openid-connect-core-1_0.html))
* [Auth0 extension grants](https://tools.ietf.org/html/rfc6749#section-4.5)
* Auth0 legacy grants

The following `grant_types`, are either OIDC-conformant (i.e. their implementation conforms to the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html)) or Auth0 extension grants:

* [Implicit Grant](/api-auth/grant/implicit): `implicit`
* [Authorization Code Grant](/api-auth/grant/authorization-code): `authorization_code`
* [Client Credentials Grant](/api-auth/grant/client-credentials): `client_credentials`
* [Resource Owner Password Grant](/api-auth/grant/password): `password`
* [Use a refresh token](/tokens/refresh-token/current#use-a-refresh-token): `refresh_token`
* [Use an extension grant similar to the Resource Owner Password Grant that includes the ability to indicate a specific realm](/api-auth/grant/password#realm-support): `http://auth0.com/oauth/grant-type/password-realm`
* [Multifactor Authentication OOB Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-oob-grant-request): `http://auth0.com/oauth/grant-type/mfa-oob`
* [Multifactor Authentication OTP Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-otp-grant-request): `http://auth0.com/oauth/grant-type/mfa-otp`
* [Multifactor Authentication Recovery Grant Request](/api-auth/tutorials/multifactor-resource-owner-password#mfa-recovery-grant-request): `http://auth0.com/oauth/grant-type/mfa-recovery-code`

The following is a list of legacy `grant_types`:

* `http://auth0.com/oauth/legacy/grant-type/ro`
* `http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer`
* `http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token`
* `http://auth0.com/oauth/legacy/grant-type/delegation/id_token`
* `http://auth0.com/oauth/legacy/grant-type/access_token`

## Edit available grant_types

You can set the the `grant_types` property for your Auth0 Client using the Management Dashboard.

Begin by navigating to the [Clients page](${manage_url}/#/clients) of the Management Dashboard.

![Auth0 Clients](/media/articles/clients/client-grant-types/clients.png)

Click on the cog icon <i class="icon icon-budicon-329"> next to the Client you're interested in to launch its settings page.

![Auth0 Client Settings](/media/articles/clients/client-grant-types/client-settings.png)

Scroll down to the bottom of the settings page, and click **Advanced Settings**.

![Auth0 Client Advanced Settings](/media/articles/clients/client-grant-types/client-advanced-settings.png)

Switch to the **Grant Types** tab and enable or disable the respective grants for this client. Click **Save Changes**.

![Auth0 Client Grant Types](/media/articles/clients/client-grant-types/grant-types.png)

::: warning
As of 8 June 2017, new Auth0 customers **cannot** add *any* of the legacy grant types to their Clients. Only customers as of 8 June 2017 can add legacy grant types to their existing Clients.
:::

Attempting to use any flow with a client lacking the appropriate `grant_types` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```

### Existing Clients

To avoid changes in functionality for current Auth0 customers, we will populate the `grant_types` property for all existing Clients as of 8 June 2017 with **all** Auth0 legacy, Auth0 extension, and specification-conformant grant types.

### New Clients

Depending on whether a newly-created Client is [public](/api-auth/client-types#public-clients) or [confidential](/api-auth/client-types#confidential-clients), the Client will have varying access to grant types.

### Public Clients

Public Clients, indicated by the `token_endpoint_auth_method` flag set to `none`, are those created in the Dashboard for Native and Single Page Applications. By default, Public Clients are created with the following `grant_types`:

* `implicit`;
* `authorization_code`;
* `refresh_token`.

::: note
Public clients **cannot** utilize the `client_credentials` grant type. To add this grant type to a Client, set the `token_endpoint_auth_method` to `client_secret_post` or `client_secret_basic`. Either of these will indicate the Client is confidential, not public.
:::

### Confidential Clients

Confidential Clients, indicated by the `token_endpoint_auth_method` flag set to anything *except* `none`, are those created in the Dashboard for Regular Web Applications or Non-Interactive Clients. Additionally, any Client where `token_endpoint_auth_method` is unspecified is confidential. By default, Confidential Clients are created with the following `grant_types`:


* `implicit`;
* `authorization_code`;
* `refresh_token`;
* `client_credentials`.

### Trusted First-Party Clients

Trusted first-party clients can additionally use the following `grant_types`:

* `password`
* `refresh_token`
* `http://auth0.com/oauth/grant-type/password-realm`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

## Secure Alternatives to the Legacy Grant Types

| Legacy Grant Type | Alternative |
|:-----|:----|
|Resource Owner Password Credentials flow (http://auth0.com/oauth/legacy/grant-type/ro) | https://${account.namespace}/api/connections | Use the [/oauth/token](/api/authentication#authorization-code) endpoint with a grant type of `password`. See [Resource Owner Password Credentials Exchange](/api-auth/tutorials/adoption/password) and [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant) for additional information. |

<!-- markdownlint-disable MD033 -->

<table class="table">
  <tr>
    <th>Legacy Grant Type</th>
    <th>Alternative</th>
  </tr>
  <tr>
    <td>Resource Owner Password Credentials flow (http://auth0.com/oauth/legacy/grant-type/ro)</td>
    <td>Use the <a href="/api/authentication#authorization-code">`/oauth/token` endpoint</a> with a grant type of `password`. See <a href="/api-auth/tutorials/adoption/password">Resource Owner Password Credentials Exchange</a> and <a href="/api-auth/tutorials/password-grant">Executing the Resource Owner Password Grant</a> for additional information.</td>
  </tr>
  <tr>
    <td>http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer</td>
    <td>This feature is disabled by default. If you would like this feature enabled, please contact support to discuss your use case and prevent the possibility of introducing security vulnerabilities.</td>
  </tr>
  <tr>
    <td>http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token</td>
    <td>Use the `oauth/token` endpoint to <a href="/api-auth/tutorials/adoption/refresh-tokens">obtain refresh tokens</a>. See <a href="/api-auth/tutorials/adoption/refresh-tokens">OIDC-conformant refresh tokens</a> for additional information.</td>
  </tr>
  <tr>
    <td>http://auth0.com/oauth/legacy/grant-type/delegation/id_token</td>
    <td>This feature is disabled by default. If you would like this feature enabled, please contact support to discuss your use case and prevent the possibility of introducing security vulnerabilities.</td>
  </tr>
  <tr>
    <td>http://auth0.com/oauth/legacy/grant-type/access_token</td>
    <td>Use browser-based social authentication.</td>
  </tr>
</table>

<!-- markdownlint-enable MD033 -->

::: note
Those implementing Passwordless Authentication should use hosted login pages instead of the `oauth/ro` endpoint.
:::

## Enable a Legacy Grant Type

::: warning
Only Auth0 customers as of 8 June 2017 may enable a legacy grant type for existing Clients.
:::

To enable a legacy grant type, you will need to update the `grant_types` property for you client, so it can be used. For details on how to do so refer to [Edit the grant_types Property](#edit-the-grant_types-property).

::: note
If you are a new customer and you are interested in using a legacy flow, please [contact Support for assistance](https://support.auth0.com/).
:::
