---
description: How to install and configure the Auth0 Management API Webhooks Extension. 
---

# Auth0 Extension: Auth0 Management API Webhooks

The Auth0 Management API Webhooks Extension allows you to use your own custom webhooks in conjunction with the Auth0 Management API. The extension will go through the audit logs and call the appropriate webhook if specific event(s) occur.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 Management API Webhooks box in the list of provided extensions on the Extensions page of the Management Portal. In the "Install Extension" window that then pops open, you will be asked to provide the following configuration variables:

- __Schedule__: The frequency with which the webhook runs;
- __Auth0_Domain__: The domain of your Auth0 app;
- __Auth0_Global_Client_ID__: The Auth0 Global Client ID;
- __Auth0_Global_Client_Secret__: The Auth0 Global Client Secret;
- __Auth0_API_Endpoints__: The specific Auth0 Management API endpoints you want to monitor/call;
- __Webhook URL__: The URL of your webhook;
- __Webhook_Concurrent_Calls__: The maximum number of concurrent calls that will be made to your webhook.

Once you have provided the required pieces of information, click "Install" to finish installing the extension.

## Using Your Installed Extension

You can view all scheduled jobs by clicking on the Auth0 Management API Webhooks line under the "Installed Extensions" tab.
