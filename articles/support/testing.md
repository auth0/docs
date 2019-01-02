---
title: Testing Your Auth0 Implementation
description: Guidelines for testing your Auth0 implementation prior to deployment to Production environments
topics:
    - support
    - testing
    - pre-deployment-testing
contentType:
  - how-to
  - reference
useCase:
  - support
---

# Testing Your Auth0 Implementation

You should run unit and integration tests before implementing Auth0 on a live application or service.

Performing tests against Auth0 APIs may lead to your account being rate limited, so we recommend creating mock Auth0 APIs during testing. Depending on your development environment, your test tools may also provide mock API functionality. There are also numerous API mocking tools available, such as [MockServer](http://www.mock-server.com/) or [JSON Server](https://github.com/typicode/json-server), that enable you to quickly create fake APIs for testing. You can also [use Postman to set up a mock server](https://www.getpostman.com/docs/postman/mock_servers/setting_up_mock).

::: note
Enterprise customers may [request load testing against Auth0](/policies/load-testing).
:::

## Performance Testing

When conducting performance testing, you may encounter issues with your implementation. The following are steps you can take to begin the troubleshooting process and identify where there might be issues of concern.

### The Auth0 Dashboard

The [Logs section of the Auth0 Dashboard](${manage_url}/#/logs) stores data on:

* Actions taken in the Dashboard by administrators
* Authentications made by your users

There are also [extensions](/extensions) that you can use for logging purposes, including [exporting logs to third-party tools](/extensions#export-auth0-logs-to-an-external-service) and [gathering information on the use of custom code in your account](/extensions#access-to-real-time-webtask-logs).

### Third-Party Testing Tools

There are a number of third-party testing tools that you can use for performance testing against RESTful APIs. Here are some options you might consider (note that Auth0 does not endorse any particular product or tool):

* [Apache JMeter](http://jmeter.apache.org/)
* [Artillery](https://artillery.io/)
* [Micro Focus LoadRunner](https://www.radview.com/)
* [Loader](https://loader.io/)
* [RadView Webload](https://www.radview.com/)
* [SmartBear LoadUI](https://smartbear.com/)
* [Vegeta](https://github.com/tsenart/vegeta)
* [Wrk](https://github.com/wg/wrk)

These tools should provide activity logs that help you identify anything that is concerning. If you need assistance with deciphering your log or identifying the potential issue, please contact Support.

### HAR Files

If you discover an issue that you can reproduce, you can [create a HAR file](/tutorials/troubleshooting-with-har-files) and send it to our Support team for additional assistance.