---
description: How to use monitoring with an Auth0 account.
toc: true
---

# Monitor Auth0

If you are using the public cloud version of Auth0, we recommend subscribing to [Auth0 Status](http://status.auth0.com) for notifications regarding Auth0 service availability. The Auth0 DevOps team uses [Auth0 Status](http://status.auth0.com) for reports on current incidents.

Current and historical uptime is available at [Auth0 Uptime](http://uptime.auth0.com).

## Monitor Your Auth0 Account

You can add Auth0 health probes to your monitoring infrastructure with the following endpoints:

### The test Endpoint

The `test` endpoint checks the status of the core Auth0 authentication service. If the status is up, the endpoint returns a `200` status code; if is is not, it will return a `5xx` status code.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/test"
}
```

Additionally, this endpoint returns a JSON object:

```json
{
  "clock": 1417220191640
}
```

### The testall Endpoint

The `/testall` endpoint checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Dashboard](${manage_url}) and documentation.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/testall"
}
```

If all services are up, the endpoint returns the `200` HTTP response code and a simple text message saying, `OK`. If any service is down, the response code from `/testall` will be `5xx`.

If you've extended Auth0 through [rules](/rules) or [a custom database connection](/connections/database/mysql), you can build a synthetic transaction that exercises these capabilities using the [Resource Owner Password Grant](/api-auth/tutorials/password-grant).

We recommend using an authentication flow that doesn't require a user interface (such as the **Resource Owner Password Grant**) so that you don't have to use a monitoring tool that is capable of mimicking the actions of a user. Many monitoring tools exist using this approach, including:

* [New Relic](http://newrelic.com)
* [Pingdom](http://pingdom.com)

### Monitor External Services Associated with Your Auth0 Account

If you are seeing issues with your Auth0 service, but the monitoring endpoints aren't returning information on errors, check the status of any external services that you use via Auth0.

* [Amazon Web Services](https://status.aws.amazon.com/)
* [Azure Active Directory](https://azure.microsoft.com/en-us/status/)
* [Facebook](https://developers.facebook.com/status/)
* [GitHub](https://status.github.com/)
* [Google's G Suite](https://www.google.com/appsstatus#hl=en&v=status)
* [Mandrill](http://status.mandrillapp.com/)
* [SendGrid](http://status.sendgrid.com/)
* [Twilio](https://status.twilio.com/)

## Monitoring a Dedicated Deployment

Please see the [PSaaS Appliance](/appliance) pages for [information on monitoring a dedicated deployment](/appliance/monitoring).

## Configure SCOM

Auth0 can be monitored as a standard web application using System Center Operations Manager (SCOM) or any tool that supports synthetic transactions.

We recommend adding SCOM probes for the `test` and `testall` endpoints, in addition to one for a synthetic login transaction that includes the extensions your applications rely on (such as rules that execute custom code for integration with your company's other services).

To set up SCOM:

1. Add a new SCOM instance using the **Add Monitoring Wizard**:

  * **Name**: a descriptive name for the SCOM instance
  * **Description**: a description of what this SCOM instances monitors
  * **Select destination management pack**: Default Management Pack

  ![ss-2014-11-21T15-44-34.png](/media/articles/monitoring/ss-2014-11-21T15-44-34.png)

  Click **Next** to continue.

2. Click **Add** to enter the URLs you want SCOM to monitor.

  ![ss-2014-11-21T16-31-15.png](/media/articles/monitoring/ss-2014-11-21T16-31-15.png)

  Click **Next** to continue.

3. You will be asked where you want to monitor from. Click **Add** to set up a location. In the pop-up dialog, search for **Internal location - Agent**. Select the appropriate address and click **Add**. Click **Ok** to finish selecting the location.

  ![ss-2014-11-21T16-32-25.png](/media/articles/monitoring/ss-2014-11-21T16-32-25.png)

  Click **Next** to continue.

4. Set the frequency with which SCOM collects data from each endpoint:

  * **Test frequency**: 60 seconds
  * **Performance data collection interval**: 60 seconds
  * **Test time-out**: 30 seconds

  Additionally, under the *Alerts* section, **check** the box next to *HTTP status code* and set that to **Great than or equals 400**.

  ![ss-2014-11-21T16-33-51.png](/media/articles/monitoring/ss-2014-11-21T16-33-51.png)

  Click **Next** to continue.

5. Click **Run Test** to test each endpoint and ensure that the connection settings provided are correct.

![ss-2014-11-21T16-34-25.png](/media/articles/monitoring/ss-2014-11-21T16-34-25.png)

Once you have finished configuring your SCOM instance, you can activity through the **Monitoring** tab:

![ss-2014-11-25T17-20-47.png](/media/articles/monitoring/ss-2014-11-25T17-20-47.png)

Click **Web Application Status** to bring up the information SCOM has gathered.

![ss-2014-11-25T17-22-10.png](/media/articles/monitoring/ss-2014-11-25T17-22-10.png)
