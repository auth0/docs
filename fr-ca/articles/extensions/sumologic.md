---
description: How to configure and retrieve information using the Auth0 Logs to Sumo Logic extension.
topics:
  - extensions
  - sumologic
contentType:
  - how-to
useCase: extensibility-extensions
toc: true
---

# Auth0 Logs to Sumo Logic

The Auth0 Logs to Sumo Logic is a scheduled job that takes all of your Auth0 logs and exports them to [Sumo Logic](https://www.sumologic.com/). This document will guide you through the process of setting up this integration.

## Step 1: Create a Sumo Logic HTTP endpoint

1. Login to [Sumo Logic](https://www.sumologic.com/) and from the top menu select **Manage > Setup Wizard**.

![Start the Sumo Logic setup wizard](/media/articles/extensions/sumologic/sumologic-setup-wizard.png)

2. On the next screen click **Set Up Streaming Data**.

3. At the **Select Data Type** page, select **Your Custom App**.

![Select data type](/media/articles/extensions/sumologic/sumologic-data-type.png)

4. Select **HTTP Source** as the way to collect the logs.

![Select HTTP source](/media/articles/extensions/sumologic/sumologic-setup-collection.png)

5. Modify the **Source Category** and select a time zone for your log file. Click **Continue**.

6. You should now be provided with a URL. This is the **HTTP Source** that Sumo Logic configured for you. Copy the value and click **Continue**. Exit the setup wizard.

![Get the HTTP source](/media/articles/extensions/sumologic/sumologic-http-source.png)

7. Now head back to the Auth0 Dashboard to set the value you copied as the value for **SUMOLOGIC_URL**.

## Step 2: Configure the Extension

To install and configure this extension, go to [Dashboard > Extensions](${manage_url}/#/extensions) and click on the **Auth0 Logs to Sumo Logic** box. 

The **Install Extension** window pops open.

![Install Auth0 extension](/media/articles/extensions/sumologic/extension-mgmt-sumologic.png)

At this point you should set the following configuration parameters:

- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **BATCH_SIZE**: Logs are batched before sending. Multiple batches are sent each time the extension runs. Specify the number of logs per batch. Maximum is `100`.
- **SUMOLOGIC_URL**: Your Sumo Logic HTTP Collector Endpoint. Set the value you copied at the previous step.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Sumo Logic.
- **LOG_TYPES**: The events for which logs should be exported.
- **START_FROM**: The `log_id` of the log you would like to start sending from. Default is to start with the oldest available log.
- **SLACK_INCOMING_WEBHOOK_URL**: Send reports from the extension to the specific Slack webhook.
- **SLACK_SEND_SUCCESS**: Send even more stuff to Slack. Useful for troubleshooting.

Once you have provided this information, click the **Install** button to finish installing the extension.

The integration between Auth0 and Sumo Logic is now in place!

<%= include('./_includes/_batch-size') %>

## How to view the results

The integration you just setup, created a scheduled job that will be responsible to export the logs.

To view this scheduled job:
- Go to [Dashboard > Extensions](${manage_url}/#/extensions)
- Click on the **Installed Extensions** link
- Select the **Auth0 Logs to Sumo Logic** line. 

There you can see the job you just created, modify its state by toggling the **State** switch, see when the next run is due and what was the result of the last execution.

![View scheduled job](/media/articles/extensions/sumologic/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![View job details](/media/articles/extensions/sumologic/view-cron-details.png)

That's it, you are done! You can now navigate to [Sumo Logic](https://www.sumologic.com/) and view your [Auth0 Logs](${manage_url}/#/logs), by selecting the configured system.

![View Auth0 logs in Sumo Logic screen](/media/articles/extensions/sumologic/auth0-logs-at-sumologic.png)

## Use the Auth0 Dashboard

Here, at Auth0, we have been using the Auth0 to Sumo Logic extension ourselves since it was first released, and it's proven to be very useful for staying on top of what's happening with our own Auth0 accounts and our internal users. Sumo Logic makes it easy to see the latest failed logins, find and alert on error messages, create charts to visualize trends, or even do complex statistical analysis on your data.

To help us (and our customers) visualize these logs, we spent some time creating a dashboard. The Sumo Logic for Auth0 dashboard shows you the output of several saved searches all on one easy to read screen, and makes it easy to zoom in or drill down when something looks interesting.

![Sumo Logic Dashboard](/media/articles/extensions/sumologic/auth0-dashboard.png)

If you're a Sumo Logic customer and are interested in trying out this dashboard, you can find details on installing the Auth0 App for the Sumo Logic extension here:

[Install the Auth0 App](https://help.sumologic.com/07Sumo-Logic-Apps/20SAML/Auth0/Auth0-App-Dashboards)

Once it's available through your account, you're free to customize it, add to it, create alerts based on the searches, or really anything else that you find useful.

Have fun analyzing and visualizing those logs!
