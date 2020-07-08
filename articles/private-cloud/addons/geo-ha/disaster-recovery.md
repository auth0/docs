---
section: private-cloud
description: Learn about Geo-HA failure and disaster recovery for Private Cloud customers.
topics:
    - appliance
    - private-cloud
    - geo-ha
    - disaster-recovery
contentType: reference
useCase: private-cloud
sitemap: false
---

<!-- markdownlint-disable MD033 -->

# Private Cloud Geographic High-Availability Failure & Disaster Recovery

Some key aspects of the Geographic High-Availability (GEO-HA) Private Cloud are data center redundancy and failure handling, which ensure the highest form of Private Cloud uptime offered by Auth0.

## Failure scenarios and handling

The following table summarizes potential failure scenarios and their possible performance impact if any portion of the standard configuration encounters an error.

<table class="table">
  <thead>
    <tr>
        <th>Event</th>
        <th>Outcome</th>
        <th>Performance Impact</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>Data unavailable for one or more (but not all) of the primary data center's node(s)</td>
        <td>Data for one of the remaining nodes becomes the primary</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Service unavailable for one or more (but not all) of the primary data center's node(s)</td>
        <td>The unavailable nodes are removed from the primary site load balancer and no longer serve requests</td>
        <td>Reduction in overall handling capacity</td>
    </tr>
    <tr>
        <td>Data unavailable for all nodes in the primary data center</td>
        <td>Arbiter elects one of the secondary site's nodes to become the primary data node</td>
        <td>Performance degradation due to cross-geography data requests</td>
    </tr>
    <tr>
        <td>Service unavailable for all nodes in the primary data center</td>
        <td>Global load balancer redirects all requests to the secondary data center's nodes (but still serves data from the primary data center)</td>
        <td>Performance degradation due to cross-geography data requests</td>
    </tr>
    <tr>
        <td>Neither data nor service for the primary data center is available</td>
        <td>Global load balancer redirects all requests to the secondary data center</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Connection failure between global load balancer and primary data center</td>
        <td>Global load balancer redirects all requests to the secondary data center's nodes (but still serves data from the primary data center)</td>
        <td>Performance degradation due to cross-geography data requests</td>
    </tr>
    <tr>
        <td>Arbiter is unavailable</td>
        <td>No impact to the end user if both the primary and secondary data centers are still available</td>
        <td>None</td>
    </tr>
  </tbody>
</table>

## Test the Geographic High-Availability Private Cloud

To test the Geographic High-Availability (GEO-HA) failover/failback procedure, you should:

1. Take all nodes in the primary data center offline.
2. Run tests against the global load balancer to ensure that traffic gets rerouted to the secondary site.

GEO-HA does not support having both the primary and secondary sites disconnected and active at the same time. Because the data layer is arranged in one stretched cluster, the cluster only permits one data node to act as primary.

The arbiter determines which site stays active in the case of severed connectivity between the two data centers, and during this period, it would continue to elect a node in the primary site to serve as the primary data node. As such, it is **not possible** to have two primary data nodes (one in the primary site and one in the secondary site) within a single cluster.

The application layer is always active on all nodes. For performance reasons, only the site containing the primary data node typically serves traffic. This is managed by the global load balancer.

## Back up the Geographic High-Availability (GEO-HA) Private Cloud

As a customer, it is your responsibility to perform regular backups on your Geographic High-Availability (GEO-HA) Private Cloud. We recommend a single backup, since the GEO-HA is a single cluster stretched over a distance, typically recommend that backup be performed daily. However, if you have concerns about a logical data corruption, or you need greater assurance of up-to-date data, you may choose to back up more frequently.

Because the backup process puts a substantial load on the backup node, please contact your Auth0 Technical Account Manager to schedule a discussion about performance impact if backups are performed more frequently/during peak usage times.