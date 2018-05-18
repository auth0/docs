---
url: /appliance/monitoring
section: appliance
description: Ways to monitor the PSaaS Appliance
tags:
    - appliance
    - monitoring
---

# Monitoring the Private SaaS (PSaaS) Appliance

In addition to providing tools for monitoring your PSaaS Appliance, Auth0 provides integration with select third-party utilities.

Your options include:

* **Instrumentation**: If [Instrumentation](/appliance/instrumentation) has been enabled for your PSaaS Appliance instances, you can gather and visualize data about your infrastructure and processes
    * If you've enabled Instrumentation, you can send your data to DataDog. You'll need to supply your DataDog API key in the configuration page to do this. When viewing your metrics in DataDog, it will *not* appear in the standard DataDog UI under Infrastructure. You'll need to add your own dashboard and search for the PSaaS Appliance data you want displayed.
* **Health Checks**: [Health Checks](/appliance/dashboard/troubleshoot#health-check) provide minute-by-minute summaries of your PSaaS Appliance infrastructure at a given point in time. These logs are available for the the previous twenty-nine days and can be found in the [Troubleshoot](/appliance/dashboard/troubleshoot) page of your PSaaS Appliance Configuration Area;
* **[Auth0's `testall` Endpoint](/appliance/monitoring/testall)**: The `testall` endpoint is an unauthenticated endpoint that is particularly useful for monitoring by load balancers;
* **[Auth0's Authenticated Testing Endpoints](/appliance/monitoring/authenticated-endpoints)**: Auth0 provides endpoints that you may, once authenticated, call to receive status codes such as *204*, *520*, or *429*;
* **Integration with Third-Party Utilities to Monitor Synthetic Transactions**: Auth0 supports integration with system monitoring tools like *Microsoft System Center* so that you can [run and monitor synthetic transactions](/monitoring#configuring-scom).