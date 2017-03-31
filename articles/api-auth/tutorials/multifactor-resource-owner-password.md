---
description: Using Resource Owner Password Grant together with MFA
---

# Multifactor authentication and Resource Owner Password
Highly-trusted applications can use the [Resource Owner Password Grant](https://auth0.com/docs/api-auth/grant/password) flow to access an API. The flow typically involves prompting the user for username and password as credentials to be submitted to the Authorization Server. In some scenarios, however, stronger authentication may be required. This document outlines using multifactor authentication with the [Resource Owner Password Grant](https://auth0.com/docs/api-auth/grant/password) flow.

## Prerequisites
1. MFA enabled with a supported provider at the Auth0 management dashboard. Currently, [Google Authenticator](https://auth0.com/docs/multifactor-authentication/google-auth/admin-guide#enabling-google-authenticator-for-mfa) and [Guardian](https://auth0.com/docs/multifactor-authentication/administrator#guardian-basics) are supported for this flow. Duo multifactor is not supported.

2. Client configured to execute one of the resource owner password grant flows as described [here](https://auth0.com/docs/api-auth/tutorials/password-grant).

3. End users `enrolled with MFA.

## Initiating Multifactor Authentication
The flow starts by collecting end-user credentials and sending them to the Authorization Server as described in [Resource Owner Password Grant](https://auth0.com/docs/api-auth/grant/password). Both [password](https://auth0.com/docs/api-auth/tutorials/password-grant) and [password-realm](https://auth0.com/docs/api-auth/tutorials/password-grant#realm-support) grant types are available.

1. The user enters credentials into the Client application.
2. The Client forwards the credentials to the Authorization Server
3. The Authorization Server validates the credentials and executes any applicable [rules](https://auth0.com/docs/rules).
4. If any rule triggers MFA for current user, an error code of `mfa_required` is returned. The error will additionally contain an `mfa_token` property.
5. The Client will then make a request to the [MFA challenge](/docs/api/authentication#resource-owner-password) endpoint, specifying the challenge types it supports. Valid challenge types are listed below.
6. The Authorization Server sends a response containing the `challenge_type` derived from the types supported by the Client and the specific user. Additionally, extra information, such as `binding_method` may be included to assist in resolving the challenge and displaying the correct UI to the user.

## Executing Multifactor
### Challenge Type 'OTP'
![Resource Owner MFA OTP](/media/articles/api-auth/challenge-type-otp.png)

For this type of challenge, the client must get an `otp` code from a OTP Generator app such as Google Authenticator, Microsoft Authenticator, etc.

7. The Client application prompts the end user to enter an otp code.
8. The end user enters their otp into the Client application.
9. The Client application forwards the otp code to the authorization server using [grant_type=http://auth0.com/oauth/grant-type/mfa-otp](/docs/api/authentication#resource-owner-password) and includes the `mfa_token` obtained in step 4 above.
10. The Authorization Server validates the provided otp and returns the access/refresh token.
11. The Client can use the access_token to call the Resource Server on behalf of the Resource Owner.

NOTE: If it's already known that the user supports OTP, then steps 5 and 6 above are optional.

### Challenge type 'OOB' and binding method 'prompt'
![Resource Owner MFA OOB Prompt](/media/articles/api-auth/challenge-type-oob-with-binding-method.png)

This challenge type, together with `prompt` binding method, indicates that the challenge will be delivered to the user using a side channel (such as SMS) and that a `binding_code` is needed to bind the side channel to the one being authenticated. The binding code is sent as part of the challenge message and it is usually an otp-like code composed of 6 numeric digits.

7. The Client application prompts the user for the `binding_code` and stores the `oob_code` from step 6 for future use.
8. The end user receives the challenge on the side channel and enters the `binding_code` into the Client application.
9. The Client application forwards the `binding_code` to the Authorization Server using [grant_type=http://auth0.com/oauth/grant-type/mfa-oob](/docs/api/authentication#resource-owner-password) and includes the `mfa_token` (from step 4) and `oob_code` (from step 6).
10. The Authorization Server validates the `binding_code` and `oob_code` and returns the access/refresh token.
11. The Client can use the access_token to call the Resource Server on behalf of the Resource Owner.

### Challenge type 'OOB' with no binding method
![Resource Owner MFA OOB](/media/articles/api-auth/challenge-type-oob-no-binding-method.png)

In this scenario, the challenge will be sent using a side channel, however, there is no need for a `binding_code`. Currently, the only mechanism supported for this scenario is Push Notification with the Guardian Provider.

7. The Client application asks the user to accept the delivered challenge and keeps the `oob_code` from step 6 for future use.
8. The Client application polls the Authorization Server using [grant_type=http://auth0.com/oauth/grant-type/mfa-oob](/docs/api/authentication#resource-owner-password) and includes the `mfa_token` (from step 4) and `oob_code` (from step 6).
10. The Authorization Server validates the provided `oob_code`, the `mfa_token` and returns:
  a. `pending_authentication` error: if the challenge has not been accepted nor rejected.
  d. `slow_down` error: if the polling is too frequent.
  b. access/refresh token: if the challenge has been accepted; polling should be stopped at this point.
  c. `invalid_grant` error: if the challenge has been rejected; polling should be stopped at this point.
11. The Client can use the access_token to call the Resource Server on behalf of the Resource Owner.

## Using recovery codes
![Resource Owner MFA Recovery](/media/articles/api-auth/recovery-code.png)

Some providers support using a recovery code to login in case the enrolled device is not available, or if lack of connectivity prevents receiving an otp code or push notification.

Using a recovery code is similar to using an otp code to login -- the main difference is that a new recovery code will be generated, and that the application must display this new recovery code to the user for secure storage.

1-4. Steps 1-4 are the same as above
5. End user chooses to use the recovery code.
6. The Client prompts the end user to enter recovery code.
7. The end user enters their recovery code into the Client application.
8. The Client application forwards the recovery code to the Authorization Server using [grant_type=http://auth0.com/oauth/grant-type/mfa-otp](/docs/api/authentication#resource-owner-password) and includes the `mfa_token` from step 4.
9. The Authorization Server validates the recovery code and returns the access/refresh token.
10. The Client can use the access_token to call the Resource Server on behalf of the Resource Owner

NOTE: This flow is currently only available for the Guardian Provider.

## Examples

#### Resource owner password grant request
```javascript
var request = require("request");

var options = { method: 'POST',
  url: 'https://${account.namespace}/oauth/token',
  headers: { 'content-type': 'application/json' },
  body:
   { grant_type: 'password',
     username: 'USERNAME',
     password: 'PASSWORD',
     audience: 'API_IDENTIFIER',
     scope: 'SCOPE',
     client_id: '${account.clientId}',
     client_secret: '${account.clientSecret}' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  if (body.error === 'mfa_required') {
    // Show mfa flow and give user option to go to the recovery flow (if supported)

    if (/* MFA Recovery is requested*/) {
      const recovery_code = // Prompt for recovery code
      mfaRecovery(body.mfa_token, recovery_code) // See MFA Recovery grant
    } else {
      mfaChallenge(body.mfa_token)
    }
  }
});
```

### Challenge request
```javascript
function mfaChallenge(mfa_token) {
  var options = { method: 'POST',
    url: 'https://${account.namespace}/mfa/challenge',
    headers: { 'content-type': 'application/json' },
    body:
    { mfa_token: mfa_token,
      challenge_type: 'oob otp', // Supported challenge types, space separated
      client_id: '${account.clientId}',
      client_secret: '${account.clientSecret}' },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    if (body.challenge_type === 'otp') {
      const otp = // Prompt for otp code (see MFA OTP grant request)
      mfaOTP(mfa_token, otp)
    } else if (body.challenge_type === 'oob') {
      if (body.binding_method === 'prompt') {
        const binding_code = // Prompt for binding code (see MFA OOB with binding code grant request)
        mfaOOB(mfa_token, body.oob_code, binding_code)
      } else if (!body.binding_method) {
        // Ask the user to accept the challenge and start polling (see MFA OOB without binding code grant request)
        mfaOOB(mfa_token, body.oob_code)
      } else {
        console.error('Unsupported binding_method');
      }
    } else {
      console.error('Something went wrong');
    }
  });
}
```

### MFA OTP Grant request
```javascript
function mfaOTP(mfa_token, otp) {
  var options = { method: 'POST',
    url: 'https://${account.namespace}/oauth/token',
    headers: { 'content-type': 'application/json' },
    body:
    { mfa_token: mfa_token,
      otp: otp,
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-otp',
      client_id: '${account.clientId}',
      client_secret: '${account.clientSecret}' },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    if (response.statusCode === 200) {
      // The tokens returned depend on the scopes requested on the password grant request
      console.log(body.access_token, body.id_token, body.refresh_token);
    } else if (body.error === 'invalid_grant') {
      // Invalid otp code
      console.error('Invalid otp');
    } else {
      console.error('Something went wrong');
    }
  });
}
```

### MFA OOB Grant request
```javascript
function mfaOOB(mfa_token, oob_code, /* optional */ binding_code) {
  makeOOBGrantRequest(mfa_token, oob_code, binding_code, function(error, result) {
    if (error) { throw error; }

    if (result.state === 'authorization_pending') {
      // Poll every 10 seconds
      setTimeout(() => makeOOBGrantRequest(mfa_token, oob_code, binding_code), 10000);
    } else if (result.state === 'authorized')  {
      console.log(result.body.access_token, result.body.id_token, result.body.refresh_token);
    } else {
      console.error('You are not authorized')
    }
  });
}

function makeOOBGrantRequest(mfa_token, oob_code, /* optional  */ binding_code, cb) {
  var options = { method: 'POST',
    url: 'https://${account.namespace}/oauth/token',
    headers: { 'content-type': 'application/json' },
    body:
    { mfa_token: mfa_token,
      oob_code: oob_code,
      binding_code: binding_code, // Only when binding_method = prompt
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
      client_id: '${account.clientId}',
      client_secret: '${account.clientSecret}' },
    json: true };

  request(options, function (error, response, body) {
    if (error) { return cb(error); }

    if (response.statusCode === 200) {
      // The tokens returned depend on the scopes requested on the password grant request
      cb(null, { state: 'authorized', body });
    } else if (body.error === 'invalid_grant') {
      // Invalid otp code
      cb(null, { state: 'not_authorized' });
    } else if (body.error === 'authorization_pending') {
      cb(null, { state: 'authorization_pending' });
    } else if (body.error === 'slow_down') {
      // You are polling too fast, slow down the polling rate,
      // You may want to check rate-limiting headers to manage your polling rate
      setTimeout(() => cb({ state: 'authorization_pending' }), 20000);
    } else {
      cb(new Error('Something went wrong'))
    }
  });
}
```

### MFA Recovery grant request
```javascript
function mfaRecovery(mfa_token, recovery_code) {
  var options = { method: 'POST',
    url: 'https://${account.namespace}/oauth/token',
    headers: { 'content-type': 'application/json' },
    body:
    { mfa_token: mfa_token,
      recovery_code: recovery_code,
      otp: otp,
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-recovery-code',
      client_id: '${account.clientId}',
      client_secret: '${account.clientSecret}' },
    json: true };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    if (response.statusCode === 200) {
      console.log('Please store this new recovery code safely -- the previous code will no longer work.', body.recovery_code)

      // The tokens returned depend on the scopes requested on the password grant request
      console.log(body.access_token, body.id_token, body.refresh_token);
    } else if (body.error === 'invalid_grant') {
      // Invalid otp code
      console.error('Invalid recovery_code');
    } else {
      console.error('Something went wrong');
    }
  });
}
```
