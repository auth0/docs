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
---

# PSaaS Appliance: Using Authenticated Testing Endpoints

The authenticated endpoints are similar to the Test All endpoints in that they return a positive or negative status of a system resource.  Due to the fact these endpoints return more granular data about the system health the subscriber must generate an API Key before calling these endpoints.

These endpoints do not provided details about the system resource utilization, instead they return an HTTP status representing the status of a given endpoint.  With this behavior you can setup alerts based on the status codes reported by these endpoints.

## Generating an API Key

To generate an API Key for use the authenticated testing endpoints, navigate to the [Settings](/appliance/dashboard/settings) page of your PSaaS Appliance Dashboard. There, you will find an [API Keys section](/appliance/dashboard/settings#api-keys) that allows you to generate new keys.

During the first use, you will see a that there is no key. To generate your first key, click on the "Generate" button at the far right of the row.

![](/media/articles/appliance/api-keys/no-key.png)

You will be prompted to confirm the new key generation. If confirmed, you will see that the key now populates the previously-blank field.  Once the key is generated navigate to the bottom of the page and click the save button to persist the key.  Once reconfiguration is complete you will be able to use the generated key.

![](/media/articles/appliance/api-keys/key.png)

:::panel-warning Changing Your API Key
You may only use one key at a time. If you generate a new key, all applications and services using the old key will fail.
:::

## API Endpoints

The API eposes a number of API endpoints that you can test the status of the service.  All of the endpoints below will return one of three status codes indicating health (204), warning (520), and too many requests (429).

### Calling Endpoints

Many of the end points below report status of a given node.  For these type of endpoints it is better to submit a request directly to that specific node.  It is also possible to issue a request through the load balancer by using the manage domain.

```bash
# Specific Node
curl -v http://{node-ip}/health/status/cpu --user api_keys_health:YOUR_API_KEY

# Through Load Balancer
curl -v http://{manage-dashboard-domain}/health/status/cpu --user api_keys_health:YOUR_API_KEY
```

### Rate Limits

To ensure a high level quality of service these endpoints are rate limited.  The endpoints allow 10 requests per second.  If the endpoints are hit at a higher frequency they will be rate limited and return a `429` response status code.

### Response Codes

Each of the following endpoint will return one of three status codes and non of which will return a response body.  Using HTTP status codes the endpoint will communicate the status of a given resource.

| Response Code   | Response                         |
| --------------- | -------------------------------- |
| 204             | The system resource is within normal operating thresholds. |
| 429             | There were too many requests made to this /status endpoint and it is being rated limited. |
| 520             | The system resource is outside of normal operating thresholds. |

### GET /status/cpu
This endpoint returns the status of the CPU resource.  When the average CPU load for the last minute exceeds 80% utilization this status endpoint will return the error code 520.  If the average load for the last minute is less than 80% then the service will respond with a 204 status code.  When looking at the Troubleshooting page you will often see a CPU% greater than 100%.  This can and will happen during high peak loads.  This means that the CPU is completely utilized and work is in queue.

When calculating CPU load we take the number of processes being worked on by the CPU and the number of processes being queued for the CPU.  Then we take this average over the last minute, multiple that by 100 and divide by the number of CPUs.  If you have an eight core processes and are averaging 2 processes over the last minute you load will be 0%, if the system is averaging 6 processes (4 being processed and 2 queued) this means, which a 4 core processor you are at 150% CPU utilization. 

TODO:// Make this a note

In its current state this endpoint does not accurate reflect the calculation above.  When calculating load average on a Linux system non-CPU bound processes can be included, which can throw off numbers.  For example a processes waiting to read and write from disk would be included despite not queued for CPU.

| Response Code | Response |
| ------------- | -------- |
| 204 | The one minute average cpu load is less than or equal to 80% and considered in normal status. |
| 429 | Too many requests have been made to the resource. |
| 520 | The one minute average CPU load exceeded 80%. |

### GET /status/memory

This endpoint looks at the amount of memory available on the appliance and returns a status code indicating if the appliance is within normal healthy levels.

| Response Code | Response |
| ------------- | -------- |
| 204 | The system has more than 10% of the system Memory available. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | The system less than or equal to 10% of free memory. |

### GET /status/disk

This endpoint takes a look at how much disk is available on the node.  Each node has a number of volumes.  This endpoint will iterate through each volume on the node and check if the there is at least one volume that is utilizing 90% or more of the specified disk.

| Response Code | Response |
| ------------- | -------- |
| 204 | Every volume on the node does not exceed 90% utilization. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | At least one disk on the node has exceeded 90% capacity utilization. |

### GET /status/services

This endpoint checks to see if any of the Auth0 core services are down on the node.

| Response Code | Response |
| ------------- | -------- |
| 204 | Every core service is running on the node. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | At least one of the core services is not running on the node. |

### GET /status/network

This endpoint reports the status of the network connectivity for the individual node by issuing a PING command to every other node in the cluster.  If the node fails to successfully ping any of the nodes in the cluster the status will return an error.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to successfully ping every other node in the cluster. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | The node was not able to ping at least one other node in the cluster indicating a network problem. |

### GET /status/internet

This endpoint tests outbound internet connectivity on the node over port 443.  This endpoint issues a HEAD request to `https://apt-mirror.it.auth0.com`. If the request returns anything other than a 200 status code this endpoint will return a failure.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to successful `HEAD` request to `https://apt-mirror.it.auth0.com`. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | The node failed or received an error message when sending a `HEAD` request to `https://apt-mirror.it.auth0.com`. |

### GET /status/email

The endpoint, using the SMTP configuration settings, tests SMTP connection.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to use the SMTP configuration settings to connect to the SMTP server. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | The node was not able to open a connection with the SMTP server. |

### GET /status/db

This endpoint tests if the database is responding to the node and that the node has the ability to run a query on the database.

| Response Code | Response |
| ------------- | -------- |
| 204 | The node was able to successfully query the database. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | The node was not able to connect and run a query against the database. |

### GET /status/replicaset

This endpoint checks to see if the replica set is healthy.  If at least one node is down then this endpoint will return a failure.

| Response Code | Response |
| ------------- | -------- |
| 204 | All nodes in the replica set are up. |
| 429 | The status endpoints have been called too many times. Please wait and try again. |
| 520 | At least one node in the replica set is down. |
