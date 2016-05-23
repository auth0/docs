# Monitoring the Appliance

In addition to providing tools for monitoring your Appliance instances, Auth0 provides integration with select third-party utilities.

Your options include:

* **Health Checks**: [Health Checks](/appliance/dashboard/troubleshoot#health-check) provide minute-by-minute summaries of your Appliance infrastructure at a given point in time. These logs are available for the the previous twenty-nine days and can be found in the [Troubleshoot](/appliance/dashboard/troubleshoot) page of your Appliance Configuration Area;
* **Auth0's `testall` Endpoint**: The `testall` endpoint is an unauthenticated endpoint that is particularly useful for monitoring by load balancers;
* **Auth0's Authenticated Testing Endpoints**: Auth0 provides endpoints that you may, once authenticated, call to receive status codes such as *204*, *520*, or *429*;
* **Integration with New Relic**: Auth0 supports integration with New Relic as a means of monitoring your Appliance instances;
* **Integration with Third-Party Utilities to Monitor Synthetic Transactions**: Auth0 supports integration with system monitoring tools like *Microsoft System Center* so that you can run and monitor synthetic transactions.

## Using the `testall` Endpoint

The `testall` endpoint can be accessed via http or https:

```text
curl -v  http://10.1.0.248/testall
```

The return results include information gathered from a set of basic checks that ensure all services are running. If all is well, the endpoint returns a status code of `200`. Alternatively, if there are any issues, the endpoint returns a status code of `500`.
