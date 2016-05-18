# Auth0 Logs to Application Insights

The Auth0 Logs to Application Insights is a scheduled job takes all of your Auth0 logs and exports them to Application Insights.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 Logs to Application Insights box in the list of provided extensions on the Extensions page of the Management Portal. In the "Install Extension" window that then pops open, you will be asked to provide the following configuration variables:

 - __Schedule__: The frequency with which logs should be exported;
 - __Auth0_Domain__: The domain of your Auth0 app;
 - __Auth0_Global_Client_ID__: The Global Client ID of your Auth0 app;
 - __Auth0_Global_Client_Secret__: The Global Client Secret of your Auth0 app;
 - __Appinsights_Instrumentation_Key__: The Application Insights instrumentation key.

 Once you have provided the appropriate values for the above fields, click "Install" to proceed.

## Using Your Installed Extension

You can view all scheduled jobs by clicking on the Auth0 Logs to Application Insights line under the "Installed Extensions" tab.
