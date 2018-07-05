---
description: How to install and configure the Auth0 Management API Webhooks Extension. 
topics:
  - extensions
  - management-api-webhooks
contentType:
  - how-to
useCase: extensibility-extensions
---

# Auth0 Extension: Auth0 Management API Webhooks

The Auth0 Management API Webhooks Extension allows you to use your own custom webhooks in conjunction with the Auth0 Management API. The extension will go through the audit logs and call the appropriate webhook if specific event(s) occur.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 Management API Webhooks box in the list of provided extensions on the Extensions page of the Management Portal. In the "Install Extension" window that then pops open, you will be asked to provide the following configuration variables:

- __Schedule__: The frequency with which the job runs
- __Batch_Size__: The amount of logs the extension will attempt to read and send on each execution. Extension could send multiple batches per run, depending on amount of time necessary to process.
- __Auth0_API_Endpoints__: The specific Auth0 Management API endpoints you want to monitor/call
- __Webhook_URL__: The URL of your webhook
- __Authorization__: String to be added as `Authorization` header.
- __Send_as_Batch__: If enabled, the extension will send the whole batch of logs to the webhook in a single request. Otherwise, extension sends logs one-by-one to webhook. Only disable if your webhook does not support batched messages.
- __Webhook_Concurrent_Calls__: The maximum number of concurrent calls that will be made to your webhook.
- __Start_From__: Log Checkpoint to start from.
- __Slack_Incoming_Webhook_URL__: Extension can report statistics and possible failures to the Slack.
- __Slack_Send_Success__: If enabled, extension will be sending messages on each run. Otherwise - only on fails.

Once you have provided the required pieces of information, click "Install" to finish installing the extension.

## Using Your Installed Extension

You can view all scheduled jobs by clicking on the Auth0 Management API Webhooks line under the "Installed Extensions" tab.

## Sample Payload

Here is an example of the payload that will be sent:

```json
{
   "date":"2017-09-06T07:33:10.424Z",
   "request":{
      "method":"post",
      "path":"/api/v2/clients",
      "query":{

      },
      "body":{
         "name":"auth0-webhooks"
      },
      "channel":"https://manage.auth0.com/",
      "ip":"127.0.0.1",
      "auth":{
         "user":{
            "user_id":"auth0|56541aaa73ec334341338bbe",
            "name":"John Doe",
            "email":"johndoe@gmail.com"
         },
         "strategy":"jwt",
         "credentials":{
            "jti":"0615b65ee0b5b29f4517153d2a943463",
            "scopes":[
               "read:clients",
               "create:clients",
               "update:clients",
               "delete:clients"
            ]
         }
      }
   },
   "response":{
      "statusCode":201,
      "body":{
         "callback_url_template":false,
         "client_id":"vRrHLFDHKSMEVLBmyV3UCoBBgsIPZBr5",
         "custom_login_page_on":true,
         "global":false,
         "name":"auth0-webhooks",
         "tenant":"test-tenant"
      }
   }
}
```

<%= include('./_troubleshoot-webhooks') %>
