---
title: Datadog Log Streams
description: Learn how to export your log events in near real-time to Datadog.
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---

# Datadog Log Streams

Datadog is a monitoring platform for cloud applications. It brings together data from servers, containers, databases, and third-party services to make your stack entirely observable. You can use it to create monitoring, alerting, and analysis dashboards for Auth0 tenants.

## Prerequisites

To send Auth0 events to Datadog, you will need:

* a `Log Management` plan with Datadog. See [Datadog plans](https://www.datadoghq.com/pricing/).
* a Datadog API Key. See below.
* your Datadog dashboard region.

## Steps

To send Auth0 events to Datadog, you will need to:

1. Copy your API Key from Datadog
2. Set up an Event Stream in Auth0

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

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered. If your server is unable to receive the event, Auth0 will retry delivering it up to three times. If still unsuccessful, Auth0 will log the failure, and you will see these failure in the **Health** tab for your log stream.

## Enhancement to log data

One of the unique values of Datadog as a monitoring tool, specifically when it comes to integrations, is the data enhancement they provide to ensure customers can rely on receiving specific data fields regardless of the system with which they are integrating. As part of this Auth0 Log Streaming integration, Datadog has enhanced our data. The following new fields can be found in our logs when using the Log Streaming integration with Datadog:

| Fields | Auth0 attribute |
|---------|-------------|
| Official Log date | `data.date` |
| `network.client.ip` | `data.ip` |
| `network.client.geoip` |	`data.ip` (parsed) |
| `http.useragent` |	`data.user_agent` |
| `http.useragent_details` |	`data.user_agent` (parsed) |
| `usr.id` |	`data.user_name` |
| `usr.name` |	`data.user_name` |
| `usr.email` |	`data.details.request.auth.user.email` (when available) |
| `data.type` | `evt.name` |
| `message` |	Event description (For a list of descriptions, see [Log Event Type Codes](/logs/references/log-event-type-codes).) |

To learn more about Datadog transformations, see:

* For US: [Datadog US Log Pipelines](https://app.datadoghq.com/logs/pipelines)
* For EU: [Datadog EU Log Pipelines](https://app.datadoghq.EU/logs/pipelines)

## More on Log Streams

::: next-steps
* [HTTP Event Log Streams](/logs/streams/http-event)
* [Example: Stream Auth0 Log Events to Slack](/logs/streams/http-event-to-slack)
* [Amazon EventBridge Log Streams](/logs/streams/amazon-eventbridge)
* [Azure Event Grid Log Streams](/logs/streams/azure-event-grid)
:::
