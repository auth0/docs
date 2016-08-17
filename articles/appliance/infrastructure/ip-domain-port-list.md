# Appliance Infrastructure: IP/Domain and Port List

The Appliance requires certain ports within the cluster to be open and able to access selected external sites.

## Ports Within the Cluster

When possible, instances within a cluster should have full connectivity to each other so that you do not need to introduce new firewall rules in the event that Auth0 adds new features to the cluster. However, since this isn't possible in every environment, the following table lists the ports that are required to be open and accessible to other Appliance instances in the same cluster:

<table class="table">
  <tr>
    <th>Port</th>
    <th>Use</th>
    <th>Requred?</th>
    <th>Implication</th>
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
    <td>Some operations may take longer to perform</td>
  </tr>
  <tr>
    <td>ICMP</td>
    <td>Health Check</td>
    <td>No</td>
    <td>Network health check fails</td>
  </tr>
</table>

## External Connectivity

Auth0 strives to keep these IP addresses stable, though this is not a given. From time to time, Auth0 may add IP addresses or additional servers. During updates and metrics, you must allow your Appliance instances to connect to these addresses.
