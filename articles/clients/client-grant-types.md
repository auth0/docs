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

Auth0 requires the `grant_type` property. Attempting to use *any* flow with a Client lacking the appropriate `grant_type` for that flow (or with the field empty) will result in the following error:

```text
Grant type `grant_type` not allowed for the client.
```

### Existing Clients

To avoid changes in functionality for current Auth0 customers, we will populate the `grant_types` property for all existing Clients as of TBD with **all** Auth0 legacy, Auth0 extension, and specification-conformant grant types.

### New Clients

Depending on whether a newly-created Client is **public** or **confidential**, the Client will have varying access to grant types.

### Public Clients

Public Clients, indicated by the `token_endpoint_auth_method` flag set to `none`, are those created in the Dashboard for Native and Single Page Applications. They can be set to the following grant types:

* `implicit`;
* `authorization_code`;
* `refresh_token`.

### Confidential Clients

Confidential Clients, indicated by the `token_endpoint_auth_method` flag set to anything *except* `none`, are those created in the Dashboard for Regular Web Applications or Non-Interactive Clients. Additionally, any Client where `token_endpoint_auth_method` is unspecified is confidential. Confidential Clients can be set to the following grant types:


* `implicit`;
* `authorization_code`;
* `refresh_token`;
* `client_credentials`.

### Trusted First-Party Clients

When creating a new Client via the [Management Dashboard](${manage_url}), Auth0 sets the `is_first_party` flag to `true`.

The Client can therefore use any of the following grant types:

* `implicit`
* `authorization_code`
* `client_credentials`
* `password`
* `refresh_token`
* `http://auth0.com/oauth/grant-type/password-realm`
* `http://auth0.com/oauth/grant-type/mfa-oob`
* `http://auth0.com/oauth/grant-type/mfa-otp`
* `http://auth0.com/oauth/grant-type/mfa-recovery-code`

## Secure Alternatives to the Legacy Grant Types

<table class="table">
  <tr>
    <th>Legacy Grant Type</th>
    <th>Alternative</th>
  </tr>
  <tr>
    <td>Resource Owner Password Credentials flow (`http://auth0.com/oauth/legacy/grant-type/ro`)</td>
    <td>Use the <a href="/api/authentication#authorization-code">`/oauth/token` endpoint</a> with a grant type of `password`. See <a href="/api-auth/tutorials/adoption/password">Resource Owner Password Credentials Exchange</a> and <a href="/api-auth/tutorials/password-grant">Executing the Resource Owner Password Grant</a> for additional information.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/ro/jwt-bearer`</td>
    <td>This feature is disabled by default due to security implications. If you would like this feature enabled, please contact support to discuss your use case and prevent the possibility of introducing security vulnerabilities.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/delegation/refresh_token`</td>
    <td>Use the `oauth/token` endpoint to <a href="/api-auth/tutorials/adoption/refresh-tokens">obtain refresh tokens</a>. See <a href="/api-auth/tutorials/adoption/refresh-tokens">OIDC-conformant refresh tokens</a> for additional information.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/delegation/id_token`</td>
    <td>This feature is disabled by default due to security implications. If you would like this feature enabled, please contact support to discuss your use case and prevent the possibility of introducing security vulnerabilities.</td>
  </tr>
  <tr>
    <td>`http://auth0.com/oauth/legacy/grant-type/access_token`</td>
    <td>Use browser-based social authentication.</td>
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
