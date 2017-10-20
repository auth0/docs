---
title: Testing Your Auth0 Implementation
description: Guidelines for testing your Auth0 implementation prior to deployment to Production environments
---

# Testing Your Auth0 Implementation

We recommend that you run unit and integration tests for your Auth0 implementation prior to go-live. For your tests, we recommend that you mock the Auth0 APIs. We do not allow the Auth0 APIs to be used for testing purposes, and such actions may lead to your account being rate limited (especially if you're creating and deleting test users at a high rate during a short period of time).

::: note
Only Enterprise customers may [request load testing against Auth0](/policies/load-testing).
:::

## Performance Testing

When conducting performance testing, you may encounter issues with your implementation. The following are steps you can take to begin the troubleshooting process and identify where there might be issues of concern.

### The Auth0 Dashboard

The [Logs section of the Auth0 Dashboard](${manage_url}/#/logs)] stores data on:

* Actions taken in the Dashboard by administrators
* Authentications made by your users

There are also [extensions](/extensions) that you can use for logging purposes, including [exporting logs to third-party tools](/extensions#export-auth0-logs-to-an-external-service) and [gathering information on the use of custom code in your account](/extensions#access-to-real-time-webtask-logs).

### Third-Party Testing Tools

There are a number of third-party testing tools that you can use for performance testing against RESTful APIs. Here are some options you might consider (note that Auth0 does not endorse any particular product or tool):

* [Apache JMeter](http://jmeter.apache.org/)
* [Artillery](https://artillery.io/)
* [Micro Focusa LoadRunner](https://www.radview.com/)
* [Loader](https://loader.io/)
* [RadView Webload](https://www.radview.com/)
* [SmartBear LoadUI](https://smartbear.com/)
* [Vegeta](https://github.com/tsenart/vegeta)
* [Wrk](https://github.com/wg/wrk)

These tools should provide activity logs that help you identify anything that is concerning. If you need assistance with deciphering your log or identifying the potential issue, please contact Support.

### HAR Files

If you discover an issue that you can reproduce, you can [create a HAR file](/tutorials/troubleshooting-with-har-files) and send it to our Support team for additional assistance.

## Testing Rules and Custom Database Connections

If you would like to automate the testing of [Rules](/rules) or [Custom Database Connections](/connections/database/custom-db), there are a couple of NPM packages that can assist you with this.

The [auth0-rules-testharness](https://www.npmjs.com/package/auth0-rules-testharness) package provides an easy way to deploy, execute, and test the output of Auth0 Rules using a real webtask sandbox environment.

The [auth0-custom-db-testharness](https://www.npmjs.com/package/auth0-custom-db-testharness) package provides an easy way to deploy, execute, and test the output of Auth0 Custom DB Scripts using a real webtask sandbox environment.