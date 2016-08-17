---
title: Send one time codes via your own SMS Gateway
---

# Send one time codes via your own SMS Gateway

By default the SMS connection will use Twilio to send the one time code. If you already have your own infrastructure to send text messages cannot or might not want to use Twilio.

Instead you'll want your own infrastructure to handle the delivery of these one time codes.

## Configure your SMS Gateway

The configuration of your own SMS Gateway currently needs to happen through the Management API. You would first need to get your connections (strategy: `sms`) from the [GET connections endpoint](/api/v2#!/Connections/get_connections).

This will return your SMS connection with your Twilio settings:

```
[
  {
    "id": "con_...",
    "options": {
      "strategy": "sms",
      "twilio_sid": "...",
      "twilio_token": "...",
      "from": "+1 234 567",
      "template": "Your verification code is: @@password@@",
      "brute_force_protection": true,
      "disable_signup": false,
      "name": "sms",
      "syntax": "md_with_macros",
      "totp": {
        "time_step": 300,
        "length": 6
      }
    },
    "strategy": "sms",
    "name": "sms",
    "enabled_clients": [
      ...
    ]
  }
]
```

You can now modify the options of the connection:

 - `provider`: Set this to `sms_gateway`
 - `gateway_url`: Set this to the URL of your SMS Gateway. Note that Auth0 must be able to reach it in order for this to work.

```
{
    "options": {
      "strategy": "sms",
      "provider": "sms_gateway",
      "gateway_url": "{URL_OF_YOUR_GATEWAY}",
      "from": "+1 234 567",
      "template": "Your verification code is: @@password@@",
      "brute_force_protection": true,
      "disable_signup": false,
      "name": "sms",
      "syntax": "md_with_macros",
      "totp": {
        "time_step": 300,
        "length": 6
      }
    }
}
```

You can then send the updated configuration to the Management API using the [PATCH connections endpoint](/api/v2#!/Connections/patch_connections_by_id).

After updating the connection for any user that signs up or authenticates using the Passwordless SMS connection the following payload will be sent to your SMS gateway:

```
{
  "recipient": "+1 399 999",
  "body": "Your verification code is: 12345",
  "sender": "+1 234 567",
}
```

## Configure an authenticated SMS Gateway

The previous settings assume your SMS Gateway accepts non-authenticated requests. The `sms_gateway` provider also allows you to configure token based authentication (using `gateway_authentication`):

```
{
    "options": {
      "strategy": "sms",
      "provider": "sms_gateway",
      "gateway_url": "{URL_OF_YOUR_GATEWAY}",
      "gateway_authentication": {
            "method": "bearer",
            "subject": "urn:Auth0",
            "audience": "urn:MySmsGateway",
            "secret": "MySecretToSignTheToken"
      },
      "from": "+1 234 567",
      "template": "Your verification code is: @@password@@",
      "brute_force_protection": true,
      "disable_signup": false,
      "name": "sms",
      "syntax": "md_with_macros",
      "totp": {
        "time_step": 300,
        "length": 6
      }
    }
}
```

With this configuration, when the payload is sent to the SMS Gateway a JWT will be added to the `Authorization` header which contains a token with the `subject` and `audience` configured in the connection and signed with the `secret`. 

Additionally, if you secret is base64 url encoded you can set `options.secret_base64_encoded` to `true`.
