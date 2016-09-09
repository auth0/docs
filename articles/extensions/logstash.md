# Auth0 Logs to Logstash

The _Auth0 Logs to Logstash_ is a scheduled job that takes all of your Auth0 logs and exports them to [Logstash](https://www.elastic.co/products/logstash). Logstash is an open source log management tool that is most often used as part of the ELK stack along with ElasticSearch and Kibana.

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Logstash_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/logstash/extension-mgmt-logstash.png)

At this point you should set the following configuration variables:

- **Schedule**: The frequency with which logs should be exported. The schedule can be customized even further after creation.
- **BATCH_SIZE**: The ammount of logs to be read on each execution. Maximun is 100.
- **LOGSTASH_URL**: Your Logstash URL as defined for use with `logstash-input-http` plugin.
- **LOGSTASH_INDEX**: Your Logstash Index to which the logs will be routed.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Logstash.
- **LOG_TYPES**: The events for which logs should be exported.

Once you have provided this information, click the _Install_ button to finish installing the extension.

## Using Your Installed Extension

 To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the _Installed Extensions_ link, and select the _Auth0 Logs to Logstash_ line. There you can see the job you just created, modify its state by toggling the _State_ switch, see when the next run is due and what was the result of the last execution. 

![](/media/articles/extensions/logstash/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/logstash/view-cron-details.png)

That's it, you are done! Have fun analyzing and visualizing those logs!
