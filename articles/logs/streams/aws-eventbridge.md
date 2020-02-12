---
title: Integrate AWS EventBridge with Auth0
description: Learn how to create an event-driven workflow using AWS EventBridge to send your tenant logs to the targers of your choice such as AWS EC2 instances, Lambda functions, Kinesis streams, and ECS tasks.
toc: true
topics:
 - integrations
 - logs
 - streams
 - event-streams
 - aws
 - eventbridge
contentType: how-to
---
# Integrate AWS EventBridge with Auth0

Amazon Web Services' EventBridge is a serverless event bus that acts as an intermediary allowing you to send data from your applications to AWS services.

You can create an event-driven workflow using EventBridge to send your Auth0 tenant logs to the targets of your choice (e.g., AWS EC2 instances, Lambda functions, Kinesis streams, and ECS tasks).

## Send events from Auth0 to AWS EventBridge

To send Auth0 events to AWS EventBridge, you will need:

1. A partner event source (in this case, this is Auth0)
2. A partner event bus, which matches incoming events with the routes to which they should be targeted
3. A rule, which route the incoming events to your choice of AWS service

You can send events from Auth0 to AWS once you have [matched your partner event source to the partner event bus](https://docs.aws.amazon.com/eventbridge/latest/userguide/create-partner-event-bus.html).

### Set up Auth0 for use as the event source

Part of the integration process is to set Auth0 up for use as the event source (this step happens on your [Dashboard](${manage_url}).

1. Log in to the [Auth0 Dashboard](${manage_url}).

2. Navigate to **Logs > Streams**.

3. Click **+ Create Stream**.

4. Select **Amazon EventBridge** and enter a unique name for your new Amazon EventBridge Event Stream.

5. Create the AWS Event Source by providing your **AWS Account ID** and **AWS Region**. Note that the region you select must match the region in which your AWS EventBridge resides.

6. Click **Save**. Auth0 provides you with an **Event Source Name**. Make sure to save your **Event Source Name** value since you will be providing it to AWS at a later point to complete the integration.

Go to AWS to complete the final steps of the integration.

## Create an event bus
1. Go to the [AWS EventBridge partners tab](https://console.aws.amazon.com/events/home?region=us-east-1#/partners) in your AWS account and make sure you are in the **AWS Region** where the event source was created.

2. Paste the **Event Source Name** in the event source search box to find the newly created AWS Event Source and click on it to associate it with an Event Bus.
**Note**: The AWS Event Source will remain in pending state until it gets associated with an Event Bus and all the events sent to that Event Source will be dropped.

3. Once you click in the Event Source, click on **Associate with Event Bus**.

4. Name the AWS Event Bus the same name as the AWS Event Source. At this point, you can specify permission for this Event Bus or simply associate it.

## Create your rules

At this point, the events that you send will be made available on your event bus. However, before you can use the data you send to AWS services, you will need to [create rules](https://docs.aws.amazon.com/eventbridge/latest/userguide/create-event-bus.html) that map those events to specific targets.

EventBridge uses rules, which are definitions specifying how you want incoming events routed to the desired targets. 

Targets are the services, such as AWS EC2 instances, Lambda functions, Kinesis streams, or ECS tasks, that processes the event-driven data that it receives. The data received by targets are JSON-formatted.

A single rule can route to one or more targets (if there are more than one, AWS processes all in parallel).

To create a rule:

1. Go to the [EventBridge page](https://console.aws.amazon.com/events/home?region=us-east-1#/), and click **Create rule**

2. Provide the name of the AWS Event Bus and specify your targets

## Testing

At this point, your EventBridge workflow should be complete. As soon as Auth0 writes the next tenant log, you should be able to go to your Target (as defined in your EventBridge rule) to find a copy of the log Auth0 has written in JSON format.

## Delivery attempts and retries

Auth0 events are delivered to AWS via a streaming mechanism that sends each event as it is triggered in our system. If EventBridge is unable to receive the event, we will retry up to three times to deliver the event; otherwise, we will log the failure to deliver in our system.
