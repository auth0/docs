---
section: appliance
description: PSaaS Appliance infrastructure information about Networks
topics:
    - appliance
    - infrastructure
    - networks
contentType: reference
useCase: appliance
applianceId: appliance39
sitemap: false
---

# PSaaS Appliance Infrastructure Requirements: Network

This document details the requirements for the network on which the PSaaS Appliance runs.

::: note
Auth0 PSaaS Appliance can only be deployed in 1 NIC.
:::

In on-premise environment, all virtual machines should be in the same LAN in order for database replication to work properly. No other PSaaS Appliance cluster (Dev/Test) should be running on this subnet.

In AWS Cloud environment, Auth0 supports and recommends cross-LAN availability zones.

## IP Addresses

Each PSaaS Appliance virtual machine (VM) must have its own private static IP address and outbound access. This can be accomplished through:

* a public IP address;
* NAT or transparent proxy.

For **multi-node** clusters, all virtual machines must be:
* on the same segment of the internal network;
* able to communicate between each other via ports `7777`, `27017`, `8721`, and `8701`.
* able to reach the load balancer via port `443`.

::: note
  Production and non-Production (test/development) must be on completely isolated networks.
:::

For a full list of IP addresses, domains, and ports used by the PSaaS Appliance clusters, as well as what they are used for, please see [Appliance Infrastructure: IP/Domain and Port List](/appliance/infrastructure/ip-domain-port-list).


## Internet Connectivity

Each PSaaS Appliance VM needs connectivity to the Internet. At a minimum, the VM needs access during Appliance configuration, maintenance windows, and troubleshooting. For implementations requiring integration with social providers and/or third-party API calls, the VM will need Internet access at all times.

Since the PSaaS Appliance is delivered as a subscription-based managed service, Auth0 will need access to specified endpoints to provide proactive monitoring.

Your server also needs to be able to access **cdn.auth0.com** if you run web extensions. The browsers used by your admins will also need to access the CDN if they navigate to the Management Dashboard.

## DNS Records

DNS records are required for all PSaaS Appliance instances (development/test *and* production). A standard single-node or cluster deployment requires four DNS entries for the following:

* **Management Dashboard**: the Management Dashboard is the web interface that acts as an application for the configuration and application tenants on the PSaaS Appliance;
* **Root Tenant Authority**: the tenant on the PSaaS Appliance that controls PSaaS Appliance settings, configuration, and local Dashboard Admin users;
* **webtask**: webtask DNS is used for web extensions and to use Webtasks externally;
* **App Tenant**: the tenant on the PSaaS Appliance created for your apps. It manages settings for your apps, user profiles, rules, and so on. This is the tenant you will interact with primarily through the Management Dashboard and the API.

Each additional DNS zone requires an additional certificate. Please refer to the [DNS page](/appliance/infrastructure/dns) for specific requirements.

## Load Balancers (for Multi-Node Clusters only)

You must include a round-robin load balancer in your infrastructure when implementing a multi-node cluster PSaaS Appliance with high-availability.

We recommend a layer 7/application layer load balancer that supports:

* HTTP health monitoring. The [testall](/appliance/monitoring/testall) endpoint is an unauthenticated endpoint that will be used for monitoring by load balancers;
* Awareness of websockets (this is required if using the Auth0 AD/LDAP Connector);
* TCP/IP:
    * If your deployment requires geo-location data for users authenticating with Auth0, support for `proxy_protocols` (which append the remote UP address when opening a connection to the backend) will be exposed to the nodes. If `proxy_protocols` is not supported, the IP address information captured for individual logins will always appear as the Load Balancer IP address;
* HTTPS:
    * If your deployment requires geo-location data for users authenticating with Auth0, you must support SSL offloading (or HTTP/1.1 with UPGRADE if you require websockets). It should support both the "Connection: Upgrade" and the "X-Forwarded-For" header. These are required to capture accurate IP address information.

::: note
  For AWS deployments, you must use TCP/IP.
:::

### Software Load Balancers

You may use NGINX or HA Proxy as a software load balancer in front of the PSaaS Appliance. The reverse proxy must be configured with:

* TCP mode with Proxy Protocol or HTTPS mode (SSL offloading)
* the incoming hostname forwarded to the PSaaS Appliance nodes

::: note
  The Auth0 AD/LDAP Connector does not work in HTTPS mode.
:::

In addition to load balancing, you may use this for **IP address whitelisting** and **endpoint filtering** (only authentication endpoints are publicly available).

#### SSL Offloading

The PSaaS Appliance supports the use of SSL offloading at the load balancer if your IT standards require the use of HTTP within the local network. The load balancer must add a `X-Forwarded-Proto` header with the value `https`.

Please note that the use of SSL offloading is not required to achieve high throughput.
