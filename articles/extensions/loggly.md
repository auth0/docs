---
description: How to install and configure the Auth0 Logs to Loggly Extension.
---
# Auth0 Logs to Loggly

The *Auth0 Logs to Loggly* is a scheduled job that takes all of your Auth0 logs and exports them to [Loggly](https://www.loggly.com/).

## Configure the Extension

To install and configure this extension, click on the __Auth0 Logs to Loggly__ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [dashboard](${manage_url}). The __Install Extension__ window pops open.

![Install Auth0 Logs to Loggly Extension](/media/articles/extensions/loggly/extension-mgmt-loggly.png)

At this point you should set the following configuration variables:

- __Schedule__: The frequency with which logs should be exported.
- __Auth0_Domain__: The domain of your Auth0 application. You can find this information at the [__Settings__ view of your application](${manage_url}/#/applications/${account.clientId}/settings).
- __Auth0_Global_Client_ID__: The Global Client ID of your Auth0 application.
- __Auth0_Global_Client_Secret__: The Global Client Secret of your Auth0 application.

::: note
You can find the __Global Client ID__ and __Global Client Secret__ information at the __Global Application information__ section of [your Tenant Advanced Settings](${manage_url}/#/tenant/advanced).
:::

- __Loggly_Customer_Token__: The identifying token assigned to you by Loggly at set-up.
- __Loggly_Subdomain__: The Loggly account name.
- __Log_Level__: The minimal log level of events that you would like sent to Loggly.
- __Log_Types__: The events for which logs should be exported.

Once you have provided this information, click the *Install* button to finish installing the extension.

## Retrieve the required information from Loggly

Let's see how we can retrieve the __Loggly_Customer_Token__ information.

::: note
We assume that you already know your __Loggly_Subdomain__ since it's part of your URL. For example, if your account's URL is `https://mylogs.loggly.com` then the __Loggly_Subdomain__ should be set to `mylogs`.
:::

1. Login to your [Loggly](https://www.loggly.com/) account.

2. Using the menu bar at the top, navigate to _Source Setup > Customer Tokens_. Your __Customer Token__ is displayed on the page. You can create a new one if you want.

![Customer Token](/media/articles/extensions/loggly/copy-source-setup.png)

3. Copy this value and head back to the [Auth0 dashboard](${manage_url}). Set it at the __Loggly_Customer_Token__ field. You 're done!

## Use Your Installed Extension

To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [dashboard](${manage_url}), click on the __Installed Extensions__ link, and select the __Auth0 Logs to Loggly__ line. There you can see the job you just created, modify its state by toggling the __State__ switch, see when the next run is due and what was the result of the last execution.

![View Cron Jobs](/media/articles/extensions/loggly/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![View Cron Details](/media/articles/extensions/loggly/view-cron-details.png)

That's it, you are done! You can now navigate to [Loggly](https://www.loggly.com/) and view your [Auth0 Logs](${manage_url}/#/logs).

![View Auth0 Logs at Loggly](/media/articles/extensions/loggly/auth0-logs-at-loggly.png)
