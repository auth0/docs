---
title: Log Streams
description: Learn about using Log Streams to export your log events in near real-time.
classes: topic-page
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: index
---

# Log Streams

Log Streams let you export your log events to a target of your choice given URL or via AWS EventBridge. With Log Streams you can:

* export logs to a tool or service you already use
* react to events, such as changed passwords or new registrations, with your own business logic by sending log events to custom webhooks
* send events to AWS EventBridge for processing with lambdas or additional data pipelines

## Log Stream Health

You can troubleshoot potential issues with your stream by looking in the `Health` tab.

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click on a stream.
4. Select the **Health** tab.

## Log Stream Status

| Status | Description |
|---------|-------------|
| Active  | Your stream is enabled with us, and we will attempt to deliver the next log events. |
| Paused  | You have requested that we stop delivery attempts for the stream. You may click the `Resume Stream` option at any time to change the status back to `Active`. |
| Disabled | We have disabled your stream because of successive errors. You may click the `Restart Stream` option at any time to change the status back to `Active` and re-attempt delivery for this stream. |

![Pause a Stream](/media/articles/logs/health/pause-a-stream.png)

## Delivery Errors

To help diagnose issues with your stream, you can see the last ten errors we encountered while attempting to deliver logs to your stream within the last 5 days.

![Stream Errors](/media/articles/logs/health/health-errors.png)


<%= include('../../_includes/_topic-links', { links: [
  'logs/streams/http-event',
  'logs/streams/aws-eventbridge',
  'logs/streams/datadog'
] }) %>
