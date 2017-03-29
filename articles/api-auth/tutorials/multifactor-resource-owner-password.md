---
description: Using Resource Owner Password Grant together with MFA
---

# Multifactor authentication and Resource Owner Password
Highly trusted apps can use the [Resource Owner Password Grant](https://auth0.com/docs/api-auth/grant/password) to access an API.
This flow allows highly trusted apps to get access tokens, id tokens and refresh tokens by asking the end-user to enter username and password.
For some use cases, username and password might not be enough to authenticate the user, Multifactor Authentication might be suitable for these use cases.
MFA grant types together with [Resource Owner Password Grant](https://auth0.com/docs/api-auth/grant/password) allows you to use MFA on highly trusted apps.

## Prerequisites
1. Enabling MFA with a supported provider: to use MFA with password grant flows you need to enable one of the supported providers from Auth0 dashboard. Currently the supported providers are [Google Authenticator](https://auth0.com/docs/multifactor-authentication/google-auth/admin-guide#enabling-google-authenticator-for-mfa) and [Guardian](https://auth0.com/docs/multifactor-authentication/administrator#guardian-basics). DUO provider does not support this flow and you will get an
error if you try to use it.

2. At least a client ready to execute one of the resource owner password grant flows as described [here](https://auth0.com/docs/api-auth/tutorials/password-grant).

3. End users must have already enrolled to MFA. This might be achieved in various ways depending on the provider.
   a. For Guardian: the recommended way to start enrollment is using an [enrollment ticket](https://auth0.com/docs/multifactor-authentication/administrator/guardian-enrollment-email#sending-a-guardian-enrollment-email-to-a-user).

   b. For Google Authenticator provider: Google Authenticator provider supports self-enrollment as the single enrollment method, you will need to start an
   authentication flow using a flow that support enrollment (e.g. [Authorization](https://auth0.com/docs/api/authentication#database-ad-ldap-passive-)

## Normal Flow
The flow starts collecting end-user credentials and sending them to the Authorization Server as described for [Resource Owner Password Grant](https://auth0.com/docs/api-auth/grant/password). Both [password](https://auth0.com/docs/api-auth/tutorials/password-grant) and [password-realm](https://auth0.com/docs/api-auth/tutorials/password-grant#realm-support) grant types are available.

1. The end-user enters the credentials into the client application
2. The client forwards the Resource Owner's credentials to the Authorization Server
3. The Authorization server validates the credentials and executes the [rules](https://auth0.com/docs/rules).
4. If any of the rules states that MFA must be enabled for current user `mfa_required` error is returned.
The error will contain a `mfa_token` property.
5. The client executes a request to get an [MFA challenge](#link-to-the-api) specifying the challenge types it supports.
6. The authorization server resolves the preferred challenge type based on the ones available for the user and the ones supported by client application and sends the response containing the `challenge_type` and, optionally, extra information needed to resolved the challenge and display the right ui to the user.

### For `challenge_type=otp`
This challenge type means that the client must get an `otp` code from a OTP Generator app such as Google Authenticator, Microsoft Authenticator, etc.

7. The client prompts the end-user to enter otp code.
8. End user enters otp into the client application.
9. Client application forwards otp code to the authorization server using [`grant_type=http://auth0.com/oauth/grant-type/mfa-otp`](#link to api) and including the `mfa_token` got on step 4.
10. Authorization server validates the provided otp and returns the access/refresh token.

NOTE: Steps 5 and 6 are optional if you already know that the user supports OTP.

### For `challenge_type=oob` and `binding_method=prompt`
This challenge type together with `prompt` binding method means that the challenge will be delivered to the user using a side channel (such as SMS) and that a `binding_code` is needed to bind the side channel to the one you are using to authenticate. The binding code is sent as part of the challenge message and it is usually an otp-like code composed by 6 numeric digits.

7. The client application prompts the user for the `binding_code` and keeps the `oob_code` got in step 6 for future usage.
8. End user receives the challenge onto the side channel and enters the `binding_code` into the client application.
9. Client application forwards `binding_code` to the authorization server using [`grant_type=http://auth0.com/oauth/grant-type/mfa-oob`](#link to api) and including the `mfa_token` (got on step 4) and `oob_code` (got on step 6).
10. Authorization server validates the provided `binding_code` and `oob_code` and returns the access/refresh token.

### For `challenge_type=oob` and no `binding_method`
This challenge type means that the challenge was sent using a side channel, however, in this case there
is no need for a `binding_code`, the only mechanism supported right now for this kind of `oob` challenge is Push Notification (Guardian provider).

7. The client application asks the user to accept the delivered challenge and keeps the `oob_code` got in step 6 for future usage.
8. The client application start polling the authorization server using [`grant_type=http://auth0.com/oauth/grant-type/mfa-oob`](#link to api) and including the `mfa_token` (got on step 4) and `oob_code` (got on step 6).
10. Authorization server validates the provided `oob_code`, the `mfa_token` and returns:
  a. `pending_authentication` error: if the challenge has not been accepted nor rejected.
  d. `slow_down` error: if you are polling too fast; you must slow down polling rate.
  b. access/refresh token: if the challenge has been accepted; you must stop polling, this is a final state.
  c. `invalid_grant` error: if the challenge has been rejected; you must stop polling, this is a final state.

## Recovery flow
Some providers supports using a recovery code to login in case the enrolled device
is not handy or you cannot get the otp code.

Using a recovery code is similar to using an otp code to login, the main difference
is that you will get a new recovery code as result and your application must show
this new recovery code to the final user for him to store it securely.

1-4. Steps 1-4 are the same as in normal flow.
5. End user chooses to use the recovery flow.
6. The client prompts the end-user to enter recovery code.
7. End user enters recovery code into the client application.
8. Client application forwards recovery code to the authorization server using [`grant_type=http://auth0.com/oauth/grant-type/mfa-otp`](#link to api) and including the `mfa_token` got on step 4.
9. Authorization server validates the recovery code and returns the access/refresh token.

NOTE: This flow is currently only available for Guardian provider.

## Example

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
      challenge_type: 'oob otp', // Supported challenge types
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
        // Ask the user to accept the challenge an start polling (see MFA OOB without binding code grant request)
        mfaOOB(mfa_token, body.oob_code)
      } else {
        console.error('Unsupported binding_method :(');
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
      // The returned tokens depends on the scopes requested on password grant request
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
function mfaOOB(mfa_token, oob_code, /* optional  */ binding_code) {
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
      binding_code: binding_code, // Optional just if binding_method = prompt
      grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
      client_id: '${account.clientId}',
      client_secret: '${account.clientSecret}' },
    json: true };

  request(options, function (error, response, body) {
    if (error) { return cb(error); }

    if (response.statusCode === 200) {
      // The returned tokens depends on the scopes requested on password grant request
      cb(null, { state: 'authorized', body });
    } else if (body.error === 'invalid_grant') {
      // Invalid otp code
      cb(null, { state: 'not_authorized' });
    } else if (body.error === 'authorization_pending') {
      cb(null, { state: 'authorization_pending' });
    } else if (body.error === 'slow_down') {
      // You are polling too fast, manage to slow down polling rate,
      // this is a very simple implementation not completelly sutable for production
      // you might want to check rate limit headers to manage your polling rate
      setTimeout(() => cb({ state: 'authorization_pending' }), 20000);
    } else {
      cb(new Error('Something when wrong'))
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
      console.log('Please store the new recovery code safely, old one will not work anymore.', body.recovery_code)

      // The returned tokens depends on the scopes requested on password grant request
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
