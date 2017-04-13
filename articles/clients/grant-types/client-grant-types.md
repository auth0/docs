---
  description: Using the Grant Types property on Clients
  toc: true
---

# Client Grant Types

Depending on your use case, Auth0 provides many authorization flows that suit your needs. As such, you'll need to track the type of flow you're using for a given client. As such, Auth0 includes a `grant_type` property on each Client for this purpose.

## Grant Types

The following is a list of grant types valid for Auth0 Clients. Each of the items represents one of the three types of authorization flows.

There are three possible types of authorization flows:

* Auth0-customized;
* Legacy;
* OIDC specification-conformant.

The following is a list of Auth0-customized/OIDC specification-conformant `grant_types` that currently exist for use in Auth0:

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
New Auth0 customers **cannot** add *any* of the legacy grant types to their Clients. Only customers as of TBD can add legacy grant types to their existing Clients.
:::

Auth0 requires the `grant_type` property, so using a Client *without* this property populated results in errors.

### Existing Clients

For existing Clients, Auth0 will populate the `grant_type` property with the correct value so that this change doesn't affect functionality.

### New Clients

At creation, new Clients (regardless of whether the owning tenant exists or is new), will be assigned the appropriate default grant type depending on the following two Client flags:

* `oidc_conformant`: This flag is `true` if you've enabled the **OIDC Conformant** slider in the *Advanced Settings* section of your Client Settings page.
* `is_first_party`: By default, all new Clients will have this flag set to `true`.

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
    <th>Consider using one of these instead</th>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/ro`</td>
    <td></td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer`</td>
    <td></td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token`</td>
    <td></td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/delegation/id_token`</td>
    <td></td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/access_token`</td>
    <td></td>
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
