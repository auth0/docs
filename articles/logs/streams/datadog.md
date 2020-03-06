---
title: Datadog Event Log Streams
description: Datadog Event Log Streams let you export your events in near real-time to Datadog.
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---

# Datadog Event Log Streams

Datadog Event Log Streams let you export your log events to Datadog for further analysis and monitoring. When Auth0 creates a log entry for your tenant, a copy is automatically sent to Datadog with the `source` and `service` both set to `Auth0`.

## Create a Datadog Event Stream

### In Datadog:

1. Head to the Datadog dashboard.
2. Navigate to **Integrations** -> **APIs**.
![Integrations Dashboard](/media/articles/logs/datadog/tutorial-1.png)
3. Expand the API Keys section on this page, and then copy the API Key that you would like to use.
![API Keys Section](/media/articles/logs/datadog/tutorial-2.png)

### In Auth0:

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click **+ Create Stream**.
4. Select **Datadog** and enter a unique name for your new Datadog Event Stream.
5. On the next screen, provide the following settings for your HTTP Event Stream:

| Setting | Description |
|---------|-------------|
| API Key | The Datadog API key you copied in step (3) from the Datadog dashboard |
| Region | If you are in the Datadog EU site (app.datadoghq.eu), the `Region` should be `EU`, otherwise it should be `GLOBAL`|

![Datadog Settings Form](/media/articles/logs/datadog/tutorial-3.png)

6. Click **Save**.
7. You're done! Now when Auth0 writes the next tenant log, you'll receive a copy of that log event in Datadog with the `source` and `service` set to `Auth0`.

### In Datadog:

1. Navigate to **Logs** > **Livetail**.
2. See Auth0 logs by setting the Source to Auth0.
![Datadog Logs Dashboard](/media/articles/logs/datadog/tutorial-4.png)


## Delivery attempts and retries

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered in our system. If your server is unable to receive the event, we will retry up to three times to deliver the event; otherwise, we will log the failure to deliver in our system.
