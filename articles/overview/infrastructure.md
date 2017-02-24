---
description:
---

# Auth0 Infrastructure

Auth0's infrastructure runs on Amazon Web Services (AWS), which is designed for high availability. This means that an outage involving one data center (also known as an availability zone) will not cause service interruptions. There is no scheduled downtime, so Auth0 is available 24 hours per day, 3 days per week, 365 days per year.

Each AWS availability zone (AZ) has independent fault boundaries for its power, network, and physical infrastructure. In addition, Auth0 spreads its services across multiple AZs to ensure multi-data center/regional redundancy.

## Disaster Recovery

Auth0's disaster recovery (DR) strategy utilizes a two-region failover approach that involves a **primary** and a **secondary** region. Auth0 implements continuous replication of data from the main data store of the primary region to the secondary region. The replication lag is typically less than ten seconds (that is, data in the secondary region is no older than ten seconds behind the primary region).

For less critical data stores, such as the search index, Auth0 replicates these less frequently to ensure high performance.

For regional outages, a scripted, engineer-initiated failover reconfigures the failover site/secondary region for operation.

<table class="table">
  <tr>
    <th>Auth0 Objectives for Regional Outages</th>
  </tr>
  <tr>
    <th>Recovery Point Objective (RPO)</th>
    <td>60 seconds</td>
  </tr>
  <tr>
    <th>Recovery Time Objective (RTO)</th>
    <td>15 minutes</td>
  </tr>
</table>

## Application Layer

Auth0 implements application clusters such that each component shares information with and is aware of the other components in that cluster. If any application component fails, the others continue to provide the required services.

Within a given region, Auth0 services are load-balanced across multiple data centers (AZs), which prevents interruptions in the event that any given region becomes unavailable.

### Autoscaling

Auth0 enables autoscaling on critical layers. For non-critical layers, Auth0 automates the creation of new resources to enable quick increases in capacity. Additonally, Auth0 has designed its services to degrade gracefully, should the need arise. For example, Auth0 might utilize local processing or operate out of a cache if a dependent service fails.

## Data Storage Layer

The storage layer contains your business' vital data that, if lost, may not be recoverable. As such, it's crucial that a resilient environment have back-up copies of you data available for the following purposes:

* Local processing;
* Restoration due to localized outages;
* Disaster recovery.

### Operational Recovery

Auth0 can replace local copies of data in cases of deletion or corruption. Auth0 can restore data on a per tenant bases, as well as perform a full database recovery.

### Archives

Every day, Auth0 performs multiple backups of the main data store.

### Data Replication

Auth0 replicates data within a given region, as well as across regions. At any given time, four copies of Production data exist.

### Instance Failovers

Auth0 clusters the data tier (which includes database and search functionality), and it will continue to operate in the event of an instance or a data center (AZ) failure.
