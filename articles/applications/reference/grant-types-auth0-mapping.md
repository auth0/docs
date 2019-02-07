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
