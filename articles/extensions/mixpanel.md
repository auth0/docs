---
description: How to configure and use the Auth0 Logs to Mixpanel extension.
topics:
  - extensions
  - mixpanel
contentType:
  - how-to
useCase: extensibility-extensions
---

# Auth0 Logs to Mixpanel

The Auth0 Logs to Mixpanel is a scheduled job that takes all of your Auth0 logs and exports them to [Mixpanel](https://mixpanel.com).

## Step 1: Get the required information from Mixpanel

First you need to get some required information from Mixpanel: the Token and API Key that Auth0 will use to connect and push logs.

1. Go to [Mixpanel](https://mixpanel.com)
1. Click on your [Account Settings](https://mixpanel.com/account/)
1. Click on the **Projects** tab
1. Copy the **Token** and **API Key** information. These map respectively to the **MIXPANEL_TOKEN** and **MIXPANEL_KEY** variables that you will set in the next step

![Get keys from Mixpanel](/media/articles/extensions/mixpanel/mixpanel-project-info.png)

## Step 2: Configure Auth0

Go to [Dashboard > Extensions](${manage_url}/#/extensions) and click on the **Auth0 Logs to Mixpanel** box in the list of provided extensions. 

The **Install Extension** window pops open.

![Install Auth0 Extension](/media/articles/extensions/mixpanel/extension-mgmt-mixpanel.png)

Set the following configuration variables:
- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **MIXPANEL_TOKEN**: The Mixpanel Token for your mixpanel project to which the Auth0 logs will be exported.
- **MIXPANEL_KEY**: The Mixpanel API Key for your mixpanel project to which the Auth0 logs will be exported.
- **BATCH_SIZE**: The amount of logs to be read on each execution. Maximum is 20.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Mixpanel.
- **LOG_TYPES**: The events for which logs should be exported.  If you want you can send only events with a specific type (for example, failed logins).

Once you have provided this information, click the **Install** button to finish installing the extension.

<%= include('./_includes/_batch-size') %>

## Use your extension

To view all jobs, navigate to [Dashboard > Extensions](${manage_url}/#/extensions), click on the **Installed Extensions** link, and select the **Auth0 Logs to Mixpanel** line. There you can see the alls job and failed jobs. You can also view the logs of these runs.

You can create a cron webtask (that will run every 10 minutes) or view more details around existing cron webtasks. In the terminal, you can view details for each execution, reschedule, access realtime logs, and more.

That's it, you are done! You can now navigate to [Mixpanel](https://mixpanel.com) and view your [Auth0 Logs](${manage_url}/#/logs).

![](/media/articles/extensions/mixpanel/auth0-logs-at-mixpanel.png)
