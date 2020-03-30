---
title: Log Streams Health
description: All Log Streams types let you view your stream health in the health tab.
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---gi

## Viewing an Existing Event Stream's Health

Log Stream Health is the functionality that allows customers to troubleshoot issues with Log Streams. It allows customers to get the status of the latest delivery attempts of each stream to make it easy to identify problems in the delivery.

## Viewing an Existing Event Stream's Health

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click on a stream.
4. Select the **Health** tab. 

## Understanding Stream Health States

add some stuff here


| Status | Description |
|---------|-------------|
| Active (with no errors) | The latest log deliveries were successful. |
| Active (with errors) | The log deliveries are active but the stream failed to deliver logs at one or more points. |
| Paused | The customer has pausued the stream. |
| Suspended | Our system has disabled the stream because there is an issue and your logs could not be delivered. You may restart the stream by following the directions or returning to list view and clicking the dropdown option "restart." |


## Streaming delivery errors, pauses, or suspensions. 

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered in our system. 

### Erros

Errors are populated in the Logs Health Table when logs could not be delivered with corresponding error codes and counter information. TBD here is how to use counter information to recover logs and the time frame for recovery TBD.

### Pause/Resume Streams

You may pause your stream by using the drop down option menu in the log stream list view and clicking 'pause.' Streams may be resumed by returning to the dropdown and clicking 'resume.'

If a stream is paused, TBD here is how to recover your logs during the pause time frame and the time frame for recovery TBD.

### Suspensions

If your server is unable to receive the stream, we will retry up to fifty times to deliver the event; otherwise, we will suspend the stream. You can restart the stream by following the link in the suspension message or by returning to the list view and using the dropdown menu to click 'restart.' TBD here is how to recover logs during hte suspension state  and and the time frame for recoveryTBD (if all of the above recovery methods are the same, perhaps put it under subheading resolving errors and undelivered logs during paused, suspended, or active states  )

## Resolving Errors and Undelivered Logs During Paused, Active, or Suspsended States


1. On a stream's **Health** tab:
2. --------- (how to use counter to ensure delivered logs)
3. --------- (how to fix errors, etc. )
4. --------- 