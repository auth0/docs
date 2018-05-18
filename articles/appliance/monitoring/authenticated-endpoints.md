---
section: appliance
description: Overview of using the authenticated endpoint with the PSaaS Appliance
tags:
    - appliance
    - monitoring
    - testing
---

# PSaaS Appliance: Using Authenticated Testing Endpoints

For calls to the testing endpoints that return detailed information, Auth0 requires these requests to be authenticated using a key generated using the PSaaS Appliance Dashboard. This key is used in the request header of the call sent to the endpoint.

## Generating the API Key

To generate an API Key for use the authenticated testing endpoints, navigate to the [Settings](/appliance/dashboard/settings) page of your PSaaS Appliance Dashboard. There, you will find an [API Keys section](/appliance/dashboard/settings#api-keys) that allows you to generate new keys.

During the first use, you will see a that there is no key. To generate your first key, click on the "Generate" button at the far right of the row.

![](/media/articles/appliance/api-keys/no-key.png)

You will be prompted to confirm the new key generation. If confirmed, you will see that the key now populates the previously-blank field.

![](/media/articles/appliance/api-keys/key.png)

:::panel-warning Changing Your API Key
You may only use one key at a time. If you generate a new key, all applications and services using the old key will fail.
:::

## Available Endpoints

The following authenticated endpoints are available for you to use:

* GET /status/cpu
* GET /status/memory
* GET /status/disk
* GET /status/services
* GET /status/network
* GET /status/internet
* GET /status/email
* GET /status/db
* GET /status/replicaset

Your call might look something like the following:

```text
curl -v http://127.0.0.1:9110/status/cpu
--user api_keys_health:YOUR_API_KEY
```

You may also make the call via https, though you will have to make the following modifications to your call:
 * Add "health" to the URL path;
 * Remove the port number from the IP address used.

For example, `http://10.1.0.248:9110/status/cpu` becomes `https://10.1.0.248/health/status/cpu`.

## Access from Outside the PSaaS Appliance

If you'd like to access these endpoints from outside the PSaaS Appliance, you can do so using your `manage` domain.

| Internal Access | External Access |
| --------------- | --------------- |
| http://10.1.0.248:9110/status/cpu **or** https://10.1.0.248/health/status/cpu |  ${manage_url}/health/status/cpu |

## Endpoint Responses

Calls to authenticated endpoints will return in one of the following status codes:

| Response Code | Response |
| ------------- | -------- |
| 204 | There are no issues with the resource. |
| 429 | Too many requests have been made to the resource. |
| 520 | There is an issue with the resource. |
