# Auth0 Logs to Papertrail

The Auth0 Logs to Papertrail is a scheduled job that takes all of your Auth0 logs and exports them to [Papertrail](https://papertrailapp.com).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Papertrail_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/papertrail/extension-mgmt-papertrail.png)

At this point you should set the following configuration variables:

- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **BATCH_SIZE**: The ammount of logs to be read on each execution. Maximun is 100.
- **PAPERTRAIL_HOST**: The destination hostname for your logs.
- **PAPERTRAIL_PORT**: The destination port for your logs.
- **PAPERTRAIL_SYSTEM**: The destination system for your logs.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Papertrail;
- **LOG_TYPES**: The events for which logs should be exported.

Once you have provided this information, click the *Install* button to finish installing the extension.

## Retrieve the required information from Papertrail

In order to configure a new system for Auth0 logs and acquire the *PAPERTRAIL_HOST* and *PAPERTRAIL_PORT* information, follow the next steps:
1. Login to [Papertrail](https://papertrailapp.com) and navigate to your [Dashboard](https://papertrailapp.com/dashboard).
2. Click the *Add Systems* button.

![](/media/articles/extensions/papertrail/papertrail-new-system-01.png)

3. Your log destination is created! Copy the URL and Port information displayed with the message *Your systems & apps will log to*. These map respectively to the *PAPERTRAIL_HOST* and *PAPERTRAIL_PORT* variables.

![](/media/articles/extensions/papertrail/papertrail-new-system-02.png)

If you already have a system you want to use, follow the next steps:
1. Login to [Papertrail](https://papertrailapp.com) and navigate to your [Settings > Log Destinations](https://papertrailapp.com/account/destinations).
2. Locate the system you want to use and copy the URL and Port information. These map respectively to the *PAPERTRAIL_HOST* and *PAPERTRAIL_PORT* variables.

![](/media/articles/extensions/papertrail/papertrail-existing-system.png)

## Using Your Installed Extension

 To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the *Installed Extensions* link, and select the *Auth0 Logs to Papertrail* line. There you can see the job you just created, modify its state by toggling the *State* switch, see when the next run is due and what was the result of the last execution. 

![](/media/articles/extensions/papertrail/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/papertrail/view-cron-details.png)

That's it, you are done! You can now navigate to [Papertrail](https://papertrailapp.com) and view your [Auth0 Logs](${manage_url}/#/logs), by selecting the configured system.

![](/media/articles/extensions/papertrail/auth0-logs-at-papertrail-01.png)

> You may have noticed that we didn't set a value for *PAPERTRAIL_SYSTEM*. This variable, when not set by the user, takes the default value of `auth0-logs`. As you can see in the previous screenshot, this is how our system will be displayed in the Papertrail dashboard.

![](/media/articles/extensions/papertrail/auth0-logs-at-papertrail-02.png)