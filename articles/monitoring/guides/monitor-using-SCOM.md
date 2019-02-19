---
title: Monitor Auth0 Using System Center Operations Manager
description: Learn how to monitor Auth0 as a standard web application using System Center Operations Manager (SCOM) or any tool that supports synthetic transactions. 
toc: true
topics:
  - monitoring
contentType:
  - how-to
useCase:
  - analyze-auth0-analytics
  - analyze-logs
  - integrate-analytics
  - synthetic-authentication
  - synthetic-transactions
---
# Monitor Auth0 Using System Center Operations Manager

You can monitor Auth0 as a standard web application using System Center Operations Manager (SCOM) or any tool that supports synthetic transactions.

In addition to a synthetic login transaction that includes the extensions your applications rely on (such as rules that execute custom code for integration with your company's other services), Auth0 recommends adding SCOM probes for the `test` and `testall` endpoints. For more information, see [Check Auth0 Authentication and Supporting Services](/monitoring/guides/test-testall-endpoints).

## Set up SCOM

1. Add a new SCOM instance using the **Add Monitoring Wizard**:

   | **Field** | **Description** |
   | ---| ---|
   | **Name** | Description name for the SCOM instance. |
   | **Description** | Description of what this SCOM instance monitors. |
   | **Select destination management pack** | Default Management Pack |

   When finished, click **Next** to continue.

   ![ss-2014-11-21T15-44-34.png](/media/articles/monitoring/ss-2014-11-21T15-44-34.png)

2. Click **Add** to enter the URLs you want SCOM to monitor. When finished, click **Next** to continue.

   ![ss-2014-11-21T16-31-15.png](/media/articles/monitoring/ss-2014-11-21T16-31-15.png)

3. Click **Add** to set up a location from which you want to monitor.

   In the pop-up dialog, search for **Internal location - Agent**. Select the appropriate address, and click **Add**. Then click **Ok** to finish selecting the location. When finished, click **Next** to continue.

   ![ss-2014-11-21T16-32-25.png](/media/articles/monitoring/ss-2014-11-21T16-32-25.png)

4. Set the frequency with which SCOM collects data from each endpoint:

   | **Data** | **Frequency** |
   | --- | --- |
   | **Test frequency** | 60 seconds |
   | **Performance data collection interval** | 60 seconds |
   | **Test time-out** | 30 seconds |
   | **HTTP status code** | Greater than or equals 400 |

   When finished, click **Next** to continue.

   ![ss-2014-11-21T16-33-51.png](/media/articles/monitoring/ss-2014-11-21T16-33-51.png)

## Run SCOM tests

1. Click **Run Test** to test each endpoint and ensure that the connection settings provided are correct.

   ![ss-2014-11-21T16-34-25.png](/media/articles/monitoring/ss-2014-11-21T16-34-25.png)

2. Once you have finished configuring your SCOM instance, you can view activity through the **Monitoring** tab:

   ![ss-2014-11-25T17-20-47.png](/media/articles/monitoring/ss-2014-11-25T17-20-47.png)

## Review test results

Click **Web Application Status** to bring up the information SCOM has gathered.

![ss-2014-11-25T17-22-10.png](/media/articles/monitoring/ss-2014-11-25T17-22-10.png)

## Keep reading

* [Monitoring the AD/LDAP Connector with System Center Operations Manager](/connector/scom-monitoring)
* [Check Auth0 Status](/monitoring/guides/check-status)
* [Check Auth0 Authentication and Supporting Services](/monitoring/guides/test-testall-endpoints)
* [Check External Services Status](/monitoring/guides/check-external-services)
* [Monitor Applications](/monitoring/guides/monitor-applications)
