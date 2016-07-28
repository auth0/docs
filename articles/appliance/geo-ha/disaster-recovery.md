# Geographic High-Availability Appliance Failure Scenarios and Testing

[Overview of the Geographic High-Availability Appliance](/appliance/geo-ha)

## Geographic High-Availability Appliance Failure Scenarios and Impact

The following table details some of the ways in which the Geographic High-Availability Appliance may fail and what the implications of such a failure are.

<table>
    <tr>
        <th>Event</th>
        <th>Outcome</th>
        <th>Performance Impact</th>
    </tr>
    <tr>
        <td>Service *and* Data are available for Primary Cluster Nodes 1, 2, 3</td>
        <td>The Primary Appliance Cluster continues to serve all traffic.</td>
        <td>None.</td>
    </tr>
    <tr>
        <td>Data Unavailable for Node 1</td>
        <td>Node 2 or Node 3 becomes the primary data node.</td>
        <td>None.</td>
    </tr>
    <tr>
        <td>Service Unavailable for Node 1</td>
        <td>Node 1 is pulled from the primary site load balancer and no longer serves requests.</td>
        <td>Overall handling capacity may be reduced by up to a third.</td>
    </tr>
    <tr>
        <td>Service *and* Data Unavailable for Node 1</td>
        <td>Node 2 or Node 3 becomes the primary data node. Node 1 is pulled from the primary site load balancer and no longer serves requests.</td>
        <td>Overall handling capacity may be reduced by up to a third.</td>
    </tr>
    <tr>
        <td>Data Unavailable for Nodes 1 *and* 2</td>
        <td>Node 3 becomes the primary data node.</td>
        <td>None.</td>
    </tr>
    <tr>
        <td>Service Unavailable for Nodes 1 *and* 2</td>
        <td>All requests from the primary load balancer are routed to Node 3.</td>
        <td>Overall handling capacity is significantly reduced. Possibility of manual failover to a secondary node.</td>
    </tr>
    <tr>
        <td>Service *and* Data Unavailable for Nodes 1 *and* 2</td>
        <td>All requests from the primary load balancer are routed to Node 3, which is also the primary data node.</td>
        <td>Overall handling capacity is significantly reduced. Possibility of manual failover to a secondary node.</td>
    </tr>
    <tr>
        <td>Data Unavailable for Nodes 1, 2, *and* 3</td>
        <td>The Arbiter elects Node 4, 5, or 6 to become the primary data node.</td>
        <td>Some performance degradation due to gross-geography data requests.</td>
    </tr>
    <tr>
        <td>Service Unavailable for Nodes 1, 2, *and* 3</td>
        <td>The Global Load Balancer will route traffic to the secondary application servers (Nodes 4-6). These servers will request data from the primary data server, which is still in the primary data center.</td>
        <td>Some performance degradation due to gross-geography data requests.</td>
    </tr>
    <tr>
        <td>Data and Service Unavailable for Nodes 1, 2, *and* 3</td>
        <td>The Appliance instances associated with the standby data center are now serving requests as described in [failover handling](/appliance/geo-ha#failover-handling)</td>
        <td>None.</td>
    </tr>
    <tr>
        <td>*Connection* between the Global Load Balancer and the Primary Cluster Unavailable</td>
        <td>All requests are routed to the secondary site, but the secondary nodes continue to use data on the primary site</td>
        <td>Some performance degradation due to gross-geography data requests.</td>
    </tr>
    <tr>
        <td>Arbiter is Unavailable</td>
        <td>If the primary cluster is still available, there will be no impact to the end user.</td>
        <td>None.</td>
    </tr>
    <tr>
        <td>After failover, only some (not all) of the nodes resume operation</td>
        <td>If some of the nodes are again available in the primary cluster, the Global Load Balancer will automatically switch to routing requests to the primary cluster. The Arbiter sees the higher priority Mongo node and sets it as the primary (once it has been fully synced).</td>
        <td>Possible transient period of unavailability as the load balancer switches the routing of requests.</td>
    </tr>
    <tr>
        <td>Nodes 1, 2, *and* 3 are available after a failover, but customers have logged in to the standby cluster</td>
        <td>If the nodes are again available in the primary cluster, the Global Load Balancer will automatically switch to routing requests to the primary cluster. The Arbiter sees the higher priority Mongo node and sets it as the primary (once it has been fully synced).</td>
        <td>None.</td>
    </tr>
</table>

## Geographic High-Availability Appliance Testing

To test the Geographic High-Availability Appliance (GEO HA) failover/failback procedure, Auth0 will:

1. Take all nodes in the primary data center offline.
2. Run tests against the global load balancer to ensure that traffic gets rerouted to the standby site.

Please note that the following is *not* included in GEO HA testing:

* Performance testing;
* Actions involving both the primary and standby sites being active. Auth0 does not support operating the primary and failover sites simultaneously.

## Backing Up the Geographic High-Availability Appliance

As a customer, it is your responsibility to perform regular backups on your Geographic High-Availability Appliance (GEO HA). Auth0 recommends a single backup, since the GEO HA is a single cluster stretched over a distance.

Typically, Auth0 recommends performing a daily backup, but depending on your needs, you may do so more frequently. If you have concerns about a logical data corruption, or you need greater assurance of up-to-date data, you might choose to backup more frequently. However, the backup process puts a substantial load on the backup node, so please speak to your Auth0 Customer Success Engineer about performance impact if backups are performed more frequently/during peak usage times.

## Further Reading

* [How to Configure the Command Line Interface for Use with Appliance Instances](/appliance/cli/adding-node-to-backup-role)
* [Backing Up Appliance Instances with the Command Line Interface](/appliance/cli/backing-up-the-appliance)
    * [Adding Appliance Nodes to the Backup Role](/appliance/cli/configure-cli)
