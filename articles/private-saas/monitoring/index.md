---
url: /private-saas/monitoring
section: private-saas
description: Ways to monitor Private SaaS
---

# Monitoring Private SaaS

In addition to providing tools for monitoring your Private SaaS, Auth0 provides integration with select third-party utilities.

Your options include:

* **Instrumentation**: If [Instrumentation](/private-saas/instrumentation) has been enabled for your Private SaaS, you can gather and visualize data about your infrastructure and processes
* **Health Checks**: [Health Checks](/private-saas/dashboard/troubleshoot#health-check) provide minute-by-minute summaries of your Private SaaS infrastructure at a given point in time. These logs are available for the the previous twenty-nine days and can be found in the [Troubleshoot](/private-saas/dashboard/troubleshoot) page of your Private SaaS Configuration Area;
* **[Auth0's `testall` Endpoint](/private-saas/monitoring/testall)**: The `testall` endpoint is an unauthenticated endpoint that is particularly useful for monitoring by load balancers;
* **[Auth0's Authenticated Testing Endpoints](/private-saas/monitoring/authenticated-endpoints)**: Auth0 provides endpoints that you may, once authenticated, call to receive status codes such as *204*, *520*, or *429*;
* **Integration with New Relic**: Auth0 supports integration with New Relic as a means of monitoring your Private SaaS. You will need to [provide your New Relic license key](/private-saas/dashboard/settings#monitoring) in the Private SaaS configuration area;
* **Integration with Third-Party Utilities to Monitor Synthetic Transactions**: Auth0 supports integration with system monitoring tools like *Microsoft System Center* so that you can [run and monitor synthetic transactions](/monitoring#configuring-scom).
