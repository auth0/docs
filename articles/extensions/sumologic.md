# Auth0 Logs to Sumo Logic

The _Auth0 Logs to Sumo Logic_ is a scheduled job that takes all of your Auth0 logs and exports them to [Sumo Logic](https://www.sumologic.com/).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Sumo Logic_ box in the list of provided extensions on the [Extensions](${uiURL}/#/extensions) page of the [Management Portal](${uiURL}). The _Install Extension_ window pops open.

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

 To view all scheduled jobs, navigate to the [Extensions](${uiURL}/#/extensions) page of the [Management Portal](${uiURL}), click on the *Installed Extensions* link, and select the *Auth0 Logs to Sumo Logic* line. There you can see the job you just created, modify its state by toggling the *State* switch, see when the next run is due and what was the result of the last execution. 

![](/media/articles/extensions/sumologic/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/sumologic/view-cron-details.png)

That's it, you are done! You can now navigate to [Sumo Logic](https://www.sumologic.com/) and view your [Auth0 Logs](${uiURL}/#/logs), by selecting the configured system.

![](/media/articles/extensions/sumologic/auth0-logs-at-sumologic.png)