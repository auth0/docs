---
title: Set Up SMS Gateway for Passwordless Connections
topics:
    - connections
    - passwordless
    - sms
contentType: how-to
useCase: customize-connections
---
# Set Up SMS Gateway for Passwordless Connections

If you are using a Passwordless connection, this guide will show you how you can use custom infrastructure that you've built (instead of Twilio) to send out one-time use codes via SMS messages to users who are logging in.

1. Get an [Access Token for Management API](/api/management/v2/tokens). You will need this to make calls to the Management API to update your Passwordless connection.

2. Obtain information about the Passwordless SMS connection.

    To do this, make a GET call to the [Connections](/api/management/v2#!/Connections/get_connections) endpoint. The response from the endpoint will be an array of objects. Each object represents one connection affiliated with your tenant.
    
    Find the connection used for your Passwordless SMS connection (you can search for the `"name": "sms"` property). Notice that the connection currently displays the Twilio information you provided during the setup process.

```json
[
    {
        "id": "con_UX85K7K0N86INi9U",
        "options": {
            "disable_signup": false,
            "name": "sms",
            "twilio_sid": "TWILIO_SID",
            "twilio_token": "TWILIO_AUTH_TOKEN",
            "from": "+15555555555",
            "syntax": "md_with_macros",
            "template": "Your SMS verification code is: @@password@@",
            "totp": {
                "time_step": 300,
                "length": 6
            },
            "messaging_service_sid": null,
            "brute_force_protection": true
        },
        "strategy": "sms",
        "name": "sms",
        "is_domain_connection": false,
        "realms": [
            "sms"
        ],
        "enabled_clients": []
    }
]
```

     **Make anote of the `id` value of this connection, since you will need it to update your connection with your SMS Gateway information.**

3. Update the connection. You can do this by making a PATCH call to the [Update a Connection](/api/management/v2#!/Connections/patch_connections_by_id) endpoint. More specifically, you'll be updating the connections `options` object to provide information about the SMS Gateway.

    **You must send the entire `options` object with each call, otherwise, your new payload will overwrite the existing data.**

    Make the following changes: 

    * Remove both the `twilio_sid` and `twilio_token` parameters
    * Add the `provider` parameter, and set it to `sms_gateway`)
    * Add the `gateway_url` parameter, and set it to the URL of your SMS gateway. Auth0 **must** be able to reach this URL for it to use your gateway to send messages on your behalf)

    Your payload will look something like the following:

```json
{
    "options": {
      "strategy": "sms",
      "provider": "sms_gateway",
      "gateway_url": "URL_OF_YOUR_GATEWAY",
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
    },
    "is_domain_connection": false,
    "enabled_clients": []
}
```

    If your SMS Gateway accepts authenticated requests that are token-based, you can add the following to your `options` object:

```json

"gateway_authentication": {
    "method": "bearer",
    "subject": "urn:Auth0",
    "audience": "urn:MySmsGateway",
    "secret": "MySecretToSignTheToken"
}
```

    With this configuration, a JWT will be added to the `Authorization` header which contains a token with the `subject` and `audience` configured in the connection and signed with the `secret` when the payload is sent to your SMS Gateway.

    If your secret is base64-url-encoded, set `options.gateway_authentication.secret_base64_encoded` to `true`.

4. Once you have updated your connection, Auth0 will send the following to your SMS Gateway every time a user signs up or logs in with your Passwordless connection.

```json
{
  "recipient": "+1 399 999",
  "body": "Your verification code is: 12345",
  "sender": "+1 234 567"
}
```

If you set the `forward_req_info` property to `true`, the gateway will also receive information from the HTTP request that initiated the Passwordless process. This includes the IP address of the client calling `/passwordless/start` and its User Agent.

```json
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

**The `error_description` field is not part of the endpoint contract and is subject to change.**