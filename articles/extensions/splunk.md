# Auth0 Logs to Splunk

The _Auth0 Logs to Splunk_ is a scheduled job that takes all of your Auth0 logs and exports them to [Splunk](http://www.splunk.com/).

## Configuring the Extension

To install and configure this extension, click on the _Auth0 Logs to Splunk_ box in the list of provided extensions on the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}). The _Install Extension_ window pops open.

![](/media/articles/extensions/splunk/extension-mgmt-splunk.png)

At this point you should set the following configuration variables:

- **Schedule**: How often the job will run. The schedule can be customized even further after creation.
- **SPLUNK_URL**: Your Splunk Cloud URL. 
- **SPLUNK_TOKEN**: Your Splunk Token.
- **SPLUNK_COLLECTOR_PORT**: The Port of your HTTP Collector Endpoint.
- **SPLUNK_COLLECTOR_PATH**: The [HTTP Collector Endpoint](http://dev.splunk.com/view/event-collector/SP-CAAAE7H) to be used. If you use the `/raw` endpoint, make sure to append a channel as a querystring parameter, like this: `/services/collector/raw?channel=FE0ECFAD-13D5-401B-847D-77833BD77131`. More information can be found in the [Splunk documentation](http://dev.splunk.com/view/event-collector/SP-CAAAE8Y).
- **BATCH_SIZE**: The ammount of logs to be read on each execution. Maximun is 100.
- **LOG_LEVEL**: The minimal log level of events that you would like sent to Splunk.
- **LOG_TYPES**: The events for which logs should be exported.

Once you have provided this information, click the *Install* button to finish installing the extension.

## Retrieve the required information from Splunk

The HTTP Event Collector (HEC) is an endpoint that lets you send application events into Splunk Enterprise using the HTTP or Secure HTTP (HTTPS) protocols. In order to configure a new HTTP Event Collector for Auth0 logs and acquire the URL, Token and Port information, follow the next steps:

> This tutorial follows the step for Splunk Cloud. In case this is the first HEC you will configure for your account make sure that the Event Collector is enabled. You can find details on how to do this [here](http://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector).

1. Navigate to your _Splunk Cloud URL_. You must have received this information via email upon signup. From the system menu select _Settings > Data Inputs_.

![](/media/articles/extensions/splunk/splunk-data-inputs.png)

2. Select the _Add New_ link under _Local Inputs > HTTP Event Collector_.

![](/media/articles/extensions/splunk/splunk-add-new.png)

3. A wizard, that will configure a new token for receiving data over HTTP, is displayed. Set a name for this new token and click _Next_. We recommend naming it _auth0_.

![](/media/articles/extensions/splunk/splunk-new-token.png)

4. Select a _Source type_ and an _Index_. We will create a new _Source type_, named _auth0_, and use _main_ as our _Index_. Click _Review_.

![](/media/articles/extensions/splunk/splunk-setup.png)

5. Review the information displayed and click _Submit_.

6. Your new token should be created successfully. Copy the value, this is your **SPLUNK_TOKEN**.

![](/media/articles/extensions/splunk/splunk-token-created.png)

7. Let's make a quick test to ensure the HEC is properly configured. Open a command prompt window or terminal. Type the following cURL statement to test out your token. Be sure to replace `<host>` with your Splunk Enterprise or Splunk Cloud server's hostname, and `<token>` with the token you just copied to the Clipboard:

```
curl -k https://<host>:8088/services/collector -H 'Authorization: Splunk <token>' -d '{"event":"Hello, World!"}'
```

> The `<host>` value is based on your _Splunk Cloud URL_. When creating requests to Splunk Cloud, you must add a prefix to the URI of the hostname according to your subscription. For self-service Splunk Cloud plans, pre-pend the hostname with `input-`. For all other Splunk Cloud plans, pre-pend the hostname with `http-inputs-`. For this example we have subscribed for a self-service Splunk Cloud plan, so we will use the `input-` prefix. You can find more details [here](http://dev.splunk.com/view/event-collector/SP-CAAAE7F).

As a response you should receive the followins JSON:

```json
{
  "text":"Success",
  "code":0
}
```

Navigate to your _Splunk Cloud URL_. Click on _Search & Reporting_. Click on _Data Summary_ and select your host at the popup window. 

![](/media/articles/extensions/splunk/splunk-search.png)

> Splunk uses the Splunk Search Processing Language (SPL). For the search we executed above the search value would be `host="input-<host>:8088"`, where the `<host>` value is your _Splunk Cloud URL_. Click [here](http://docs.splunk.com/Documentation/Splunk/latest/Search/WhatsinSplunkSearch) for more info. 

When the results of the search are displayed you should be able to see at least one entry, for our Hello World example.

![](/media/articles/extensions/splunk/splunk-hello-world.png)

Now that we have confirmed our Splunk setup we can finish the Auth0 side configuration and start pushing logs.

8. Head back to the Auth0 Dashboard and go to the _Settings_ of the Splunk Extension. Set the following values: 
- **SPLUNK_TOKEN**: the value of the Splunk Token you created, same one you used for our Hello World example.
- **SPLUNK_URL**: Your Splunk HTTP Collector Endpoint. It should like the following: `https://<prefix>-<host>:8088/services/collector`. The `<host>` is your _Splunk Cloud URL_. The `<prefix>` is either `input-` or `http-inputs-` (see note at previous step).
- **SPLUNK_COLLECTOR_PORT**: The Port of your HTTP Collector Endpoint. Default is `8088`.
Save your changes. A new CRON job is created and will be executed according to the **Schedule** value you selected for the extension.

## Using Your Installed Extension

 To view all scheduled jobs, navigate to the [Extensions](${manage_url}/#/extensions) page of the [Management Portal](${manage_url}), click on the *Installed Extensions* link, and select the *Auth0 Logs to Splunk* line. There you can see the job you just created, modify its state by toggling the *State* switch, see when the next run is due and what was the result of the last execution. 

![](/media/articles/extensions/splunk/view-cron-jobs.png)

You can view more details by clicking on the job you created. In this page you can view details for each execution, reschedule, access realtime logs, and more.

![](/media/articles/extensions/splunk/view-cron-details.png)

That's it, you are done! When the CRON job has executed at least one you can now navigate to your _Splunk Cloud URL_ and view your [Auth0 Logs](${manage_url}/#/logs). Follow the same steps as before to search for the data associated with your host (Search & Reporting > Data Summary > select host).

![](/media/articles/extensions/splunk/auth0-logs-at-splunk.png)


