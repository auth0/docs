# Auth0 Logs to Papertrail

The Auth0 Logs to Papertrail is a scheduled job that takes all of your Auth0 logs and exports them to Papertrail.

## Configuring the Extension

To complete installation of this extension, click on the Auth0 Logs to Papertrail box in the list of provided extensions on the Extensions page of the Management Portal. In the "Install Extension" window that then pops open, you will be asked to provide the following configuration variables:

- __Schedule__: The frequency with which logs should be exported;
- __Auth0_Domain__: The domain of your Auth0 app;
- __Auth0_Global_Client_ID__: The Global Client ID of your Auth0 app;
- __Auth0_Global_Client_Secret__: The Global Client Secret of your Auth0 app;
- __Papertrail_Host__: The destination hostname for your logs;
- __Papertrail_Port__: The destination port for your logs;
- __Log_Level__: The minimal log level of events that you would like sent to Papertrail;
- __Log_Types__: The events for which logs should be exported.

Once you have provided the required pieces of information, click "Install" to finish installing the extension.

## Using Your Installed Extension

 You can view all scheduled jobs by clicking on the Auth0 Logs to Papertrail line under the "Installed Extensions" tab.
