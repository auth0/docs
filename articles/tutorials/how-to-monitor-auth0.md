---
description: How to use monitoring with an Auth0 account.
---

# Monitor Auth0

If you are using the public cloud version of Auth0, we recommend subscribing to [Auth0 Status](http://status.auth0.com) for notifications regarding Auth0 service availability. The Auth0 DevOps team uses Auth0 Status](http://status.auth0.com) for reports on current incidents.

Current and historical uptime is available at [Auth0 Uptime](http://uptime.auth0.com).

## Monitor Your Auth0 Account

You can add Auth0 health probes to your monitoring infrastructure with the following endpoints:

### The `test` Endpoint

The `test` endpoint checks the status of the core Auth0 authentication service. If the status is up, the endpoint returns a `200` status code; if is is not, it will return a `5xx` status code.

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/test",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```

Additionally, this endpoint returns a JSON object:

```json
{
  "clock": 1417220191640
}
```

### The `testall` Endpoint

The `/testall` endpoint checks the status of the core Auth0 authentication service, as well as supporting services such as those for the [Management Dashboard](${}) and [Documentation](/).

```har
{
  "method": "GET",
  "url": "https://${account.namespace}/testall",
  "headers": [
    { "name": "Authorization", "value": "Bearer YOUR_ID_TOKEN_HERE" }
  ]
}
```

If all services are up, the endpoint returns the `200` HTTP response code and a simple text message saying, "`OK`." If any service is down, the response code from `/testall` will be 5xx.

If you've extended Auth0 through [rules](/rules) or [a custom database connection](/connections/database/mysql), you can build a synthetic transaction that exercises these capabilities.

```har
{
  "method": "POST",
  "url": "https://${account.namespace}/oauth/ro",
  "headers": [
    { "name": "Content-Type", "value": "application/json" }
  ],
  "postData": {
    "mimeType": "application/json",
    "text": "{\"client_id\": \"An app registered in Auth0 for monitoring\",\"username\": \"A system account for monitoring\", \"password\": \"A password\", \"connection\": \"A user store defined in Auth0\", \"grant_type\": \"password\", \"scope\":\"openid\", \"device\": \"SCOM\"}"
  }
}
```

A successful request would return a `200` HTTP status code and the following information:

```json
{
  "id_token": "eyJ0eXAi......3Jia5WgM",
  "access_token": "F25VQ.....NWpS",
  "token_type": "bearer"
}
```

We recommend using an authentication flow that doesn't require a user interface (such as the `Resource Owner flow`) so that you don't have to use a monitoring tool that is capable of mimicking the actions of a user. Many monitoring tools exist using this approach, including:

* [New Relic](http://newrelic.com)
* [Pingdom](http://pingdom.com)

### Monitor External Services Associated with Your Auth0 Account

If you are seeing issues with your Auth0 service, but the monitoring endpoints aren't returning information on errors, check the status of any external services that you use via Auth0.

* [Amazon Web Services] https://status.aws.amazon.com/
* [Azure Active Directory] https://azure.microsoft.com/en-us/status/
* [Facebook] https://developers.facebook.com/status/
* [GitHub] https://status.github.com/
* [Google's G Suite] https://www.google.com/appsstatus#hl=en&v=status
* [Mandrill] http://status.mandrillapp.com/
* [SendGrid] http://status.sendgrid.com/
* [Twilio] https://status.twilio.com/

## Monitoring a Dedicated Deployment

Please see the [Appliance](/appliance) pages for [information on monitoring a dedicated deployment](/appliance/monitoring).

## Configure SCOM

Auth0 can be monitored as a standard web application using System Center Operations Manager (or any tool that supports synthetic transactions).

We recommend adding probes in SCOM for all the endpoints described above, in addition to a synthetic login transaction that includes the extensions your applications rely on (such as rules that execute custom code integrating with your company's other services).

#### Configuring System Center Operations Manager

Setup for SCOM is straightforward as shown on these screenshots:

![ss-2014-11-21T15-44-34.png](/media/articles/monitoring/ss-2014-11-21T15-44-34.png)

![ss-2014-11-21T16-31-15.png](/media/articles/monitoring/ss-2014-11-21T16-31-15.png)

![ss-2014-11-21T16-32-25.png](/media/articles/monitoring/ss-2014-11-21T16-32-25.png)

![ss-2014-11-21T16-33-51.png](/media/articles/monitoring/ss-2014-11-21T16-33-51.png)

![ss-2014-11-21T16-34-25.png](/media/articles/monitoring/ss-2014-11-21T16-34-25.png)

Make sure to configure proper alerts against these probes. Timeouts on endpoints are dependent on the network configuration, but should resemble the expected behavior of applications.

#### Monitoring

You can monitor System Center activity through the monitoring tab:

![ss-2014-11-25T17-20-47.png](/media/articles/monitoring/ss-2014-11-25T17-20-47.png)

![ss-2014-11-25T17-22-10.png](/media/articles/monitoring/ss-2014-11-25T17-22-10.png)
