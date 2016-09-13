# Auth0 Logs to Logentries

The *Auth0 Logs to Logentries* is a scheduled job that takes all of your Auth0 logs and exports them to [Logentries](https://logentries.com).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Logentries_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/logentries/extension-mgmt-logentries.png)

At this point you should set the following configuration variables:
- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **BATCH_SIZE**: The ammount of logs to be read on each execution. Maximun is 100.
- **LOGENTRIES_TOKEN**: The Logentries Token for your log set to which the Auth0 logs will be exported.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Logentries.
- **LOG_TYPES**: The events for which logs should be exported.  If you want you can send only events with a specific type (for example, failed logins).

Once you have provided this information, click the *Install* button to finish installing the extension.

## Retrieve the required information from Logentries

In order to acquire the *LOGENTRIES_TOKEN* information, navigate to [Logentries](https://logentries.com) and login to your account or register for a new one. From the menu on the left select *Logs > Add New Log*.

![](/media/articles/extensions/logentries/logentries-newlog-menu.png)

Click on the *Manual* button.

![](/media/articles/extensions/logentries/logentries-newlog-manual.png)

Set a *Log Name* and either create a new Set or pick an existing. For the purposes of this tutorial we will pick the existing *DemoSet*.

![](/media/articles/extensions/logentries/logentries-newlog-info.png)

You are now ready to create your new log. Click on the *Create Log Token* button at the bottom of the page. Once you do the button will be replaced with a text box displaying your new token, registered for this log. Copy this information and click on *Finish & View Log*.

![](/media/articles/extensions/logentries/logentries-newlog-token.png)

You can now go back to your [Auth0 Dashboard](${manage_url}) and populate the *LOGENTRIES_TOKEN* field of the extension with the value you copied.

## Using Your Installed Extension

 To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the *Installed Extensions* link, and select the *Auth0 Logs to Logentries* line. There you can see the job you just created, modify its state by toggling the *State* switch, see when the next run is due and what was the result of the last execution. 

![](/media/articles/extensions/logentries/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/logentries/view-cron-details.png)

That's it, you are done! You can now navigate to [Logentries](https://logentries.com) and view your [Auth0 Logs](${manage_url}/#/logs).

![](/media/articles/extensions/logentries/logentries-view-logs.png)
