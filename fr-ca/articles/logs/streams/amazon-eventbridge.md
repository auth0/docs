---
title: Amazon EventBridge Log Streams
description: Learn how to create an event-driven workflow using Amazon EventBridge to send your tenant logs to the targets of your choice, such as AWS EC2 instances, Lambda functions, Kinesis streams, and ECS tasks.
toc: true
topics:
 - integrations
 - logs
 - streams
 - event-streams
 - aws
 - eventbridge
 - amazon
contentType: how-to
---
# Amazon EventBridge Log Streams

Amazon EventBridge is a serverless event bus that acts as an intermediary allowing you to send data from your applications to AWS services. You can create an event-driven workflow using EventBridge to send your Auth0 tenant logs to the targets of your choice (e.g., AWS EC2 instances, Lambda functions, Kinesis streams, and ECS tasks).

## Steps

To send Auth0 events to Amazon EventBridge, you will need to:

1. Set up a partner event source (in this case, this is Auth0)
2. Set up a partner event bus that matches incoming events with the routes to which they should be targeted
3. Set up rules to route incoming events to your choice of AWS service
4. Test the integration

You can send events from Auth0 to AWS once you have [matched your partner event source to the partner event bus](https://docs.aws.amazon.com/eventbridge/latest/userguide/create-partner-event-bus.html).

### Set up Auth0 as the partner event source

First, you will need to set up Auth0 for use as the event source in the [Dashboard](${manage_url}).

1. Log in to the [Auth0 Dashboard](${manage_url}).

2. Navigate to **Logs > Streams**.

3. Click **+ Create Stream**.

4. Select **Amazon EventBridge**, and enter a unique name for your new Amazon EventBridge Event Stream.

5. Create the Event Source by providing your **AWS Account ID** and **AWS Region**. Note that the region you select must match the region in which your Amazon EventBridge resides.

6. Click **Save**. Auth0 provides you with an **Event Source Name**. Make sure to save your **Event Source Name** value because you will be providing it to AWS at a later point to complete the integration.

### Set up event bus in AWS

1. Go to the [Amazon EventBridge partners tab](https://console.aws.amazon.com/events/home?region=us-east-1#/partners) in your AWS account, and make sure you are in the **AWS Region** where the event source was created.

2. Paste the **Event Source Name** in the event source search box to find the newly-created Event Source, and click on it to associate it with an Event Bus.
**Note**: The Event Source will remain in pending state until it gets associated with an Event Bus, and all the events sent to that Event Source will be dropped.

3. Once you click on the Event Source, click **Associate with Event Bus**.

4. Name the Event Bus the same name as the Event Source. At this point, you can specify permissions for this Event Bus or simply associate it.

### Create EventBridge rules

At this point, the events that you send are available on your Event Bus. However, before you can use the data you send to AWS services, you must [create rules](https://docs.aws.amazon.com/eventbridge/latest/userguide/create-event-bus.html) that map those events to specific targets.

Amazon EventBridge uses rules, which are definitions specifying how you want incoming events routed to the desired targets. Targets are the services, such as EC2 instances, Lambda functions, Kinesis streams, or ECS tasks, that process the event-driven data that they receive. Data received by targets are JSON-formatted.

A single rule can route to one or more targets (if there are more than one, AWS processes all in parallel).

To create a rule:

1. Go to the [EventBridge page](https://console.aws.amazon.com/events/home?region=us-east-1#/), and click **Create rule**.

2. Provide the name of the Event Bus, and specify your targets.

### Test integration

As soon as Auth0 writes the next tenant log, you should see a copy of the log Auth0 has written in JSON format at the target you defined in your EventBridge rule.

## Delivery attempts and retries

Auth0 events are delivered to AWS via a streaming mechanism that sends each event as it is triggered in our system. If EventBridge is unable to receive the event, we will retry up to three times to deliver the event; otherwise, we will log the failure, and you will see the failure in the **Health** tab for your log stream.

## More on Log Streams

::: next-steps
* [HTTP Event Log Streams](/logs/streams/http-event)
* [Example: Stream Auth0 Log Events to Slack](/logs/streams/http-event-to-slack)
* [Datadog Event Log Streams](/logs/streams/datadog)
* [Azure Event Grid Log Streams](/logs/streams/azure-event-grid)
:::
