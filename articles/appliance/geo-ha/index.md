---
url: /appliance/geo-ha
---

# Auth0 Appliance: High Availability Geo Cluster (Geo HA)

The high availability geo cluster is an Appliance implementation that provides data center redundancy and automatic failure handling. This is the highest form of Appliance availability offered by Auth0.

## Overview

Auth0 adds to the single data center high availability solution by extending the cluster with a geographically distributed data center where the recommended **maximum round-trip latency should not exceed 100 ms**. The result is the high availability geo cluster, which is an active hot standby configuration with automated failure handling that can survive a regional outage.

## Standard Configuration

![](/media/articles/appliance/geo-ha.png)

The standard configuration is a stretched cluster that consists of the following pieces:

* one geographically-aware global load balancer/DNS failover configuration;
* one primary data center with three Appliance instances;
* one standby data center with three Appliance instances;
* one arbiter, a seventh instance that is located in its own data center.

The standby data center instances possess the same Appliance configuration as the primary data center instances, and continuous synchronization ensure that the data on the primary and standby data centers mirror each other.

The arbiter does not store data or execute application logic, but acts as a witness between the primary and standby data centers. By independently verifying if a data center is down or not, it prevents both from becoming active (such a scenario is known as the "split-brain" condition).

> Ports 27017 and 7777 must be open between all instances in the cluster.

### Application Tier

Auth0 requires the use of a geographically-aware load balancer or DNS failover solution that prefers to serve application requests using the primary data center, despite the fact that the Appliance instances in the hot standby data center are active and able to serve the requests.

The application tier remains unaware of the locality of the primary data node, whereas the data layer resolves the location of the primary node (the only node that receives application queries). The primary node serves all read and write activities. For example, if the data centers for the geo cluster are in State A and State B and the ones in State B are active, any request serviced by the State A nodes at the application level requires data to then be written to a node in State B. This generally results in poorer performance due to the requests (and resulting round-trips) required to obtain the necessary data. Using a geographically-aware load balancer or DNS failover solution mitigates this performance issue.

### Data Tier

The data tier operates independently of the application tier as a single cluster stretched across two geographically distributed data centers. Within each data center are three nodes, each provided local data redundancy and failover.

Only one of the two data centers is designated as primary, and the instances within that data center are weighted such that those are always preferred for incoming requests. All read and write activities then pass through the single, active primary node.

As long as all instances are visible to each other, the primary data center will always be elected. If the data center fails (that is, the instances are *not* visible to the witness and appliances in the standby data center), then a node in the secondary data center will be elected to become primary.

If the primary data center becomes available again and its instances are visible to those of the arbiter and the secondary data center, the primary data center will again take precedence over the standby data center when handling incoming requests.

## Failover Handling

1. **The primary data center fails.** The nodes in the standby data center and the arbiter can no longer communicate with the nodes in the primary data center.
2. **The standby data center becomes the primary data center.** Because the standby data center instances and the arbiter form a majority, they will elect the standby data center instances to become the primary instances.
3. **The Appliances associated with the primary data center begin failing.** Because the primary data center instances cannot communicate with the instances in the standby data center, the associated Appliance instances begin to fail.
4. **The geographically-aware global load balancer/DNS failover configuration detects that the nodes in the primary data center aren't serving.** It will then switch over to sending requests to the instances of the standby data center.
5. **The Appliances associated with the standby data center are now serving requests** and acting as the primary data node due to its election in step 2.

### Further Reading

* [Geographic High-Availability Appliance Failure Scenarios and Testing](/appliance/geo-ha/disaster-recovery)
