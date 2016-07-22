# Auth0 Appliance Infrastructure Requirements: Network

This document details the requirements for the network on which the Appliance runs.

## IP Addresses

Each Appliance virtual machine (VM) must have its own private static IP address and outbound access. This can be accomplished through:

* a public IP address;
* NAT or transparent proxy.

For **multi-node** clusters, all virtual machines must be:
* on the same segment of the internal network;
* able to communicate between each other via ports `7777` and `27017`.

For **Webtasks**, ports `8721` and `8701` need to be open from cross-Virtual Machine communication.

## Internet Connectivity

Each Appliance VM needs connectivity to the Internet. At a minimum, the VM needs access during Appliance configuration, maintenance windows, and troubleshooting. For implementations requiring integration with social providers and/or third-party API calls, the VM will need Internet access at all times.

Since the Appliance is delivered as a subscription-based managed service, Auth0 will need access to specified endpoints to provide proactive monitoring.

## DNS Records

DNS records are required for all Appliance instances (development/test *and* production). A standard single-node or cluster deployment requires three DNS entries for the following:

* **Management Dashboard**: the Management Dashboard is the web interface that acts as a client for the configuration and application tenants on the Appliance;
* **Root Tenant Authority**: the tenant on the Appliance that controls Appliance settings, configuration, and local Dashboard Admin users;
* **App Tenant**: the tenant on the Appliance created for your apps. It manages settings for your apps, user profiles, rules, etc. This is the tenant you will interact with primarily through the Management Dashboard and the API.

Please refer to the [DNS page](/appliance/infrastructure/dns) for additional requirements.

## Load Balancers (for Multi-Node Clusters only)

You must include a round-robin load balancer in your infrastructure when implementing a multi-node cluster Appliance with high-availability.

We recommend a layer 7/application layer load balancer that supports:

* HTTP health monitoring;
* Awareness of websockets (this is required if using the Auth0 AD/LDAP Connector);
* TCP/IP:
    * If your deployment requires geo-location data for users authenticating with Auth0, support for `proxy_protocols` (which append the remote UP address when opening a connection to the backend) will be exposed to the nodes. If `proxy_protocols` is not supported, the IP address information captured for individual logins will always appear as the Load Balancer IP address;
* HTTPS:
    * If your deployment requires geo-location data for users authenticating with Auth0, you must support SSL offloading (or HTTP/1.1 with UPGRADE if you require websockets). It should support both the "Connection: Upgrade" and the "X-Forwarded-For" header. These are required to capture accurate IP address information.

> For AWS deployments, you must use TCP/IP.

### Software Load Balancers

You may use NGINX or HA Proxy as a software load balancer in front of the Auth0 Appliance. The reverse proxy must be configured with:

* TCP mode with Proxy Protocol or HTTPS mode (SSL offloading);
    * Note: The Auth0 AD/LDAP Connector does not work in HTTPS mode.
* the incoming hostname forwarded to the Appliance nodes.

In addition to load balancing, you may use this for **IP address whitelisting** and **endpoint filtering** (only authentication endpoints are publicly available).

#### SSL Offloading

The Appliance supports the use of SSL offloading at the load balancer if your IT standards require the use of HTTP within the local network. The load balancer must add a `X-Forwarded-Proto` header with the value `https`.  

Please note that the use of SSL offloading is not required to achieve high throughput.
