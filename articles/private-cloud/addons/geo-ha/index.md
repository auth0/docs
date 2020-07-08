---
url: /private-cloud/addons/geo-ha
section: private-cloud
description: Learn about the High Availability Geo Cluster (GEO-HA) add-on available to Private Cloud customers.
topics:
    - private-cloud
    - geo-ha
    - disaster-recovery
contentType: 
    - index
    - reference
useCase: private-cloud
sitemap: false
---
# Private Cloud High Availability Geo Cluster (GEO-HA)

The high availability geo cluster (GEO-HA) is a Private Cloud implementation that provides data center redundancy and automatic failure handling. This is the highest form of dedicated deployment availability offered by Auth0.

## Overview

The standard dedicated deployment is a single-region, high availability solution, but the GEO-HA add-on extends the cluster with a geographically-distributed region where the maximum round-trip latency does not exceed 100 milliseconds. This is referred to as a *high-availability GEO cluster*, which is an active hot standby configuration with automated failure handling that can survive a regional outage.

## Standard configuration

![](/media/articles/appliance/geo-ha.png)

The standard configuration is a stretched cluster that consists of the following:

* One global load balancer/DNS failover configuration
* One primary data center with three Private Cloud instances
* One standby data center with three Private Cloud instances
* One arbiter node, a seventh instance that is located in its own data center

The standby data center instances possess the same Private Cloud configuration as the primary data center instances, and continuous synchronization ensures that the data on the primary and standby data centers mirror each other. The GEO-HA stretched cluster should be in the same provider (all nodes in AWS).

::: note
  Ports 27017 and 7777 must be open between all instances in the cluster.
:::

### Arbiter

The arbiter does not store data or execute application logic, but acts as an independent witness between the primary and standby data centers. By independently verifying if a data center is down or not, it prevents both from becoming active (such a scenario is known as the "split-brain" condition).

Since the arbiter isn’t storing data and doesn’t run any services, it can be a small instance with two cores and 4GB of memory.

You must enable outbound internet connectivity from the arbiter for system updates.

### Global load balancer/DNS failover configuration

You will need to deploy a global load balancer that supports an active/standby configuration. This will be configured to begin using the secondary site if the primary site load balancer is unavailable.

Two examples of products that support this configuration are the F5 Global Traffic Manager and the AWS Route 53 DNS service. The global load balancer is typically positioned in front of the local load balancers in each data center.

### Application tier

Auth0 requires the use of a load balancer or DNS failover solution that prefers to serve application requests using the primary data center, despite the fact that the Private Cloud instances in the hot standby data center are active and able to serve the requests.

The application tier remains unaware of the locality of the primary data node, whereas the data layer resolves the location of the primary node (the only node that receives application queries). The primary node serves all read and write activities. For example, if the data centers for the geo cluster are in State A and State B, and the ones in State B are active, any request serviced by the State A nodes at the application level requires data to then be written to a node in State B. This generally results in poorer performance due to the requests (and resulting round-trips) required to obtain the necessary data. Using a global load balancer or DNS failover solution to prefer the primary location, unless it is not healthy, mitigates this performance issue.

### Data tier

The data tier operates independently of the application tier as a single cluster stretched across two geographically-distributed data centers. Within each data center are three nodes, each providing local data redundancy and failover.

Only one of the two data centers is designated as primary, and the instances within that data center are weighted such that they are always preferred for incoming requests. All read and write activities then pass through the single, active primary node.

As long as all instances are visible to each other, the primary data center will always be elected. If the data center fails (that is, the instances are *not* visible to the witness and Private Cloud instance in the standby data center), then a node in the secondary data center will be elected to become primary.

If the primary data center becomes available again and its instances are visible to those of the arbiter and the secondary data center, the primary data center will again take precedence over the standby data center when handling incoming requests.

## Failover handling

1. **The primary data center fails.** The nodes in the standby data center and the arbiter can no longer communicate with the nodes in the primary data center.
2. **The standby data center becomes the primary data center.** Because the standby data center instances and the arbiter form a majority, they will elect the standby data center instances to become the primary instances.
3. **The Private Cloud instances associated with the primary data center begin failing.** Because the primary data center instances cannot communicate with the instances in the standby data center, the associated Private Cloud instances begin to fail.
4. **The global load balancer/DNS failover configuration detects via health checking that the nodes in the primary data center aren't serving.** It will then switch over to sending requests to the instances of the standby data center.
5. **The Private Cloud instances associated with the standby data center are now serving requests** and acting as the primary data node due to the standby data center's election in step 2.

### Keep reading

::: next-steps
* [Geographic High-Availability Private Cloud Failure Scenarios and Testing](/private-cloud/addons/geo-ha/disaster-recovery)
:::
