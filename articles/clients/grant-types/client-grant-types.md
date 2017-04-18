---
  description: Using the Grant Types property on Clients
  toc: true
---

# Client Grant Types

Auth0 provides many authentication and authorization flows that suit your needs, and depending on your use case, you may wish to limit the use of certain grant types for a particular Client. Auth0 includes a `grant_type` property on each Client for this purpose.


## Grant Types

The following is a list of grant types valid for Auth0 Clients. Each of the items represents one of the three types of authorization flows.

There are three possible types of authorization flows:

* Auth0 extension;
* Auth0 legacy;
* Specification-conformant (such as OpenID Connect);

The following is a list of Auth0 extension/OIDC specification-conformant `grant_types` that currently exist for use in Auth0:

* `implicit`
* `authorization_code`
* `client_credentials`
* `password`
* `refresh_token`
* `http://auth0.com/oauth/grant-type/password-realm`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

The following is a list of legacy `grant_types`:

* `http://auth0.com/oauth/legacy/grant-type/ro`
* `http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer`
* `http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token`
* `http://auth0.com/oauth/legacy/grant-type/delegation/id_token`
* `http://auth0.com/oauth/legacy/grant-type/access_token`

## Edit the `grant_type` Property

To edit the `grant_type` property for your Auth0 Client, you'll need to make the appropriate call to the [Update a Client endpoint](/api/management/v2#!/Clients/patch_clients_by_id) of the [Management API](/api/management/v2).

:::panel-warning Legacy Grant Types
As of TBD, new Auth0 customers **cannot** add *any* of the legacy grant types to their Clients. Only customers as of TBD can add legacy grant types to their existing Clients.
:::

Auth0 requires the `grant_type` property. Attempting to use *any* flow with a Client lacking the appropriate `grant_type` for that flow will result in errors.


### Existing Clients

To avoid changes in functionality for current Auth0 customers, we will populate the `grant_types` property for all existing Clients as of TBD with **all** Auth0 legacy, Auth0 extension, and specification-conformant grant types.

### New Clients

When creating a new Client via the [Management Dashboard](${manage_url}), Auth0 sets the following two flags as follows:

* `oidc_conformant`: `false`
* `is_first_party`: `true`

Auth0 then assigns the appropriate default grant type based on the values of these flags.

If you would like to specify alternate values for either of these two options when you create the Client, you will need to [create the client via the Management API](/api/management/v2#!/Clients/post_clients).

Please note that you can toggle the value of `oidc_conformant` at any time using the Management Dashboard in the *Advanced Settings* section of your [Client Settings page](${manage_url}/#/clients/${account.clientId}/settings).

### Determine Client Grant Type

If `is_first_party` is `true`, the Client can use the following grant types (regardless of whether `oidc_conformant` is `true` or `false`):

* `implicit`
* `authorization_code`
* `client_credentials`
* `password`
* `refresh_token`
* `http://auth0.com/oauth/grant-type/password-realm`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

If `is_first_party` is `false` **and** the `oidc_conformant` flag is `true`, the Client can use the following grant types:

* `implicit`
* `authorization_code`
* `client_credentials`
* `refresh_token`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

For third-party Clients, Auth0 limits used of the Password Exchange flows by default. To use this flow, you must explicitly enable it by making the appropriate `PATCH` call to the [Update a Client endpoint](/api/management/v2#!/Clients/patch_clients_by_id) of the [Management API](/api/management/v2).

## Secure Alternatives to the Legacy Grant Types

<table class="table">
  <tr>
    <th>If you want to use this legacy grant type...</th>
    <th>You should...</th>
  </tr>
  <tr>
    <td>Resource Owner Password Credentials flow (`http://auth0.com/oauth/legacy/grant-type/ro`)</td>
    <td>Use the [`/oauth/token` endpoint](/api/authentication#authorization-code) with a grant type of `password`. See [Resource Owner Password Credentials Exchange](/api-auth/tutorials/adoption/password) and [Executing the Resource Owner Password Grant](/api-auth/tutorials/password-grant) for additional information.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer`</td>
    <td>Contact Support for assistance.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token`</td>
    <td>Use the `oauth/token` endpoint to [obtain refresh tokens](/api-auth/tutorials/adoption/refresh-tokens). See [OIDC-conformant refresh tokens](/api-auth/tutorials/adoption/refresh-tokens) for additional information.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/delegation/id_token`</td>
    <td>Contact Support for assistance.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/access_token`</td>
    <td>Contact Support for assistance.</td>
  </tr>
</table>

## Enable a Legacy Grant Type

<div class="alert alert-info">
  <strong>Heads up!</strong> Only Auth0 customers as of TBD may enable a legacy grant type for existing Clients.
</div>

To enable a legacy grant type, you will need to make the appropriate `PATCH` call to the [Update a Client endpoint](/api/management/v2#!/Clients/patch_clients_by_id) of the [Management API](/api/management/v2).

:::panel-info New Customers
If you are a new customer and you are interested in using a legacy flow, please [contact Support for assistance](https://support.auth0.com/).
:::
