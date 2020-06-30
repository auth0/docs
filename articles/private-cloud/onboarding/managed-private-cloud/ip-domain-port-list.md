---
section: private-cloud
description: Infrastructure requirements for the customer-hosted Managed Private Cloud
topics: private-cloud
contentType: concept
useCase: private-cloud
---
# Private Cloud IP/Domain and Port List

Private Cloud deployments require certain ports within the cluster to be open and able to communicate with one another, as well as selected external sites.

## Between Cluster Nodes

When possible, instances within a cluster should have full connectivity to each other so that you do not need to introduce new firewall rules if Auth0 adds new features. However, since this isn't possible in every environment, the following table lists the ports that are required to be open and accessible to other Private Cloud instances in the same cluster:

<table class="table">
  <thead>
  <tr>
    <th>Port</th>
    <th>Use</th>
    <th>Required?</th>
    <th>Notes</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>27017</td>
    <td>Database</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>7777</td>
    <td>Control</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>9001</td>
    <td>Rate Limiting</td>
    <td>Yes</td>
    <td>Required if rate limiting is used</td>
  </tr>
  <tr>
    <td>8721</td>
    <td>Webtask Logging/Control</td>
    <td>Yes</td>
    <td>Required for logging and debugging</td>
  </tr>
  <tr>
    <td>8701</td>
    <td>Webtask Logging/Control</td>
    <td>Yes</td>
    <td>Required for logging and debugging</td>
  </tr>
  <tr>
    <td>9200, 9300-9400</td>
    <td>Elastic Search</td>
    <td>Yes</td>
    <td>Required for Elastic Search</td>
  </tr> 
   <tr>
    <td>3000</td>
    <td>Grafana instrumentation</td>
    <td>No</td>
    <td>Required if you are using Grafana instrumentation</td>
  </tr>  
  <tr>
    <td>22</td>
    <td>Maintenance</td>
    <td>No</td>
    <td>Enables maintenance tasks to be done between nodes</td>
  </tr>
  <tr>
    <td>ICMP</td>
    <td>Healthcheck</td>
    <td>No</td>
    <td>Allows healthchecks between nodes</td>
  </tr>
  </tbody>
</table>

## External Connectivity

Auth0 strives to keep these IP addresses stable, though this is not a given. From time to time, Auth0 may add IP addresses or additional servers. During updates and metrics, you must allow your Private Cloud instances to connect to these addresses.

<table class="table">
  <thead>
  <tr>
    <th>Use</th>
    <th>Direction</th>
    <th>IP/DNS</th>
    <th>Port</th>
    <th>Notes</th>
    <th>Required?</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>Inbound</td>
    <td>Your load balancer IP address (often on internal network)</td>
    <td>80/(443 or 4443)</td>
    <td>For clusters with more than one node, a load balancer is required for resiliency and performance</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Webtask</td>
    <td>Outbound</td>
    <td>Your load balancer IP address (often on internal network)</td>
    <td>443</td>
    <td>Allows rules, webtasks, and extensions to call back to Auth0 endpoints</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Command Line Interface</td>
    <td>Inbound <b>and</b> Outbound</td>
    <td>CLI Applications (often on the internal network)</td>
    <td>10121</td>
    <td>Allows use of the Private Cloud Command Line Interface</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>Outbound</td>
    <td>apt-mirror.it.auth0.com (52.8.153.197)</td>
    <td>443</td>
    <td>Provides update packages for Private Cloud deployments</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>Outbound</td>
    <td>docker.it.auth0.com (52.9.124.234)</td>
    <td>443</td>
    <td>Provides updates for Private Cloud Docker Packages</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Web extensions, Hooks, and Management Dashboard</td>
    <td>Outbound</td>
    <td>cdn.auth0.com</td>
    <td>443</td>
    <td>Required to run web extensions and Hooks; also required for admins to browse to the Management Dashboard</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Examples</td>
    <td>Outbound</td>
    <td>github.com</td>
    <td>443</td>
    <td>Source to download and repackage example applications</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Usage & Telemetry</td>
    <td>Outbound</td>
    <td>app-gateway.it.auth0.com (52.40.103.203)</td>
    <td>443</td>
    <td>Provides usage and telemetry statistics</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Maintenance</td>
    <td>Inbound</td>
    <td>Jump Host</td>
    <td>22</td>
    <td>Allows access to Private Cloud instances for support purposes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Healthcheck  </td>
    <td>Inbound</td>
    <td>Monitoring Endpoint</td>
    <td>9110</td>
    <td>Allows access to Healthcheck endpoints</td>
    <td>No</td>
  </tr>
  <tr>
    <td>DNS</td>
    <td>Inbound <b>and</b> Outbound</td>
    <td>Local domain servers</td>
    <td>53</td>
    <td>Required by the Private Cloud deployment to resolve host names internal and external to your environment</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>SMTP</td>
    <td>Outbound</td>
    <td>SMTP Server(s)</td>
    <td>25/587</td>
    <td>Allows sending of emails from the Private Cloud deployment</td>
    <td>No</td>
  </tr>
  </tbody>
</table>

## Notes

* If you are using social providers for logins, the cluster must be able to connect to the social providers' endpoints.
* The Jump Host IP is stable and provided at the time of setup.
