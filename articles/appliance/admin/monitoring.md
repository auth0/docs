---
section: appliance
description: How to monitor the PSaaS Appliance
topics:
    - appliance
    - monitoring
contentType: how-to
useCase: appliance
applianceId: appliance8
---

# PSaaS Appliance Administration: Monitoring

While your existing monitoring platform may already collect data (such as metrics on CPU, disk size, and so on.) at the virtual machine level, it may exclude information regarding the nodes in the cluster.

Because of this, Auth0 provides [tools for monitoring your individual cluster nodes](/appliance/monitoring).

For information about general Auth0 Monitoring, please see [this page](monitoring).

## Performing Health Checks on Load Balancers

When running the PSaaS Appliance in a High Availability setup, the load balancers will distribute the load over all nodes in the cluster. Most load balancers perform their own health checks on all of the servers to which they distribute the load, allowing them to remove non-responsive servers out of rotation.

Once source of information for the load balancer can be obtained by running the HTTP health checks to each node in the cluster using the [`testall`](/appliance/monitoring/testall) endpoint.
