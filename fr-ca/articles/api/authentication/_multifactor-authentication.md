# Multi-factor Authentication

The <dfn data-key="multifactor-authentication">Multi-factor Authentication (MFA)</dfn> API endpoints allow you to enforce MFA when users interact with [the Token endpoints](#get-token), as well as enroll and manage user authenticators.

First, request a challenge based on the challenge types supported by the application and user. If you know that one-time password (OTP) is supported, you can skip the challenge request.

Next, verify the multi-factor authentication using the `/oauth/token` endpoint and the specified challenge type: a one-time password (OTP), a recovery code, or an out-of-band (OOB) challenge.

To learn more, read:

- [Multi-factor Authentication and Resource Owner Password](/mfa/guides/mfa-api/multifactor-resource-owner-password)
- [Multi-factor Authentication API](/mfa/concepts/mfa-api)
- [Multi-factor Authentication in Auth0](/mfa)

## Challenge Request

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

Request a challenge for <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> based on the challenge types supported by the application and user.

The `challenge_type` is how the user will get the challenge and prove possession. Supported challenge types include:

- `otp`: for one-time password (OTP)
- `oob`: for SMS/Voice messages or out-of-band (OOB)

If OTP is supported by the user and you don't want to request a different factor, you can skip the challenge request and [verify the multi-factor authentication with a one-time password](#verify-with-one-time-password-otp-).

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `mfa_token` <br/><span class="label label-danger">Required</span> | The token received from `mfa_required` error. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_assertion`| A JWT containing a signed assertion with your application credentials. Required when Private Key JWT is your application authentication method.|
| `client_assertion_type`| The value is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.  Required when Private Key JWT is the application authentication method.|
| `client_secret` | Your application's Client Secret. Required when the Token Endpoint Authentication Method field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `challenge_type` | A whitespace-separated list of the challenges types accepted by your application. Accepted challenge types are `oob` or `otp`. Excluding this parameter means that your client application accepts all supported challenge types. |
| `authenticator_id` | The ID of the authenticator to challenge. You can get the ID by querying the list of available authenticators for the user as explained on [List authenticators](#list-authenticators) below. |

### Remarks

- This endpoint does not support enrollment; the user must be enrolled with the preferred method before requesting a challenge.
- Auth0 chooses the challenge type based on the application's supported types and types the user is enrolled with.
- An `unsupported_challenge_type` error is returned if your application does not support any of the challenge types the user has enrolled with.
- An `unsupported_challenge_type` error is returned if the user is not enrolled.
- If the user is not enrolled, you will get a `association_required` error, indicating the user needs to enroll to use MFA. Read [Add an authenticator](#add-an-authenticator) below on how to proceed.

### Learn More

* [Authenticate With Resource Owner Password Grant and MFA](/mfa/guides/mfa-api/authenticate)
* [Manage Authenticator Factors using the MFA API](/mfa/guides/mfa-api/manage)

## Verify with One-Time Password (OTP)

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&mfa_token=MFA_TOKEN&grant_type=http%3A%2F%2Fauth0.com%2Foauth%2Fgrant-type%2Fmfa-otp&otp=OTP_CODE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'mfa_token=MFA_TOKEN&otp=OTP_CODE&grant_type=http://auth0.com/oauth/grant-type/mfa-otp&client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { mfa_token: 'MFA_TOKEN',
     otp: 'OTP_CODE',
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-otp',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' }
   };

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

Verifies <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> using a one-time password (OTP).

To verify MFA with an OTP, prompt the user to get the OTP code, then make a request to the `/oauth/token` endpoint. The request must have the OTP code, the `mfa_token` you received (from the `mfa_required` error), and the `grant_type` set to `http://auth0.com/oauth/grant-type/mfa-otp`.

The response is the same as responses for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types.

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA use  `http://auth0.com/oauth/grant-type/mfa-otp`. |
| `client_id` | Your application's Client ID. |
| `client_assertion`| A JWT containing a signed assertion with your application credentials. Required when Private Key JWT is your application authentication method.|
| `client_assertion_type`| The value is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.  Required when Private Key JWT is the application authentication method. |
| `client_secret` | Your application's Client Secret. Required when the Token Endpoint Authentication Method field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The `mfa_token` you received from `mfa_required` error. |
| `otp` <br/><span class="label label-danger">Required</span> | OTP Code provided by the user. |

### Learn More

- [Associate OTP Authenticators](/mfa/guides/mfa-api/otp)

## Verify with Out-of-Band (OOB)

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&mfa_token=MFA_TOKEN&grant_type=http%3A%2F%2Fauth0.com%2Foauth%2Fgrant-type%2Fmfa-oob&oob_code=OOB_CODE&binding_code=BINDING_CODE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&mfa_token=MFA_TOKEN&grant_type=http://auth0.com/oauth/grant-type/mfa-oob&oob_code=OOB_CODE&binding_code=BINDING_CODE'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { mfa_token: 'MFA_TOKEN',
     oob_code: "OOB_CODE",
     binding_code: "BINDING_CODE"
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' }
   };

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

Verifies <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> using an out-of-band (OOB) challenge (either Push notification, SMS, or Voice).

To verify MFA using an OOB challenge, your application must make a request to `/oauth/token` with `grant_type=http://auth0.com/oauth/grant-type/mfa-oob`. Include the `oob_code` you received from the challenge response, as well as the `mfa_token` you received as part of `mfa_required` error.

The response to this request depends on the status of the underlying challenge verification:
- If the challenge has been accepted and verified, it will be the same as `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types.
- If the challenge has been rejected, you will get an `invalid_grant` error, meaning that the challenge was rejected by the user. At this point you should stop polling, as this response is final.
- If the challenge verification is still pending (meaning it has not been accepted nor rejected), you will get an `authorization_pending` error, meaning that you must retry the same request a few seconds later. If you request too frequently, you will get a `slow_down` error.

When the challenge response includes a `binding_method: prompt`, your app needs to prompt the user for the `binding_code` and send it as part of the request. The `binding_code` is usually a 6-digit number (similar to an OTP) included as part of the challenge.  No `binding_code` is necessary if the challenge response did not include a `binding_method`. In this scenario, the response will be immediate; you will receive an `invalid_grant` or an `access_token` as response.

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For OTP MFA, use  `http://auth0.com/oauth/grant-type/mfa-oob`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_assertion`| A JWT containing a signed assertion with your application credentials. Required when Private Key JWT is your application authentication method.|
| `client_assertion_type`| The value is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.  Required when Private Key JWT is the application authentication method.|
| `client_secret` | Your application's Client Secret. Required when the Token Endpoint Authentication Method field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The `mfa_token` you received from `mfa_required` error. |
| `oob_code` <br/><span class="label label-danger">Required</span> | The oob code received from the challenge request. |
| `binding_code`| A code used to bind the side channel (used to deliver the challenge) with the main channel you are using to authenticate. This is usually an OTP-like code delivered as part of the challenge message. |

### Learn More

- [Associate Out-of-Band Authenticators](/mfa/guides/mfa-api/oob)

## Verify with Recovery Code

```http
POST https://${account.namespace}/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&mfa_token=MFA_TOKEN&grant_type=http%3A%2F%2Fauth0.com%2Foauth%2Fgrant-type%2Fmfa-recovery-code&recovery_code=RECOVERY_CODE
```

```shell
curl --request POST \
  --url 'https://${account.namespace}/oauth/token' \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data 'client_id=${account.clientId}&client_secret=YOUR_CLIENT_SECRET&mfa_token=MFA_TOKEN&grant_type=http://auth0.com/oauth/grant-type/mfa-recovery-code&recovery_code=RECOVERY_CODE'
```

```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  form:
   { mfa_token: 'MFA_TOKEN',
     recovery_code: 'RECOVERY_CODE',
     grant_type: 'http://auth0.com/oauth/grant-type/mfa-recovery-code',
     client_id: '${account.clientId}',
     client_secret: 'YOUR_CLIENT_SECRET' }
   };

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

Verifies <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn> using a recovery code.

Some multi-factor authentication (MFA) providers (such as Guardian) support using a recovery code to login. Use this method to authenticate when the user's enrolled device is unavailable, or the user cannot receive the challenge or accept it due to connectivity issues.

To verify MFA using a recovery code your app must prompt the user for the recovery code, and then make a request to `oauth/token` with `grant_type=http://auth0.com/oauth/grant-type/mfa-recovery-code`. Include the collected recovery code and the `mfa_token` from the `mfa_required` error. If the recovery code is accepted, the response will be the same as for `password` or `http://auth0.com/oauth/grant-type/password-realm` grant types. It might also include a `recovery_code` field, which the application must display to the end-user to be stored securely for future use.

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `grant_type` <br/><span class="label label-danger">Required</span> | Denotes the flow you are using. For recovery code use `http://auth0.com/oauth/grant-type/mfa-recovery-code`. |
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_assertion`| A JWT containing a signed assertion with your application credentials. Required when Private Key JWT is your application authentication method.|
| `client_assertion_type`| The value is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.  Required when Private Key JWT is the application authentication method.|
| `client_secret` | Your application's Client Secret. Required when the Token Endpoint Authentication Method field at your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `mfa_token` <br/><span class="label label-danger">Required</span> | The `mfa_token` you received from `mfa_required` error. |
| `recovery_code` <br/><span class="label label-danger">Required</span> | Recovery code provided by the end-user.

## Add an Authenticator

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
  "oob_channels":"sms",
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
  "oob_channels":"auth0",
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

Associates or adds a new authenticator for <dfn data-key="multifactor-authentication">multi-factor authentication (MFA)</dfn>.

If the user has active authenticators, an <dfn data-key="access-token">Access Token</dfn> with the `enroll` <dfn data-key="scope">scope</dfn> and the <dfn data-key="audience">`audience`</dfn> set to `https://${account.namespace}/mfa/` is required to use this endpoint.

If the user has no active authenticators, you can use the `mfa_token` from the `mfa_required` error in place of an Access Token for this request.

After an authenticator is added, it must be verified. To verify the authenticator, use the response values from the `/mfa/associate` request in place of the values returned from the `/mfa/challenge` endpoint and continue with the verification flow.

A `recovery_codes` field is included in the response the first time an authenticator is added. You can use `recovery_codes` to pass multi-factor authentication as shown on [Verify with recovery code](#verify-with-recovery-code) above.

To access this endpoint, you must set an Access Token at the Authorization header, with the following claims:
- `scope`: `enroll`
- `audience`: `https://${account.namespace}/mfa/`

### Request parameters

| Parameter        | Description |
|:-----------------|:------------|
| `client_id` <br/><span class="label label-danger">Required</span> | Your application's Client ID. |
| `client_assertion`| A JWT containing a signed assertion with your application credentials. Required when Private Key JWT is your application authentication method.|
| `client_assertion_type`| The value is `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`.  Required when Private Key JWT is the application authentication method.|
| `client_secret` | Your application's Client Secret. Required when the Token Endpoint Authentication Method field in your [Application Settings](${manage_url}/#/applications) is `Post` or `Basic`. |
| `authenticator_types` <br/><span class="label label-danger">Required</span> | The type of authenticators supported by the client. Value is an array with values `"otp"` or `"oob"`. |
| `oob_channels` | The type of OOB channels supported by the client. An array with values `"auth0"`, `"sms"`, `"voice"`. Required if `authenticator_types` include `oob`. |
| `phone_number` | The phone number to use for SMS or Voice. Required if `oob_channels` includes `sms` or `voice`. |

### Learn More

- [Multi-factor Authentication API](/mfa/concepts/mfa-api)

## List Authenticators

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
    "oob_channels":"sms",
    "name":"+X XXXX1234",
    "active":true
  },
  {
    "id":"sms|dev_gB342kcL2K22S4yB",
    "authenticator_type":"oob",
    "oob_channels":"sms",
    "name":"+X XXXX1234",
    "active":false
  },
  {
    "id":"push|dev_433sJ7Mcwj9P794y",
    "authenticator_type":"oob",
    "oob_channels":"auth0",
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

Returns a list of authenticators associated with your application.

To access this endpoint you must set an <dfn data-key="access-token">Access Token</dfn> at the Authorization header, with the following claims:
- `scope`: `read:authenticators`
- `audience`: `https://${account.namespace}/mfa/`

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `ACCESS_TOKEN` <br/><span class="label label-danger">Required</span> | The Access Token obtained during login. |


#### Learn More

- [Manage Authenticators](/mfa/guides/mfa-api/manage)

## Delete an Authenticator

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

Deletes an associated authenticator using its ID.

You can get authenticator IDs by [listing the authenticators](#list-authenticators).

To access this endpoint, you must set an <dfn data-key="access-token">Access Token</dfn> at the Authorization header, with the following claims:
- `scope`: `remove:authenticators`
- `audience`: `https://${account.namespace}/mfa/`

### Request Parameters

| Parameter        | Description |
|:-----------------|:------------|
| `ACCESS_TOKEN` <br/><span class="label label-danger">Required</span> | The Access Token obtained during login. |
| `AUTHENTICATOR_ID` <br/><span class="label label-danger">Required</span> | The ID of the authenticator to delete.

### Learn More

- [Manage Authenticators](/mfa/guides/mfa-api/manage)
