---
title: Log Streams Health
description: All Log Streams types let you view your stream health in the health tab.
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---

# HTTP Event Log Streams

HTTP Event Log Streams let you export your log events to the server or target of your choice. When Auth0 creates a log entry for your tenant, a copy is automatically sent to a given URL via an HTTP POST request.

If you use Amazon Web Services, Auth0 also offers an [AWS EventBridge integration](/integrations/aws-eventbridge).

## Viewing an Existing Event Stream's Health

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click on any existing stream listed therein.
4. Select the **Health** tab. An explanation of the following potential states is as follows:

| Status | Description |
|---------|-------------|
| Active (with no errors) | This means that the latest log deliveries have been successful |
| Active (with errors) | The log deliveries are active but the stream failed to deliver logs at one or more points |
| Paused | The customer has pausued the stream. |
| Suspended | Our system has disabled the stream because there is an issue and your logs could not be delivered. You may restart the stream by following the directions or returning to list view and clicking the dropdown option "restart" |


## Streaming delivery attempts and retries

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered in our system. If your server is unable to receive the stream, we will retry up to fifty times to deliver the event; otherwise, we will suspend the stream.