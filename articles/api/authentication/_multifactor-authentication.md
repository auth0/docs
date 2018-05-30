# Multifactor Authentication

The Multifactor Authentication (MFA) API endpoints allow you to enforce MFA when users interact with [the Token endpoints](#get-token), as well enroll and manage user authenticators.

First, request a challenge based on the challenge types supported by the application and user. If you know that one-time password (OTP) is supported, you can skip the challenge request.

Next, verify the multifactor authentication using the `/oauth/token` endpoint and the specified challenge type: a one-time password (OTP), a recovery code, or an out-of-band (OOB) challenge.

For more information, check out:

- [Multifactor Authentication and Resource Owner Password](/api-auth/tutorials/multifactor-resource-owner-password)
- [Multifactor Authentication API](/multifactor-authentication/api)
- [Multifactor Authentication in Auth0](/multifactor-authentication)

## Challenge request

```http
POST https://${account.namespace}/mfa/challenge
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
  "mfa_token": "MFA_TOKEN",
  "challenge_type": "oob|otp"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/mfa/challenge' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "challenge_type":"oob otp", "client_id": "${account.clientId}", "client_secret": "YOUR_CLIENT_SECRET"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/mfa/challenge',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     challenge_type: 'oob otp',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR OTP:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "challenge_type":"otp",
}
```

> RESPONSE SAMPLE FOR OOB WITHOUT BINDING METHOD:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "challenge_type":"oob",
  "oob_code": "abcde...dasg"
}
```

> RESPONSE SAMPLE FOR OOB WITH BINDING METHOD:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "challenge_type":"oob",
  "binding_method":"prompt",
  "oob_code": "abcde...dasg"
}
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/mfa/challenge",
  "link": "#multifactor-authentication"
}) %>

Request a challenge based on the challenge types supported by the application and user.

The `challenge_type` is how the user will get the challenge and prove possession. Supported challenge types include:

- `otp`: for one-time password (OTP)
- `oob`: for SMS messages or out-of-band (OOB)

If OTP is supported by the user and you don't want to request a different factor, you can skip the challenge request and [verify the multifactor authentication with a one-time password](#verify-with-one-time-password-otp-).

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `mfa_token` <br/><span class="label label-danger">Required</span> | The token received from `mfa_required` error. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `challenge_type` | A whitespace-separated list of the challenges types accepted by your application. Accepted challenge types are `oob` or `otp`. Excluding this parameter means that your client application accepts all supported challenge types. |
| `oob_channel` | **(early access users only)** The channel to use for OOB. Can only be provided when `challenge_type` is `oob`. Accepted channel types are `sms` or `auth0`. Excluding this parameter means that your client application will accept all supported OOB channels. |
| `authenticator_id` | **(early access users only)** The ID of the authenticator to challenge. You can get the ID by querying the list of available authenticators for the user as explained on [List authenticators](#list-authenticators) below. |

### Remarks

- This endpoint does not support enrollment; the user must be enrolled with the preferred method before requesting a challenge.
- Auth0 chooses the challenge type based on the application's supported types and types the user is enrolled with.
- An `unsupported_challenge_type` error is returned if your application does not support any of the challenge types the user has enrolled with.
- An `unsupported_challenge_type` error is returned if the user is not enrolled.
- **(early access only)** If the user is not enrolled, you will get a `association_required` error, indicating the user needs to enroll to use MFA. Check [Add an authenticator](#add-an-authenticator) below on how to proceed.

### More information

- [Trigger MFA using the API](/multifactor-authentication/api/challenges)

## Verify with one-time password (OTP)

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
  "mfa_token": "MFA_TOKEN",
  "grant_type": "http://auth0.com/oauth/grant-type/mfa-otp",
  "otp": "OTP_CODE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "otp":"OTP_CODE", "grant_type": "http://auth0.com/oauth/grant-type/mfa-otp", "client_id": "${account.clientId}", "client_secret": "YOUR_CLIENT_SECRET"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     otp: 'OTP_CODE',
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-otp',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR OTP:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#multifactor-authentication"
}) %>

Verifies multifactor authentication (MFA) using a one-time password (OTP).

To verify MFA with an OTP, prompt the user to get the OTP code, then make a request to the `/oauth/token` endpoint. The request must have the OTP code, the `mfa_token` you received (from the `mfa_required` error), and the `grant_type` set to `http://auth0.com/oauth/grant-type/mfa-otp`.

The response is the same as responses for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types.

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-otp`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The `mfa_token` you received from `mfa_required` error. |
| `otp` <br/><span class="label label-danger">Required</span> | OTP Code provided by the user. |

### More informationm

- [Associate an OTP Authenticator](/multifactor-authentication/api/otp)

## Verify with out-of-band (OOB)

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
  "mfa_token": "MFA_TOKEN",
  "grant_type": "http://auth0.com/oauth/grant-type/mfa-oob",
  "oob_code": "OOB_CODE",
  "binding_code": "BINDING_CODE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "oob_code": "OOB_CODE", "binding_code": "BINDING_CODE", "grant_type": "http://auth0.com/oauth/grant-type/mfa-oob", "client_id": "${account.clientId}", "client_secret": "YOUR_CLIENT_SECRET"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     oob_code: "OOB_CODE",
     binding_code: "BINDING_CODE"
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR PENDING CHALLENGE:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "error":"authorization_pending",
  "error_description":"Authorization pending: please repeat the request in a few seconds."
}
```

> RESPONSE SAMPLE FOR VERIFIED CHALLENGE:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400
}
```

> RESPONSE SAMPLE FOR REJECTED CHALLENGE:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "error":"invalid_grant",
  "error_description":"MFA Authorization rejected."
}
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#multifactor-authentication"
}) %>

Verifies multifactor authentication (MFA) using an out-of-band (OOB) challenge (either Push notification or SMS).

To verify MFA using an OOB challenge your application must make a request to `/oauth/token` with `grant_type=http://auth0.com/oauth/grant-type/mfa-oob`. Include the `oob_code` you received from the challenge response, as well as the `mfa_token` you received as part of `mfa_required` error.

The response to this request depends on the status of the underlying challenge verification:
- If the challenge has been accepted and verified: it will be the same as `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types.
- If the challenge has been rejected, you will get an `invalid_grant` error, meaning that the challenge was rejected by the user. At this point you should stop polling, as this response is final.
- If the challenge verification is still pending (meaning it has not been accepted nor rejected) you will get an `authorization_pending` error, meaning that you must retry the same request a few seconds later. If you request too frequently you will get a `slow_down` error.

When the challenge response includes a `binding_method: prompt` your app needs to prompt the user for the `binding_code` and send it as part of the request. The `binding_code` is a usually a 6 digit number (similar to an OTP) included as part of the challenge.  No `binding_code` is necessary if the challenge response did not include a `binding_method`. In this scenario the response will be immediate; you will receive an `invalid_grant` or an `access_token` as response.

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-oob`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The `mfa_token` you received from `mfa_required` error. |
| `oob_code` <br/><span class="label label-danger">Required</span> | The oob code received from the challenge request. |
| `binding_code`| A code used to bind the side channel (used to deliver the challenge) with the main channel you are using to authenticate. This is usually an OTP-like code delivered as part of the challenge message. |

### More informationm

- [Associate an Out-of-Band Authenticator](/multifactor-authentication/api/oob)

## Verify with recovery code

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/json
{
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
  "mfa_token": "MFA_TOKEN",
  "grant_type": "http://auth0.com/oauth/grant-type/mfa-recovery-code",
  "recovery_code": "RECOVERY_CODE"
}
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/json' \
  --data '{"mfa_token":"MFA_TOKEN", "recovery_code":"RECOVERY_CODE", "grant_type": "http://auth0.com/oauth/grant-type/mfa-recovery-code", "client_id": "${account.clientId}", "client_secret": "YOUR_CLIENT_SECRET"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { mfa_token: 'MFA_TOKEN',
     recovery_code: 'RECOVERY_CODE',
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-recover-code',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR OTP:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "access_token":"eyJz93a...k4laUWw",
  "token_type":"Bearer",
  "expires_in":86400,
  "recovery_code": "abcdefg"
}
```

<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/oauth/token",
  "link": "#multifactor-authentication"
}) %>

Verifies multifactor authentication (MFA) using a recovery code.

Some multifactor authentication (MFA) providers (such as Guardian) support using a recovery code to login. Use this method to authenticate when the user's enrolled device is unavailable, or the user cannot receive the challenge or accept it due to connectivity issues.

To verify MFA using a recovery code your app must prompt the user for the recovery code, and then make a request to `oauth/token` with `grant_type=http://auth0.com/oauth/grant-type/mfa-recovery-code`. Include the collected recovery code and the `mfa_token` from the `mfa_required` error. If the recovery code is accepted the response will be the same as for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types. It might also include a `recovery_code` field, which the application must display to the end-user to be stored securely for future use.

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-otp`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field at your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The `mfa_token` you received from `mfa_required` error. |
| `recovery_code` <br/><span class="label label-danger">Required</span> | Recovery code provided by the end-user.

## Add an authenticator

```http
POST https://${account.namespace}/mfa/associate
Content-Type: application/json
Authorization: Bearer ACCESS_TOKEN or MFA_TOKEN
{
  "client_id": "${account.clientId}",
  "client_secret": "YOUR_CLIENT_SECRET",
  "authenticator_types": ["oob"],
  "oob_channels": "sms",
  "phone_number": "+1 555 123456"
}
```


```shell
curl --request POST \
  --url 'https://${account.namespace}/mfa/associate' \
  --header 'authorization: Bearer ACCESS_TOKEN or MFA_TOKEN' \
  --header 'content-type: application/json' \
  --data '{"client_id": "${account.clientId}", "client_secret": "YOUR_CLIENT_SECRET", "authenticator_types":["oob"], "oob_channels":"sms", "phone_number": "+1 555 123456"}'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/mfa/associate',
  headers: {
    'authorization': 'Bearer TOKEN',
    'content-type': 'application/json'
  },
  body:
   { client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET',
     authenticator_types: ["oob"],
     oob_channels: "sms",
     phone_number: "+1 555 123456" },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE FOR OOB (SMS channel):
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "oob_code": "Fe26.2**da6....",
  "binding_method":"prompt",
  "authenticator_type":"oob",
  "oob_channel":"sms",
  "recovery_codes":["ABCDEFGDRFK75ABYR7PH8TJA"],
}
```

> RESPONSE SAMPLE FOR OOB (Auth0 channel):
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "oob_code": "Fe26.2**da6....",
  "barcode_uri":"otpauth://...",
  "authenticator_type":"oob",
  "oob_channel":"auth0",
  "recovery_codes":["ABCDEFGDRFK75ABYR7PH8TJA"],
}
```

> RESPONSE SAMPLE FOR OTP:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
{
  "secret": "ABCDEFGMK5CE6WTZKRTTQRKUJVFXOVRF",
  "barcode_uri":"otpauth://...",
  "authenticator_type":"otp",
  "recovery_codes":["ABCDEFGDRFK75ABYR7PH8TJA"],
}
```
<%= include('../../_includes/_http-method', {
  "http_badge": "badge-success",
  "http_method": "POST",
  "path": "/mfa/associate",
  "link": "#multifactor-authentication"
}) %>

::: warning
This endpoint is still under development. It is available to customers with early access.
:::

Associates or adds a new authenticator for multifactor authentication.

If the user has active authenticators, an [Access Token](/tokens/access-token) with the `enroll` scope and the `audience` set to `https://${account.namespace}/mfa/` is required to use this endpoint.

If the user has no active authenticators, you can use the `mfa_token` from the `mfa_required` error in place of an [Access Token](/tokens/access-token) for this request.

After an authenticator is added it must be verified. To verify the authenticator, use the response values from the `/mfa/associate` request in place of the values returned from the `/mfa/challenge` endpoint and continue with the verification flow.

A `recovery_codes` field is included in the response the first time an authenticator is added. You can use `recovery_codes` to pass multifactor authentication as shown on [Verify with recovery code](#verify-with-recovery-code) above.

To access this endoint you must set an [Access Token](/tokens/access-token) at the Authorization header, with the following claims:
- `scope`: `enroll`
- `audience`: `https://${account.namespace}/mfa/`

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_secret` | Your application's Client Secret. **Required** when the **Token Endpoint Authentication Method** field in your [Client Settings](${manage_url}/#/clients/${account.clientId}/settings) is `Post` or `Basic`. |
| `authenticator_types` <br/><span class="label label-danger">Required</span> | The type of authenticators supported by the client. Value is an array with values `"otp"` or `"oob"`. |
| `oob_channel` | The type of OOB channels supported by the client. An array with values `"auth0"` or `"sms"`. Required if `authenticator_types` include `oob`. |
| `phone_number` | The phone number to use for SMS. Required if `oob_channel` includes `sms`. |

### More information

- [Multifactor Authentication API](/multifactor-authentication/api)

## List authenticators

```http
GET https://${account.namespace}/mfa/authenticators
Content-Type: application/json
Authorization: Bearer ACCESS_TOKEN
```

```shell
curl --request GET \
  --url 'https://${account.namespace}/mfa/authenticators' \
  --header 'authorization: Bearer ACCESS_TOKEN' \
  --header 'content-type: application/json'
```

```javascript
var request = require("request");

var options = { method: 'GET',
  url: 'https://${account.namespace}/mfa/authenticators',
  headers: {
    'authorization': 'Bearer ACCESS_TOKEN',
    'content-type': 'application/json'
  },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:
```JSON
HTTP/1.1 200 OK
Content-Type: application/json
[
  {
    "id":"recovery-code|dev_DsvzGfZw2Fg5N3rI",
    "authenticator_type":"recovery-code",
    "active":true
  },
  {
    "id":"sms|dev_gB342kcL2K22S4yB",
    "authenticator_type":"oob",
    "oob_channel":"sms",
    "name":"+X XXXX1234",
    "active":true
  },
  {
    "id":"sms|dev_gB342kcL2K22S4yB",
    "authenticator_type":"oob",
    "oob_channel":"sms",
    "name":"+X XXXX1234",
    "active":false
  },
  {
    "id":"push|dev_433sJ7Mcwj9P794y",
    "authenticator_type":"oob",
    "oob_channel":"auth0",
    "name":"John's Device",
    "active":true
  },
    {
    "id":"totp|dev_LJaKaN5O3tjRFOw2",
    "authenticator_type":"otp",
    "active":true
  }
]
```
<%= include('../../_includes/_http-method', {
  "http_badge": "badge-primary",
  "http_method": "GET",
  "path": "/mfa/authenticators",
  "link": "#multifactor-authentication"
}) %>

::: warning
This endpoint is still under development. It is available to customers with early access.
:::

Returns a list of authenticators associated with your application.

To access this endoint you must set an [Access Token](/tokens/access-token) at the Authorization header, with the following claims:
- `scope`: `read:authenticators`
- `audience`: `https://${account.namespace}/mfa/`

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `ACCESS_TOKEN` <br/><span class="label label-danger">Required</span> | The `access_token` obtained during login. |


#### More information

- [Manage Authenticators: List Authenticators](/multifactor-authentication/api/manage#list-authenticators)

## Delete an authenticator

```http
DELETE https://${account.namespace}/mfa/authenticators/AUTHENTICATOR_ID
Authorization: Bearer ACCESS_TOKEN
```

```shell
curl --request DELETE \
  --url 'https://${account.namespace}/mfa/authenticators/AUTHENTICATOR_ID' \
  --header 'authorization: Bearer ACCESS_TOKEN' \
```

```javascript
var request = require("request");

var options = { method: 'DELETE',
  url: 'https://${account.namespace}/mfa/authenticators/AUTHENTICATOR_ID',
  headers: {
    'authorization': 'Bearer ACCESS_TOKEN',
    'content-type': 'application/json'
  },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

> RESPONSE SAMPLE:
```JSON
HTTP/1.1 204 OK
```
<%= include('../../_includes/_http-method', {
  "http_badge": "badge-warning",
  "http_method": "DELETE",
  "path": "/mfa/authenticators",
  "link": "#multifactor-authentication"
}) %>

::: warning
This endpoint is still under development. It is available to customers with early access.
:::

Deletes an associated authenticator using its ID.

You can get authenticator IDs by [listing the authenticators](#list-authenticators).

To access this endoint you must set an [Access Token](/tokens/access-token) at the Authorization header, with the following claims:
- `scope`: `remove:authenticators`
- `audience`: `https://${account.namespace}/mfa/`


### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `ACCESS_TOKEN` <br/><span class="label label-danger">Required</span> | The `access_token` obtained during login. |
| `AUTHENTICATOR_ID` <br/><span class="label label-danger">Required</span> | The ID of the authenticator to delete.

### More information

- [Manage Authenticators: Delete Authenticators](/multifactor-authentication/api/manage#delete-authenticators)
