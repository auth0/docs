---
section: appliance
---

# Using Authenticated Testing Endpoints

For tests that provide detailed information, Auth0 requires that these requests be authenticated using a key generated in your Appliance configuration area. This key is used in the request header of the call sent to the endpoint.

### Generating the API Key

To generate an API Key for use the authenticated testing endpoints, navigate to the [Settings](/appliance/dashboard/settings) page of your Appliance configuration area. There, you will find an [API Keys section](/appliance/dashboard/settings#api-keys) that allows you to generate new keys.

During the first use, you will see a that there is no key. To generate your first key, click on the "Generate" button at the far right of the row.

![](/media/articles/appliance/api-keys/no-key.png)

You will be prompted to confirm the new key generation. If confirmed, you will see that the key now populates the previously-blank field.

![](/media/articles/appliance/api-keys/key.png)

 > You may only use one key at a time. If you generate a new key, all applications and services using the old key will fail.

### Available Endpoints

The following authenticated endpoints are available for you to use:

* /status/cpu
* /status/memory
* /status/disk
* /status/services
* /status/network
* /status/internet
* /status/email
* /status/db
* /status/replicaset

Your call might look something like the following:

```
curl --user
api_keys_health:S9ranHlz0qQmIs0NgcYb8hU3MLKcBB4Khth2pom5VzLryYeW -v http://10.1.0.248:9110/status/cpu
```

You may also make the call via https, though you will have to make the following modifications to your call:
 * Add "health" to the URL path;
 * Remove the port number from the IP address used.

```
curl -k --user
api_keys_health:S9ranHlz0qQmIs0NgcYb8hU3MLKcBB4Khth2pom5VzLryYeW -v https://10.1.0.248/health/status/cpu
```

### Endpoint Responses

Calls to authenticated endpoints may result in one of the following status codes:

* 204: There are no issues with the resource;
* 429: Too many requests have been made to the resource;
* 520: There is an issue with the resource.
