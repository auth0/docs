---
url: /appliance/monitoring
section: appliance
description: Monitoring in the PSaaS Appliance
topics:
    - appliance
    - monitoring
contentType: index
useCase: appliance
applianceId: appliance48
---

# Monitoring the Private SaaS (PSaaS) Appliance

The Auth0 Appliance is a managed service, this means Auth0 manages the installation, updates, and other maintenance tasks. However, Auth0 may be limited on what we can do given where the appliance is deployed. Specifically, the appliance can be deployed in the subscriber’s on-premise datacenter, in the subscriber’s cloud data center (i.e. AWS or Azure), or in an Auth0 controlled datacenter (e.g. AWS). These hosting environments can influence what Auth0 will be responsible for monitoring and what the subscriber is responsible for monitoring.

When Auth0 hosts the appliance we control every aspect of the installation from DNS, certificates, infrastructure, and the Auth0 software stack. This level of control allows us to monitor the health of the appliance and act on those observations to prevent or remediate issues. **When the appliance is deployed to a subscriber owned or managed datacenter, the subscriber must monitor the deployment and Auth0 will not monitor this environment.**

Please review the [PSaaS Appliance: Roles and Responsibilities](https://auth0.com/docs/appliance/raci) document for further details over who is responsible for various activities related to managing the appliance.

## Monitoring Capabilities

The Private SaaS appliance offers a number of tools to monitor and observe the infrastructure or applications. The following manifest describes the options for monitoring the appliance.

### Service Disruption

Auth0 provides a [`/testall` endpoint](https://auth0.com/docs/appliance/monitoring/testall) that reports the current aggregated status of Auth0 core services. This endpoint can be called at the load balancer level to determine if there is a user impacting service disruption and optionally at each individual node indicating service disruptions for a specific node.


Auth0 also exposes a [`/test` endpoint](https://auth0.com/docs/monitoring/how-to-monitor-auth0#the-test-endpoint) for checking the status of a given service.

### System Monitoring

Auth0 exposes a series of [authenticated endpoints](https://auth0.com/docs/appliance/monitoring/authenticated-endpoints) providing more detailed information about the system health. Using these endpoints, it is possible to monitor the status of CPU, memory, disk, network, internet, email, database, replica set, services, and the cluster.

These endpoints provide more granular information to see the status of lower level system resources.  These endpoints return indication if the system resources are considered healthy or not.

### Instrumentation

The appliance can be configured to enable [Instrumentation](https://auth0.com/docs/appliance/instrumentation) allowing the Root Tenant dashboard admins to view time series data about the overall appliance, as well as individual processes. The subscriber can then query or visualize this data to draw conclusions about the state of the appliance.  Since Auth0 does not have native monitoring functionality we support offloading instrumentation data to DataDog.  Utilizing this integration the subscriber can setup monitoring and alerting strategies with information provided by the PSaaS appliance.


If the subscriber choses not to setup a DataDog integration, Auth0 does provide a dashboard where the instrumentation data can be queried and viewed.  Note this dashboard does not include the ability to setup alerting.

### Dashboards

The appliance has two different dashboards to view health information. These dashboards provide current and historical data, but do not provide any alerting capabilities.

These features are provided out of convenience and must not be used as the monitoring strategy.

The [Troubleshoot](https://auth0.com/docs/appliance/dashboard/troubleshoot) page can be used to view [Health Check](https://auth0.com/docs/appliance/dashboard/troubleshoot#health-check) data for the last 29 days.

The [Instrumentation dashboard](https://auth0.com/docs/appliance/instrumentation/visualize-data) can be used to view and query instrumentation data for the appliance.

### Audit and Tenant Events

Auth0 tracks, per tenant, the various transaction that the appliance processes. These [Tenant Logs](https://auth0.com/docs/logs) represent the various activities taking place in each tenant. Please review the [log events manifest](https://auth0.com/docs/logs#log-data-event-listing) for a complete listing of the events captured.

The appliance supports the same multi-tenant cloud functionality for offloading Tenant Logs to a third-party using the various [log export extensions](https://auth0.com/docs/extensions#export-auth0-logs-to-an-external-service). Also, the appliance supports the ability to offload tenant logs natively using the appliance’s tenant logs export functionality.

By integrating with a third-party, such as Splunk, subscribers can monitor and alert on activity that falls outside of normal behavior.

### Synthetic Transactions

Just like the multi-tenant cloud product, subscribers can use any third-party service that supports synthetic transaction to monitor service availability.

## Monitoring Strategy

Every subscriber is different and there are certain things that are unique to each use case that will drive alerting and monitoring approaches. However, these are the minimum signals that the subscriber should monitor.  It is recommended that you build additional alerts and monitoring in a way that makes sense to how the subscriber uses Auth0.  In addtion to monitoring the Auth0 platform it is expected that the subscriber also monitors the infrastructure and dependencies the PSaaS appliance relies upon.

<table class="table">
  <thead>
  <tr>
    <th>Signal</th>
    <th>Threshold</th>
    <th>Action</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>`/testall` at load balancer level</td>
    <td>Does not return OK</td>
    <td>Submit a support ticket</td>
  </tr>
  <tr>
    <td>`/testall` at node level</td>
    <td>Does not return OK</td>
    <td>Submit a support ticket</td>
  </tr>
  <tr>
    <td>Instrumentation: Disk</td>
    <td>80%</td>
    <td>Submit a support ticket</td>
  </tr>
  <tr>
    <td>Instrumentation: CPU</td>
    <td>over 80% for 10 minutes</td>
    <td>Submit a support ticket</td>
  </tr>
  <tr>
    <td>Instrumentation: Memory</td>
    <td>90% utilization</td>
    <td>Submit a support ticket</td>
  </tr>
  <tr>
    <td>Synthetic Transaction: Login</td>
    <td>Login failed</td>
    <td>Submit a support ticket</td>
  </tr>
  </tbody>
</table>

It is recommended that the subscriber run the application for a month to fine tune the thresholds to optimize the signal and reduce noisy alerts.