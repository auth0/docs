---
title: Integrating AWS EventBridge with Auth0
description: How to send Auth0 logging data using AWS EventBridge
toc: true
topics:
 - integrations
 - aws
 - eventbridge
contentType: how-to
---
# Integrating AWS EventBridge with Auth0

Amazon Web Services' EventBridge is a serverless event bus that acts as an intermediary allowing you to send data from a variety of sources to your applications.

This tutorial will cover how to create an event-driven workflow using EventBridge to send your Auth0 tenant logs to the targets of your choice (e.g., AWS EC2 instances, Lambda functions, Kinesis streams, ECS tasks).

## Send events from Auth0 to AWS EventBridge

To send Auth0 events to AWS EventBridge, you will need:

1. A partner event source (in this case, this is Auth0)
2. A partner event bus, which matches incoming events with the routes to which they should be targeted

You can send events from Auth0 to AWS once you have [matched your partner event source to the partner event bus](https://docs.aws.amazon.com/eventbridge/latest/userguide/create-partner-event-bus.html).

### Set up Auth0 for use as the event source

Part of the integration process is to set Auth0 up for use as the event source. When prompted by AWS, return to Auth0, log in, and navigate to the [Dashboard](${manage_url}).

1. Create the AWS Event Source in Auth0 by providing your **AWS Account ID** and **AWS Region**. Note that the region you select must match the region in which your EventBridge resides.

2. Click **Save**. Auth0 provides you with an **Event Source Name**. Make sure to save your **Event Source Name** value, since you will be providing it to AWS at a later point to complete the integration.

Return to AWS to complete the final steps of the integration.

## Create your rules

At this point, the events that you send will be made available on your event bus. However, before you can use the data you send to EventBridge, you will need to [create rules](https://docs.aws.amazon.com/eventbridge/latest/userguide/create-event-bus.html) that map those events to event bridge targets.

EventBridge uses rules, which are definitions specifying how you want incoming events routed to the desired targets. 

Targets are the services, such as AWS EC2 instances, Lambda functions, Kinesis streams, or ECS tasks, that processes the event-driven data that it receives. The data received by targets are JSON-formatted.

A single rule can route to one or more targets (if there are more than one, AWS processes all in parallel).

## Testing

At this point, your EventBridge workflow should be fully complete. As soon as Auth0 writes the next tenant log, you should be able to go to your Target (as defined in your EventBridge rule) to find a copy of the log Auth0 has written in JSON format.