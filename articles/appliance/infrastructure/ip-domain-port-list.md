---
description: Appliance infrastructure information about IP/Domain and Port Usage
---


# Appliance Infrastructure: IP/Domain and Port List

The Appliance requires certain ports within the cluster to be open and able to access each other, as well as selected external sites.

## Between Cluster Nodes

When possible, instances within a cluster should have full connectivity to each other so that you do not need to introduce new firewall rules if Auth0 adds new features. However, since this isn't possible in every environment, the following table lists the ports that are required to be open and accessible to other Appliance instances in the same cluster:

<table class="table">
  <tr>
    <th>Port</th>
    <th>Use</th>
    <th>Required?</th>
    <th>Notes</th>
  </tr>
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
</table>

## External Connectivity

Auth0 strives to keep these IP addresses stable, though this is not a given. From time to time, Auth0 may add IP addresses or additional servers. During updates and metrics, you must allow your Appliance instances to connect to these addresses.

<table class="table">
  <tr>
    <th>Use</th>
    <th>Direction</th>
    <th>IP/DNS</th>
    <th>Port</th>
    <th>Notes</th>
    <th>Required?</th>
  </tr>
  <tr>
    <td>Command Line Interface</td>
    <td>Inbound</td>
    <td>CLI Clients (often on the internal network)</td>
    <td>10121</td>
    <td>Allows use of the Appliance Command Line Interface</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>Outbound</td>
    <td>apt-mirror.it.auth0.com (52.8.153.197)</td>
    <td>80/443</td>
    <td>Provides update packages for Appliance instances</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>Outbound</td>
    <td>docker.it.auth0.com (52.9.124.234)</td>
    <td>5000/443</td>
    <td>Provides updates for Appliance Docker Packages</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Updates</td>
    <td>Outbound</td>
    <td>cdn.auth0.com</td>
    <td>443</td>
    <td>Required to run web extensions; Provides update packages for Appliance instances running versions `6868` or earlier</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>GitHub</td>
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
    <td>Allows access to Appliance instances for support purposes</td>
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
</table>

## Notes

* If you are using social providers for logins, the cluster must be able to connect to the social providers' endpoints.
* The Jump Host IP is stable and provided at the time of setup.
* You do not need to allow access to `cdn.auth0.com` for Appliance versions after `6868`.
