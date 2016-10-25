---
description: How to view log data.
url: /logs
---

# Logs

Using the Auth0 Dashboard, you can pull log data on:

* Actions performed by administrators using the Dashboard;
* Authentications made by your users.

## How to View Log Data

The **Logs** page of the [Auth0 Dashboard](${manage_url}) displays all events that occur, including user authentication and administrative actions such as adding/updating Clients, Connections, and Rules.

![](/media/articles/logs/dashboard-logs.png)

Please note that administrative actions will show up in the logs as `API Operation` events.

## Frequently Asked Questions

### How long is log file data available?

The length of time for which your data is stored varies depending on your plan.

You can see how long data is kept for your existing plan using the **Learn More** banner.

![](/media/articles/logs/log-storage-period.png)

### How do I view or export log file data?

If you would like to store log data longer than the time period offered by your subscription plan, we recommend you use the [Management API feature that allows you to retrieve the relevant data](api/management/v2#!/Logs/get_logs). Once you've retrieved your data, you can:

* Store the data yourself;
* Transmit the data to an external service such as Splunk (consider using the [Auth0 Logs to Splunk Extension](/extensions/splunk)).

#### Retrieving Logs from the Management API

You can use the Management API v2 retrieve your logs. There are the two available endpoints, each providing slightly different quantities of information:

* [/api/v2/logs](/api/v2#!/Logs/get_logs): Retrieves log entries that match the provided search criteria. If you do not provide any search criteria, you will get a list of all available entries;
* [/api/v2/logs/{id}](/api/v2#!/Logs/get_logs_by_id): Retrieves the single log entry associated with the provided ID.

## Log Data Event Listing

The following table lists the codes associated with the appropriate log events.

<table>
  <thead><tr><th>Event Code</th><th>Event</th></tr></thead>
  <tbody>
  <tr><td>admin_update_launch</td><td>Auth0 Update Launched</td></tr>
  <tr><td>api_limit</td><td>Rate Limit On API</td></tr>
  <tr><td>cls</td><td>Code/Link Sent</td></tr>
  <tr><td>coff</td><td>Connector Offline</td></tr>
  <tr><td>con</td><td>Connector Online</td></tr>
  <tr><td>cs</td><td>Code Sent</td></tr>
  <tr><td>du</td><td>Deleted User</td></tr>
  <tr><td>f</td><td>Failed Login</td></tr>
  <tr><td>fapi</td><td>Failed API Operation</td></tr>
  <tr><td>fc</td><td>Failed by Connector</td></tr>
  <tr><td>fce</td><td>Failed Change Email</td></tr>
  <tr><td>fco</td><td>Failed by CORS</td></tr>
  <tr><td>fcp</td><td>Failed Change Password</td></tr>
  <tr><td>fcpn</td><td>Failed Change Phone Number</td></tr>
  <tr><td>fcpr</td><td>Failed Change Password Request</td></tr>
  <tr><td>fcpro</td><td>Failed Connector Provisioning</td></tr>
  <tr><td>fcu</td><td>Failed Change Username</td></tr>
  <tr><td>fd</td><td>Failed Delegation</td></tr>
  <tr><td>fdu</td><td>Failed User Deletion</td></tr>
  <tr><td>feacft</td><td>Failed Exchange</td></tr>
  <tr><td>fn</td><td>Failed Sending Notification</td></tr>
  <tr><td>fp</td><td>Failed Login (Incorrect Password)</td></tr>
  <tr><td>fs</td><td>Failed Signup</td></tr>
  <tr><td>fu</td><td>Failed Login (Invalid Email/Username)</td></tr>
  <tr><td>fv</td><td>Failed Verification Email</td></tr>
  <tr><td>fvr</td><td>Failed Verification Email Request</td></tr>
  <tr><td>limit_mu</td><td>Blocked IP Address</td></tr>
  <tr><td>limit_ui</td><td>Too Many Calls to /userinfo Endpoint</td></tr>
  <tr><td>limit_wc</td><td>Blocked Account</td></tr>
  <tr><td>s</td><td>Success Login</td></tr>
  <tr><td>sapi</td><td>Success API Operation</td></tr>
  <tr><td>sce</td><td>Success Change Email</td></tr>
  <tr><td>scp</td><td>Success Change Password</td></tr>
  <tr><td>scpn</td><td>Success Change Phone Number</td></tr>
  <tr><td>scpr</td><td>Success Change Password Request</td></tr>
  <tr><td>scu</td><td>Success Change Username</td></tr>
  <tr><td>sdu</td><td>Success User Deletion</td></tr>
  <tr><td>sd</td><td>Success Delegation</td></tr>
  <tr><td>seacft</td><td>Success Exchange</td></tr>
  <tr><td>seccft</td><td>Success Exchange</td></tr>
  <tr><td>ss</td><td>Success Signup</td></tr>
  <tr><td>sv</td><td>Success Verification Email</td></tr>
  <tr><td>svr</td><td>Success Verification Email Request</td></tr>
  <tr><td>sys_os_update_end</td><td>Auth0 OS Update Ended</td></tr>
  <tr><td>sys_os_update_start</td><td>Auth0 OS Update Started</td></tr>
  <tr><td>sys_update_end</td><td>Auth0 Update Ended</td></tr>
  <tr><td>sys_update_start</td><td>Auth0 Update Started</td></tr>
  <tr><td>w</td><td>Warnings During Login</td></tr>
  </tbody>
</table>

### Tools to Process Logs

* [Auth0 Logs Processor](https://www.npmjs.com/package/auth0-logs-processor)
* [GitHub Repo for the Auth0 Logs Processor](https://github.com/auth0/logs-processor)
