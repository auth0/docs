---
description: How to configure and use the Auth0 Logs to Mixpanel extension. 
---

# Auth0 Logs to Mixpanel

The Auth0 Logs to Mixpanel is a scheduled job that takes all of your Auth0 logs and exports them to [Mixpanel](https://mixpanel.com).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Mixpanel_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/mixpanel/extension-mgmt-mixpanel.png)

At this point you should set the following configuration variables:
- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **MIXPANEL_TOKEN**: The Mixpanel Token for your mixpanel project to which the Auth0 logs will be exported.
- **MIXPANEL_KEY**: The Mixpanel API Key for your mixpanel project to which the Auth0 logs will be exported.
- **BATCH_SIZE**: The ammount of logs to be read on each execution. Maximun is 100.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Mixpanel.
- **LOG_TYPES**: The events for which logs should be exported.  If you want you can send only events with a specific type (for example, failed logins).

Once you have provided this information, click the *Install* button to finish installing the extension.

## Retrieve the required information from Mixpanel

In order to acquire the *MIXPANEL_TOKEN* and *MIXPANEL_KEY* information, navigate to [Mixpanel](https://mixpanel.com) and click on your [Account Settings](https://mixpanel.com/account/). Click on the *Projects* tab. You now need to copy the *Token* and *API Key* information. These map respectively to the *MIXPANEL_TOKEN* and *MIXPANEL_KEY* variables. 

![](/media/articles/extensions/mixpanel/mixpanel-project-info.png)

## Using Your Installed Extension

 To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the *Installed Extensions* link, and select the *Auth0 Logs to Mixpanel* line. There you can see the job you just created, modify its state by toggling the *State* switch, see when the next run is due and what was the result of the last execution. 

![](/media/articles/extensions/mixpanel/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/mixpanel/view-cron-details.png)

That's it, you are done! You can now navigate to [Mixpanel](https://mixpanel.com) and view your [Auth0 Logs](${manage_url}/#/logs).

![](/media/articles/extensions/mixpanel/auth0-logs-at-mixpanel.png)