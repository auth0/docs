---
section: appliance
description: Overview of using the authenticated endpoint with the PSaaS Appliance
topics:
    - appliance
    - monitoring
    - testing
contentType: how-to
useCase: appliance
applianceId: appliance47
sitemap: false
---

# PSaaS Appliance: Authenticated Testing Endpoints

Auth0 offers endpoints that allow you to check the system health of a specific resource. In this article, we will cover the authenticated endpoints, which are available to those who submit requests whose header contains the appropriate credentials.

The authenticated endpoints are similar to the Test All endpoints in that both return positive or negative status information about system resources.

Authenticated endpoints do not provide detailed information about the system's resource utilization. Instead, they return an HTTP status reflecting the status of a given resource. Using the third-party tools of your choice, you can set up alerts that activate based on the status codes returned by Auth0's endpoints.

## How to generate an API key

To send requests to the authenticated endpoints, you will need to generate and include an API key in the header of your request.

Begin by navigating to the [Settings](/appliance/dashboard/settings) page of your PSaaS Appliance Dashboard. Scroll down to the [API Keys section](/appliance/dashboard/settings#api-keys).

If this is the first time you are doing this, you'll see that there is no key. You can generate your first key by clicking the **Generate** button to the right.

![](/media/articles/appliance/api-keys/no-key.png)

You will be prompted to confirm the new key generation.

Once confirmed, you will see that the key now populates the previously-blank field.

![](/media/articles/appliance/api-keys/key.png)

Scroll to the bottom of the page, and click Save to apply the new API Key value.

At this point, Auth0 does a reconfiguration and restarts the health service. Once this process completes, you will be able to use your new API key.

:::panel-warning Changing Your API Key
You may only use one API key at a time. If you generate a new key, be sure to provide the new key to your existing applications and services; otherwise, they will fail.
:::

## Authenticated API Endpoints

The API exposes a number of endpoints that you can use to test the status of the service.

**Each node comes with its own set of endpoints, so you will need to make multiple calls if you are monitoring a multi-node PSaaS Appliance implementation.** The exception is the `GET /status/replicaset` endpoint, which reports on multiple nodes.

There are two ways you can call a specific API endpoint:

* Submit your request to the node directly
* Issue your request through the load balancer using the manage domain

If you're checking the status of a specific node, it's best to submit your request to the node directly:

```text
curl -v https://{node-ip}/health/status/cpu --user api_keys_health:YOUR_API_KEY
```

Otherwise, you can issue your request through the load balancer using the **manage** domain:

```text
curl -v https://{manage-dashboard-domain}/health/status/cpu --user api_keys_health:YOUR_API_KEY
```

### Response Codes

Each endpoint will return one of three status codes to communicate the status of the resource in question:

| Response Code | Response |
| ------------- | -------- |
| 204 | OK |
| 429 | Too many requests |
| 520 | Warning |

Additionally, each status code conveys additional information depending on the endpoint being queried. You'll find more information on this in the following sections that cover the specific endpoints available to you.

None of the responses will include a body.

#### GET /status/cpu

This endpoint returns information about the overall available CPU capacity in the last minute on the PSaaS Appliance. Overall CPU capacity means that all CPU time is aggregated and compared with the time that any core was not idle. For example, if a four-core PSaaS Appliance node had two cores completely utilized and two cores completely idle, the CPU capacity calculated will be 50%.

| Response Code | Response |
| ------------- | -------- |
| 204 | The system had more than 20% of the total CPU capacity available in the last minute. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | The system had 20% of the total CPU capacity (or less) available in the last minute. |

#### GET /status/memory

This endpoint returns information on the amount of memory available on the PSaaS Appliance.

| Response Code | Response |
| ------------- | -------- |
| 204 | The system has more than 10% of its memory available. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | The system has 10% (or less) of its memory available. |

#### GET /status/disk

This endpoint returns information on disk utilization. Each node has a set number of volumes; if there is at least one volume that's utilizing more than 90% of the allocated disk space, the endpoint returns a warning.

| Response Code | Response |
| ------------- | -------- |
| 204 | No volume on the node exceeds 90% utilization. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | One or more disk(s) on the node has exceeded 90% utilization. |

#### GET /status/services

This endpoint checks to see if any of the node's core Auth0 services are down.

| Response Code | Response |
| ------------- | -------- |
| 204 | Every core service is running on the node. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | At least one of the core services on the node is not running. |

#### GET /status/network

This endpoint reports the status of the network for the node. The node issues a PING command to each node in the cluster, and if it fails to PING any node, the endpoint will return an error code.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to successfully ping every other node in the cluster. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | The node was not able to ping at least one node in the cluster, indicating there's a network problem. |

#### GET /status/internet

This endpoint tests outbound internet connectivity on the node over port 443. This endpoint issues a `HEAD` request to `https://apt-mirror.it.auth0.com`. If the request returns anything other than a 200 status code, this endpoint will return an HTTP code indicating failure.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to successful issue a `HEAD` request to `https://apt-mirror.it.auth0.com`. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | The was unable to issue a `HEAD` request, or the node received an error message after sending a `HEAD` request to `https://apt-mirror.it.auth0.com`. |

#### GET /status/email

This endpoint tests the SMTP connection using the provided configuration settings.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to use the provided configuration settings to connect to the SMTP server. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | The node was unable to connect to the SMTP server. |

#### GET /status/db

This endpoint checks to see if the node can run database queries and receive the results.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to successfully query the database. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | The node was not able to connect and run a query against the database. |

#### GET /status/replicaset

This endpoint checks to see if the replica set is healthy. If there is at least one node that is down, the endpoint will return an HTTP code indicating failure.

| Response Code | Response |
| ------------- | -------- |
| 204 | All nodes in the replica set are up. |
| 429 | The status endpoint has been called too many times (limit: 10 requests per second). Please wait and try again. |
| 520 | At least one node in the replica set is down. |
