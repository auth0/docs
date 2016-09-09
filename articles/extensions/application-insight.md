# Auth0 Logs to Application Insights

The *Auth0 Logs to Application Insights* is a scheduled job takes all of your Auth0 logs and exports them to [Application Insights](https://azure.microsoft.com/en-us/services/application-insights/).

## Configure the Extension

To install and configure this extension, click on the __Auth0 Logs to Application Insights__ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [dashboard](${manage_url}). The __Install Extension__ window pops open.

![Install Extension](/media/articles/extensions/appinsights/ext-mgmt-appinsights.png)

At this point you should set the following configuration variables:

- __Schedule__: The frequency with which logs should be exported.
- __Batch_Size__: TThe amount of logs to be read on each execution. Maximun is 100.
- __AppInsights_Instrumentation_Key__: The Application Insights instrumentation key.

 Once you have provided the appropriate values for the above fields, click __Install__ to proceed.

## Retrieve the required information from Application Insights

Let's see how we can retrieve the __AppInsights_Instrumentation_Key__ information.

1. Login to your [Azure Portal](https://portal.azure.com/#) and add a new _Application Insights_ instance in your subscription. To do so click __New__ and search for `Application Insights`.

![New Application Insights instance](/media/articles/extensions/appinsights/new-appinsights.png)

2. Click __Create__ and fill in the required information, such as the name of your instance, the application type and the resource group. Click __Create__ to trigger the provisioning process.

![Configure Application Insights instance](/media/articles/extensions/appinsights/conf-appinsights.png)

3. Once the provisioning is complete (after a few seconds usually) you can get the __Instrumentation Key__ from the Properties page.

![Application Insights Properties](/media/articles/extensions/appinsights/appinsights-properties.png)

4. Copy this value and head back to your [Auth0 dashboard](${manage_url}). Set it at the __AppInsights_Instrumentation_Key__ field. Save your changes.


## Use Your Installed Extension

To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [dashboard](${manage_url}), click on the __Installed Extensions__ link, and select the __Auth0 Logs to Application Insights__ line. There you can see the job you just created, modify its state by toggling the __State__ switch, see when the next run is due and what was the result of the last execution.

![View Cron Jobs](/media/articles/extensions/appinsights/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![View Cron Details](/media/articles/extensions/appinsights/view-cron-details.png)

That's it, you are done! You can now navigate to your [Azure Portal](https://portal.azure.com/#) and view your [Auth0 Logs](${manage_url}/#/logs).
