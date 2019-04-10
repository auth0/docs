---
title: Send One-time Codes via Your Own SMS Gateway
topics:
    - connections
    - passwordless
    - sms
contentType: how-to
useCase: customize-connections
---
# Send One-Time Codes via Your Own SMS Gateway

By default, the SMS connection uses Twilio to send the one-time code. If you already have your own infrastructure to send text messages, you cannot or might not want to use Twilio.

Instead, you'll want your own infrastructure to handle the delivery of one-time codes.

## Configure your SMS Gateway

You will need to configure your own SMS Gateway through the Management API. 

1. Get your connections (strategy: `sms`) from the [GET connections endpoint](/api/v2#!/Connections/get_connections).

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
      "forward_req_info": "true",
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

2. Modify the options of the connection:

 - `provider`: Set this to `sms_gateway`
 - `gateway_url`: Set this to the URL of your SMS Gateway. Note that Auth0 must be able to reach it for this to work.

```
{
    "options": {
      "strategy": "sms",
      "provider": "sms_gateway",
      "gateway_url": "{URL_OF_YOUR_GATEWAY}",
      "from": "+1 234 567",
      "template": "Your verification code is: @@password@@",
      "brute_force_protection": true,
      "forward_req_info": "true",
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

3. Send the updated configuration to the Management API using the [PATCH connections endpoint](/api/v2#!/Connections/patch_connections_by_id).

After updating the connection for any user that signs up or authenticates using the Passwordless SMS connection, the following payload will be sent to your SMS gateway:

```
{
  "recipient": "+1 399 999",
  "body": "Your verification code is: 12345",
  "sender": "+1 234 567"
}
```

If you set the `forward_req_info` property to **true**, the gateway will also receive information from the HTTP request that initiated the Passwordless process. This includes the IP address of the client calling `/passwordless/start` and its User Agent.

```
{
  "recipient": "+1 399 999",
  "body": "Your verification code is: 12345",
  "sender": "+1 234 567",
  "req" : { 
      "ip" : "167.56.227.117",
      "user-agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36" 
       }
}
```

## Error handling

Auth0 will only consider the HTTP code returned from the SMS Gateway; it ignores the rest of the response (e.g., response body and response type).

If the SMS Gateway returns an HTTP code other than 200, the `/passwordless/start` endpoint will return an HTTP 400 code and a response the looks like the following:

```
{
 "error":"sms_provider_error",
 "error_description":"Unexpected response while calling the SMS gateway: <HTTP Code Returned by the SMS Gateway>"}
}
```

If the SMS Gateway returns HTTP 401, the `error_description` will be **Authentication failed while calling the SMS gateway: 401**.

Note that the `error_description` field is not part of the endpoint contract and is subject to change. 

## Configure an authenticated SMS Gateway

The previous settings assume your SMS Gateway accepts non-authenticated requests. The `sms_gateway` provider also allows you to configure token-based authentication (using `gateway_authentication`):

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
      "forward_req_info": "true",
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

With this configuration, when the payload is sent to the SMS Gateway, a JWT will be added to the `Authorization` header which contains a token with the `subject` and `audience` configured in the connection and signed with the `secret`.

Additionally, if your secret is base64-url-encoded, you can set `options.secret_base64_encoded` to `true`.
