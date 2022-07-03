---
section: appliance
description: Overview of using the testall endpoint with the PSaaS Appliance
topics:
    - appliance
    - monitoring
    - testing
contentType: how-to
useCase: appliance
applianceId: appliance49
sitemap: false
---

# Using the `testall` Endpoint

The `testall` endpoint can be accessed via http or https:

```text
GET https://{your_auth0_server}/testall
```

The `/testall` endpoint checks the availability of the core Auth0 Authentication Service, as well as other services such as the Management Dashboard and Documentation pages. If all is well, the endpoint returns a response code of `200`.

```text
200
content-type: text/plain
OK
```

Alternatively, if there are any issues, `/testall` returns a `5xx` response code.

## Monitoring Individual Nodes

Typically, the above endpoint will reach the load balancer, but since a typical, highly-available deployment will have at least three nodes, Auth0 recommends monitoring those endpoints as well:

* `http://{IP Address Node 1}/testall`
* `http://{IP Address Node 2}/testall`
* `http://{IP Address Node 3}/testall`

Be sure to use the `http` *not* `https` in your URLs.

### Non-Responsive Nodes

The load balancer may remove nodes that are not responding or time out **without affecting service**, because all nodes of a cluster can serve requests from applications. All configuration information is continuously replicated across nodes.

::: note
  These endpoints are typically used by the Load Balancer to decide whether or not a node should be removed from the cluster. If a node stops responding, and the Load Balancer removes it, please contact [Auth0 Support](${env.DOMAIN_URL_SUPPORT}) for additional assistance.
:::
