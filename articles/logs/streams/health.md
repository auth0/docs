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

# Viewing an Existing Event Stream's Health

Log Stream Health is the functionality that allows customers to troubleshoot issues with Log Streams. It allows customers to get the status of the latest delivery attempts of each stream to make it easy to identify problems in the delivery.

## Viewing an Existing Event Stream's Health

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click on a stream.
4. Select the **Health** tab. 

## Understanding Stream Health States

**add some stuff here**

Status types:

| Status | Description |
|---------|-------------|
| Active (with no errors) | The latest log deliveries were successful |
| Active (with errors) | The log deliveries are active but the stream failed to deliver logs at one or more points. |
| Paused | The customer has paused the stream |
| Suspended | Our system has disabled the stream because there is an issue and your logs could not be delivered. You may restart the stream by following the directions or returning to list view and clicking the dropdown option `restart` |


## Streaming delivery errors, pauses, or suspensions. 

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered in our system. If a stream is paused or suspended, log deliveries will resume from the last delivery point upon stream resume or restart. Please note, however, that logs are only retained up to the retention period as noted on your account. Once the retention period is up, missing logs will not be available for retreival. 

### Errors

Errors (from the last 24 hours only) are populated in the Logs Health Table when logs could not be delivered. The log errors are populated with corresponding error codes and checkpoint information. Additional information on retrieving associated logs via checkpoint can be found here: https://auth0.com/docs/logs/guides/retrieve-logs-mgmt-api#get-logs-by-checkpoint. 

### Pause/Resume Streams

Perhaps you need to pause streaming for a while during an upgrade or error resolution?

You may pause your stream by using the drop down option menu in the log stream list view and clicking 'pause.' Streams may be resumed by returning to the dropdown and clicking 'resume.'

![Pausing a Stream](/media/articles/logs/streams-health/stream-pause.png "Pausing a Stream")


If a stream is paused, you may resume it any time using the same steps. 

### Suspensions

If your server is unable to receive the stream, we will retry  to deliver the event; if the events cannot be received after several consecutive retries, we will suspend the stream. You can restart the stream by following the link in the suspension message or by returning to the list view and using the dropdown menu to click 'restart.' 

### Resolving Errors and Undelivered Logs During Paused, Active, or Suspsended States

Don't see logs on your end? Use the error table to find out why. We now log recent errors and their descriptions to help you investigate issues with your stream.

![Disabled Stream](/media/articles/logs/streams-health/disabled-stream.png "A Disabled Stream")

1. On a stream's **Health** tab: please reference any errors and the associated counter information. 
2. Follow the instructions outlined here: https://auth0.com/docs/logs/guides/retrieve-logs-mgmt-api#get-logs-by-checkpoint
