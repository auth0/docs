# Geographic High-Availability Appliance Failure & Disaster Recovery

One key aspect of the Geographic High-Availability (Geo HA) Appliance is the data center redundancy and failure handling that ensures the highest form of Appliance uptime offered by Auth0.

## Standard Configuration

The standard configuration of a Geo HA Appliance is a stretched cluster that consists of the following pieces:

* one geographically-aware global load balancer/DNS failover configuration;
* one primary data center with three Appliance instances;
* one standby data center with three Appliance instances;
* one arbiter, a seventh instance that is located in its own data center.

## Failure Scenarios and Handling

* Some (but not all) of the primary data center's data unavailable;
* Some (but not all) of the primary data center's service unavailable;
* None of the primary data center's data is available;
* None of the primary data center's service is available;
* Neither data nor service is available for the primary data center is available;
* Connection failure between load balancer and primary data center;
* Arbiter is unavailable;

### Sources of Delay
