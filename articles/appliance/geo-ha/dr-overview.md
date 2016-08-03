# Geographic High-Availability Appliance Failure & Disaster Recovery

One key aspect of the Geographic High-Availability (GEO HA) Appliance is the data center redundancy and failure handling that ensures the highest form of Appliance uptime offered by Auth0.

## Standard Configuration

The standard configuration of a GEO HA Appliance is a stretched cluster that consists of the following pieces:

* one geographically-aware global load balancer/DNS failover configuration;
* one primary data center with three Appliance instances;
* one secondary data center with three Appliance instances;
* one arbiter, a seventh instance that is located in its own data center.

## Failure Scenarios and Handling

The following table summarizes what might happen and its possible performance impact in the event that any portion of the standard configuration encounters an error.

<table class="table">
    <tr>
        <th>Event</th>
        <th>Outcome</th>
        <th>Performance Impact</th>
    </tr>
    <tr>
        <td>Data unavailable for one or more (but not all) of the primary data center's node(s)</td>
        <td>Data for one of the remaining nodes becomes the primary</td>
        <td>None</td>
    </tr>
    <tr>
        <td>Service unavailable for one or more (but not all) of the primary data center's node(s)</td>
        <td>The unavailable nodes are removed from the primary site load balancer and no longer serves requests</td>
        <td>Reduction in overall handling capacity</td>
    </tr>
    <tr>
        <td>Data unavailable for any node in the primary data center</td>
        <td>Arbiter elects one of the secondary site's nodes to become the primary data node</td>
        <td>Performance degradation due to cross-geography data requests</td>
    </tr>
    <tr>
        <td>Service unavailable for any node in the primary data center</td>
        <td>Global load balancer redirects all requests to the secondary data center's nodes (but still serves data from the primary data center)</td>
        <td>Performance degradation due to cross-geography data requests</td>
    </tr>
    <tr>
        <td>Neither data nor service is available for the primary data center is available</td>
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
<table>
