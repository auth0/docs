---
section: appliance
description: Ways to monitor the Appliance
---

# Monitoring the Appliance

In addition to providing tools for monitoring your Appliance instances, Auth0 provides integration with select third-party utilities.

Your options include:

* **Health Checks**: [Health Checks](/appliance/dashboard/troubleshoot#health-check) provide minute-by-minute summaries of your Appliance infrastructure at a given point in time. These logs are available for the the previous twenty-nine days and can be found in the [Troubleshoot](/appliance/dashboard/troubleshoot) page of your Appliance Configuration Area;
* **[Auth0's `testall` Endpoint](/appliance/monitoring/testall)**: The `testall` endpoint is an unauthenticated endpoint that is particularly useful for monitoring by load balancers;
* **[Auth0's Authenticated Testing Endpoints](/appliance/monitoring/authenticated-endpoints)**: Auth0 provides endpoints that you may, once authenticated, call to receive status codes such as *204*, *520*, or *429*;
* **Integration with New Relic**: Auth0 supports integration with New Relic as a means of monitoring your Appliance instances. You will need to [provide your New Relic license key](/appliance/dashboard/settings#monitoring) in the Appliance configuration area;
* **Integration with Third-Party Utilities to Monitor Synthetic Transactions**: Auth0 supports integration with system monitoring tools like *Microsoft System Center* so that you can [run and monitor synthetic transactions](/monitoring#configuring-scom).
