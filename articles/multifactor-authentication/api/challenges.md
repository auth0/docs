---
title: Trigger MFA using the API
description: How to trigger MFA challenges for enrolled authenticators using the MFA API
topics:
  - mfa
  - mfa-api
  - mfa-challenges
contentType:
  - how-to
  - reference
useCase:
  - customize-mfa
---
# Trigger MFA using the API

You can trigger MFA challenges for enrolled authenticators by calling the `/mfa/challenge` endpoint.

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
