---
title: Monitor Auth0
description: How to monitor your Auth0 implementation and account, external services, and dedicated deployments.
toc: true
topics:
  - monitoring
contentType:
  - concept
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - integrate-analytics
---
# Monitor Auth0

## Monitor Auth0 availability

If you are using the public cloud version of Auth0, we recommend subscribing to [Auth0 Status](https://status.auth0.com) for notifications regarding Auth0 service availability. The Auth0 DevOps team uses [Auth0 Status](https://status.auth0.com) for reports on current incidents.

Current and historical uptime is available at [Auth0 Uptime](http://uptime.auth0.com).


## Monitor your Auth0 account

If you would like to monitor your account or conduct end-to-end testing, you’ll need to set up your own tests.

If you've extended Auth0 through [rules](/rules) or [a custom database connection](/connections/database/mysql), you can build a synthetic transaction that exercises these capabilities using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant). One way of doing this is to [Monitor Auth0 Using SCOM](#monitor-auth0-using-scom).

However, we recommend using an authentication flow that doesn't require a user interface (such as the **Resource Owner Password Grant**), so that you don't have to use a monitoring tool that is capable of mimicking the actions of a user. Many monitoring services exist with this capability, including:

* [New Relic](http://newrelic.com)
* [Pingdom](http://pingdom.com)

You can use one of these services to execute synthetic authentication requests or to call the following endpoints:

* **`test` endpoint:** checks the status of the core Auth0 authentication service
* **`testall` endpoint:** checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Dashboard](${manage_url}) and documentation.

### The test endpoint

The `test` endpoint checks the status of the core Auth0 authentication service. An example call:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/test"
}
```

If the service is up, the endpoint returns a `200` HTTP response code; if it is not, it returns a `5xx` response code. Additionally, this endpoint returns a JSON object:

```json
{
  "clock": 1417220191640
}
```

### The testall endpoint

The `/testall` endpoint checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Dashboard](${manage_url}) and documentation. An example call:

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/testall"
}
```

If all services are up, the endpoint returns the `200` HTTP response code and a simple text message of `OK`. If any service is down, it returns a `5xx` response code.


## Monitor external services

If you see potential issues with your Auth0 service, but the monitoring endpoints and the [Auth0 Status page](https://status.auth0.com) aren't indicating any problems, check the status of any external services that you use alongside Auth0, such as:

* [Amazon Web Services](https://status.aws.amazon.com/)
* [Azure Active Directory](https://azure.microsoft.com/en-us/status/)
* [Citrix](https://status.cloud.com/)
* [Facebook](https://developers.facebook.com/status/)
* [GitHub](https://status.github.com/)
* [Google Cloud](https://status.cloud.google.com/)
* [Google's G Suite](https://www.google.com/appsstatus#hl=en&v=status)
* [Heroku](https://status.heroku.com/)
* [IBM](https://console.bluemix.net/status)
* [Mandrill](http://status.mandrillapp.com/)
* [Microsoft Azure](https://azure.microsoft.com/en-gb/status/)
* [SAP](https://www.sap.com/about/cloud-trust-center/cloud-service-status.html)
* [SendGrid](http://status.sendgrid.com/)
* [SFDC](https://status.salesforce.com/)
* [Slack](https://status.slack.com/)
* [Twilio](https://status.twilio.com/)
* [VM Ware](https://status.vmware-services.io/)

## Monitor a dedicated deployment

Please see the [PSaaS Appliance](/appliance) pages for [information on monitoring a dedicated deployment](/appliance/monitoring).

## Monitor Auth0 Using SCOM

Auth0 can be monitored as a standard web application using System Center Operations Manager (SCOM) or any tool that supports synthetic transactions.

In addition to a synthetic login transaction that includes the extensions your applications rely on (such as rules that execute custom code for integration with your company's other services), we recommend adding SCOM probes for the `test` and `testall` endpoints.

To set up SCOM:

1. Add a new SCOM instance using the **Add Monitoring Wizard**:

  * **Name**: a descriptive name for the SCOM instance
  * **Description**: a description of what this SCOM instances monitors
  * **Select destination management pack**: Default Management Pack
  
  When finished, click **Next** to continue.

  ![ss-2014-11-21T15-44-34.png](/media/articles/monitoring/ss-2014-11-21T15-44-34.png)

 
2. Click **Add** to enter the URLs you want SCOM to monitor.

When finished, click **Next** to continue.

  ![ss-2014-11-21T16-31-15.png](/media/articles/monitoring/ss-2014-11-21T16-31-15.png)


3. Click **Add** to set up a location from which you want to monitor.

In the pop-up dialog, search for **Internal location - Agent**. Select the appropriate address, and click **Add**. Then click **Ok** to finish selecting the location.

When finished, click **Next** to continue.

  ![ss-2014-11-21T16-32-25.png](/media/articles/monitoring/ss-2014-11-21T16-32-25.png)


4. Set the frequency with which SCOM collects data from each endpoint:

  * **Test frequency**: 60 seconds
  * **Performance data collection interval**: 60 seconds
  * **Test time-out**: 30 seconds

  Additionally, under the *Alerts* section, **check** the box next to *HTTP status code* and set that to **Greater than or equals 400**.
  
  When finished, click **Next** to continue.

  ![ss-2014-11-21T16-33-51.png](/media/articles/monitoring/ss-2014-11-21T16-33-51.png)


5. Click **Run Test** to test each endpoint and ensure that the connection settings provided are correct.

![ss-2014-11-21T16-34-25.png](/media/articles/monitoring/ss-2014-11-21T16-34-25.png)

6. Once you have finished configuring your SCOM instance, you can view activity through the **Monitoring** tab:

![ss-2014-11-25T17-20-47.png](/media/articles/monitoring/ss-2014-11-25T17-20-47.png)

Click **Web Application Status** to bring up the information SCOM has gathered.

![ss-2014-11-25T17-22-10.png](/media/articles/monitoring/ss-2014-11-25T17-22-10.png)
