---
title: Splunk Event Log Streams
description: Learn about Splunk Event Log Streams and how they let you export your events in near real-time to Splunk.
toc: false
topics:
 - logs
 - streams
 - event-streams
contentType: how-to
---

# Splunk Event Log Streams

Splunk is the Data-to-Everything Platform turns data into action, tackling the toughest IT, IoT, security and data challenges.

You can create monitoring, alerting, and analysis dashboards for Auth0 tenants.


## Send events from Auth0 to Splunk

To send Auth0 events to Splunk, you will need:

1. Splunk instance domain name
2. Splunk event collector token
3. Port


#### Retrieving the Domain, Token, and Port

  1. Navigate to your Splunk instance. You will have received this information via email upon Splunk signup. Copy the domain part of the URL, this is your Splunk **Domain**.
  2. From the system menu select Settings > Data Inputs. Select the Add New link under Local Inputs > HTTP Event Collector.
  3. A wizard, that will configure a new token for receiving data over HTTP, is displayed. Set a name for this new token and click Next. We recommend naming it auth0.
  4. Select a Source type and an Index. We will create a new Source type, named auth0, and use main as our Index. Click Review.
  5. Review the information displayed and click Submit.
  6. Your new token should be created successfully. Copy the value, this is your **Token**.
  7. The default **port** is **8088**.

#### TLS Certificate Verification

The default Splunk Cloud instance uses a self-signed certificate. We recommend using a certificate from a trusted authority. If you are using the default self-signed certificate, the **Verify TLS** toggle should be turned off.

### Set up Event Stream in Auth0

1. Log in to the [Auth0 Dashboard](${manage_url}).
2. Navigate to **Logs > Streams**.
3. Click **+ Create Stream**.
4. Select **Splunk**, and enter a unique name for your new Splunk Event Stream.
5. On the next screen, provide the following settings for your Splunk Event Stream:

| Setting | Description |
|---------|-------------|
| Domain | This is the domain URL you copied from Splunk |
| Token  | This is the token your created in the Splunk dashboard |
| Port  | By default the port of set to 8088 but can be changed to match you Splunk configuration |
| Verify TLS  | This toggle should be turned off when using self-signed certificates |


6. Click **Save**.
7. You're done! When Auth0 writes the next log event, you'll receive a copy of that log event in Splunk with the `source` and `service` set to `auth0`.

## View logs in Splunk

1. Log into your Splunk instance (in this case, Cloud)
2. In the menu bar go to `App: Cloud Monitoring...`
3. Click Search & Reporting in the sub-menu
4. In search bar, input wildcard * and adjust time drop down to desired window.

## Delivery attempts and retries

Auth0 events are delivered to your server via a streaming mechanism that sends each event as it is triggered. If your server is unable to receive the event, Auth0 will try to redeliver it up to three times. If still unsuccessful, Auth0 will log the failure to deliver, and you will be able see these failures in the Health tab for your log stream.
