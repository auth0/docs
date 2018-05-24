---
description: This page explains how to configure and install Auth0's Authentication API Webhooks extension.
tags:
  - extensions
  - auth-api-webhooks
---

# Auth0 Authentication API Webhooks

The Auth0 Authentication API Webhooks Extension is a scheduled job that allows you to use your own custom webhooks in conjunction with the Auth0 Authentication API. The extension will go through the audit logs and call the appropriate webhook if specific event(s) occur.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 Authentication API Webhooks box in the list of provided extensions on the Extensions page of the Management Portal. In the "Install Extension" window that then pops open, you will be asked to provide the following configuration variables:

- __Schedule__: The frequency with which the job runs
- __Auth0_Domain__: The domain of your Auth0 app
- __Auth0_Global_Client_ID__: The Client ID of your Auth0 app
- __Auth0_Global_Client_Secret__: The Client Secret of your Auth0 app
- __Auth0_API_Endpoints__: The specific Auth0 Management API endpoints you want to monitor/call
- __Webhook URL__: The URL of your webhook
- __Webhook_Concurrent_Calls__: The maximum number of concurrent calls that will be made to your webhook
- __Log_Level__: The minimal log level of events that you would like sent
- __Log_Types__: The specific events for which logs should be exported

Once you have provided the required pieces of information, click "Install" to finish installing the extension.

## Using Your Installed Extension

You can view all scheduled jobs by clicking on the Auth0 Management API Webhooks line under the "Installed Extensions" tab.

## Sample Payload

Here is an example of the payload that will be sent:

```json
{
  "date": "2016-02-25T13:42:08.791Z",
  "type": "f",
  "description": "Wrong email or password.",
  "connection": "My-Users",
  "client_id": "lIkP1Wn4qQPj56k9bE7fyMrbsaaHXd6c",
  "client_name": "Default App",
  "ip": "11.22.33.44",
  "user_agent": "Chrome 48.0.2564 / Mac OS X 10.11.3",
  "details":
   { "error":
      { "message": "Wrong email or password.",
        "oauthError": "Wrong email or password.",
        "type": "invalid_user_password" },
     "body":
      { "client_id": "lIkP1Wn4qQPj56k9bE7fyMrbsaaHXd6c",
        "username": "john@example.com",
        "password": "*****",
        "connection": "My-Users",
        "grant_type": "password",
        "scope": "openid",
        "device": "" },
     "qs": {},
     "connection": "My-Users" },
  "user_id": "",
  "user_name": "Default App",
  "strategy": "auth0",
  "strategy_type": "database",
  "_id": "49556539073893675610923042044589174982043486779166687234",
  "isMobile": false
}
```

<%= include('./_troubleshoot-webhooks') %>