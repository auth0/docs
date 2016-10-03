---
description: How to configure and retrieve information using the Auth0 Logs to Sumo Logic extension.
---

# Auth0 Logs to Sumo Logic

The _Auth0 Logs to Sumo Logic_ is a scheduled job that takes all of your Auth0 logs and exports them to [Sumo Logic](https://www.sumologic.com/).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Sumo Logic_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/sumologic/extension-mgmt-sumologic.png)

At this point you should set the following configuration variables:

- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **BATCH_SIZE**: The ammount of logs to be read on each execution. Maximun is 100.
- **SUMOLOGIC_URL**: Your Sumo Logic HTTP Collector Endpoint.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Sumo Logic.
- **LOG_TYPES**: The events for which logs should be exported.

Once you have provided this information, click the *Install* button to finish installing the extension.

## Retrieve the required information from Sumo Logic

In order to configure a new system for Auth0 logs and acquire the *SUMOLOGIC_URL* information, follow the next steps:
1. Login to [Sumo Logic](https://www.sumologic.com/) and from the top menu select _Manage > Setup Wizard_.

![](/media/articles/extensions/sumologic/sumologic-setup-wizard.png)

2. On the next screen click _Set Up Streaming Data_.
3. At the _Select Data Type_ page, select _Your Custom App_.

![](/media/articles/extensions/sumologic/sumologic-data-type.png)

4. Select _HTTP Source_ as the way to collect the logs.

![](/media/articles/extensions/sumologic/sumologic-setup-collection.png)

5. Modify the _Source Category_ and select a time zone for your log file. Click Continue.
6. You should now be provided with a URL. This is the _HTTP Source_ that Sumo Logic configured for you. Copy the value and click _Continue_. Exit the setup wizard.

![](/media/articles/extensions/sumologic/sumologic-http-source.png)

7. Now head back to the Auth0 Dashboard and set he value you copied as the value for **SUMOLOGIC_URL**.

## Using Your Installed Extension

 To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the *Installed Extensions* link, and select the *Auth0 Logs to Sumo Logic* line. There you can see the job you just created, modify its state by toggling the *State* switch, see when the next run is due and what was the result of the last execution. 

![](/media/articles/extensions/sumologic/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/sumologic/view-cron-details.png)

That's it, you are done! You can now navigate to [Sumo Logic](https://www.sumologic.com/) and view your [Auth0 Logs](${manage_url}/#/logs), by selecting the configured system.

![](/media/articles/extensions/sumologic/auth0-logs-at-sumologic.png)

## Auth0 Dashboard

Here, at Auth0, we have been using the Auth0 to Sumo Logic extension ourselves since it was first released, and it's proven to be very useful for staying on top of what's happening with our own Auth0 accounts and our internal users. Sumo Logic makes it easy to see the latest failed logins, find and alert on error messages, create charts to visualize trends, or even do complex statistical analysis on your data.

To help us (and our customers) visualize these logs, we spent some time creating a dashboard. The Sumo Logic for Auth0 dashboard shows you the output of several saved searches all on one easy to read screen, and makes it easy to zoom in or drill down when something looks interesting.

![](/media/articles/extensions/sumologic/auth0-dashboard.png)

If you're a Sumo Logic customer and are interested in trying out this dashboard, just let us know via [Support Center](https://support.auth0.com/) and we will gladly share it with you. Make sure to include your Sumo Logic account name in your request. Once it's available through your account, you're free to customize it, add to it, create alerts based on the searches, or really anything else that you find useful.

Have fun analyzing and visualizing those logs!