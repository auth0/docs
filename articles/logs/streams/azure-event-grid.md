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

Azure’s Event Grid is a serverless event bus that acts as an intermediary allowing you to send data from Auth0 into the Azure ecosystem.

You can create an event-driven workflow using Event Grid to send your Auth0 tenant logs to the targets of your choice (e.g., Azure Functions, Event Hubs, Sentinel and Logic Apps).

See the Auth0 event type codes for a [full list](https://auth0.com/docs/logs/references/log-event-type-codes) of the events that Auth0 supports.

## Send events from Auth0 to Azure Event Grid

To send Auth0 events to Azure, you will need:

1. Set up an event source (in this case, this is Auth0).
2. Set up an event handler, the app or service where the event will be sent.

For more information about these concepts, [see Concepts in Azure Event Grid](https://docs.microsoft.com/en-us/azure/event-grid/concepts)

### Set up an Auth0 event source

Part of the integration process is to set Auth0 up for use as an event source (this step happens on your Dashboard).
Log in to the Auth0 Dashboard.

1. Navigate to Logs > Streams.
2. Click + Create Stream.
3. Select Azure Event Grid and enter a unique name for your new stream.
4. Create the event source by providing your Subscription ID, Azure Region and a Resource Group. 
5. Click Save.

Go to Azure to complete the final steps of the integration.

## Set up an event handler

Go to your Azure subscription and spin up a service that is supported as an event handler (for a full list of all supported event handlers go to this [article](https://docs.microsoft.com/en-us/azure/event-grid/event-handlers)).

### Enable Event Grid resource provider

If you haven’t previously used Event Grid, you will need to register the Event Grid resource provider

In your Azure portal:

1. Select Subscriptions on the left menu
2. Select the subscription you’re using for Event Grid
3. On the left menu, under Settings, select Resource providers
4. Find Microsoft.EventGrid
5. Select Register
6. Refresh to make sure the status changes to Registered

### Create a custom topic

An event grid topic providers a user-defined endpoint that you post events to.

In your Azure portal:

1. Select All services on the left navigation menu
2. Search Event Grid and select Event Grid Topics
3. On the Event Grid topics page, select + Add on the toolbar
4. Create a new topic
    1. Provide a unique name for the custom topic. The topic name must be unique because it's represented by a DNS entry. Don't use the name shown in the image. Instead, create your own name - it must be between 3-50 characters and contain only values a-z, A-Z, 0-9, and "-".
    2. Select your Azure subscription.
    3. Select the same resource group from the previous steps.
    4. Select a location for the event grid topic.
    5. Keep the default value Event Grid Schema for the Event Schema field.
    6. Select Create.
5. Once the topic is created you should see a successful notification. Select “Go to resource group”
6. On the resource Group page, select the event grid topic

### Subscribe to custom topic

You subscribe to an event grid topic to tell Event Grid which events to send to which event handler.

1. On the Event Grid topic page, select + Event Subscription on the toolbar
2. On the Create Event Subscription page:
    1. Enter a name for the event subscription.
    2. Select your desired Azure service for the Endpoint type.
    3. Follow the instructions for the particular service.
    4. Back on the Create Event Subscription page, select Create.

To send events to your topic, please follow the instructions on this article.

## Testing

At this point, your Event Grid workflow should be complete. 

### Verify the integration

To verify that the integration is working as expected:

1. Log in to the Auth0 Dashboard.
2. Navigate to Logs > Streams.
3. Click on your Event Grid stream.
4. Once on the stream, click on the Health tab. The stream should be active and as long as you don't see any errors, the stream is working.

## Delivery attempts and retries

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered. If your server is unable to receive the event, Auth0 will try to redeliver it up to three times. If still unsuccessful, Auth0 will log the failure to deliver, and you will be able see these failures in the Health tab for your log stream.
