---
title: Azure Event Grid Log Streams
description: Learn how to create an event-driven workflow using Azure Event Grid and send your tenant logs anywhere within the Azure ecosystem.
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---

# Integrate Azure Event Grid with Auth0

Azure Event Grid is a serverless event bus that lets you send event data from any source to any destination.

You can create event-driven workflows using Event Grid to send your Auth0 tenant logs to targets, such as Azure Functions, Event Hubs, Sentinel, and Logic Apps.

For a full list of the event type codes that Auth0 supports, see [Log Event Type Codes](/logs/references/log-event-type-codes).

## Send events from Auth0 to Azure Event Grid

To send Auth0 events to Azure, you must:

1. Enable the Event Grid resource provider.
2. Set up an event source (in this case, this is Auth0).
3. Set up an event handler, which is the app or service where the event will be sent.

To learn more, see [Microsoft's Concepts in Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/concepts).

### Enable Event Grid resource provider

If you haven’t previously used Event Grid, you will need to register the Event Grid resource provider. If you've used Event Grid before, skip to the next section.

In your Azure portal:

1. Select Subscriptions.
2. Select the subscription you’re using for Event Grid.
3. On the left menu, under **Settings**, select Resource providers.
4. Find `Microsoft.EventGrid`.
5. Select **Register**.
6. Refresh to make sure the status changes to `Registered`.

### Set up an Auth0 event source

Use the Auth0 Dashboard to set up Auth0 for use as an event source.

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click **+ Create Stream**.
4. Select **Azure Event Grid**, and enter a unique name for your new stream.
5. On the next screen, provide the following settings for your Event Grid stream:

| Setting | Description |
|---------|-------------|
| Name | A unique display name to distinguish this integration from other integrations. |
| Azure Subscription ID | The unique alphanumeric string that identifies your Azure subscription. |
| Azure Region | The region in which your Azure subscription is hosted. |
| Resource Group name | The name of the Azure resource group, which allows you to manage all Azure assets within one subscription. |

6. Click **Save**.

#### Activate your Auth0 Partner Topic in Azure

Activating the Auth0 topic in Azure allows events to flow from Auth0 to Azure.

1. Log in to the [Azure Portal](https://portal.azure.com/).
2. Search `Partner Topics` at the top, and click `Event Grid Partner Topics` under services.
3. Click on the topic that matches the stream you created in your Auth0 Dashboard.
4. Confirm that the `Source` field matches your Auth0 account.
5. Click **Activate**.

#### Subscribe to your Partner Topic

Subscribe to an Event Grid partner topic to tell Event Grid which events to send to your event handler.

1. On the Event Grid partner topic Overview page, select **+ Event Subscription** on the toolbar.
2. On the Create Event Subscription page:
    1. Enter a name for the event subscription.
    2. Select your desired Azure service or WebHook for the Endpoint type.
    3. Follow the instructions for the particular service.
    4. Back on the Create Event Subscription page, select Create.

To send events to your topic, please follow the instructions in this article.

### Set up an event handler

Go to your Azure subscription and spin up a service that is supported as an event handler. For a full list of supported event handlers, see [Microsoft's Event Handlers in Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/event-handlers).

## Testing

At this point, your Event Grid workflow should be complete.

### Verify the integration

To verify that the integration is working as expected:

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click on your Event Grid stream.
4. Once on the stream, click the **Health** tab. The stream should be active and as long as you don't see any errors, the stream is working.

## Delivery attempts and retries

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered. If your server is unable to receive the event, Auth0 will try to redeliver it up to three times. If still unsuccessful, Auth0 will log the failure to deliver, and you will be able see these failures in the Health tab for your log stream.

## More on Log Streams

::: next-steps
* [HTTP Event Log Streams](/logs/streams/http-event)
* [Example: Stream Auth0 Log Events to Slack](/logs/streams/http-event-to-slack)
* [Amazon EventBridge Log Streams](/logs/streams/amazon-eventbridge)
* [Datadog Event Log Streams](/logs/streams/datadog)
:::
