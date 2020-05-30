---
title: Enroll and Challenge SMS Authenticators
description: Build your own enrollment flow with SMS messages.
topics:
  - mfa
  - mfa-api
  - mfa-authenticators
  - oob
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Enroll and Challenge SMS Authenticators

You could want to build your own enrollment and challenge flow using SMS as an MFA factor.

<%= include('../../_includes/_authenticator-before-start') %>

## Enrolling with SMS

## 1. Get the MFA token

<%= include('../../_includes/_get_mfa_token') %>

## 2. Enroll the Authenticator 

<%= include('../../_includes/_request_association') %>

To enroll an authenticator where the users are challenged for a code that is delivered by SMS make the following `POST` request to the `/mfa/associate` endpoint. This will both trigger an MFA challenge for the user and associate the new authenticator. 

Be sure to replace the placeholder values in the payload body shown below as appropriate. 

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/associate",
	"headers": [
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" },
    { "name": "Content-Type", "value": "application/json" }
  ],
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"authenticator_types\": [\"oob\"], \"oob_channels\": [\"sms\"], \"phone_number\": \"+11...9\" }"
	}
}
```

If successful, you'll receive a response like the one below:

```json
{
  "authenticator_type": "oob",
  "oob_channel": "<message_type>",
  "recovery_codes": [ "N3BGPZZWJ85JLCNPZBDW6QXC" ],
  "oob_code": "ata6daXAiOi..."
}
```

### Recovery Codes

<%= include('../../_includes/_recovery_codes') %>

## 3. Confirm the authenticator enrollment

To confirm the association of an phone messaging authenticator, make a `POST` request to the `oauth/token` endpoint. Now, you can add the `oob_code` retrieved previously as a parameter in the request, and the `binding_code` with the value received by in the SMS message.

Be sure to replace the placeholder values in the payload body shown below as appropriate.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/oauth/token",
  "headers": [
    { "name": "Authorization", "value": "Bearer ACCESS_TOKEN" },
    { "name": "Content-Type", "value": "application/x-www-form-urlencoded" }
  ],
	"postData": {
    "mimeType": "application/x-www-form-urlencoded",
    "params": [
      {
        "name": "grant_type",
        "value": "http://auth0.com/oauth/grant-type/mfa-oob"
      },
      {
        "name": "client_id",
        "value": "${account.clientId}"
      },
      {
        "name": "mfa_token",
        "value": "YOUR_MFA_TOKEN"
      },
      {
        "name": "oob_code",
        "value": "ata...i0i"
      },
      {
        "name": "binding_code",
        "value": "000000"
      }
    ]
	}
}
```

<%= include('../../_includes/_successful_confirmation') %>

## Challenging with SMS

You can trigger MFA challenges for enrolled authenticators by calling the `/mfa/challenge` endpoint.

In general, this happens as part of the authentication flow. You'd call `/oauth/token` with the resource-owner password grant with the username/password, and you'll get an `mfa_required` return code, together with an `mfa_token`.



## OTP Challenges

To trigger an OTP challenge, make the appropriate `POST` call to `mfa/challenge`.

```har
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"YOUR_CLIENT_ID\", \"challenge_type\": \"otp\", \"mfa_token\": \"Fe26.2**05...\" }"
	}
}
```

If successful, you'll receive the following response: 

```json
{
  "challenge_type": "otp"
}
```

The user will collect a one-time password, which you will then collect from them. Proceed with the authentication process using `/oauth/token` as usual, adding the `otp` value that you collect as a parameter (format below) in the request.

```
{
	"name": "otp",
	"value": "000000"
}
```

## OOB Challenges

To trigger an OOB challenge, make the appropriate `POST` call to `mfa/challenge`.

```
{
	"method": "POST",
	"url": "https://${account.namespace}/mfa/challenge",
	"postData": {
		"mimeType": "application/json",
		"text": "{ \"client_id\": \"YOUR_CLIENT_ID\", \"challenge_type\": \"oob\", \"authenticator_id\": \"sms|dev_s...O\", \"mfa_token\": \"Fe26.2**05...\" }"
	}
}
```

If successful, you'll receive the following response, as well as an SMS message containing the required six-digit code:

```json
{
  "challenge_type": "oob",
  "oob_code": "asdae35fdt5...oob_code_redacted",
  "binding_method": "prompt"
}
```

Proceed with the authentication process using `/oauth/token` as usual, sending the `oob_code` as a parameter (format below) in the request.

```
{
	"name": "oob_code",
	"value": "asdae35fdt5...oob_code_redacted"
}
```
