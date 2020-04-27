---
title: Datadog Event Log Streams
description: Learn about Datadog Event Log Streams and how they let you export your events in near real-time to Datadog.
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---

# Datadog Event Log Streams

Datadog is the essential monitoring platform for cloud applications. It brings together data from servers, containers, databases, and third-party services to make your stack entirely observable.

You can create monitoring, alerting, and analysis dashboards for Auth0 tenants.

## Send events from Auth0 to Datadog

To send Auth0 events to Datadog, you will need:

1. A `Log Management` plan with Datadog. To learn more, see [Datadog plans](https://www.datadoghq.com/pricing/).
2. A Datadog API Key.
3. Your Datadog dashboard region.

### Copy API Key from Datadog

1. Log in to the Datadog dashboard.
2. Navigate to **Integrations** > **APIs**.
![Integrations Dashboard](/media/articles/logs/datadog/tutorial-1.png)
3. Expand the API Keys section, and copy the API Key that you would like to use.
![API Keys Section](/media/articles/logs/datadog/tutorial-2.png)

### Set up Event Stream in Auth0

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click **+ Create Stream**.
4. Select **Datadog**, and enter a unique name for your new Datadog Event Stream.
5. On the next screen, provide the following settings for your Datadog Event Stream:

| Setting | Description |
|---------|-------------|
| API Key | The Datadog API key you copied from the Datadog dashboard. |
| Region  | If you are in the Datadog EU site (app.datadoghq.eu), the `Region` should be `EU`; otherwise, it should be `US`. |

![Datadog Settings Form](/media/articles/logs/datadog/tutorial-3.png)

6. Click **Save**.
7. You're done! When Auth0 writes the next log event, you'll receive a copy of that log event in Datadog with the `source` and `service` set to `auth0`.

### View logs in Datadog

1. Navigate to **Logs** > **Livetail**.
2. See Auth0 logs by setting the `source` to `auth0`.
![Datadog Logs Dashboard](/media/articles/logs/datadog/tutorial-4.png)

## Delivery attempts and retries

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered. If your server is unable to receive the event, Auth0 will try to redeliver it up to three times. If still unsuccessful, Auth0 will log the failure to deliver, and you will be able see these failures in the Health tab for your log stream.
