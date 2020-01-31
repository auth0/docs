---
title: HTTP Event Log Streams
description: HTTP Event Log Streams let you export your events in near real-time to your own server.
toc: false
topics:
 - logs
 - streams
 - event-streams
 - http-event
contentType: how-to
---

# HTTP Event Log Streams

HTTP Event Log Streams let you export your log events to the server or target of your choice. When Auth0 creates a log entry for your tenant, a copy is automatically sent to a given URL via an HTTP POST request.

If you use Amazon Web Services, Auth0 also offers an [AWS EventBridge integration](/integrations/aws-eventbridge).

## Create an HTTP Event Stream

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click **+ Create Stream**.
4. Select **Custom Webhook** and enter a unique name for your new HTTP Event Stream.
5. On the next screen, provide the following settings for your HTTP Event Stream:

| Setting | Description |
|---------|-------------|
| Name | A unique display name to distinguish this integration from other integrations |
| Payload URL | The URL where the event payloads are sent as HTTP POST requests. |
| Authorization Token | (Optional) Set in the Authorization header of the request if provided. |
| Content Type | The media type of the payload that will be delivered to the webhook. |

![Create a new HTTP Event Log Stream](/media/articles/logs/http-event-stream.png)

6. Click **Save**.
7. You're done! Now when Auth0 writes the next tenant log, you'll receive a copy of that log event as a POST request at the `Payload URL` you provided.

## Delivery attempts and retries

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered in our system. If your server is unable to receive the event, we will retry up to three times to deliver the event; otherwise, we will log the failure to deliver in our system.
